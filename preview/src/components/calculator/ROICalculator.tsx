"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  type PricingSelections,
  type ROIMetrics,
  formatCurrency,
  formatNumber 
} from '@/lib/pricing';
import { 
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  BarChart3,
  Calculator,
  Target,
  Award,
  CheckCircle,
  Info,
  ArrowUp,
  ArrowDown,
  Zap
} from 'lucide-react';

interface ROICalculatorProps {
  metrics: ROIMetrics;
  selections: PricingSelections;
  onSelectionsChange: (updates: Partial<PricingSelections>) => void;
  employeeCount: number;
  onEmployeeCountChange: (count: number) => void;
  errors: Record<string, string>;
  isLoading: boolean;
}

interface ROICard {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  trend: 'up' | 'down' | 'neutral';
  description: string;
}

export default function ROICalculator({ 
  metrics, 
  selections, 
  onSelectionsChange,
  employeeCount,
  onEmployeeCountChange,
  errors, 
  isLoading 
}: ROICalculatorProps) {
  const [customEmployeeCount, setCustomEmployeeCount] = useState(employeeCount);

  const handleEmployeeCountChange = (count: number) => {
    setCustomEmployeeCount(count);
    onEmployeeCountChange(count);
  };

  const roiCards: ROICard[] = [
    {
      title: 'Employee Engagement',
      value: `${metrics.employeeEngagementIncrease}%`,
      subtitle: 'Increase in engagement',
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'text-green-600 bg-green-50 border-green-200',
      trend: 'up',
      description: 'Video content increases employee engagement with benefits information by making complex topics easier to understand and more memorable.'
    },
    {
      title: 'Enrollment Rate',
      value: `${metrics.enrollmentRateIncrease}%`,
      subtitle: 'Higher participation',
      icon: <Users className="h-6 w-6" />,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      trend: 'up',
      description: 'Clear video explanations help employees understand benefit value, leading to better enrollment decisions and higher participation rates.'
    },
    {
      title: 'HR Time Savings',
      value: `${formatNumber(metrics.hrTimeSavingsHours)} hrs`,
      subtitle: 'Hours saved monthly',
      icon: <Clock className="h-6 w-6" />,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      trend: 'down',
      description: 'Reduced individual benefits consultations and fewer questions to HR staff, freeing up time for strategic initiatives.'
    },
    {
      title: 'Cost Per Employee',
      value: formatCurrency(metrics.costPerEmployee),
      subtitle: 'Investment per person',
      icon: <DollarSign className="h-6 w-6" />,
      color: 'text-oklch(240.325_100%_50%) bg-oklch(240.325_30%_95%) border-oklch(240.325_30%_70%)',
      trend: 'neutral',
      description: 'Low per-employee cost makes this investment highly scalable and cost-effective for organizations of any size.'
    },
    {
      title: 'Break-Even Period',
      value: `${metrics.breakEvenMonths}`,
      subtitle: 'Months to ROI',
      icon: <Target className="h-6 w-6" />,
      color: 'text-orange-600 bg-orange-50 border-orange-200',
      trend: 'down',
      description: 'Time to recover your investment through HR efficiency gains and reduced benefits administration costs.'
    },
    {
      title: 'Annual Savings',
      value: formatCurrency(metrics.annualSavings),
      subtitle: 'Estimated yearly benefit',
      icon: <Award className="h-6 w-6" />,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      trend: 'up',
      description: 'Projected annual savings from reduced HR time, fewer benefits questions, and improved enrollment efficiency.'
    }
  ];

  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <ArrowDown className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const renderMetricCard = (card: ROICard, index: number) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className={`p-6 h-full border-2 ${card.color}`}>
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg ${card.color}`}>
            {card.icon}
          </div>
          {getTrendIcon(card.trend)}
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900">{card.title}</h3>
          <div className="text-3xl font-bold text-gray-900">
            {card.value}
          </div>
          <p className="text-sm text-gray-600">{card.subtitle}</p>
          <p className="text-xs text-gray-500 leading-relaxed">
            {card.description}
          </p>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Return on Investment Analysis
        </h2>
        <p className="text-gray-600">
          See how your benefits video investment will pay for itself through improved engagement and efficiency.
        </p>
      </div>

      {/* Employee Count Adjuster */}
      <Card className="p-6 max-w-2xl mx-auto">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Customize ROI for Your Organization
          </h3>
          <p className="text-sm text-gray-600">
            Adjust employee count to see ROI metrics specific to your organization size.
          </p>
        </div>
        
        <div className="space-y-4">
          <Label className="block text-sm font-medium text-gray-700">
            Number of Employees: {formatNumber(customEmployeeCount)}
          </Label>
          <Slider
            value={customEmployeeCount}
            onValueChange={handleEmployeeCountChange}
            min={50}
            max={5000}
            step={50}
            formatValue={(value) => formatNumber(value)}
            marks={[
              { value: 100, label: '100' },
              { value: 500, label: '500' },
              { value: 1000, label: '1K' },
              { value: 2500, label: '2.5K' },
              { value: 5000, label: '5K' }
            ]}
            className="mb-4"
          />
          <div className="bg-oklch(240.325_30%_95%) p-3 rounded-lg text-center">
            <p className="text-sm text-oklch(240.325_100%_50%) font-medium">
              ROI calculations updated for {formatNumber(customEmployeeCount)} employees
            </p>
          </div>
        </div>
      </Card>

      {/* ROI Metrics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {roiCards.map((card, index) => renderMetricCard(card, index))}
      </div>

      {/* ROI Summary */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calculator className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Your ROI Summary
          </h3>
          <p className="text-gray-600">
            Based on industry benchmarks and your organization size
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {Math.round((metrics.annualSavings / (metrics.costPerEmployee * customEmployeeCount)) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Annual ROI</div>
            <div className="text-xs text-gray-500 mt-1">
              Return on your video investment
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {metrics.breakEvenMonths}
            </div>
            <div className="text-sm text-gray-600">Months to Break Even</div>
            <div className="text-xs text-gray-500 mt-1">
              When investment pays for itself
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {formatNumber(Math.round(metrics.hrTimeSavingsHours * 12))} hrs
            </div>
            <div className="text-sm text-gray-600">Annual Time Savings</div>
            <div className="text-xs text-gray-500 mt-1">
              HR hours freed for strategic work
            </div>
          </div>
        </div>
      </Card>

      {/* Industry Benchmarks */}
      <Card className="p-6 max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Industry Benchmarks
          </h3>
          <p className="text-gray-600">
            Our ROI calculations are based on real-world data from benefits communication studies
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Video vs. Traditional Methods
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-sm text-blue-800">Information Retention</span>
                <Badge className="bg-blue-600">3x Higher</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm text-green-800">Employee Engagement</span>
                <Badge className="bg-green-600">65% Increase</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-sm text-purple-800">Completion Rates</span>
                <Badge className="bg-purple-600">80% Higher</Badge>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <Target className="h-5 w-5" />
              Operational Benefits
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <span className="text-sm text-orange-800">HR Questions Reduced</span>
                <Badge className="bg-orange-600">60% Fewer</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="text-sm text-red-800">Enrollment Time Saved</span>
                <Badge className="bg-red-600">40% Faster</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                <span className="text-sm text-emerald-800">Benefits Utilization</span>
                <Badge className="bg-emerald-600">25% Increase</Badge>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Scenarios Comparison */}
      <Card className="p-6 max-w-4xl mx-auto bg-gray-50">
        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
          With vs. Without Benefits Videos
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Without Videos */}
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
              <ArrowDown className="h-4 w-4" />
              Traditional Benefits Communication
            </h4>
            <ul className="space-y-2 text-sm text-red-700">
              <li>• Employees struggle with complex benefit documents</li>
              <li>• HR spends hours explaining benefits individually</li>
              <li>• Low enrollment in valuable benefit programs</li>
              <li>• Frequent benefits-related questions and confusion</li>
              <li>• Missed opportunities for employee engagement</li>
              <li>• Higher administrative costs and time investment</li>
            </ul>
          </div>

          {/* With Videos */}
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
              <ArrowUp className="h-4 w-4" />
              With Professional Benefits Videos
            </h4>
            <ul className="space-y-2 text-sm text-green-700">
              <li>• Clear, engaging explanations of all benefits</li>
              <li>• Self-service education reduces HR workload</li>
              <li>• Higher participation in benefit programs</li>
              <li>• Fewer questions and faster enrollment</li>
              <li>• Improved employee satisfaction and engagement</li>
              <li>• Scalable solution that works for any org size</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Call to Action */}
      <Card className="p-6 bg-gradient-to-r from-oklch(240.325_30%_95%) to-oklch(240.325_40%_90%) border-oklch(240.325_30%_70%) max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 bg-oklch(240.325_100%_50%)/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Zap className="h-8 w-8 text-oklch(240.325_100%_50%)" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Ready to See These Results?
        </h3>
        <p className="text-gray-600 mb-4">
          Your investment of {formatCurrency(metrics.costPerEmployee * customEmployeeCount)} could save your 
          organization {formatCurrency(metrics.annualSavings)} annually while improving employee engagement.
        </p>
        <div className="text-sm text-gray-500">
          <CheckCircle className="h-4 w-4 inline mr-1 text-green-600" />
          100% satisfaction guarantee • 
          <CheckCircle className="h-4 w-4 inline mx-1 text-green-600" />
          {metrics.breakEvenMonths}-month break-even • 
          <CheckCircle className="h-4 w-4 inline mx-1 text-green-600" />
          Proven results
        </div>
      </Card>

      {/* Methodology Note */}
      <Card className="p-4 bg-blue-50 border-blue-200 max-w-4xl mx-auto">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">ROI Methodology</h4>
            <p className="text-sm text-blue-800">
              Our ROI calculations are based on industry studies from the Society for Human Resource Management (SHRM), 
              Employee Benefit Research Institute (EBRI), and our own client data from 200+ successful implementations. 
              Actual results may vary based on organization size, industry, and implementation quality.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}