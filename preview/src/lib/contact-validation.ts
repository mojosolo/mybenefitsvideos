import { z } from 'zod';

// Contact form validation schema
export const contactFormSchema = z.object({
  // Basic Information
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  
  company: z
    .string()
    .min(2, 'Company name must be at least 2 characters')
    .max(200, 'Company name must be less than 200 characters'),
  
  phone: z
    .string()
    .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number')
    .optional()
    .or(z.literal('')),

  // Project Details
  projectType: z
    .string()
    .min(1, 'Please select a project type'),
  
  budget: z
    .number()
    .min(1000, 'Budget must be at least $1,000')
    .max(100000, 'Budget must be less than $100,000'),
  
  timeline: z
    .string()
    .min(1, 'Please select a timeline'),
  
  employeeCount: z
    .string()
    .optional(),

  // Message and Details
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2,000 characters'),

  // Contact Preferences
  contactPreference: z
    .enum(['email', 'phone', 'meeting']),

  // File Upload (optional)
  projectFiles: z
    .any()
    .optional(),

  // Compliance and Opt-ins
  gdprConsent: z
    .boolean()
    .refine((val) => val === true, {
      message: 'You must agree to the privacy policy to continue'
    }),

  newsletterOptIn: z
    .boolean(),

  // Marketing preferences
  marketingOptIn: z
    .boolean(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Default form values
export const defaultFormValues: Partial<ContactFormData> = {
  name: '',
  email: '',
  company: '',
  phone: '',
  projectType: '',
  budget: 10000, // Default to $10k
  timeline: '',
  employeeCount: '',
  message: '',
  contactPreference: 'email',
  gdprConsent: false,
  newsletterOptIn: false,
  marketingOptIn: false,
};

// Project type options
export const projectTypeOptions = [
  { value: 'foundation', label: 'Foundation Video (2 minutes) - $2,499' },
  { value: 'teaser', label: 'Teaser Video (1 minute) - $999' },
  { value: 'microsite-bundle', label: 'Microsite + Video Bundle - $6,498' },
  { value: 'complete-package', label: 'Complete Package (Best) - $8,096' },
  { value: 'diy-license', label: 'DIY PowerPoint License - $1,999' },
  { value: 'multi-language', label: 'Multi-language Version - $299/min' },
  { value: 'custom', label: 'Custom Solution - Let\'s discuss' },
  { value: 'not-sure', label: 'Not sure - need guidance' },
];

// Timeline options
export const timelineOptions = [
  { value: 'rush', label: 'ASAP (Rush - 2 weeks) +50% surcharge' },
  { value: 'standard', label: 'Standard (3-4 weeks)' },
  { value: 'flexible', label: 'Flexible (5+ weeks)' },
  { value: 'planning', label: 'Planning for next enrollment period' },
  { value: 'exploring', label: 'Just exploring options' },
];

// Employee count options
export const employeeCountOptions = [
  { value: 'under-100', label: 'Under 100 employees' },
  { value: '100-500', label: '100-500 employees' },
  { value: '500-1000', label: '500-1,000 employees' },
  { value: '1000-5000', label: '1,000-5,000 employees' },
  { value: '5000+', label: '5,000+ employees' },
];

// Budget presets for the slider
export const budgetPresets = [
  { value: 1000, label: '$1K' },
  { value: 2500, label: '$2.5K' },
  { value: 5000, label: '$5K' },
  { value: 10000, label: '$10K' },
  { value: 25000, label: '$25K' },
  { value: 50000, label: '$50K' },
  { value: 100000, label: '$100K+' },
];