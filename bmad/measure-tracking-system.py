#!/usr/bin/env python3
"""
BMAD Measure Phase Tracking System
Comprehensive analytics and KPI monitoring for benefits video campaign
"""

import json
import sqlite3
import pandas as pd
from datetime import datetime, timedelta, timezone
from typing import Dict, List, Optional, Any
import requests
import logging
from dataclasses import dataclass, asdict
from pathlib import Path
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import schedule
import time

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@dataclass
class CampaignMetric:
    """Single campaign metric data point"""
    timestamp: datetime
    metric_name: str
    metric_value: float
    metric_type: str  # 'counter', 'gauge', 'rate'
    source: str  # 'ga4', 'email', 'crm', 'custom'
    dimensions: Dict[str, str]  # Additional context
    campaign_id: str = "benefits_made_simple"

@dataclass
class KPITarget:
    """KPI target definition"""
    metric_name: str
    target_value: float
    target_period: str  # 'daily', 'weekly', 'monthly', 'quarterly'
    alert_threshold: float  # Percentage below target to trigger alert
    improvement_goal: float  # Expected improvement percentage

class MeasureTracker:
    """Main tracking system for BMAD Measure phase"""
    
    def __init__(self, db_path: str = "bmad_metrics.db"):
        self.db_path = db_path
        self.init_database()
        self.kpi_targets = self.load_kpi_targets()
        
    def init_database(self):
        """Initialize SQLite database for metrics storage"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Create metrics table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS metrics (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp DATETIME,
                metric_name TEXT,
                metric_value REAL,
                metric_type TEXT,
                source TEXT,
                dimensions TEXT,
                campaign_id TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Create KPI targets table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS kpi_targets (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                metric_name TEXT UNIQUE,
                target_value REAL,
                target_period TEXT,
                alert_threshold REAL,
                improvement_goal REAL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Create alerts table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS alerts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                alert_type TEXT,
                metric_name TEXT,
                current_value REAL,
                target_value REAL,
                threshold_breached REAL,
                message TEXT,
                resolved BOOLEAN DEFAULT FALSE,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        conn.commit()
        conn.close()
        logger.info("Database initialized successfully")
    
    def load_kpi_targets(self) -> Dict[str, KPITarget]:
        """Load KPI targets from database"""
        conn = sqlite3.connect(self.db_path)
        df = pd.read_sql_query("SELECT * FROM kpi_targets", conn)
        conn.close()
        
        targets = {}
        for _, row in df.iterrows():
            targets[row['metric_name']] = KPITarget(
                metric_name=row['metric_name'],
                target_value=row['target_value'],
                target_period=row['target_period'],
                alert_threshold=row['alert_threshold'],
                improvement_goal=row['improvement_goal']
            )
        
        return targets
    
    def set_kpi_target(self, target: KPITarget):
        """Set or update KPI target"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT OR REPLACE INTO kpi_targets 
            (metric_name, target_value, target_period, alert_threshold, improvement_goal, updated_at)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (
            target.metric_name,
            target.target_value,
            target.target_period,
            target.alert_threshold,
            target.improvement_goal,
            datetime.now()
        ))
        
        conn.commit()
        conn.close()
        
        self.kpi_targets[target.metric_name] = target
        logger.info(f"KPI target set: {target.metric_name} = {target.target_value}")
    
    def record_metric(self, metric: CampaignMetric):
        """Record a single metric data point"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO metrics 
            (timestamp, metric_name, metric_value, metric_type, source, dimensions, campaign_id)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (
            metric.timestamp,
            metric.metric_name,
            metric.metric_value,
            metric.metric_type,
            metric.source,
            json.dumps(metric.dimensions),
            metric.campaign_id
        ))
        
        conn.commit()
        conn.close()
        
        # Check for alerts
        self.check_kpi_alerts(metric)
        
        logger.debug(f"Metric recorded: {metric.metric_name} = {metric.metric_value}")
    
    def record_batch_metrics(self, metrics: List[CampaignMetric]):
        """Record multiple metrics efficiently"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        data = [
            (
                m.timestamp, m.metric_name, m.metric_value, m.metric_type,
                m.source, json.dumps(m.dimensions), m.campaign_id
            )
            for m in metrics
        ]
        
        cursor.executemany('''
            INSERT INTO metrics 
            (timestamp, metric_name, metric_value, metric_type, source, dimensions, campaign_id)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', data)
        
        conn.commit()
        conn.close()
        
        logger.info(f"Batch recorded {len(metrics)} metrics")
    
    def check_kpi_alerts(self, metric: CampaignMetric):
        """Check if metric triggers any KPI alerts"""
        if metric.metric_name not in self.kpi_targets:
            return
        
        target = self.kpi_targets[metric.metric_name]
        threshold_value = target.target_value * (1 - target.alert_threshold / 100)
        
        if metric.metric_value < threshold_value:
            self.create_alert(
                alert_type="kpi_underperformance",
                metric_name=metric.metric_name,
                current_value=metric.metric_value,
                target_value=target.target_value,
                threshold_breached=target.alert_threshold,
                message=f"{metric.metric_name} ({metric.metric_value}) is {target.alert_threshold}% below target ({target.target_value})"
            )
    
    def create_alert(self, alert_type: str, metric_name: str, current_value: float, 
                    target_value: float, threshold_breached: float, message: str):
        """Create an alert in the system"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO alerts 
            (alert_type, metric_name, current_value, target_value, threshold_breached, message)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (alert_type, metric_name, current_value, target_value, threshold_breached, message))
        
        conn.commit()
        conn.close()
        
        logger.warning(f"Alert created: {message}")
        
        # Send alert notification (email, Slack, etc.)
        self.send_alert_notification(alert_type, message)
    
    def send_alert_notification(self, alert_type: str, message: str):
        """Send alert notification via email"""
        # TODO: Implement email notification
        # This would send alerts to the campaign management team
        logger.info(f"Alert notification: {alert_type} - {message}")

class GoogleAnalytics4Connector:
    """Connector for Google Analytics 4 data"""
    
    def __init__(self, property_id: str, credentials_path: str):
        self.property_id = property_id
        self.credentials_path = credentials_path
        # TODO: Initialize GA4 client with service account credentials
    
    def fetch_traffic_metrics(self, start_date: datetime, end_date: datetime) -> List[CampaignMetric]:
        """Fetch traffic and engagement metrics from GA4"""
        metrics = []
        
        # Mock data - replace with actual GA4 API calls
        mock_data = {
            'sessions': 1250,
            'users': 980,
            'page_views': 3840,
            'bounce_rate': 0.42,
            'session_duration': 145.6,
            'conversion_rate': 0.034,
            'goal_completions': 42
        }
        
        timestamp = datetime.now(timezone.utc)
        
        for metric_name, value in mock_data.items():
            metrics.append(CampaignMetric(
                timestamp=timestamp,
                metric_name=f"ga4_{metric_name}",
                metric_value=value,
                metric_type='gauge',
                source='ga4',
                dimensions={'date_range': f"{start_date.date()}_{end_date.date()}"}
            ))
        
        return metrics
    
    def fetch_conversion_funnel(self, start_date: datetime, end_date: datetime) -> List[CampaignMetric]:
        """Fetch conversion funnel metrics"""
        metrics = []
        
        # Mock funnel data
        funnel_data = {
            'landing_page_views': 1250,
            'calculator_starts': 320,
            'calculator_completions': 180,
            'form_submissions': 45,
            'proposal_requests': 42,
            'sales_qualified_leads': 28
        }
        
        timestamp = datetime.now(timezone.utc)
        
        for step, count in funnel_data.items():
            metrics.append(CampaignMetric(
                timestamp=timestamp,
                metric_name=f"funnel_{step}",
                metric_value=count,
                metric_type='counter',
                source='ga4',
                dimensions={'funnel_period': f"{start_date.date()}_{end_date.date()}"}
            ))
        
        return metrics

class EmailPlatformConnector:
    """Connector for email platform analytics (Mailchimp, ConvertKit, etc.)"""
    
    def __init__(self, platform: str, api_key: str):
        self.platform = platform
        self.api_key = api_key
    
    def fetch_email_metrics(self, start_date: datetime, end_date: datetime) -> List[CampaignMetric]:
        """Fetch email campaign performance metrics"""
        metrics = []
        
        # Mock email data
        email_data = {
            'emails_sent': 450,
            'emails_delivered': 442,
            'emails_opened': 154,
            'emails_clicked': 32,
            'unsubscribes': 3,
            'complaints': 0,
            'bounces': 8
        }
        
        timestamp = datetime.now(timezone.utc)
        
        for metric_name, value in email_data.items():
            metrics.append(CampaignMetric(
                timestamp=timestamp,
                metric_name=f"email_{metric_name}",
                metric_value=value,
                metric_type='counter',
                source=self.platform,
                dimensions={'campaign_period': f"{start_date.date()}_{end_date.date()}"}
            ))
        
        # Calculate derived metrics
        open_rate = (email_data['emails_opened'] / email_data['emails_delivered']) * 100
        click_rate = (email_data['emails_clicked'] / email_data['emails_delivered']) * 100
        
        metrics.extend([
            CampaignMetric(
                timestamp=timestamp,
                metric_name="email_open_rate",
                metric_value=open_rate,
                metric_type='rate',
                source=self.platform,
                dimensions={'campaign_period': f"{start_date.date()}_{end_date.date()}"}
            ),
            CampaignMetric(
                timestamp=timestamp,
                metric_name="email_click_rate",
                metric_value=click_rate,
                metric_type='rate',
                source=self.platform,
                dimensions={'campaign_period': f"{start_date.date()}_{end_date.date()}"}
            )
        ])
        
        return metrics

class CRMConnector:
    """Connector for CRM data (HubSpot, Pipedrive, etc.)"""
    
    def __init__(self, platform: str, api_key: str):
        self.platform = platform
        self.api_key = api_key
    
    def fetch_sales_metrics(self, start_date: datetime, end_date: datetime) -> List[CampaignMetric]:
        """Fetch sales pipeline and conversion metrics"""
        metrics = []
        
        # Mock CRM data
        crm_data = {
            'leads_created': 42,
            'leads_qualified': 28,
            'opportunities_created': 18,
            'deals_closed_won': 6,
            'deals_closed_lost': 4,
            'total_revenue': 45000,
            'average_deal_size': 7500,
            'sales_cycle_days': 21
        }
        
        timestamp = datetime.now(timezone.utc)
        
        for metric_name, value in crm_data.items():
            metrics.append(CampaignMetric(
                timestamp=timestamp,
                metric_name=f"crm_{metric_name}",
                metric_value=value,
                metric_type='gauge',
                source=self.platform,
                dimensions={'period': f"{start_date.date()}_{end_date.date()}"}
            ))
        
        return metrics

class BMADMeasureSystem:
    """Main BMAD Measure system coordinator"""
    
    def __init__(self):
        self.tracker = MeasureTracker()
        self.setup_kpi_targets()
        
        # Initialize connectors (would use real credentials in production)
        self.ga4 = GoogleAnalytics4Connector("your-property-id", "path/to/credentials.json")
        self.email = EmailPlatformConnector("mailchimp", "your-api-key")
        self.crm = CRMConnector("hubspot", "your-api-key")
        
    def setup_kpi_targets(self):
        """Initialize KPI targets for the campaign"""
        targets = [
            KPITarget("ga4_sessions", 2000, "monthly", 15, 25),
            KPITarget("ga4_conversion_rate", 3.4, "monthly", 20, 30),
            KPITarget("email_open_rate", 35, "monthly", 10, 15),
            KPITarget("email_click_rate", 7, "monthly", 15, 20),
            KPITarget("crm_leads_created", 50, "monthly", 20, 40),
            KPITarget("crm_deals_closed_won", 8, "monthly", 25, 50),
            KPITarget("crm_total_revenue", 60000, "monthly", 15, 35)
        ]
        
        for target in targets:
            self.tracker.set_kpi_target(target)
    
    def collect_daily_metrics(self):
        """Collect metrics from all sources (run daily)"""
        logger.info("Starting daily metrics collection")
        
        end_date = datetime.now()
        start_date = end_date - timedelta(days=1)
        
        all_metrics = []
        
        try:
            # Collect GA4 metrics
            ga4_traffic = self.ga4.fetch_traffic_metrics(start_date, end_date)
            ga4_funnel = self.ga4.fetch_conversion_funnel(start_date, end_date)
            all_metrics.extend(ga4_traffic + ga4_funnel)
            
            # Collect email metrics
            email_metrics = self.email.fetch_email_metrics(start_date, end_date)
            all_metrics.extend(email_metrics)
            
            # Collect CRM metrics
            crm_metrics = self.crm.fetch_sales_metrics(start_date, end_date)
            all_metrics.extend(crm_metrics)
            
            # Record all metrics
            self.tracker.record_batch_metrics(all_metrics)
            
            logger.info(f"Daily metrics collection completed: {len(all_metrics)} metrics recorded")
            
        except Exception as e:
            logger.error(f"Error in daily metrics collection: {e}")
            self.tracker.create_alert(
                alert_type="data_collection_failure",
                metric_name="system_health",
                current_value=0,
                target_value=1,
                threshold_breached=100,
                message=f"Daily metrics collection failed: {str(e)}"
            )
    
    def generate_daily_report(self):
        """Generate daily performance report"""
        logger.info("Generating daily report")
        
        conn = sqlite3.connect(self.tracker.db_path)
        
        # Get yesterday's metrics
        yesterday = datetime.now() - timedelta(days=1)
        yesterday_str = yesterday.strftime('%Y-%m-%d')
        
        query = '''
            SELECT metric_name, metric_value, source
            FROM metrics 
            WHERE DATE(timestamp) = ?
            ORDER BY metric_name
        '''
        
        df = pd.read_sql_query(query, conn, params=[yesterday_str])
        conn.close()
        
        if df.empty:
            logger.warning("No metrics found for daily report")
            return
        
        # Generate report content
        report = f"# Daily Performance Report - {yesterday_str}\n\n"
        
        # Group by source
        for source in df['source'].unique():
            source_data = df[df['source'] == source]
            report += f"## {source.upper()} Metrics\n"
            
            for _, row in source_data.iterrows():
                metric_name = row['metric_name'].replace(f"{source}_", "").replace("_", " ").title()
                value = row['metric_value']
                
                # Format value based on metric type
                if 'rate' in row['metric_name'].lower() or 'bounce' in row['metric_name'].lower():
                    formatted_value = f"{value:.1f}%"
                elif 'revenue' in row['metric_name'].lower():
                    formatted_value = f"${value:,.0f}"
                elif 'duration' in row['metric_name'].lower():
                    formatted_value = f"{value:.1f}s"
                else:
                    formatted_value = f"{value:,.0f}"
                
                report += f"- **{metric_name}:** {formatted_value}\n"
            
            report += "\n"
        
        # Save report
        report_path = f"reports/daily_report_{yesterday_str}.md"
        Path("reports").mkdir(exist_ok=True)
        
        with open(report_path, 'w') as f:
            f.write(report)
        
        logger.info(f"Daily report generated: {report_path}")
    
    def start_automated_collection(self):
        """Start automated metrics collection schedule"""
        logger.info("Starting automated metrics collection")
        
        # Schedule daily collection at 2 AM
        schedule.every().day.at("02:00").do(self.collect_daily_metrics)
        
        # Schedule daily report at 8 AM
        schedule.every().day.at("08:00").do(self.generate_daily_report)
        
        while True:
            schedule.run_pending()
            time.sleep(60)  # Check every minute

def main():
    """Main function for running the measure system"""
    import argparse
    
    parser = argparse.ArgumentParser(description='BMAD Measure Phase Tracking System')
    parser.add_argument('--collect', action='store_true', help='Run daily metrics collection')
    parser.add_argument('--report', action='store_true', help='Generate daily report')
    parser.add_argument('--schedule', action='store_true', help='Start automated collection')
    parser.add_argument('--setup', action='store_true', help='Setup KPI targets')
    
    args = parser.parse_args()
    
    system = BMADMeasureSystem()
    
    if args.setup:
        logger.info("KPI targets setup completed")
    elif args.collect:
        system.collect_daily_metrics()
    elif args.report:
        system.generate_daily_report()
    elif args.schedule:
        system.start_automated_collection()
    else:
        parser.print_help()

if __name__ == '__main__':
    main()