import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/contact-validation';
import { z } from 'zod';

// Rate limiting storage (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes

function getRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const current = rateLimitMap.get(ip) || { count: 0, lastReset: now };

  // Reset if window has passed
  if (now - current.lastReset > RATE_LIMIT_WINDOW) {
    current.count = 0;
    current.lastReset = now;
  }

  current.count++;
  rateLimitMap.set(ip, current);

  return {
    allowed: current.count <= RATE_LIMIT_MAX_REQUESTS,
    remaining: Math.max(0, RATE_LIMIT_MAX_REQUESTS - current.count)
  };
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || 'unknown';
}

async function sendNotificationEmail(formData: any) {
  // In a real implementation, you would integrate with an email service
  // like SendGrid, Resend, Mailgun, etc.
  
  const emailTemplate = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
    
    <h3>Contact Information</h3>
    <ul>
      <li><strong>Name:</strong> ${formData.name}</li>
      <li><strong>Email:</strong> ${formData.email}</li>
      <li><strong>Company:</strong> ${formData.company}</li>
      <li><strong>Phone:</strong> ${formData.phone || 'Not provided'}</li>
    </ul>
    
    <h3>Project Details</h3>
    <ul>
      <li><strong>Project Type:</strong> ${formData.projectType}</li>
      <li><strong>Budget:</strong> $${formData.budget?.toLocaleString()}</li>
      <li><strong>Timeline:</strong> ${formData.timeline}</li>
      <li><strong>Employee Count:</strong> ${formData.employeeCount || 'Not specified'}</li>
      <li><strong>Contact Preference:</strong> ${formData.contactPreference}</li>
    </ul>
    
    <h3>Message</h3>
    <p>${formData.message.replace(/\n/g, '<br>')}</p>
    
    <h3>Marketing Preferences</h3>
    <ul>
      <li><strong>Newsletter Opt-in:</strong> ${formData.newsletterOptIn ? 'Yes' : 'No'}</li>
      <li><strong>Marketing Opt-in:</strong> ${formData.marketingOptIn ? 'Yes' : 'No'}</li>
    </ul>
    
    ${formData.projectFiles && formData.projectFiles.length > 0 ? `
    <h3>Uploaded Files</h3>
    <p>The user attempted to upload ${formData.projectFiles.length} file(s). File handling would be implemented in a real application.</p>
    ` : ''}
  `;

  // For demo purposes, log the email content
  console.log('📧 Email notification would be sent:', {
    to: 'hello@mojosolo.com',
    subject: `New Contact Form Submission from ${formData.name} (${formData.company})`,
    html: emailTemplate
  });

  // In production, you would send the actual email:
  /*
  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{
        to: [{ email: 'hello@mojosolo.com' }],
        subject: `New Contact Form Submission from ${formData.name} (${formData.company})`
      }],
      from: { email: 'noreply@mojosolo.com', name: 'Mojo Solo Contact Form' },
      content: [{
        type: 'text/html',
        value: emailTemplate
      }]
    })
  });
  
  if (!response.ok) {
    throw new Error('Failed to send email notification');
  }
  */

  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    const rateLimit = getRateLimit(clientIP);
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          message: 'Too many requests. Please wait before submitting again.',
          error: 'RATE_LIMIT_EXCEEDED'
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': new Date(Date.now() + RATE_LIMIT_WINDOW).toISOString()
          }
        }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    
    let validatedData;
    try {
      validatedData = contactFormSchema.parse(body);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { 
            message: 'Validation failed. Please check your input and try again.',
            errors: error.issues.map(err => ({
              field: err.path.join('.'),
              message: err.message
            }))
          },
          { status: 400 }
        );
      }
      throw error;
    }

    // Additional security checks
    if (!validatedData.gdprConsent) {
      return NextResponse.json(
        { message: 'GDPR consent is required to process your request.' },
        { status: 400 }
      );
    }

    // Log form submission for analytics/monitoring
    console.log('📝 Contact form submission:', {
      timestamp: new Date().toISOString(),
      name: validatedData.name,
      company: validatedData.company,
      projectType: validatedData.projectType,
      budget: validatedData.budget,
      timeline: validatedData.timeline,
      ip: clientIP
    });

    // Send notification email
    try {
      await sendNotificationEmail(validatedData);
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Don't fail the entire request if email fails
      // In production, you might want to queue this for retry
    }

    // Store in database if needed
    // await storeContactSubmission(validatedData);

    // Return success response
    return NextResponse.json(
      { 
        message: 'Thank you for your message! We\'ll get back to you within 24 hours.',
        success: true,
        submissionId: `contact_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`
      },
      { 
        status: 200,
        headers: {
          'X-RateLimit-Remaining': rateLimit.remaining.toString()
        }
      }
    );

  } catch (error) {
    console.error('Contact form API error:', error);
    
    return NextResponse.json(
      { 
        message: 'An unexpected error occurred. Please try again or contact us directly.',
        error: 'INTERNAL_SERVER_ERROR'
      },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { message: 'Contact form API endpoint. Use POST to submit form data.' },
    { status: 200 }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Allow': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}