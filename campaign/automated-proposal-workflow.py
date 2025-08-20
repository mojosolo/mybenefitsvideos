#!/usr/bin/env python3
"""
Automated Proposal Generation Workflow
Integrates with pricing calculator and generates professional proposals
"""

import json
import argparse
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
from datetime import datetime, timedelta
from typing import Dict, List, Optional
import subprocess
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class ProposalGenerator:
    def __init__(self, template_path: str = "mojosolo_proposal_template.docx"):
        self.template_path = template_path
        self.smtp_config = {
            'host': os.getenv('SMTP_HOST', 'smtp.gmail.com'),
            'port': int(os.getenv('SMTP_PORT', '587')),
            'user': os.getenv('SMTP_USER'),
            'password': os.getenv('SMTP_PASS')
        }
        
    def generate_proposal_from_calculator(self, calculator_data: Dict) -> Dict:
        """Generate proposal from pricing calculator output"""
        logger.info(f"Generating proposal for {calculator_data.get('client_name', 'Unknown Client')}")
        
        # Extract key information
        client_name = calculator_data.get('client_name', 'Valued Client')
        client_email = calculator_data.get('client_email', '')
        project_name = calculator_data.get('project_name', f"{client_name} Benefits Video Project")
        
        # Determine package based on selections
        package_name = self._determine_package_name(calculator_data)
        
        # Generate dates
        today = datetime.now()
        valid_until = today + timedelta(days=30)
        
        # Create proposal data structure
        proposal_data = {
            'client_name': client_name,
            'client_email': client_email,
            'project_name': project_name,
            'date': today.strftime('%Y-%m-%d'),
            'valid_until': valid_until.strftime('%Y-%m-%d'),
            'package': package_name,
            'selections': calculator_data,
            'pricing': self._calculate_detailed_pricing(calculator_data)
        }
        
        return proposal_data
    
    def _determine_package_name(self, data: Dict) -> str:
        """Determine package name based on selections"""
        preset = data.get('preset', 'custom')
        
        if preset == 'good':
            return "GOOD — Foundation Package"
        elif preset == 'better':
            return "BETTER — Complete Solution"
        elif preset == 'best':
            return "BEST — Enterprise Suite"
        else:
            # Custom package - determine based on selections
            has_microsite = data.get('microsite', 'none') != 'none'
            has_extras = any([
                data.get('teaser', False),
                data.get('diyLicense', False),
                data.get('altLanguageMinutes', 0) > 0
            ])
            
            if has_microsite and has_extras:
                return "CUSTOM — Premium Package"
            elif has_microsite:
                return "CUSTOM — Video + Microsite"
            else:
                return "CUSTOM — Video Package"
    
    def _calculate_roi_projection(self, data: Dict) -> Dict:
        """Calculate ROI projection based on client size and current investment"""
        # Estimate company size from selections
        company_size = data.get('company_size', 200)  # Default assumption
        
        # If not provided, estimate from package selection
        if 'company_size' not in data:
            preset = data.get('preset', 'custom')
            if preset == 'good':
                company_size = 150  # Small companies
            elif preset == 'better':
                company_size = 300  # Mid-market
            elif preset == 'best':
                company_size = 500  # Large companies
            else:
                # Estimate from selections
                if data.get('microsite') != 'none' or data.get('subscriptionPlan') != 'none':
                    company_size = 400
                else:
                    company_size = 200
        
        # Calculate current cost of poor benefits communication
        avg_hr_salary = 75000
        hr_team_size = max(1, company_size // 200)  # 1 HR person per 200 employees
        hours_per_employee_questions = 0.5  # 30 minutes per employee during OE
        total_hr_hours_wasted = company_size * hours_per_employee_questions
        hourly_rate = avg_hr_salary / 2080  # Annual salary to hourly
        
        current_annual_cost = {
            'hr_time_cost': total_hr_hours_wasted * hourly_rate,
            'poor_enrollment_cost': company_size * 120,  # $120 per employee in suboptimal choices
            'compliance_risk': 5000,  # Estimated compliance risk
            'employee_satisfaction_impact': company_size * 50  # Employee frustration cost
        }
        
        total_current_cost = sum(current_annual_cost.values())
        
        # Calculate investment
        pricing = self._calculate_detailed_pricing(data)
        total_investment = pricing['total_due_now']
        
        # Calculate projected savings
        projected_savings = {
            'hr_time_savings': current_annual_cost['hr_time_cost'] * 0.7,  # 70% reduction
            'better_enrollment_outcomes': current_annual_cost['poor_enrollment_cost'] * 0.6,  # 60% improvement
            'reduced_compliance_risk': current_annual_cost['compliance_risk'] * 0.8,  # 80% reduction
            'improved_satisfaction': current_annual_cost['employee_satisfaction_impact'] * 0.5  # 50% improvement
        }
        
        total_annual_savings = sum(projected_savings.values())
        
        # Calculate ROI
        first_year_roi = ((total_annual_savings - total_investment) / total_investment) * 100 if total_investment > 0 else 0
        payback_months = (total_investment / (total_annual_savings / 12)) if total_annual_savings > 0 else 0
        
        return {
            'company_size': company_size,
            'total_investment': total_investment,
            'current_annual_cost': current_annual_cost,
            'total_current_cost': total_current_cost,
            'projected_savings': projected_savings,
            'total_annual_savings': total_annual_savings,
            'first_year_roi': first_year_roi,
            'payback_months': payback_months,
            'three_year_value': (total_annual_savings * 3) - total_investment
        }
    
    def _calculate_detailed_pricing(self, data: Dict) -> Dict:
        """Calculate detailed pricing breakdown"""
        from lib.pricing import computePricing, PricingSelections
        
        # Convert data to PricingSelections format
        selections = PricingSelections(
            preset=data.get('preset'),
            foundation=data.get('foundation', True),
            foundationMinutes=data.get('foundationMinutes', 2),
            extraMinutes=data.get('extraMinutes', 0),
            teaser=data.get('teaser', False),
            microsite=data.get('microsite', 'none'),
            diyLicense=data.get('diyLicense', False),
            altLanguageMinutes=data.get('altLanguageMinutes', 0),
            rush=data.get('rush', False),
            subscriptionPlan=data.get('subscriptionPlan', 'none'),
            subscriptionMonths=data.get('subscriptionMonths', 0)
        )
        
        breakdown = computePricing(selections)
        
        return {
            'line_items': breakdown.lineItems,
            'discounts': breakdown.discountItems,
            'subtotal': breakdown.subtotal,
            'rush_surcharge': breakdown.rushSurcharge,
            'subscription_total': breakdown.subscriptionTotal,
            'total_due_now': breakdown.totalDueNow,
            'total_all_in': breakdown.totalAllIn
        }
    
    def create_proposal_document(self, proposal_data: Dict) -> str:
        """Create DOCX proposal document using existing fill script"""
        logger.info("Creating proposal document")
        
        # Create temporary selections file
        selections_file = f"temp_selections_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        
        # Convert proposal data back to calculator format
        calculator_data = proposal_data['selections']
        
        with open(selections_file, 'w') as f:
            json.dump(calculator_data, f, indent=2)
        
        # Generate output filename
        output_file = f"proposal_{proposal_data['client_name'].replace(' ', '_')}_{datetime.now().strftime('%Y%m%d')}.docx"
        
        try:
            # Use existing proposal generation script
            cmd = [
                'python', 'fill_proposal_from_json.py',
                '--template', self.template_path,
                '--selections', selections_file,
                '--out', output_file,
                '--client', proposal_data['client_name'],
                '--project', proposal_data['project_name'],
                '--date', proposal_data['date'],
                '--valid', proposal_data['valid_until'],
                '--package', proposal_data['package']
            ]
            
            # Add subscription info if present
            pricing = proposal_data['pricing']
            if pricing['subscription_total'] > 0:
                subscription_plan = calculator_data.get('subscriptionPlan', 'none')
                subscription_months = calculator_data.get('subscriptionMonths', 0)
                subscription_monthly = pricing['subscription_total'] / max(subscription_months, 1)
                cmd.extend(['--subscription', f"{subscription_plan.title()} (${subscription_monthly:,.0f}/mo)"])
            
            result = subprocess.run(cmd, capture_output=True, text=True, check=True)
            logger.info(f"Proposal document created: {output_file}")
            
            return output_file
            
        except subprocess.CalledProcessError as e:
            logger.error(f"Error creating proposal document: {e}")
            raise
        finally:
            # Clean up temporary file
            if os.path.exists(selections_file):
                os.remove(selections_file)
    
    def send_proposal_email(self, proposal_data: Dict, document_path: str) -> bool:
        """Send proposal via email"""
        logger.info(f"Sending proposal to {proposal_data['client_email']}")
        
        if not proposal_data['client_email']:
            logger.warning("No email address provided, skipping email send")
            return False
        
        try:
            # Create email message
            msg = MIMEMultipart()
            msg['From'] = self.smtp_config['user']
            msg['To'] = proposal_data['client_email']
            msg['Subject'] = f"Your Benefits Video Proposal - {proposal_data['project_name']}"
            
            # Email body
            body = self._create_email_body(proposal_data)
            msg.attach(MIMEText(body, 'html'))
            
            # Attach proposal document
            if os.path.exists(document_path):
                with open(document_path, "rb") as attachment:
                    part = MIMEBase('application', 'octet-stream')
                    part.set_payload(attachment.read())
                
                encoders.encode_base64(part)
                part.add_header(
                    'Content-Disposition',
                    f'attachment; filename= {os.path.basename(document_path)}'
                )
                msg.attach(part)
            
            # Send email
            server = smtplib.SMTP(self.smtp_config['host'], self.smtp_config['port'])
            server.starttls()
            server.login(self.smtp_config['user'], self.smtp_config['password'])
            text = msg.as_string()
            server.sendmail(self.smtp_config['user'], proposal_data['client_email'], text)
            server.quit()
            
            logger.info("Proposal email sent successfully")
            return True
            
        except Exception as e:
            logger.error(f"Error sending email: {e}")
            return False
    
    def _create_email_body(self, proposal_data: Dict) -> str:
        """Create HTML email body for proposal delivery"""
        pricing = proposal_data['pricing']
        
        return f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #2c3e50;">Your Benefits Video Proposal</h2>
                
                <p>Hi there,</p>
                
                <p>Thank you for your interest in professional benefits communication! I've prepared a custom proposal for <strong>{proposal_data['project_name']}</strong>.</p>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin-top: 0; color: #2c3e50;">Proposal Summary</h3>
                    <p><strong>Package:</strong> {proposal_data['package']}</p>
                    <p><strong>Total Investment:</strong> ${pricing['total_due_now']:,}</p>
                    <p><strong>Timeline:</strong> 10 business days from project start</p>
                    <p><strong>Valid Until:</strong> {proposal_data['valid_until']}</p>
                </div>
                
                <h3>What's Included:</h3>
                <ul>
                    {"".join([f"<li>{item['label']}: ${item['amount']:,}</li>" for item in pricing['line_items']])}
                </ul>
                
                {"<h3>Discounts Applied:</h3><ul>" + "".join([f"<li>{item['label']}: -${item['amount']:,}</li>" for item in pricing['discounts']]) + "</ul>" if pricing['discounts'] else ""}
                
                <h3>Next Steps:</h3>
                <ol>
                    <li><strong>Review the attached proposal</strong> - All details are included</li>
                    <li><strong>Schedule a call</strong> if you have questions: <a href="https://calendly.com/mojosolo/15min">Book 15 minutes</a></li>
                    <li><strong>Accept and start</strong> - We can begin production immediately</li>
                </ol>
                
                <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 0;"><strong>💡 Quick Question:</strong> What's driving your interest in benefits videos right now? Upcoming open enrollment or ongoing communication needs?</p>
                </div>
                
                <p>I'm here to answer any questions about the proposal, timeline, or process. Just reply to this email or schedule a quick call.</p>
                
                <p>Looking forward to creating an amazing benefits video for your team!</p>
                
                <p>Best,<br>
                <strong>David</strong><br>
                Mojo Solo<br>
                david@mojosolo.com<br>
                (555) 123-4567</p>
                
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                <p style="font-size: 12px; color: #666;">
                    This proposal is valid until {proposal_data['valid_until']}. 
                    Pricing subject to change after expiration date.
                </p>
            </div>
        </body>
        </html>
        """
    
    def process_webhook_request(self, webhook_data: Dict) -> Dict:
        """Process incoming webhook from pricing calculator"""
        logger.info("Processing webhook request")
        
        try:
            # Generate proposal data
            proposal_data = self.generate_proposal_from_calculator(webhook_data)
            
            # Create proposal document
            document_path = self.create_proposal_document(proposal_data)
            
            # Send email if address provided
            email_sent = self.send_proposal_email(proposal_data, document_path)
            
            # Log to CRM (placeholder for integration)
            self._log_to_crm(proposal_data, document_path, email_sent)
            
            return {
                'success': True,
                'proposal_id': f"PROP_{datetime.now().strftime('%Y%m%d%H%M%S')}",
                'document_path': document_path,
                'email_sent': email_sent,
                'message': 'Proposal generated and delivered successfully'
            }
            
        except Exception as e:
            logger.error(f"Error processing webhook: {e}")
            return {
                'success': False,
                'error': str(e),
                'message': 'Failed to generate proposal'
            }
    
    def _log_to_crm(self, proposal_data: Dict, document_path: str, email_sent: bool):
        """Log proposal generation to CRM system"""
        # Placeholder for CRM integration
        # This would typically send data to HubSpot, Pipedrive, etc.
        logger.info(f"Logging proposal to CRM: {proposal_data['client_name']}")
        
        crm_data = {
            'contact_email': proposal_data['client_email'],
            'company_name': proposal_data['client_name'],
            'deal_name': proposal_data['project_name'],
            'deal_amount': proposal_data['pricing']['total_due_now'],
            'deal_stage': 'proposal_sent',
            'proposal_document': document_path,
            'email_sent': email_sent,
            'created_date': datetime.now().isoformat()
        }
        
        # TODO: Implement actual CRM API calls
        logger.info(f"CRM data prepared: {json.dumps(crm_data, indent=2)}")

def main():
    """Command line interface for proposal generation"""
    parser = argparse.ArgumentParser(description='Generate automated proposals')
    parser.add_argument('--webhook-data', type=str, help='JSON file with webhook data')
    parser.add_argument('--client-name', type=str, help='Client name')
    parser.add_argument('--client-email', type=str, help='Client email')
    parser.add_argument('--selections', type=str, help='JSON file with pricing selections')
    parser.add_argument('--test', action='store_true', help='Run in test mode')
    
    args = parser.parse_args()
    
    generator = ProposalGenerator()
    
    if args.test:
        # Test mode with sample data
        test_data = {
            'client_name': 'Test Company Inc.',
            'client_email': 'test@example.com',
            'project_name': 'OE 2025 Video Project',
            'preset': 'better',
            'foundation': True,
            'foundationMinutes': 2,
            'extraMinutes': 1,
            'teaser': False,
            'microsite': 'bundled',
            'diyLicense': False,
            'altLanguageMinutes': 0,
            'rush': False,
            'subscriptionPlan': 'essential',
            'subscriptionMonths': 12
        }
        
        result = generator.process_webhook_request(test_data)
        print(json.dumps(result, indent=2))
        
    elif args.webhook_data:
        with open(args.webhook_data, 'r') as f:
            webhook_data = json.load(f)
        
        result = generator.process_webhook_request(webhook_data)
        print(json.dumps(result, indent=2))
        
    elif args.selections:
        # Manual generation mode
        with open(args.selections, 'r') as f:
            selections = json.load(f)
        
        # Add client info if provided
        if args.client_name:
            selections['client_name'] = args.client_name
        if args.client_email:
            selections['client_email'] = args.client_email
        
        result = generator.process_webhook_request(selections)
        print(json.dumps(result, indent=2))
        
    else:
        parser.print_help()

if __name__ == '__main__':
    main()