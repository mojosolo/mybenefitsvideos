#!/usr/bin/env python3
"""
Flask webhook handler for pricing calculator integration
Receives form submissions and triggers automated proposal generation
"""

from flask import Flask, request, jsonify, render_template_string
import json
import os
import logging
from datetime import datetime
import hmac
import hashlib
from automated_proposal_workflow import ProposalGenerator

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = Flask(__name__)
app.secret_key = os.getenv('FLASK_SECRET_KEY', 'your-secret-key-here')

# Initialize proposal generator
proposal_generator = ProposalGenerator()

def verify_webhook_signature(payload_body, signature_header, secret):
    """Verify webhook signature for security"""
    if not signature_header:
        return False
    
    try:
        sha_name, signature = signature_header.split('=')
        if sha_name != 'sha256':
            return False
        
        mac = hmac.new(secret.encode(), payload_body, hashlib.sha256)
        return hmac.compare_digest(mac.hexdigest(), signature)
    except Exception:
        return False

@app.route('/webhook/pricing-calculator', methods=['POST'])
def handle_pricing_calculator():
    """Handle webhook from pricing calculator form"""
    try:
        # Verify webhook signature if secret is configured
        webhook_secret = os.getenv('WEBHOOK_SECRET')
        if webhook_secret:
            signature = request.headers.get('X-Hub-Signature-256')
            if not verify_webhook_signature(request.data, signature, webhook_secret):
                logger.warning("Invalid webhook signature")
                return jsonify({'error': 'Invalid signature'}), 401
        
        # Parse form data
        if request.is_json:
            data = request.get_json()
        else:
            data = request.form.to_dict()
            # Convert string numbers to integers/floats
            for key in ['foundationMinutes', 'extraMinutes', 'altLanguageMinutes', 'subscriptionMonths']:
                if key in data and data[key]:
                    data[key] = int(data[key])
            
            # Convert boolean strings
            for key in ['foundation', 'teaser', 'diyLicense', 'rush']:
                if key in data:
                    data[key] = data[key].lower() in ['true', '1', 'yes', 'on']
        
        logger.info(f"Received pricing calculator data: {json.dumps(data, indent=2)}")
        
        # Validate required fields
        required_fields = ['client_name', 'client_email']
        missing_fields = [field for field in required_fields if not data.get(field)]
        if missing_fields:
            return jsonify({
                'success': False,
                'error': f'Missing required fields: {", ".join(missing_fields)}'
            }), 400
        
        # Process the proposal request
        result = proposal_generator.process_webhook_request(data)
        
        # Log the result
        if result['success']:
            logger.info(f"Proposal generated successfully: {result['proposal_id']}")
        else:
            logger.error(f"Proposal generation failed: {result.get('error')}")
        
        return jsonify(result), 200 if result['success'] else 500
        
    except Exception as e:
        logger.error(f"Error handling webhook: {e}")
        return jsonify({
            'success': False,
            'error': 'Internal server error',
            'message': str(e)
        }), 500

@app.route('/webhook/email-response', methods=['POST'])
def handle_email_response():
    """Handle email responses and engagement tracking"""
    try:
        data = request.get_json()
        
        event_type = data.get('event_type')
        recipient = data.get('recipient')
        proposal_id = data.get('proposal_id')
        
        logger.info(f"Email event: {event_type} for {recipient} (Proposal: {proposal_id})")
        
        # Log to CRM or analytics system
        # This would typically update lead scoring, trigger follow-up sequences, etc.
        
        response_data = {
            'success': True,
            'event_logged': True,
            'timestamp': datetime.now().isoformat()
        }
        
        # Trigger follow-up actions based on event type
        if event_type == 'opened':
            # Email was opened - light engagement
            response_data['follow_up'] = 'scheduled_light_follow_up'
        elif event_type == 'clicked':
            # Link was clicked - high engagement
            response_data['follow_up'] = 'scheduled_sales_call'
        elif event_type == 'replied':
            # Direct reply - immediate attention needed
            response_data['follow_up'] = 'prioritized_for_response'
        
        return jsonify(response_data)
        
    except Exception as e:
        logger.error(f"Error handling email response: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/quote', methods=['POST'])
def generate_quote():
    """API endpoint for instant quote generation"""
    try:
        data = request.get_json()
        
        # Generate pricing breakdown without full proposal
        from lib.pricing import computePricing, PricingSelections
        
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
        
        # Format response
        quote_data = {
            'line_items': [{'label': item.label, 'amount': item.amount} for item in breakdown.lineItems],
            'discounts': [{'label': item.label, 'amount': item.amount} for item in breakdown.discountItems],
            'subtotal': breakdown.subtotal,
            'rush_surcharge': breakdown.rushSurcharge,
            'subscription_total': breakdown.subscriptionTotal,
            'total_due_now': breakdown.totalDueNow,
            'total_all_in': breakdown.totalAllIn,
            'timestamp': datetime.now().isoformat()
        }
        
        return jsonify({
            'success': True,
            'quote': quote_data
        })
        
    except Exception as e:
        logger.error(f"Error generating quote: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/health')
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'version': '1.0.0'
    })

