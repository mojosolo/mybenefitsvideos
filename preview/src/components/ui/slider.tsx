import * as React from "react";
import { cn } from "@/lib/utils";

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  formatValue?: (value: number) => string;
  showValue?: boolean;
  marks?: { value: number; label: string }[];
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ 
    className, 
    value = 0, 
    onValueChange, 
    min = 0, 
    max = 100, 
    step = 1,
    formatValue,
    showValue = true,
    marks = [],
    ...props 
  }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(e.target.value, 10);
      if (onValueChange) {
        onValueChange(newValue);
      }
    };

    const getFormattedValue = (val: number) => {
      if (formatValue) {
        return formatValue(val);
      }
      return val.toLocaleString();
    };

    const percentage = ((value - min) / (max - min)) * 100;

    return (
      <div className="relative w-full">
        <div className="relative">
          <input
            ref={ref}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleChange}
            className={cn(
              "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-oklch(240.325_100%_50%) focus:ring-offset-2",
              "slider-thumb:appearance-none slider-thumb:h-4 slider-thumb:w-4 slider-thumb:rounded-full slider-thumb:bg-oklch(240.325_100%_50%) slider-thumb:cursor-pointer slider-thumb:shadow-md",
              "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-oklch(240.325_100%_50%) [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md",
              "[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-oklch(240.325_100%_50%) [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:border-none",
              className
            )}
            {...props}
          />
          {/* Track fill */}
          <div 
            className="absolute top-1/2 left-0 h-2 bg-oklch(240.325_100%_50%) rounded-lg pointer-events-none transform -translate-y-1/2"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Value display */}
        {showValue && (
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">${min.toLocaleString()}</span>
            <span className="text-sm font-medium text-oklch(240.325_100%_50%)">
              {getFormattedValue(value)}
            </span>
            <span className="text-sm text-gray-500">${max.toLocaleString()}+</span>
          </div>
        )}

        {/* Marks */}
        {marks.length > 0 && (
          <div className="relative mt-2">
            <div className="flex justify-between">
              {marks.map((mark, index) => {
                const markPercentage = ((mark.value - min) / (max - min)) * 100;
                return (
                  <div
                    key={index}
                    className="absolute text-xs text-gray-400 transform -translate-x-1/2"
                    style={{ left: `${markPercentage}%` }}
                  >
                    {mark.label}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
);
Slider.displayName = "Slider";

export { Slider };