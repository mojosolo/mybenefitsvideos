#!/usr/bin/env python3
"""
BMAD Decide Phase Workflow System
Decision-making framework and automation for campaign optimization
"""

import json
import sqlite3
import pandas as pd
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any, Tuple
from dataclasses import dataclass, asdict
from enum import Enum
import logging
from pathlib import Path
import numpy as np

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class DecisionType(Enum):
    TACTICAL_OPTIMIZATION = "tactical_optimization"
    STRATEGIC_PIVOT = "strategic_pivot"
    RESOURCE_ALLOCATION = "resource_allocation"
    CAMPAIGN_EXPANSION = "campaign_expansion"
    EMERGENCY_RESPONSE = "emergency_response"

class Priority(Enum):
    CRITICAL = 1
    HIGH = 2
    MEDIUM = 3
    LOW = 4

class ImplementationStatus(Enum):
    PENDING_APPROVAL = "pending_approval"
    APPROVED = "approved"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

@dataclass
class DecisionRecommendation:
    """Single decision recommendation from analysis"""
    id: str
    title: str
    description: str
    decision_type: DecisionType
    priority: Priority
    estimated_impact: float  # Expected percentage improvement
    confidence_level: float  # 0.0 to 1.0
    implementation_effort: str  # "low", "medium", "high"
    implementation_timeline: int  # Days to implement
    required_resources: List[str]
    success_metrics: List[str]
    risk_factors: List[str]
    supporting_data: Dict[str, Any]
    created_at: datetime
    created_by: str

@dataclass
class DecisionRecord:
    """Record of a decision made and its implementation"""
    recommendation_id: str
    decision: str  # "approve", "reject", "modify", "defer"
    decision_rationale: str
    approved_budget: float
    assigned_team: List[str]
    target_completion: datetime
    success_criteria: List[str]
    decision_maker: str
    decision_date: datetime
    status: ImplementationStatus
    actual_impact: Optional[float] = None
    lessons_learned: Optional[str] = None

class DecisionMatrix:
    """Impact vs Effort decision matrix for prioritization"""
    
    @staticmethod
    def calculate_priority_score(impact: float, effort: str, confidence: float) -> float:
        """Calculate priority score based on impact, effort, and confidence"""
        effort_weights = {"low": 1.0, "medium": 0.7, "high": 0.4}
        effort_weight = effort_weights.get(effort.lower(), 0.5)
        
        # Priority Score = (Impact × Confidence × Effort_Weight) × 100
        return (impact * confidence * effort_weight) * 100
    
    @staticmethod
    def categorize_decision(impact: float, effort: str) -> str:
        """Categorize decision based on impact and effort"""
        effort_numeric = {"low": 1, "medium": 2, "high": 3}
        effort_score = effort_numeric.get(effort.lower(), 2)
        
        if impact >= 20 and effort_score <= 2:
            return "quick_win"
        elif impact >= 20 and effort_score == 3:
            return "major_project"
        elif impact < 20 and effort_score <= 2:
            return "fill_in"
        else:
            return "thankless_task"

