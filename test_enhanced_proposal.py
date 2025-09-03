#!/usr/bin/env python3
"""
Test the enhanced proposal generation with ROI calculations
"""

import json
import sys
import os

# Add current directory to path
sys.path.append('.')
sys.path.append('./campaign')

def test_enhanced_proposal():
    """Test the enhanced proposal generation system"""
    print("🧪 Testing Enhanced Proposal Generation")
    print("=" * 50)
    
    # Sample client data
    test_client_data = {
        'client_name': 'TechCorp Solutions Inc.',
        'client_email': 'benefits@techcorp.com',
        'project_name': 'TechCorp OE 2025 Video Project',
        'company_size': 280,
        'industry': 'technology',
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
    
    print(f"Client: {test_client_data['client_name']}")
    print(f"Company Size: {test_client_data['company_size']} employees")
    print(f"Package: {test_client_data['preset'].title()}")
    print()
    
    try:
        # Import and use our enhanced proposal generator
        from automated_proposal_workflow import ProposalGenerator
        
        generator = ProposalGenerator()
        
        # Generate proposal with ROI analysis
        print("🔢 Calculating ROI Analysis...")
        roi_analysis = generator._calculate_roi_projection(test_client_data)
        
        print(f"Current Annual Cost of Poor Communication: ${roi_analysis['total_current_cost']:,.0f}")
        print(f"  - HR Time Waste: ${roi_analysis['current_annual_cost']['hr_time_cost']:,.0f}")
        print(f"  - Poor Enrollment Decisions: ${roi_analysis['current_annual_cost']['poor_enrollment_cost']:,.0f}")
        print(f"  - Compliance Risk: ${roi_analysis['current_annual_cost']['compliance_risk']:,.0f}")
        print(f"  - Employee Satisfaction Impact: ${roi_analysis['current_annual_cost']['employee_satisfaction_impact']:,.0f}")
        print()
        
        print(f"Projected Annual Savings: ${roi_analysis['total_annual_savings']:,.0f}")
        print(f"Total Investment: ${roi_analysis['total_investment']:,.0f}")
        print(f"First Year ROI: {roi_analysis['first_year_roi']:.0f}%")
        print(f"Payback Period: {roi_analysis['payback_months']:.1f} months")
        print(f"3-Year Value: ${roi_analysis['three_year_value']:,.0f}")
        print()
        
        # Test pricing calculation
        print("💰 Pricing Breakdown:")
        pricing = generator._calculate_detailed_pricing(test_client_data)
        
        for item in pricing['line_items']:
            print(f"  • {item['label']}: ${item['amount']:,}")
        
        if pricing['discounts']:
            print("  Discounts:")
            for discount in pricing['discounts']:
                print(f"  • {discount['label']}: -${discount['amount']:,}")
        
        print(f"\nSubtotal: ${pricing['subtotal']:,}")
        if pricing['rush_surcharge'] > 0:
            print(f"Rush Surcharge: ${pricing['rush_surcharge']:,}")
        if pricing['subscription_total'] > 0:
            print(f"Subscription (12 months): ${pricing['subscription_total']:,}")
        print(f"Total Due Now: ${pricing['total_due_now']:,}")
        print(f"All-In Total: ${pricing['total_all_in']:,}")
        print()
        
        # Test complete proposal generation
        print("📄 Generating Complete Proposal...")
        proposal_data = generator.generate_proposal_from_calculator(test_client_data)
        
        print(f"Proposal Generated for: {proposal_data['project_name']}")
        print(f"Package: {proposal_data['package']}")
        print(f"Valid Until: {proposal_data['valid_until']}")
        print()
        
        # Show ROI highlights
        if 'roi_analysis' in proposal_data:
            roi = proposal_data['roi_analysis']
            print("📊 ROI Highlights:")
            print(f"  • Company saves ${roi['total_annual_savings']:,.0f} annually")
            print(f"  • Investment pays back in {roi['payback_months']:.1f} months")
            print(f"  • {roi['first_year_roi']:.0f}% ROI in first year")
            print(f"  • ${roi['three_year_value']:,.0f} value over 3 years")
        
        print("\n✅ Enhanced proposal generation successful!")
        return True
        
    except Exception as e:
        print(f"❌ Error testing proposal generation: {e}")
        import traceback
        traceback.print_exc()
        return False

def test_pricing_scenarios():
    """Test different pricing scenarios"""
    print("\n🎯 Testing Multiple Pricing Scenarios")
    print("=" * 50)
    
    scenarios = [
        {
            'name': 'Small Company (Good Package)',
            'data': {
                'preset': 'good',
                'company_size': 150,
                'foundation': True,
                'foundationMinutes': 2,
                'extraMinutes': 0,
                'microsite': 'none',
                'subscriptionPlan': 'none'
            }
        },
        {
            'name': 'Mid-Market (Better Package)',
            'data': {
                'preset': 'better',
                'company_size': 300,
                'foundation': True,
                'foundationMinutes': 2,
                'microsite': 'bundled',
                'subscriptionPlan': 'essential',
                'subscriptionMonths': 12
            }
        },
        {
            'name': 'Enterprise (Best Package)',
            'data': {
                'preset': 'best',
                'company_size': 500,
                'foundation': True,
                'foundationMinutes': 3,
                'extraMinutes': 2,
                'teaser': True,
                'microsite': 'bundled',
                'diyLicense': True,
                'altLanguageMinutes': 2,
                'subscriptionPlan': 'enterprise',
                'subscriptionMonths': 12
            }
        }
    ]
    
    try:
        from automated_proposal_workflow import ProposalGenerator
        generator = ProposalGenerator()
        
        for scenario in scenarios:
            print(f"\n{scenario['name']}:")
            print("-" * 30)
            
            roi = generator._calculate_roi_projection(scenario['data'])
            pricing = generator._calculate_detailed_pricing(scenario['data'])
            
            print(f"Investment: ${pricing['total_due_now']:,}")
            print(f"Annual Savings: ${roi['total_annual_savings']:,}")
            print(f"ROI: {roi['first_year_roi']:.0f}%")
            print(f"Payback: {roi['payback_months']:.1f} months")
        
        return True
        
    except Exception as e:
        print(f"❌ Error testing scenarios: {e}")
        return False

if __name__ == "__main__":
    success1 = test_enhanced_proposal()
    success2 = test_pricing_scenarios()
    
    if success1 and success2:
        print("\n🎉 All tests passed! Enhanced proposal system ready for deployment.")
    else:
        print("\n⚠️ Some tests failed. Review and fix issues before deployment.")