#!/usr/bin/env python3
"""
BMAD Tracking System - Real-time campaign optimization monitoring
"""

import json
import sqlite3
from datetime import datetime, timedelta
from pathlib import Path
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class BMADTracker:
    """Real-time tracking system for BMAD optimization results"""
    
    def __init__(self, db_path: str = "bmad_tracking.db"):
        self.db_path = db_path
        self.init_database()
    
    def init_database(self):
        """Initialize tracking database"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Campaign metrics table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS campaign_metrics (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                metric_name TEXT NOT NULL,
                metric_value REAL NOT NULL,
                optimization_id TEXT,
                source TEXT DEFAULT 'manual',
                notes TEXT
            )
        ''')
        
        # Optimization implementations table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS optimizations (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                implemented_date DATETIME DEFAULT CURRENT_TIMESTAMP,
                expected_impact REAL,
                actual_impact REAL,
                status TEXT DEFAULT 'active',
                notes TEXT
            )
        ''')
        
        # Proposal generation tracking
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS proposal_tracking (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                client_name TEXT,
                package_type TEXT,
                total_value REAL,
                roi_projection REAL,
                proposal_opened BOOLEAN DEFAULT FALSE,
                response_received BOOLEAN DEFAULT FALSE,
                closed_won BOOLEAN DEFAULT FALSE,
                optimization_version TEXT
            )
        ''')
        
        conn.commit()
        conn.close()
        logger.info("BMAD tracking database initialized")
    
    def record_baseline_metrics(self):
        """Record baseline metrics before optimizations"""
        baseline_metrics = [
            ('monthly_sessions', 1250),
            ('unique_users', 980),
            ('bounce_rate', 42.0),
            ('calculator_start_rate', 25.6),
            ('calculator_completion_rate', 56.3),
            ('form_submission_rate', 23.8),
            ('overall_conversion_rate', 3.4),
            ('monthly_leads', 42),
            ('proposal_open_rate', 87.3),
            ('proposal_response_rate', 28.6),
            ('proposal_close_rate', 15.4),
            ('monthly_revenue', 45000),
            ('average_deal_size', 7500),
            ('sales_cycle_days', 21)
        ]
        
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        for metric_name, value in baseline_metrics:
            cursor.execute('''
                INSERT INTO campaign_metrics (metric_name, metric_value, source, notes)
                VALUES (?, ?, 'baseline', 'Pre-optimization baseline')
            ''', (metric_name, value))
        
        conn.commit()
        conn.close()
        
        logger.info(f"Recorded {len(baseline_metrics)} baseline metrics")
    
    def record_optimization(self, opt_id: str, title: str, expected_impact: float, notes: str = ""):
        """Record an optimization implementation"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT OR REPLACE INTO optimizations 
            (id, title, expected_impact, notes)
            VALUES (?, ?, ?, ?)
        ''', (opt_id, title, expected_impact, notes))
        
        conn.commit()
        conn.close()
        
        logger.info(f"Recorded optimization: {title} (Expected: {expected_impact}%)")
    
    def record_proposal_generation(self, client_name: str, package_type: str, 
                                 total_value: float, roi_projection: float,
                                 optimization_version: str = "v1.0"):
        """Record a proposal generation event"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO proposal_tracking 
            (client_name, package_type, total_value, roi_projection, optimization_version)
            VALUES (?, ?, ?, ?, ?)
        ''', (client_name, package_type, total_value, roi_projection, optimization_version))
        
        proposal_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        logger.info(f"Recorded proposal for {client_name}: ${total_value:,} (ROI: {roi_projection:.0f}%)")
        return proposal_id
    
    def update_proposal_status(self, proposal_id: int, opened: bool = None, 
                             responded: bool = None, closed_won: bool = None):
        """Update proposal status tracking"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        updates = []
        params = []
        
        if opened is not None:
            updates.append("proposal_opened = ?")
            params.append(opened)
        
        if responded is not None:
            updates.append("response_received = ?")
            params.append(responded)
        
        if closed_won is not None:
            updates.append("closed_won = ?")
            params.append(closed_won)
        
        if updates:
            query = f"UPDATE proposal_tracking SET {', '.join(updates)} WHERE id = ?"
            params.append(proposal_id)
            
            cursor.execute(query, params)
            conn.commit()
        
        conn.close()
        
        logger.info(f"Updated proposal {proposal_id} status")
    
    def record_current_metric(self, metric_name: str, value: float, optimization_id: str = None):
        """Record a current metric value"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO campaign_metrics (metric_name, metric_value, optimization_id, source)
            VALUES (?, ?, ?, 'live_tracking')
        ''', (metric_name, value, optimization_id))
        
        conn.commit()
        conn.close()
        
        logger.info(f"Recorded metric: {metric_name} = {value}")
    
    def calculate_optimization_impact(self, optimization_id: str, days_back: int = 7):
        """Calculate the actual impact of an optimization"""
        conn = sqlite3.connect(self.db_path)
        
        # Get optimization details
        opt_query = "SELECT title, expected_impact, implemented_date FROM optimizations WHERE id = ?"
        opt_result = conn.execute(opt_query, (optimization_id,)).fetchone()
        
        if not opt_result:
            conn.close()
            return None
        
        title, expected_impact, implemented_date = opt_result
        impl_date = datetime.fromisoformat(implemented_date)
        
        # Calculate before/after metrics
        before_date = impl_date - timedelta(days=days_back)
        after_date = impl_date + timedelta(days=days_back)
        
        # Key metrics to analyze
        key_metrics = [
            'calculator_completion_rate',
            'form_submission_rate', 
            'overall_conversion_rate',
            'proposal_response_rate'
        ]
        
        impact_analysis = {}
        
        for metric in key_metrics:
            # Get before values
            before_query = '''
                SELECT AVG(metric_value) FROM campaign_metrics 
                WHERE metric_name = ? AND timestamp BETWEEN ? AND ?
            '''
            before_avg = conn.execute(before_query, (metric, before_date, impl_date)).fetchone()[0]
            
            # Get after values
            after_query = '''
                SELECT AVG(metric_value) FROM campaign_metrics 
                WHERE metric_name = ? AND timestamp BETWEEN ? AND ?
            '''
            after_avg = conn.execute(after_query, (metric, impl_date, after_date)).fetchone()[0]
            
            if before_avg and after_avg:
                impact_percent = ((after_avg - before_avg) / before_avg) * 100
                impact_analysis[metric] = {
                    'before': before_avg,
                    'after': after_avg,
                    'impact_percent': impact_percent
                }
        
        conn.close()
        
        return {
            'optimization_id': optimization_id,
            'title': title,
            'expected_impact': expected_impact,
            'impact_analysis': impact_analysis,
            'implementation_date': impl_date
        }
    
    def generate_performance_report(self, days_back: int = 30):
        """Generate comprehensive performance report"""
        conn = sqlite3.connect(self.db_path)
        
        # Get recent metrics
        cutoff_date = datetime.now() - timedelta(days=days_back)
        
        metrics_query = '''
            SELECT metric_name, AVG(metric_value) as avg_value, COUNT(*) as data_points
            FROM campaign_metrics 
            WHERE timestamp >= ?
            GROUP BY metric_name
            ORDER BY metric_name
        '''
        
        metrics_data = conn.execute(metrics_query, (cutoff_date,)).fetchall()
        
        # Get proposal performance
        proposal_query = '''
            SELECT COUNT(*) as total_proposals,
                   AVG(total_value) as avg_value,
                   AVG(roi_projection) as avg_roi,
                   SUM(CASE WHEN proposal_opened THEN 1 ELSE 0 END) as opened_count,
                   SUM(CASE WHEN response_received THEN 1 ELSE 0 END) as response_count,
                   SUM(CASE WHEN closed_won THEN 1 ELSE 0 END) as closed_count
            FROM proposal_tracking
            WHERE timestamp >= ?
        '''
        
        proposal_data = conn.execute(proposal_query, (cutoff_date,)).fetchone()
        
        # Get optimization status
        opt_query = '''
            SELECT id, title, expected_impact, implemented_date, status
            FROM optimizations
            ORDER BY implemented_date DESC
        '''
        
        optimization_data = conn.execute(opt_query).fetchall()
        
        conn.close()
        
        # Generate report
        report = f"""
# BMAD Performance Report
**Generated:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
**Period:** Last {days_back} days

## Key Metrics Performance
"""
        
        for metric_name, avg_value, data_points in metrics_data:
            if 'rate' in metric_name or 'bounce' in metric_name:
                report += f"- **{metric_name.replace('_', ' ').title()}:** {avg_value:.1f}% ({data_points} data points)\n"
            elif 'revenue' in metric_name or 'value' in metric_name:
                report += f"- **{metric_name.replace('_', ' ').title()}:** ${avg_value:,.0f} ({data_points} data points)\n"
            else:
                report += f"- **{metric_name.replace('_', ' ').title()}:** {avg_value:.0f} ({data_points} data points)\n"
        
        report += f"""
## Proposal Performance
- **Total Proposals Generated:** {proposal_data[0] or 0}
- **Average Proposal Value:** ${proposal_data[1] or 0:,.0f}
- **Average ROI Projection:** {proposal_data[2] or 0:.0f}%
- **Open Rate:** {(proposal_data[3] or 0) / max(proposal_data[0] or 1, 1) * 100:.1f}%
- **Response Rate:** {(proposal_data[4] or 0) / max(proposal_data[0] or 1, 1) * 100:.1f}%
- **Close Rate:** {(proposal_data[5] or 0) / max(proposal_data[0] or 1, 1) * 100:.1f}%

## Active Optimizations
"""
        
        for opt_id, title, expected_impact, impl_date, status in optimization_data:
            report += f"- **{title}** (Expected: {expected_impact:.0f}%) - {status.title()}\n"
        
        return report
    
    def save_report(self, report_content: str, filename: str = None):
        """Save report to file"""
        if filename is None:
            filename = f"bmad_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.md"
        
        # Create reports directory
        Path("reports").mkdir(exist_ok=True)
        
        with open(f"reports/{filename}", 'w') as f:
            f.write(report_content)
        
        logger.info(f"Report saved: reports/{filename}")
        return f"reports/{filename}"

def main():
    """Initialize BMAD tracking system"""
    import argparse
    
    parser = argparse.ArgumentParser(description='BMAD Tracking System')
    parser.add_argument('--init', action='store_true', help='Initialize with baseline metrics')
    parser.add_argument('--record-optimization', nargs=3, metavar=('ID', 'TITLE', 'IMPACT'), 
                       help='Record optimization: ID TITLE EXPECTED_IMPACT')
    parser.add_argument('--record-metric', nargs=2, metavar=('NAME', 'VALUE'),
                       help='Record metric: NAME VALUE')
    parser.add_argument('--report', action='store_true', help='Generate performance report')
    parser.add_argument('--test-proposal', action='store_true', help='Test proposal tracking')
    
    args = parser.parse_args()
    
    tracker = BMADTracker()
    
    if args.init:
        print("🔄 Initializing BMAD tracking system...")
        tracker.record_baseline_metrics()
        
        # Record our implemented optimizations
        optimizations = [
            ('pricing_calc_opt', 'Pricing Calculator Optimization', 25),
            ('proposal_roi_enhancement', 'Enhanced Proposal ROI Calculations', 35),
            ('landing_page_conversion', 'Landing Page Conversion Optimization', 30)
        ]
        
        for opt_id, title, impact in optimizations:
            tracker.record_optimization(opt_id, title, impact, "BMAD cycle 1 implementation")
        
        print("✅ BMAD tracking system initialized with baseline metrics and optimizations")
    
    elif args.record_optimization:
        opt_id, title, impact = args.record_optimization
        tracker.record_optimization(opt_id, title, float(impact))
        print(f"✅ Recorded optimization: {title}")
    
    elif args.record_metric:
        name, value = args.record_metric
        tracker.record_current_metric(name, float(value))
        print(f"✅ Recorded metric: {name} = {value}")
    
    elif args.test_proposal:
        # Test proposal generation tracking
        proposal_id = tracker.record_proposal_generation(
            "Test Company Inc.",
            "Better Package", 
            6498,
            468,  # ROI from our analysis
            "v1.1"  # Enhanced version with ROI
        )
        
        # Simulate proposal lifecycle
        tracker.update_proposal_status(proposal_id, opened=True)
        tracker.update_proposal_status(proposal_id, responded=True)
        
        print(f"✅ Test proposal tracked: ID {proposal_id}")
    
    elif args.report:
        print("📊 Generating BMAD performance report...")
        report = tracker.generate_performance_report()
        filename = tracker.save_report(report)
        print(f"✅ Report generated: {filename}")
        print("\n" + report)
    
    else:
        parser.print_help()

if __name__ == "__main__":
    main()