class DecisionEngine:
    """Main decision-making engine for BMAD system"""
    
    def __init__(self, db_path: str = "bmad_decisions.db"):
        self.db_path = db_path
        self.init_database()
    
    def init_database(self):
        """Initialize database for decision tracking"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Recommendations table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS recommendations (
                id TEXT PRIMARY KEY,
                title TEXT,
                description TEXT,
                decision_type TEXT,
                priority INTEGER,
                estimated_impact REAL,
                confidence_level REAL,
                implementation_effort TEXT,
                implementation_timeline INTEGER,
                required_resources TEXT,
                success_metrics TEXT,
                risk_factors TEXT,
                supporting_data TEXT,
                created_at DATETIME,
                created_by TEXT
            )
        ''')
        
        # Decisions table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS decisions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                recommendation_id TEXT,
                decision TEXT,
                decision_rationale TEXT,
                approved_budget REAL,
                assigned_team TEXT,
                target_completion DATETIME,
                success_criteria TEXT,
                decision_maker TEXT,
                decision_date DATETIME,
                status TEXT,
                actual_impact REAL,
                lessons_learned TEXT,
                FOREIGN KEY (recommendation_id) REFERENCES recommendations (id)
            )
        ''')
        
        # Decision criteria weights table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS decision_criteria (
                criteria_name TEXT PRIMARY KEY,
                weight REAL,
                description TEXT,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        conn.commit()
        conn.close()
        logger.info("Decision database initialized")
    
    def analyze_performance_data(self, metrics_db_path: str) -> List[DecisionRecommendation]:
        """Analyze performance data and generate recommendations"""
        logger.info("Analyzing performance data for decision recommendations")
        
        # Connect to metrics database
        conn = sqlite3.connect(metrics_db_path)
        
        # Get recent performance data
        query = '''
            SELECT metric_name, metric_value, timestamp, source
            FROM metrics 
            WHERE timestamp >= date('now', '-30 days')
            ORDER BY timestamp DESC
        '''
        
        df = pd.read_sql_query(query, conn)
        conn.close()
        
        if df.empty:
            logger.warning("No recent metrics data found")
            return []
        
        recommendations = []
        
        # Analyze conversion funnel performance
        funnel_recommendations = self._analyze_conversion_funnel(df)
        recommendations.extend(funnel_recommendations)
        
        # Analyze traffic quality
        traffic_recommendations = self._analyze_traffic_quality(df)
        recommendations.extend(traffic_recommendations)
        
        # Analyze email performance
        email_recommendations = self._analyze_email_performance(df)
        recommendations.extend(email_recommendations)
        
        # Analyze sales pipeline
        sales_recommendations = self._analyze_sales_performance(df)
        recommendations.extend(sales_recommendations)
        
        # Prioritize recommendations
        recommendations = self._prioritize_recommendations(recommendations)
        
        return recommendations
    
    def _analyze_conversion_funnel(self, df: pd.DataFrame) -> List[DecisionRecommendation]:
        """Analyze conversion funnel for optimization opportunities"""
        recommendations = []
        
        # Get funnel metrics
        funnel_metrics = df[df['metric_name'].str.startswith('funnel_')]
        
        if funnel_metrics.empty:
            return recommendations
        
        # Calculate conversion rates between stages
        latest_data = funnel_metrics.groupby('metric_name')['metric_value'].last()
        
        funnel_stages = [
            'funnel_landing_page_views',
            'funnel_calculator_starts', 
            'funnel_calculator_completions',
            'funnel_form_submissions',
            'funnel_proposal_requests'
        ]
        
        conversion_rates = {}
        for i in range(len(funnel_stages) - 1):
            current_stage = funnel_stages[i]
            next_stage = funnel_stages[i + 1]
            
            if current_stage in latest_data and next_stage in latest_data:
                current_value = latest_data[current_stage]
                next_value = latest_data[next_stage]
                
                if current_value > 0:
                    conversion_rate = (next_value / current_value) * 100
                    conversion_rates[f"{current_stage}_to_{next_stage}"] = conversion_rate
        
        # Identify low-performing stages
        funnel_benchmarks = {
            'funnel_landing_page_views_to_funnel_calculator_starts': 25.0,  # 25% start calculator
            'funnel_calculator_starts_to_funnel_calculator_completions': 60.0,  # 60% complete
            'funnel_calculator_completions_to_funnel_form_submissions': 25.0,  # 25% submit
            'funnel_form_submissions_to_funnel_proposal_requests': 95.0  # 95% get proposal
        }
        
        for stage_conversion, actual_rate in conversion_rates.items():
            benchmark = funnel_benchmarks.get(stage_conversion, 0)
            
            if actual_rate < benchmark * 0.8:  # More than 20% below benchmark
                stage_name = stage_conversion.replace('funnel_', '').replace('_to_funnel_', ' → ')
                
                recommendations.append(DecisionRecommendation(
                    id=f"funnel_optimization_{stage_conversion}",
                    title=f"Optimize {stage_name} Conversion",
                    description=f"Current conversion rate ({actual_rate:.1f}%) is significantly below benchmark ({benchmark:.1f}%). Implement A/B tests and user experience improvements.",
                    decision_type=DecisionType.TACTICAL_OPTIMIZATION,
                    priority=Priority.HIGH,
                    estimated_impact=15.0,  # 15% improvement in overall conversion
                    confidence_level=0.8,
                    implementation_effort="medium",
                    implementation_timeline=14,
                    required_resources=["UX Designer", "Developer", "Marketing Manager"],
                    success_metrics=[f"Increase {stage_name} conversion to {benchmark:.1f}%"],
                    risk_factors=["May initially decrease conversion during testing"],
                    supporting_data={
                        "current_rate": actual_rate,
                        "benchmark": benchmark,
                        "improvement_needed": benchmark - actual_rate
                    },
                    created_at=datetime.now(),
                    created_by="DecisionEngine"
                ))
        
        return recommendations
    
    def _analyze_traffic_quality(self, df: pd.DataFrame) -> List[DecisionRecommendation]:
        """Analyze traffic quality and source effectiveness"""
        recommendations = []
        
        # Get traffic metrics
        traffic_metrics = df[df['metric_name'].str.startswith('ga4_')]
        
        if traffic_metrics.empty:
            return recommendations
        
        # Analyze bounce rate
        bounce_rate_data = traffic_metrics[traffic_metrics['metric_name'] == 'ga4_bounce_rate']
        if not bounce_rate_data.empty:
            latest_bounce_rate = bounce_rate_data['metric_value'].iloc[-1]
            
            if latest_bounce_rate > 60:  # High bounce rate
                recommendations.append(DecisionRecommendation(
                    id="reduce_bounce_rate",
                    title="Reduce High Bounce Rate",
                    description=f"Bounce rate ({latest_bounce_rate:.1f}%) indicates visitors aren't finding what they expect. Improve landing page relevance and page load speed.",
                    decision_type=DecisionType.TACTICAL_OPTIMIZATION,
                    priority=Priority.HIGH,
                    estimated_impact=12.0,
                    confidence_level=0.85,
                    implementation_effort="medium",
                    implementation_timeline=10,
                    required_resources=["Content Writer", "UX Designer", "Developer"],
                    success_metrics=["Reduce bounce rate below 50%"],
                    risk_factors=["Changes may initially impact SEO rankings"],
                    supporting_data={"current_bounce_rate": latest_bounce_rate},
                    created_at=datetime.now(),
                    created_by="DecisionEngine"
                ))
        
        return recommendations
    
    def _analyze_email_performance(self, df: pd.DataFrame) -> List[DecisionRecommendation]:
        """Analyze email marketing performance"""
        recommendations = []
        
        email_metrics = df[df['metric_name'].str.startswith('email_')]
        
        if email_metrics.empty:
            return recommendations
        
        # Analyze open rates
        open_rate_data = email_metrics[email_metrics['metric_name'] == 'email_open_rate']
        if not open_rate_data.empty:
            latest_open_rate = open_rate_data['metric_value'].iloc[-1]
            
            if latest_open_rate < 30:  # Low open rate
                recommendations.append(DecisionRecommendation(
                    id="improve_email_open_rates",
                    title="Improve Email Open Rates",
                    description=f"Open rate ({latest_open_rate:.1f}%) is below industry average. Test subject lines, sender names, and send times.",
                    decision_type=DecisionType.TACTICAL_OPTIMIZATION,
                    priority=Priority.MEDIUM,
                    estimated_impact=8.0,
                    confidence_level=0.75,
                    implementation_effort="low",
                    implementation_timeline=7,
                    required_resources=["Email Marketing Specialist"],
                    success_metrics=["Increase open rate above 35%"],
                    risk_factors=["Subject line changes may temporarily confuse subscribers"],
                    supporting_data={"current_open_rate": latest_open_rate},
                    created_at=datetime.now(),
                    created_by="DecisionEngine"
                ))
        
        return recommendations
    
    def _analyze_sales_performance(self, df: pd.DataFrame) -> List[DecisionRecommendation]:
        """Analyze sales pipeline performance"""
        recommendations = []
        
        crm_metrics = df[df['metric_name'].str.startswith('crm_')]
        
        if crm_metrics.empty:
            return recommendations
        
        # Analyze lead conversion
        leads_data = crm_metrics[crm_metrics['metric_name'] == 'crm_leads_created']
        qualified_data = crm_metrics[crm_metrics['metric_name'] == 'crm_leads_qualified']
        
        if not leads_data.empty and not qualified_data.empty:
            latest_leads = leads_data['metric_value'].iloc[-1]
            latest_qualified = qualified_data['metric_value'].iloc[-1]
            
            if latest_leads > 0:
                qualification_rate = (latest_qualified / latest_leads) * 100
                
                if qualification_rate < 60:  # Low qualification rate
                    recommendations.append(DecisionRecommendation(
                        id="improve_lead_qualification",
                        title="Improve Lead Qualification Process",
                        description=f"Lead qualification rate ({qualification_rate:.1f}%) suggests targeting issues. Refine ideal customer profile and qualification criteria.",
                        decision_type=DecisionType.STRATEGIC_PIVOT,
                        priority=Priority.HIGH,
                        estimated_impact=20.0,
                        confidence_level=0.7,
                        implementation_effort="medium",
                        implementation_timeline=21,
                        required_resources=["Sales Manager", "Marketing Manager", "Data Analyst"],
                        success_metrics=["Increase qualification rate above 70%"],
                        risk_factors=["May temporarily reduce lead volume"],
                        supporting_data={
                            "total_leads": latest_leads,
                            "qualified_leads": latest_qualified,
                            "qualification_rate": qualification_rate
                        },
                        created_at=datetime.now(),
                        created_by="DecisionEngine"
                    ))
        
        return recommendations
    
    def _prioritize_recommendations(self, recommendations: List[DecisionRecommendation]) -> List[DecisionRecommendation]:
        """Prioritize recommendations using decision matrix"""
        for rec in recommendations:
            rec.priority_score = DecisionMatrix.calculate_priority_score(
                rec.estimated_impact,
                rec.implementation_effort,
                rec.confidence_level
            )
            rec.category = DecisionMatrix.categorize_decision(
                rec.estimated_impact,
                rec.implementation_effort
            )
        
        # Sort by priority score (highest first)
        return sorted(recommendations, key=lambda x: x.priority_score, reverse=True)
    
    def save_recommendations(self, recommendations: List[DecisionRecommendation]):
        """Save recommendations to database"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        for rec in recommendations:
            cursor.execute('''
                INSERT OR REPLACE INTO recommendations
                (id, title, description, decision_type, priority, estimated_impact, 
                 confidence_level, implementation_effort, implementation_timeline,
                 required_resources, success_metrics, risk_factors, supporting_data,
                 created_at, created_by)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                rec.id, rec.title, rec.description, rec.decision_type.value, rec.priority.value,
                rec.estimated_impact, rec.confidence_level, rec.implementation_effort,
                rec.implementation_timeline, json.dumps(rec.required_resources),
                json.dumps(rec.success_metrics), json.dumps(rec.risk_factors),
                json.dumps(rec.supporting_data), rec.created_at, rec.created_by
            ))
        
        conn.commit()
        conn.close()
        logger.info(f"Saved {len(recommendations)} recommendations to database")
    
    def make_decision(self, recommendation_id: str, decision: str, rationale: str,
                     decision_maker: str, approved_budget: float = 0,
                     assigned_team: List[str] = None, 
                     target_completion: datetime = None) -> DecisionRecord:
        """Record a decision on a recommendation"""
        
        if assigned_team is None:
            assigned_team = []
        
        if target_completion is None:
            target_completion = datetime.now() + timedelta(days=30)
        
        # Get recommendation details
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('SELECT * FROM recommendations WHERE id = ?', (recommendation_id,))
        rec_data = cursor.fetchone()
        
        if not rec_data:
            raise ValueError(f"Recommendation {recommendation_id} not found")
        
        # Determine initial status
        if decision == "approve":
            status = ImplementationStatus.APPROVED
        elif decision == "reject":
            status = ImplementationStatus.CANCELLED
        else:
            status = ImplementationStatus.PENDING_APPROVAL
        
        # Create decision record
        decision_record = DecisionRecord(
            recommendation_id=recommendation_id,
            decision=decision,
            decision_rationale=rationale,
            approved_budget=approved_budget,
            assigned_team=assigned_team,
            target_completion=target_completion,
            success_criteria=json.loads(rec_data[11]),  # success_metrics from recommendation
            decision_maker=decision_maker,
            decision_date=datetime.now(),
            status=status
        )
        
        # Save to database
        cursor.execute('''
            INSERT INTO decisions
            (recommendation_id, decision, decision_rationale, approved_budget,
             assigned_team, target_completion, success_criteria, decision_maker,
             decision_date, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            decision_record.recommendation_id, decision_record.decision,
            decision_record.decision_rationale, decision_record.approved_budget,
            json.dumps(decision_record.assigned_team), decision_record.target_completion,
            json.dumps(decision_record.success_criteria), decision_record.decision_maker,
            decision_record.decision_date, decision_record.status.value
        ))
        
        conn.commit()
        conn.close()
        
        logger.info(f"Decision recorded: {decision} for recommendation {recommendation_id}")
        return decision_record
    
    def generate_decision_report(self) -> str:
        """Generate decision summary report"""
        conn = sqlite3.connect(self.db_path)
        
        # Get pending recommendations
        pending_query = '''
            SELECT r.*, COALESCE(d.decision, 'pending') as decision_status
            FROM recommendations r
            LEFT JOIN decisions d ON r.id = d.recommendation_id
            WHERE d.decision IS NULL OR d.decision = 'pending'
            ORDER BY r.estimated_impact DESC
        '''
        
        pending_df = pd.read_sql_query(pending_query, conn)
        
        # Get recent decisions
        decisions_query = '''
            SELECT r.title, d.decision, d.decision_rationale, d.decision_maker, 
                   d.decision_date, d.status, d.target_completion
            FROM decisions d
            JOIN recommendations r ON d.recommendation_id = r.id
            WHERE d.decision_date >= date('now', '-7 days')
            ORDER BY d.decision_date DESC
        '''
        
        decisions_df = pd.read_sql_query(decisions_query, conn)
        conn.close()
        
        # Generate report
        report = f"# BMAD Decision Report - {datetime.now().strftime('%Y-%m-%d')}\n\n"
        
        # Pending Decisions
        report += "## Pending Decisions Requiring Approval\n\n"
        if not pending_df.empty:
            for _, row in pending_df.head(5).iterrows():
                impact_category = DecisionMatrix.categorize_decision(
                    row['estimated_impact'], row['implementation_effort']
                )
                
                report += f"### {row['title']}\n"
                report += f"**Type:** {row['decision_type'].replace('_', ' ').title()}\n"
                report += f"**Impact:** {row['estimated_impact']:.1f}% improvement\n"
                report += f"**Effort:** {row['implementation_effort'].title()}\n"
                report += f"**Timeline:** {row['implementation_timeline']} days\n"
                report += f"**Category:** {impact_category.replace('_', ' ').title()}\n"
                report += f"**Description:** {row['description']}\n\n"
        else:
            report += "No pending decisions.\n\n"
        
        # Recent Decisions
        report += "## Recent Decisions (Last 7 Days)\n\n"
        if not decisions_df.empty:
            for _, row in decisions_df.iterrows():
                report += f"### {row['title']}\n"
                report += f"**Decision:** {row['decision'].title()}\n"
                report += f"**Decision Maker:** {row['decision_maker']}\n"
                report += f"**Date:** {row['decision_date'][:10]}\n"
                report += f"**Status:** {row['status'].replace('_', ' ').title()}\n"
                report += f"**Rationale:** {row['decision_rationale']}\n\n"
        else:
            report += "No recent decisions.\n\n"
        
        return report

