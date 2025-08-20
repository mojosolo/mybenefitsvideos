"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  FileText, 
  Languages, 
  RefreshCw,
  Mic,
  User,
  Bot,
  Plus,
  Minus,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SERVICE_PRICING, formatCurrency, type PricingSelections } from '@/lib/pricing';

interface AdditionalServicesProps {
  selections: PricingSelections;
  onSelectionsChange: (updates: Partial<PricingSelections>) => void;
  errors?: Record<string, string>;
}

export default function AdditionalServices({ 
  selections, 
  onSelectionsChange, 
  errors = {} 
}: AdditionalServicesProps) {

  const updateAltLanguageMinutes = (newMinutes: number) => {
    onSelectionsChange({ altLanguageMinutes: Math.max(0, newMinutes) });
  };

  const calculateDiyPrice = () => {
    let price = SERVICE_PRICING.addons.diyPowerpoint;
    if (selections.diyHumanVoice) {
      price += SERVICE_PRICING.addons.diyHumanVoice;
    }
    return price;
  };

  const calculatePptAltPrice = () => {
    let price = SERVICE_PRICING.addons.pptAltLanguage;
    if (selections.pptAltLanguageHumanVoice) {
      price += SERVICE_PRICING.addons.pptAltLanguageHuman;
    }
    return price;
  };

  const calculateVideoUpdatePrice = () => {
    return selections.videoUpdatesWithVoice ? 
      SERVICE_PRICING.addons.videoUpdatesVoice : 
      SERVICE_PRICING.addons.videoUpdatesBasic;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Additional Services
        </h2>
        <p className="text-gray-600">
          Extend your video investment with these specialized services
        </p>
      </div>

      {/* Alternative Language Videos */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
              <Languages className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Alternative Language Videos
              </h3>
              <p className="text-gray-600">
                Professional translations with native speaker voiceovers
              </p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Switch
                checked={selections.altLanguageMinutes > 0}
                onCheckedChange={(checked) => 
                  onSelectionsChange({ 
                    altLanguageMinutes: checked ? Math.max(1, selections.videoMinutes) : 0 
                  })
                }
              />
              <Label className="font-medium">
                Add alternative language versions
              </Label>
            </div>

            {selections.altLanguageMinutes > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">
                    Duration: {selections.altLanguageMinutes} minute{selections.altLanguageMinutes !== 1 ? 's' : ''}
                  </Label>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => updateAltLanguageMinutes(selections.altLanguageMinutes - 1)}
                      disabled={selections.altLanguageMinutes <= 0}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-lg font-semibold w-12 text-center">
                      {selections.altLanguageMinutes}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => updateAltLanguageMinutes(selections.altLanguageMinutes + 1)}
                      disabled={selections.altLanguageMinutes >= 10}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Slider
                  min={0}
                  max={10}
                  step={1}
                  value={selections.altLanguageMinutes}
                  onValueChange={(value) => updateAltLanguageMinutes(value)}
                  className="w-full"
                />

                <div className="bg-white rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {selections.altLanguageMinutes} min × {formatCurrency(SERVICE_PRICING.addons.altLanguage)}/min
                    </span>
                    <span className="font-semibold text-blue-600">
                      {formatCurrency(selections.altLanguageMinutes * SERVICE_PRICING.addons.altLanguage)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Available after English video final + tax
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* DIY PowerPoint License */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                DIY PowerPoint License
              </h3>
              <p className="text-gray-600">
                Transform your existing presentations into professional videos
              </p>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-4">
              <Switch
                checked={selections.diyPowerpoint}
                onCheckedChange={(checked) => onSelectionsChange({ diyPowerpoint: checked })}
              />
              <Label className="font-medium">
                Add DIY PowerPoint License
              </Label>
            </div>

            {selections.diyPowerpoint && (
              <div className="space-y-4">
                {/* Voice Options */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Voice Options:</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Card 
                      className={`p-3 cursor-pointer border-2 transition-colors ${
                        !selections.diyHumanVoice 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => onSelectionsChange({ diyHumanVoice: false })}
                    >
                      <div className="flex items-center gap-2">
                        <Bot className="h-4 w-4 text-gray-600" />
                        <div>
                          <div className="font-medium text-sm">AI Voiceover</div>
                          <div className="text-xs text-gray-500">High-quality AI narration</div>
                        </div>
                      </div>
                    </Card>
                    
                    <Card 
                      className={`p-3 cursor-pointer border-2 transition-colors ${
                        selections.diyHumanVoice 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => onSelectionsChange({ diyHumanVoice: true })}
                    >
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-600" />
                        <div>
                          <div className="font-medium text-sm">Human Voiceover</div>
                          <div className="text-xs text-gray-500">Professional narrator</div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-3">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Base DIY License (AI VO):</span>
                      <span className="font-semibold">
                        {formatCurrency(SERVICE_PRICING.addons.diyPowerpoint)}
                      </span>
                    </div>
                    {selections.diyHumanVoice && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Human Voice Upgrade:</span>
                        <span className="font-semibold">
                          +{formatCurrency(SERVICE_PRICING.addons.diyHumanVoice)}
                        </span>
                      </div>
                    )}
                    <div className="border-t pt-2 flex justify-between items-center font-semibold">
                      <span>Total DIY License:</span>
                      <span className="text-green-600">
                        {formatCurrency(calculateDiyPrice())}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">+ tax</div>
                  </div>
                </div>

                {/* PPT Alternative Language */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={selections.pptAltLanguage}
                      onCheckedChange={(checked) => onSelectionsChange({ pptAltLanguage: checked })}
                    />
                    <Label className="font-medium text-sm">
                      Add PPT Alternative Language Version
                    </Label>
                  </div>

                  {selections.pptAltLanguage && (
                    <div className="bg-gray-50 rounded-lg p-3 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <Card 
                          className={`p-2 cursor-pointer border-2 transition-colors ${
                            !selections.pptAltLanguageHumanVoice 
                              ? 'border-green-500 bg-green-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => onSelectionsChange({ pptAltLanguageHumanVoice: false })}
                        >
                          <div className="flex items-center gap-2">
                            <Bot className="h-4 w-4" />
                            <span className="text-xs font-medium">AI VO</span>
                          </div>
                        </Card>
                        
                        <Card 
                          className={`p-2 cursor-pointer border-2 transition-colors ${
                            selections.pptAltLanguageHumanVoice 
                              ? 'border-green-500 bg-green-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => onSelectionsChange({ pptAltLanguageHumanVoice: true })}
                        >
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span className="text-xs font-medium">Human VO</span>
                          </div>
                        </Card>
                      </div>

                      <div className="bg-white rounded-lg p-2">
                        <div className="flex justify-between items-center text-sm">
                          <span>PPT Alt Language:</span>
                          <span className="font-semibold text-green-600">
                            {formatCurrency(calculatePptAltPrice())}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Video Updates */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
              <RefreshCw className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Video Updates
              </h3>
              <p className="text-gray-600">
                Modifications to existing video content
              </p>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-4">
              <Switch
                checked={selections.videoUpdates}
                onCheckedChange={(checked) => onSelectionsChange({ videoUpdates: checked })}
              />
              <Label className="font-medium">
                Add video update service
              </Label>
            </div>

            {selections.videoUpdates && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Update Type:</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Card 
                      className={`p-3 cursor-pointer border-2 transition-colors ${
                        !selections.videoUpdatesWithVoice 
                          ? 'border-purple-500 bg-purple-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => onSelectionsChange({ videoUpdatesWithVoice: false })}
                    >
                      <div className="space-y-1">
                        <div className="font-medium text-sm">No VO Changes</div>
                        <div className="text-xs text-gray-600">
                          Visual updates only, no voiceover modifications
                        </div>
                        <div className="font-semibold text-purple-600">
                          {formatCurrency(SERVICE_PRICING.addons.videoUpdatesBasic)}
                        </div>
                      </div>
                    </Card>
                    
                    <Card 
                      className={`p-3 cursor-pointer border-2 transition-colors ${
                        selections.videoUpdatesWithVoice 
                          ? 'border-purple-500 bg-purple-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => onSelectionsChange({ videoUpdatesWithVoice: true })}
                    >
                      <div className="space-y-1">
                        <div className="font-medium text-sm">With VO Changes</div>
                        <div className="text-xs text-gray-600">
                          Visual updates plus voiceover modifications
                        </div>
                        <div className="font-semibold text-purple-600">
                          {formatCurrency(SERVICE_PRICING.addons.videoUpdatesVoice)}
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Video Updates ({selections.videoUpdatesWithVoice ? 'with VO' : 'no VO'}):
                    </span>
                    <span className="font-semibold text-purple-600">
                      {formatCurrency(calculateVideoUpdatePrice())}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Summary of Additional Services */}
      {(selections.altLanguageMinutes > 0 || selections.diyPowerpoint || selections.videoUpdates) && (
        <Card className="p-6 bg-gradient-to-r from-gray-50 to-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Additional Services Summary
          </h3>
          
          <div className="space-y-3">
            {selections.altLanguageMinutes > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">
                    Alternative Language Videos ({selections.altLanguageMinutes} min)
                  </span>
                </div>
                <span className="font-semibold text-blue-600">
                  {formatCurrency(selections.altLanguageMinutes * SERVICE_PRICING.addons.altLanguage)}
                </span>
              </div>
            )}

            {selections.diyPowerpoint && (
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">
                      DIY PowerPoint License ({selections.diyHumanVoice ? 'Human' : 'AI'} VO)
                    </span>
                  </div>
                  <span className="font-semibold text-green-600">
                    {formatCurrency(calculateDiyPrice())}
                  </span>
                </div>
                
                {selections.pptAltLanguage && (
                  <div className="flex items-center justify-between ml-6">
                    <span className="text-sm text-gray-600">
                      + PPT Alt Language ({selections.pptAltLanguageHumanVoice ? 'Human' : 'AI'} VO)
                    </span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(calculatePptAltPrice())}
                    </span>
                  </div>
                )}
              </div>
            )}

            {selections.videoUpdates && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">
                    Video Updates ({selections.videoUpdatesWithVoice ? 'with VO' : 'no VO'})
                  </span>
                </div>
                <span className="font-semibold text-purple-600">
                  {formatCurrency(calculateVideoUpdatePrice())}
                </span>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Error Display */}
      {Object.keys(errors).length > 0 && (
        <Card className="p-4 bg-red-50 border-red-200">
          <div className="flex items-center gap-2 text-red-800">
            <AlertCircle className="h-5 w-5" />
            <div className="space-y-1">
              {Object.values(errors).map((error, index) => (
                <p key={index} className="text-sm">{error}</p>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}