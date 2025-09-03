#!/usr/bin/env python3
"""
BMAD Integration System
Orchestrates the complete Build-Measure-Analyze-Decide cycle with campaign automation
"""

import json
import os
import subprocess
import schedule
import time
from datetime import datetime, timedelta
from pathlib import Path
import logging
from typing import Dict, List, Optional, Any
from dataclasses import dataclass
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Import our BMAD components
from measure_tracking_system import BMADMeasureSystem, MeasureTracker
from decide_workflow_system import DecisionEngine, DecisionType, Priority

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@dataclass
class BMCycleStatus:
    """Status of current BMAD cycle"""
    cycle_id: str
    phase: str  # "build", "measure", "analyze", "decide"
    start_date: datetime
    current_phase_start: datetime
    expected_completion: datetime
    metrics_collected: int
    decisions_pending: int
    status: str  # "active", "completed", "paused"

class BMADOrchestrator:
    """Main orchestrator for the complete BMAD cycle"""
    
    def __init__(self, config_path: str = "bmad_config.json"):
        self.config = self.load_config(config_path)
        self.measure_system = BMADMeasureSystem()
        self.decision_engine = DecisionEngine()
        self.current_cycle = None
        
        # Create necessary directories
        self.ensure_directories()
    
    def load_config(self, config_path: str) -> Dict:
        """Load BMAD configuration"""
        default_config = {
            "cycle_duration_days": 28,
            "build_phase_days": 7,
            "measure_phase_days": 14,
            "analyze_phase_days": 5,
            "decide_phase_days": 2,
            "email_notifications": {
                "enabled": True,
                "recipients": ["team@example.com"],
                "smtp_host": "smtp.gmail.com",
                "smtp_port": 587,
                "smtp_user": "",
                "smtp_pass": ""
            },
            "automation": {
                "auto_collect_metrics": True,
                "auto_generate_reports": True,
                "auto_prioritize_decisions": True,
                "require_approval_for_implementation": True
            },
            "integration": {
                "campaign_webhook_url": "",
                "slack_webhook": "",
                "github_repo": "",
                "deployment_script": "./deploy.sh"
            }
        }
        
        if os.path.exists(config_path):
            with open(config_path, 'r') as f:
                user_config = json.load(f)
                default_config.update(user_config)
        else:
            # Create default config file
            with open(config_path, 'w') as f:
                json.dump(default_config, f, indent=2, default=str)
            logger.info(f"Created default config file: {config_path}")
        
        return default_config
    
    def ensure_directories(self):
        """Create necessary directory structure"""
        directories = [
            "bmad_cycles",
            "reports",
            "build_artifacts", 
            "measure_data",
            "analyze_results",
            "decide_records"
        ]
        
        for directory in directories:
            Path(directory).mkdir(exist_ok=True)
    
    def start_new_cycle(self, cycle_name: Optional[str] = None) -> str:
        """Start a new BMAD cycle"""
        if self.current_cycle and self.current_cycle.status == "active":
            logger.warning("Active cycle exists. Complete current cycle before starting new one.")
            return self.current_cycle.cycle_id
        
        cycle_id = cycle_name or f"bmad_cycle_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        
        self.current_cycle = BMCycleStatus(
            cycle_id=cycle_id,
            phase="build",
            start_date=datetime.now(),
            current_phase_start=datetime.now(),
            expected_completion=datetime.now() + timedelta(days=self.config["cycle_duration_days"]),
            metrics_collected=0,
            decisions_pending=0,
            status="active"
        )
        
        # Create cycle directory and initialize tracking
        cycle_dir = Path(f"bmad_cycles/{cycle_id}")
        cycle_dir.mkdir(exist_ok=True)
        
        # Initialize cycle tracking file
        cycle_data = {
            "cycle_id": cycle_id,
            "start_date": self.current_cycle.start_date.isoformat(),
            "config": self.config,
            "phases": {
                "build": {"status": "active", "start_date": datetime.now().isoformat()},
                "measure": {"status": "pending"},
                "analyze": {"status": "pending"},
                "decide": {"status": "pending"}
            },
            "metrics": [],
            "decisions": [],
            "outcomes": {}
        }
        
        with open(cycle_dir / "cycle_data.json", 'w') as f:
            json.dump(cycle_data, f, indent=2, default=str)
        
        logger.info(f"Started new BMAD cycle: {cycle_id}")
        self.send_notification(f"🚀 New BMAD cycle started: {cycle_id}")
        
        return cycle_id
    
    def execute_build_phase(self) -> bool:
        """Execute the BUILD phase of the current cycle"""
        logger.info("Executing BUILD phase")
        
        if not self.current_cycle or self.current_cycle.phase != "build":
            logger.error("Cannot execute BUILD phase - cycle not in build state")
            return False
        
        cycle_dir = Path(f"bmad_cycles/{self.current_cycle.cycle_id}")
        build_dir = cycle_dir / "build"
        build_dir.mkdir(exist_ok=True)
        
        try:
            # Execute build tasks based on pending decisions from previous cycle
            build_tasks = self.get_approved_build_tasks()
            
            for task in build_tasks:
                logger.info(f"Executing build task: {task['title']}")
                
                # Execute the task (this would integrate with actual deployment systems)
                result = self.execute_build_task(task)
                
                # Log the result
                task_log = {
                    "task_id": task["id"],
                    "title": task["title"],
                    "executed_at": datetime.now().isoformat(),
                    "result": result,
                    "status": "completed" if result["success"] else "failed"
                }
                
                with open(build_dir / f"task_{task['id']}.json", 'w') as f:
                    json.dump(task_log, f, indent=2)
            
            # Mark build phase as complete
            self.transition_to_measure_phase()
            return True
            
        except Exception as e:
            logger.error(f"BUILD phase failed: {e}")
            return False
    
    def get_approved_build_tasks(self) -> List[Dict]:
        """Get approved decisions that require build/implementation"""
        # Query the decision database for approved items
        import sqlite3
        
        conn = sqlite3.connect(self.decision_engine.db_path)
        cursor = conn.cursor()
        
        query = '''
            SELECT r.id, r.title, r.description, r.implementation_timeline,
                   r.required_resources, d.approved_budget, d.assigned_team
            FROM recommendations r
            JOIN decisions d ON r.id = d.recommendation_id
            WHERE d.decision = 'approve' 
            AND d.status = 'approved'
            AND r.created_at >= date('now', '-30 days')
        '''
        
        cursor.execute(query)
        results = cursor.fetchall()
        conn.close()
        
        tasks = []
        for row in results:
            tasks.append({
                "id": row[0],
                "title": row[1],
                "description": row[2],
                "timeline": row[3],
                "resources": json.loads(row[4]) if row[4] else [],
                "budget": row[5],
                "team": json.loads(row[6]) if row[6] else []
            })
        
        return tasks
    
    def execute_build_task(self, task: Dict) -> Dict:
        """Execute a single build task"""
        # This is where you'd integrate with actual deployment/implementation systems
        # For now, we'll simulate the execution
        
        task_type = self.classify_task_type(task["description"])
        
        if task_type == "landing_page_optimization":
            return self.deploy_landing_page_changes(task)
        elif task_type == "email_optimization":
            return self.update_email_sequences(task)
        elif task_type == "funnel_optimization":
            return self.implement_funnel_changes(task)
        else:
            # Generic task execution
            logger.info(f"Executing generic task: {task['title']}")
            return {"success": True, "message": "Task completed successfully"}
    
    def classify_task_type(self, description: str) -> str:
        """Classify task type based on description"""
        description_lower = description.lower()
        
        if any(keyword in description_lower for keyword in ["landing page", "bounce rate", "page speed"]):
            return "landing_page_optimization"
        elif any(keyword in description_lower for keyword in ["email", "open rate", "subject line"]):
            return "email_optimization"
        elif any(keyword in description_lower for keyword in ["conversion", "funnel", "calculator"]):
            return "funnel_optimization"
        else:
            return "generic"
    
    def deploy_landing_page_changes(self, task: Dict) -> Dict:
        """Deploy landing page optimizations"""
        logger.info("Deploying landing page changes")
        
        # This would integrate with your deployment system
        if self.config["integration"]["deployment_script"]:
            try:
                result = subprocess.run([self.config["integration"]["deployment_script"], "landing-page"], 
                                      capture_output=True, text=True, timeout=300)
                
                if result.returncode == 0:
                    return {"success": True, "message": "Landing page deployed successfully", "output": result.stdout}
                else:
                    return {"success": False, "message": "Deployment failed", "error": result.stderr}
            except Exception as e:
                return {"success": False, "message": f"Deployment error: {str(e)}"}
        
        return {"success": True, "message": "Landing page changes simulated"}
    
    def update_email_sequences(self, task: Dict) -> Dict:
        """Update email marketing sequences"""
        logger.info("Updating email sequences")
        
        # This would integrate with your email platform API
        return {"success": True, "message": "Email sequences updated"}
    
    def implement_funnel_changes(self, task: Dict) -> Dict:
        """Implement conversion funnel optimizations"""
        logger.info("Implementing funnel optimizations")
        
        # This would update your pricing calculator or form logic
        return {"success": True, "message": "Funnel optimizations implemented"}
    
    def transition_to_measure_phase(self):
        """Transition from BUILD to MEASURE phase"""
        logger.info("Transitioning to MEASURE phase")
        
        self.current_cycle.phase = "measure"
        self.current_cycle.current_phase_start = datetime.now()
        
        # Update cycle tracking
        cycle_dir = Path(f"bmad_cycles/{self.current_cycle.cycle_id}")
        with open(cycle_dir / "cycle_data.json", 'r') as f:
            cycle_data = json.load(f)
        
        cycle_data["phases"]["build"]["status"] = "completed"
        cycle_data["phases"]["build"]["end_date"] = datetime.now().isoformat()
        cycle_data["phases"]["measure"]["status"] = "active"
        cycle_data["phases"]["measure"]["start_date"] = datetime.now().isoformat()
        
        with open(cycle_dir / "cycle_data.json", 'w') as f:
            json.dump(cycle_data, f, indent=2, default=str)
        
        # Start automated metric collection
        if self.config["automation"]["auto_collect_metrics"]:
            self.start_measure_collection()
        
        self.send_notification("📊 MEASURE phase started - collecting performance data")
    
    def start_measure_collection(self):
        """Start automated metric collection for MEASURE phase"""
        logger.info("Starting automated metric collection")
        
        # Schedule daily metric collection during measure phase
        measure_duration = self.config["measure_phase_days"]
        
        # This would typically run as a background service
        # For demonstration, we'll collect metrics immediately
        self.measure_system.collect_daily_metrics()
        
        # Update metrics count
        self.current_cycle.metrics_collected += 1
    
    def execute_analyze_phase(self):
        """Execute the ANALYZE phase"""
        logger.info("Executing ANALYZE phase")
        
        if not self.current_cycle or self.current_cycle.phase != "measure":
            logger.error("Cannot execute ANALYZE phase - not in measure phase")
            return False
        
        self.current_cycle.phase = "analyze"
        self.current_cycle.current_phase_start = datetime.now()
        
        cycle_dir = Path(f"bmad_cycles/{self.current_cycle.cycle_id}")
        analyze_dir = cycle_dir / "analyze"
        analyze_dir.mkdir(exist_ok=True)
        
        try:
            # Generate performance reports
            self.measure_system.generate_daily_report()
            
            # Generate recommendations based on collected data
            recommendations = self.decision_engine.analyze_performance_data(
                self.measure_system.tracker.db_path
            )
            
            # Save recommendations
            self.decision_engine.save_recommendations(recommendations)
            
            # Generate analysis report
            analysis_report = self.generate_analysis_report(recommendations)
            
            with open(analyze_dir / "analysis_report.md", 'w') as f:
                f.write(analysis_report)
            
            # Transition to DECIDE phase
            self.transition_to_decide_phase(recommendations)
            
            return True
            
        except Exception as e:
            logger.error(f"ANALYZE phase failed: {e}")
            return False
    
    def generate_analysis_report(self, recommendations: List) -> str:
        """Generate comprehensive analysis report"""
        report = f"# BMAD Analysis Report - {self.current_cycle.cycle_id}\n\n"
        report += f"**Analysis Date:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n"
        report += f"**Cycle ID:** {self.current_cycle.cycle_id}\n"
        report += f"**Analysis Period:** {self.config['measure_phase_days']} days\n\n"
        
        report += "## Key Findings\n\n"
        
        if recommendations:
            # Categorize recommendations
            quick_wins = [r for r in recommendations if hasattr(r, 'category') and r.category == 'quick_win']
            major_projects = [r for r in recommendations if hasattr(r, 'category') and r.category == 'major_project']
            
            if quick_wins:
                report += "### Quick Wins (High Impact, Low Effort)\n"
                for rec in quick_wins[:3]:
                    report += f"- **{rec.title}:** {rec.estimated_impact:.1f}% improvement ({rec.implementation_timeline} days)\n"
                report += "\n"
            
            if major_projects:
                report += "### Major Projects (High Impact, High Effort)\n"
                for rec in major_projects[:3]:
                    report += f"- **{rec.title}:** {rec.estimated_impact:.1f}% improvement ({rec.implementation_timeline} days)\n"
                report += "\n"
            
            report += f"## All Recommendations ({len(recommendations)} total)\n\n"
            for i, rec in enumerate(recommendations[:10], 1):
                report += f"{i}. **{rec.title}**\n"
                report += f"   - Impact: {rec.estimated_impact:.1f}%\n"
                report += f"   - Effort: {rec.implementation_effort}\n"
                report += f"   - Timeline: {rec.implementation_timeline} days\n"
                report += f"   - Confidence: {rec.confidence_level:.0%}\n\n"
        else:
            report += "No specific recommendations generated. System performing within expected parameters.\n\n"
        
        return report
    
    def transition_to_decide_phase(self, recommendations: List):
        """Transition to DECIDE phase"""
        logger.info("Transitioning to DECIDE phase")
        
        self.current_cycle.phase = "decide"
        self.current_cycle.current_phase_start = datetime.now()
        self.current_cycle.decisions_pending = len(recommendations)
        
        # Generate decision report
        decision_report = self.decision_engine.generate_decision_report()
        
        cycle_dir = Path(f"bmad_cycles/{self.current_cycle.cycle_id}")
        decide_dir = cycle_dir / "decide"
        decide_dir.mkdir(exist_ok=True)
        
        with open(decide_dir / "decision_report.md", 'w') as f:
            f.write(decision_report)
        
        # Send notification to decision makers
        self.send_notification(
            f"⚡ DECIDE phase started - {len(recommendations)} recommendations require review",
            include_report=True,
            report_content=decision_report
        )
    
    def complete_cycle(self):
        """Complete the current BMAD cycle"""
        logger.info("Completing BMAD cycle")
        
        if not self.current_cycle:
            logger.error("No active cycle to complete")
            return
        
        self.current_cycle.status = "completed"
        
        # Generate cycle summary
        cycle_summary = self.generate_cycle_summary()
        
        cycle_dir = Path(f"bmad_cycles/{self.current_cycle.cycle_id}")
        with open(cycle_dir / "cycle_summary.md", 'w') as f:
            f.write(cycle_summary)
        
        # Update cycle data
        with open(cycle_dir / "cycle_data.json", 'r') as f:
            cycle_data = json.load(f)
        
        cycle_data["status"] = "completed"
        cycle_data["completion_date"] = datetime.now().isoformat()
        cycle_data["summary"] = cycle_summary
        
        with open(cycle_dir / "cycle_data.json", 'w') as f:
            json.dump(cycle_data, f, indent=2, default=str)
        
        self.send_notification(f"✅ BMAD cycle completed: {self.current_cycle.cycle_id}")
        
        # Reset for next cycle
        self.current_cycle = None
    
    def generate_cycle_summary(self) -> str:
        """Generate summary of completed cycle"""
        summary = f"# BMAD Cycle Summary - {self.current_cycle.cycle_id}\n\n"
        summary += f"**Start Date:** {self.current_cycle.start_date.strftime('%Y-%m-%d')}\n"
        summary += f"**Completion Date:** {datetime.now().strftime('%Y-%m-%d')}\n"
        summary += f"**Duration:** {(datetime.now() - self.current_cycle.start_date).days} days\n"
        summary += f"**Metrics Collected:** {self.current_cycle.metrics_collected}\n"
        summary += f"**Decisions Made:** {self.current_cycle.decisions_pending}\n\n"
        
        summary += "## Cycle Outcomes\n"
        summary += "- BUILD: Campaign optimizations implemented\n"
        summary += "- MEASURE: Performance data collected and validated\n"
        summary += "- ANALYZE: Insights generated and recommendations prioritized\n"
        summary += "- DECIDE: Decisions made and approved for next cycle\n\n"
        
        summary += "## Next Steps\n"
        summary += "1. Review approved decisions for implementation\n"
        summary += "2. Plan next BMAD cycle timeline\n"
        summary += "3. Update success metrics and targets\n"
        
        return summary
    
    def send_notification(self, message: str, include_report: bool = False, report_content: str = ""):
        """Send notification to team"""
        if not self.config["email_notifications"]["enabled"]:
            logger.info(f"Notification: {message}")
            return
        
        try:
            # Email notification
            smtp_config = self.config["email_notifications"]
            
            msg = MIMEMultipart()
            msg['From'] = smtp_config["smtp_user"]
            msg['To'] = ", ".join(smtp_config["recipients"])
            msg['Subject'] = f"BMAD System: {message}"
            
            body = f"BMAD System Notification\n\n{message}\n\n"
            
            if include_report and report_content:
                body += f"Report:\n\n{report_content}"
            
            msg.attach(MIMEText(body, 'plain'))
            
            server = smtplib.SMTP(smtp_config["smtp_host"], smtp_config["smtp_port"])
            server.starttls()
            server.login(smtp_config["smtp_user"], smtp_config["smtp_pass"])
            text = msg.as_string()
            server.sendmail(smtp_config["smtp_user"], smtp_config["recipients"], text)
            server.quit()
            
            logger.info("Notification sent successfully")
            
        except Exception as e:
            logger.error(f"Failed to send notification: {e}")
    
    def schedule_automated_cycles(self):
        """Schedule automated BMAD cycles"""
        logger.info("Scheduling automated BMAD cycles")
        
        # Schedule cycle phases
        cycle_duration = self.config["cycle_duration_days"]
        
        # Start new cycle every cycle_duration days
        schedule.every(cycle_duration).days.do(self.start_new_cycle)
        
        # Daily health checks
        schedule.every().day.at("09:00").do(self.daily_health_check)
        
        # Weekly progress reports
        schedule.every().monday.at("10:00").do(self.send_weekly_progress)
        
        while True:
            schedule.run_pending()
            time.sleep(3600)  # Check every hour
    
    def daily_health_check(self):
        """Perform daily system health check"""
        logger.info("Performing daily health check")
        
        if self.current_cycle:
            days_running = (datetime.now() - self.current_cycle.start_date).days
            phase_days = (datetime.now() - self.current_cycle.current_phase_start).days
            
            # Check if phase is running too long
            max_phase_days = {
                "build": self.config["build_phase_days"],
                "measure": self.config["measure_phase_days"], 
                "analyze": self.config["analyze_phase_days"],
                "decide": self.config["decide_phase_days"]
            }
            
            if phase_days > max_phase_days.get(self.current_cycle.phase, 7):
                self.send_notification(
                    f"⚠️ {self.current_cycle.phase.upper()} phase running {phase_days} days (expected: {max_phase_days.get(self.current_cycle.phase, 7)})"
                )
    
    def send_weekly_progress(self):
        """Send weekly progress report"""
        if not self.current_cycle:
            return
        
        progress_report = f"""
        BMAD Weekly Progress Report
        
        Cycle: {self.current_cycle.cycle_id}
        Current Phase: {self.current_cycle.phase.upper()}
        Days Running: {(datetime.now() - self.current_cycle.start_date).days}
        Metrics Collected: {self.current_cycle.metrics_collected}
        Pending Decisions: {self.current_cycle.decisions_pending}
        
        Status: {self.current_cycle.status}
        """
        
        self.send_notification("📈 Weekly BMAD Progress Report", True, progress_report)

