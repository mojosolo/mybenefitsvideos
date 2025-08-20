"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  computePricing, 
  calculateROI, 
  defaultPricingSelections,
  type PricingSelections, 
  type PricingBreakdown, 
  type ROIMetrics 
} from '@/lib/pricing';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play,
  Monitor,
  Plus,
  TrendingUp,
  FileText,
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// Import sub-components
import VideoServiceSelector from '@/components/calculator/VideoServiceSelector';
import WebsiteServiceSelector from '@/components/calculator/WebsiteServiceSelector';
import AdditionalServices from '@/components/calculator/AdditionalServices';
import PricingBreakdownComponent from '@/components/calculator/PricingBreakdown';
import ROICalculator from '@/components/calculator/ROICalculator';
import CalculatorSummary from '@/components/calculator/CalculatorSummary';

export type CalculatorStep = 'video' | 'website' | 'additional' | 'pricing' | 'roi' | 'summary';

interface CalculatorStepConfig {
  id: CalculatorStep;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const CALCULATOR_STEPS: CalculatorStepConfig[] = [
  {
    id: 'video',
    title: 'Video Services',
    description: 'Choose your video service type and duration',
    icon: <Play className="h-5 w-5" />
  },
  {
    id: 'website',
    title: 'Website Services',
    description: 'Optional interactive websites and portals',
    icon: <Monitor className="h-5 w-5" />
  },
  {
    id: 'additional',
    title: 'Additional Services',
    description: 'Languages, DIY licenses, and updates',
    icon: <Plus className="h-5 w-5" />
  },
  {
    id: 'pricing',
    title: 'Pricing Breakdown',
    description: 'Review your investment details',
    icon: <FileText className="h-5 w-5" />
  },
  {
    id: 'roi',
    title: 'ROI Analysis',
    description: 'See your expected return on investment',
    icon: <TrendingUp className="h-5 w-5" />
  },
  {
    id: 'summary',
    title: 'Get Your Proposal',
    description: 'Download proposal and connect with our team',
    icon: <Send className="h-5 w-5" />
  }
];

interface PricingCalculatorProps {
  className?: string;
  onLeadCapture?: (data: any) => void;
  initialStep?: CalculatorStep;
  compactMode?: boolean;
}

export default function PricingCalculator({ 
  className = '', 
  onLeadCapture,
  initialStep = 'video',
  compactMode = false
}: PricingCalculatorProps) {
  // State management
  const [currentStep, setCurrentStep] = useState<CalculatorStep>(initialStep);
  const [selections, setSelections] = useState<PricingSelections>(defaultPricingSelections);
  const [employeeCount, setEmployeeCount] = useState(500);
  const [pricing, setPricing] = useState<PricingBreakdown | null>(null);
  const [roiMetrics, setRoiMetrics] = useState<ROIMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Calculate pricing whenever selections change
  const recalculatePricing = useCallback(() => {
    try {
      setIsLoading(true);
      setErrors({});
      
      const newPricing = computePricing(selections);
      const newROI = calculateROI(selections, employeeCount);
      
      setPricing(newPricing);
      setRoiMetrics(newROI);
      
    } catch (error) {
      console.error('Pricing calculation error:', error);
      setErrors({ general: 'Failed to calculate pricing. Please check your selections.' });
    } finally {
      setIsLoading(false);
    }
  }, [selections, employeeCount]);

  // Recalculate on selection changes
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      recalculatePricing();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [recalculatePricing]);

  // Step navigation
  const getCurrentStepIndex = () => CALCULATOR_STEPS.findIndex(step => step.id === currentStep);
  const getProgress = () => ((getCurrentStepIndex() + 1) / CALCULATOR_STEPS.length) * 100;
  
  const canGoNext = () => {
    const stepIndex = getCurrentStepIndex();
    return stepIndex < CALCULATOR_STEPS.length - 1;
  };
  
  const canGoPrev = () => {
    const stepIndex = getCurrentStepIndex();
    return stepIndex > 0;
  };

  const goToStep = (step: CalculatorStep) => {
    setCurrentStep(step);
  };

  const goNext = () => {
    if (canGoNext()) {
      const nextIndex = getCurrentStepIndex() + 1;
      setCurrentStep(CALCULATOR_STEPS[nextIndex].id);
    }
  };

  const goPrev = () => {
    if (canGoPrev()) {
      const prevIndex = getCurrentStepIndex() - 1;
      setCurrentStep(CALCULATOR_STEPS[prevIndex].id);
    }
  };

