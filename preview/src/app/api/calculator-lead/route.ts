import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Lead capture schema validation
const calculatorLeadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().min(2),
  title: z.string().optional(),
  employeeCount: z.string(),
  timeline: z.string(),
  primaryGoal: z.string(),
  currentChallenges: z.string().optional(),
  preferredContact: z.enum(['email', 'phone', 'meeting']),
  marketingOptIn: z.boolean(),
  gdprConsent: z.boolean(),
  calculatorData: z.object({
    selections: z.any(),
    pricing: z.any(),
    roiMetrics: z.any(),
    employeeCount: z.number(),
    timestamp: z.string()
  })
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request data
    const validatedData = calculatorLeadSchema.parse(body);

    // Log the lead capture for development/debugging
    console.log('Calculator Lead Captured:', {
      email: validatedData.email,
      company: validatedData.company,
      totalInvestment: validatedData.calculatorData.pricing?.totalDueNow,
      timestamp: new Date().toISOString()
    });

    // TODO: Implement actual lead processing
    // Examples of what you might want to do:
    
    // 1. Send to CRM (HubSpot, Salesforce, etc.)
    // await sendToHubSpot(validatedData);
    
    // 2. Send notification email to sales team
    // await sendSalesNotification(validatedData);
    
    // 3. Send confirmation email to prospect
    // await sendConfirmationEmail(validatedData);
    
    // 4. Store in database
    // await storeInDatabase(validatedData);
    
    // 5. Send to analytics/tracking
    // await trackConversion(validatedData);

    // For now, we'll just simulate successful processing
    await simulateProcessing();

    return NextResponse.json({ 
      success: true, 
      message: 'Lead captured successfully',
      leadId: generateLeadId()
    });

  } catch (error) {
    console.error('Calculator lead capture error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid data provided',
          errors: error.issues 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to process lead. Please try again.' 
      },
      { status: 500 }
    );
  }
}

// Simulate processing delay
async function simulateProcessing(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 1000));
}

// Generate a simple lead ID
function generateLeadId(): string {
  return 'lead_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Example functions for actual integrations (to be implemented):

/*
async function sendToHubSpot(leadData: any) {
  // HubSpot integration example
  const hubspotData = {
    properties: {
      email: leadData.email,
      firstname: leadData.name.split(' ')[0],
      lastname: leadData.name.split(' ').slice(1).join(' '),
      company: leadData.company,
      phone: leadData.phone,
      jobtitle: leadData.title,
      // Custom properties for calculator data
      calculator_total_investment: leadData.calculatorData.pricing?.totalDueNow,
      calculator_roi_months: leadData.calculatorData.roiMetrics?.breakEvenMonths,
      calculator_employee_count: leadData.calculatorData.employeeCount,
      lead_source: 'Calculator',
    }
  };

  await fetch('https://api.hubapi.com/contacts/v1/contact', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(hubspotData),
  });
}

async function sendSalesNotification(leadData: any) {
  // Send email to sales team
  const emailData = {
    to: process.env.SALES_TEAM_EMAIL,
    subject: `New Calculator Lead: ${leadData.company}`,
    html: generateSalesNotificationHTML(leadData),
  };

  // Use your preferred email service (SendGrid, Mailgun, etc.)
  await sendEmail(emailData);
}

async function sendConfirmationEmail(leadData: any) {
  // Send confirmation email to the prospect
  const emailData = {
    to: leadData.email,
    subject: 'Your Benefits Video Quote',
    html: generateConfirmationHTML(leadData),
  };

  await sendEmail(emailData);
}

function generateSalesNotificationHTML(leadData: any): string {
  return `
    <h2>New Calculator Lead</h2>
    <p><strong>Company:</strong> ${leadData.company}</p>
    <p><strong>Contact:</strong> ${leadData.name} (${leadData.email})</p>
    <p><strong>Employees:</strong> ${leadData.employeeCount}</p>
    <p><strong>Timeline:</strong> ${leadData.timeline}</p>
    <p><strong>Total Investment:</strong> $${leadData.calculatorData.pricing?.totalDueNow?.toLocaleString()}</p>
    <p><strong>ROI Break-even:</strong> ${leadData.calculatorData.roiMetrics?.breakEvenMonths} months</p>
    <p><strong>Primary Goal:</strong> ${leadData.primaryGoal}</p>
    ${leadData.currentChallenges ? `<p><strong>Challenges:</strong> ${leadData.currentChallenges}</p>` : ''}
    <p><strong>Preferred Contact:</strong> ${leadData.preferredContact}</p>
  `;
}
*/