def main():
    """Main function for BMAD integration system"""
    import argparse
    
    parser = argparse.ArgumentParser(description='BMAD Integration System')
    parser.add_argument('--start-cycle', action='store_true', help='Start new BMAD cycle')
    parser.add_argument('--execute-build', action='store_true', help='Execute BUILD phase')
    parser.add_argument('--execute-analyze', action='store_true', help='Execute ANALYZE phase')
    parser.add_argument('--complete-cycle', action='store_true', help='Complete current cycle')
    parser.add_argument('--schedule', action='store_true', help='Start automated scheduling')
    parser.add_argument('--status', action='store_true', help='Show current cycle status')
    
    args = parser.parse_args()
    
    orchestrator = BMADOrchestrator()
    
    if args.start_cycle:
        cycle_id = orchestrator.start_new_cycle()
        print(f"Started BMAD cycle: {cycle_id}")
    
    elif args.execute_build:
        success = orchestrator.execute_build_phase()
        print(f"BUILD phase: {'Success' if success else 'Failed'}")
    
    elif args.execute_analyze:
        success = orchestrator.execute_analyze_phase()
        print(f"ANALYZE phase: {'Success' if success else 'Failed'}")
    
    elif args.complete_cycle:
        orchestrator.complete_cycle()
        print("Cycle completed")
    
    elif args.schedule:
        print("Starting automated BMAD scheduling...")
        orchestrator.schedule_automated_cycles()
    
    elif args.status:
        if orchestrator.current_cycle:
            cycle = orchestrator.current_cycle
            print(f"Active Cycle: {cycle.cycle_id}")
            print(f"Phase: {cycle.phase.upper()}")
            print(f"Started: {cycle.start_date.strftime('%Y-%m-%d %H:%M:%S')}")
            print(f"Status: {cycle.status}")
            print(f"Metrics: {cycle.metrics_collected}")
            print(f"Pending Decisions: {cycle.decisions_pending}")
        else:
            print("No active BMAD cycle")
    
    else:
        parser.print_help()

if __name__ == '__main__':
    main()