  // Update selections handler
  const updateSelections = (updates: Partial<PricingSelections>) => {
    setSelections(prev => ({ ...prev, ...updates }));
  };

  // Validation
  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    switch (currentStep) {
      case 'video':
        if (!selections.videoType) {
          newErrors.videoType = 'Please select a video service type';
        }
        if (selections.videoMinutes < 1) {
          newErrors.videoMinutes = 'Videos must be at least 1 minute';
        }
        break;
      case 'website':
        if (!selections.websiteType) {
          newErrors.websiteType = 'Please select a website service option';
        }
        break;
      case 'additional':
        if (selections.altLanguageMinutes < 0) {
          newErrors.altLanguageMinutes = 'Alternative language minutes cannot be negative';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle step progression with validation
  const handleNext = () => {
    if (validateCurrentStep()) {
      goNext();
    }
  };

  // Render current step content
  const renderStepContent = () => {
    const commonProps = {
      selections,
      onSelectionsChange: updateSelections,
      employeeCount,
      onEmployeeCountChange: setEmployeeCount,
      errors,
      isLoading,
    };

    switch (currentStep) {
      case 'video':
        return <VideoServiceSelector {...commonProps} />;
      case 'website':
        return <WebsiteServiceSelector {...commonProps} />;
      case 'additional':
        return <AdditionalServices {...commonProps} />;
      case 'pricing':
        return pricing ? <PricingBreakdownComponent pricing={pricing} {...commonProps} /> : null;
      case 'roi':
        return roiMetrics ? <ROICalculator metrics={roiMetrics} {...commonProps} /> : null;
      case 'summary':
        return pricing && roiMetrics ? (
          <CalculatorSummary 
            pricing={pricing} 
            roiMetrics={roiMetrics}
            onLeadCapture={onLeadCapture}
            {...commonProps} 
          />
        ) : null;
      default:
        return null;
    }
  };

  // Loading state
  if (isLoading && !pricing) {
    return (
      <Card className="p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-oklch(240.325_100%_50%) mx-auto mb-4" />
        <p className="text-gray-600">Calculating your pricing...</p>
      </Card>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <Badge className="mb-4 bg-oklch(240.325_30%_70%)/10 text-oklch(240.325_100%_35%) border-oklch(240.325_30%_70%)/20">
          Interactive Pricing Calculator
        </Badge>
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Calculate Your Benefits Video Investment
        </h1>
        <p className="text-xl text-gray-600">
          Get transparent pricing and see your expected ROI in real-time
        </p>
      </div>

      {/* Progress Bar */}
      {!compactMode && (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">
              Step {getCurrentStepIndex() + 1} of {CALCULATOR_STEPS.length}
            </span>
            <span className="font-medium text-oklch(240.325_100%_50%)">
              {Math.round(getProgress())}% Complete
            </span>
          </div>
          <Progress value={getProgress()} className="h-2" />
        </div>
      )}

      {/* Step Navigation */}
      {!compactMode && (
        <div className="flex flex-wrap gap-2 justify-center">
          {CALCULATOR_STEPS.map((step, index) => {
            const isCurrent = currentStep === step.id;
            const isCompleted = getCurrentStepIndex() > index;
            const isAccessible = index <= getCurrentStepIndex();
            
            return (
              <button
                key={step.id}
                onClick={() => isAccessible && goToStep(step.id)}
                disabled={!isAccessible}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all
                  ${isCurrent 
                    ? 'bg-oklch(240.325_100%_50%) text-white shadow-md' 
                    : isCompleted
                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                    : isAccessible
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                {isCompleted ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  step.icon
                )}
                <span className="hidden sm:inline">{step.title}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Error Display */}
      {errors.general && (
        <Card className="p-4 bg-red-50 border-red-200">
          <div className="flex items-center gap-2 text-red-800">
            <AlertCircle className="h-5 w-5" />
            <p>{errors.general}</p>
          </div>
        </Card>
      )}

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderStepContent()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-100">
        <Button
          variant="outline"
          onClick={goPrev}
          disabled={!canGoPrev()}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            {CALCULATOR_STEPS[getCurrentStepIndex()].description}
          </p>
        </div>

        <Button
          onClick={handleNext}
          disabled={!canGoNext()}
          className="flex items-center gap-2 bg-oklch(240.325_100%_50%) hover:bg-oklch(240.325_100%_45%)"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}