@app.route('/test-form')
def test_form():
    """Test form for development"""
    form_html = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Test Pricing Calculator</title>
        <style>
            body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
            .form-group { margin-bottom: 15px; }
            label { display: block; margin-bottom: 5px; font-weight: bold; }
            input, select { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
            button { background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
            button:hover { background: #0056b3; }
            .checkbox-group { display: flex; align-items: center; gap: 10px; }
            .checkbox-group input { width: auto; }
        </style>
    </head>
    <body>
        <h1>Test Pricing Calculator Form</h1>
        <form action="/webhook/pricing-calculator" method="post">
            <div class="form-group">
                <label for="client_name">Client Name *</label>
                <input type="text" id="client_name" name="client_name" value="Test Company Inc." required>
            </div>
            
            <div class="form-group">
                <label for="client_email">Email Address *</label>
                <input type="email" id="client_email" name="client_email" value="test@example.com" required>
            </div>
            
            <div class="form-group">
                <label for="project_name">Project Name</label>
                <input type="text" id="project_name" name="project_name" value="OE 2025 Video Project">
            </div>
            
            <div class="form-group">
                <label for="preset">Package Preset</label>
                <select id="preset" name="preset">
                    <option value="custom">Custom</option>
                    <option value="good">Good</option>
                    <option value="better" selected>Better</option>
                    <option value="best">Best</option>
                </select>
            </div>
            
            <div class="form-group checkbox-group">
                <input type="checkbox" id="foundation" name="foundation" checked>
                <label for="foundation">Foundation Package</label>
            </div>
            
            <div class="form-group">
                <label for="foundationMinutes">Foundation Minutes</label>
                <input type="number" id="foundationMinutes" name="foundationMinutes" value="2" min="2" max="10">
            </div>
            
            <div class="form-group">
                <label for="extraMinutes">Extra Minutes</label>
                <input type="number" id="extraMinutes" name="extraMinutes" value="1" min="0" max="60">
            </div>
            
            <div class="form-group checkbox-group">
                <input type="checkbox" id="teaser" name="teaser">
                <label for="teaser">OE Teaser</label>
            </div>
            
            <div class="form-group">
                <label for="microsite">Microsite</label>
                <select id="microsite" name="microsite">
                    <option value="none">None</option>
                    <option value="standalone">Standalone</option>
                    <option value="bundled" selected>Bundled</option>
                </select>
            </div>
            
            <div class="form-group checkbox-group">
                <input type="checkbox" id="diyLicense" name="diyLicense">
                <label for="diyLicense">DIY License</label>
            </div>
            
            <div class="form-group">
                <label for="altLanguageMinutes">Alt-Language Minutes</label>
                <input type="number" id="altLanguageMinutes" name="altLanguageMinutes" value="0" min="0" max="60">
            </div>
            
            <div class="form-group checkbox-group">
                <input type="checkbox" id="rush" name="rush">
                <label for="rush">Rush Delivery (+50%)</label>
            </div>
            
            <div class="form-group">
                <label for="subscriptionPlan">Subscription Plan</label>
                <select id="subscriptionPlan" name="subscriptionPlan">
                    <option value="none">None</option>
                    <option value="essential" selected>Essential</option>
                    <option value="growth">Growth</option>
                    <option value="enterprise">Enterprise</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="subscriptionMonths">Subscription Months</label>
                <input type="number" id="subscriptionMonths" name="subscriptionMonths" value="12" min="0" max="36">
            </div>
            
            <button type="submit">Generate Proposal</button>
        </form>
        
        <script>
            // Simple form validation and AJAX submission for better UX
            document.querySelector('form').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = new FormData(this);
                const data = {};
                
                for (let [key, value] of formData.entries()) {
                    if (value === 'on') value = true;
                    else if (value === '' && this.querySelector(`[name="${key}"]`).type === 'checkbox') value = false;
                    data[key] = value;
                }
                
                fetch('/webhook/pricing-calculator', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        alert('Proposal generated successfully! Check your email.');
                    } else {
                        alert('Error: ' + result.message);
                    }
                })
                .catch(error => {
                    alert('Error: ' + error.message);
                });
            });
        </script>
    </body>
    </html>
    """
    return render_template_string(form_html)

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_ENV') == 'development'
    
    app.run(host='0.0.0.0', port=port, debug=debug)