def main():
    """Main function for decision workflow system"""
    import argparse
    
    parser = argparse.ArgumentParser(description='BMAD Decision Workflow System')
    parser.add_argument('--analyze', type=str, help='Path to metrics database for analysis')
    parser.add_argument('--report', action='store_true', help='Generate decision report')
    parser.add_argument('--approve', type=str, help='Approve recommendation by ID')
    parser.add_argument('--rationale', type=str, help='Decision rationale')
    parser.add_argument('--decision-maker', type=str, default='System', help='Decision maker name')
    
    args = parser.parse_args()
    
    engine = DecisionEngine()
    
    if args.analyze:
        recommendations = engine.analyze_performance_data(args.analyze)
        engine.save_recommendations(recommendations)
        print(f"Generated {len(recommendations)} recommendations")
        
        for rec in recommendations[:5]:  # Show top 5
            print(f"\n{rec.title}")
            print(f"Impact: {rec.estimated_impact:.1f}% | Effort: {rec.implementation_effort}")
            print(f"Priority Score: {rec.priority_score:.1f}")
    
    elif args.report:
        report = engine.generate_decision_report()
        print(report)
        
        # Save report to file
        report_path = f"reports/decision_report_{datetime.now().strftime('%Y%m%d')}.md"
        Path("reports").mkdir(exist_ok=True)
        with open(report_path, 'w') as f:
            f.write(report)
        print(f"\nReport saved to: {report_path}")
    
    elif args.approve and args.rationale:
        decision = engine.make_decision(
            recommendation_id=args.approve,
            decision="approve",
            rationale=args.rationale,
            decision_maker=args.decision_maker
        )
        print(f"Decision recorded: {decision.decision} for {args.approve}")
    
    else:
        parser.print_help()

if __name__ == '__main__':
    main()