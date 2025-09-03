"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface RangeSliderProps {
  value: [number, number];
  onValueChange: (value: [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  disabled?: boolean;
}

const RangeSlider = React.forwardRef<HTMLDivElement, RangeSliderProps>(
  ({ 
    value, 
    onValueChange, 
    min = 0, 
    max = 100, 
    step = 1,
    className,
    disabled = false
  }, ref) => {
    const [isDragging, setIsDragging] = React.useState<'min' | 'max' | null>(null);
    const sliderRef = React.useRef<HTMLDivElement>(null);
    
    const getPercentage = (val: number) => ((val - min) / (max - min)) * 100;
    
    const getValue = (clientX: number) => {
      if (!sliderRef.current) return min;
      
      const rect = sliderRef.current.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const rawValue = min + percentage * (max - min);
      const steppedValue = Math.round(rawValue / step) * step;
      
      return Math.max(min, Math.min(max, steppedValue));
    };
    
    const handleMouseDown = (type: 'min' | 'max') => (e: React.MouseEvent) => {
      if (disabled) return;
      e.preventDefault();
      setIsDragging(type);
    };
    
    const handleMouseMove = React.useCallback((e: MouseEvent) => {
      if (!isDragging || disabled) return;
      
      const newValue = getValue(e.clientX);
      const [minVal, maxVal] = value;
      
      if (isDragging === 'min') {
        onValueChange([Math.min(newValue, maxVal - step), maxVal]);
      } else {
        onValueChange([minVal, Math.max(newValue, minVal + step)]);
      }
    }, [isDragging, value, onValueChange, disabled, step]);
    
    const handleMouseUp = React.useCallback(() => {
      setIsDragging(null);
    }, []);
    
    React.useEffect(() => {
      if (isDragging) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        
        return () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        };
      }
    }, [isDragging, handleMouseMove, handleMouseUp]);
    
    const minPercentage = getPercentage(value[0]);
    const maxPercentage = getPercentage(value[1]);
    
    return (
      <div 
        ref={ref}
        className={cn("relative w-full", className)}
      >
        {/* Track */}
        <div 
          ref={sliderRef}
          className={cn(
            "relative h-2 bg-gray-200 rounded-full cursor-pointer",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {/* Active range */}
          <div 
            className="absolute h-2 bg-oklch(240.325 100% 50%) rounded-full"
            style={{
              left: `${minPercentage}%`,
              right: `${100 - maxPercentage}%`
            }}
          />
          
          {/* Min thumb */}
          <div 
            className={cn(
              "absolute w-5 h-5 bg-white border-2 border-oklch(240.325 100% 50%) rounded-full cursor-grab transform -translate-x-1/2 -translate-y-1/2 top-1/2 transition-shadow",
              "hover:shadow-md focus:shadow-md focus:outline-none",
              isDragging === 'min' && "cursor-grabbing shadow-md",
              disabled && "cursor-not-allowed"
            )}
            style={{ left: `${minPercentage}%` }}
            onMouseDown={handleMouseDown('min')}
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(e) => {
              if (disabled) return;
              
              let newMin = value[0];
              if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                newMin = Math.max(min, value[0] - step);
                e.preventDefault();
              } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                newMin = Math.min(value[1] - step, value[0] + step);
                e.preventDefault();
              }
              
              if (newMin !== value[0]) {
                onValueChange([newMin, value[1]]);
              }
            }}
          />
          
          {/* Max thumb */}
          <div 
            className={cn(
              "absolute w-5 h-5 bg-white border-2 border-oklch(240.325 100% 50%) rounded-full cursor-grab transform -translate-x-1/2 -translate-y-1/2 top-1/2 transition-shadow",
              "hover:shadow-md focus:shadow-md focus:outline-none",
              isDragging === 'max' && "cursor-grabbing shadow-md",
              disabled && "cursor-not-allowed"
            )}
            style={{ left: `${maxPercentage}%` }}
            onMouseDown={handleMouseDown('max')}
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(e) => {
              if (disabled) return;
              
              let newMax = value[1];
              if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                newMax = Math.max(value[0] + step, value[1] - step);
                e.preventDefault();
              } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                newMax = Math.min(max, value[1] + step);
                e.preventDefault();
              }
              
              if (newMax !== value[1]) {
                onValueChange([value[0], newMax]);
              }
            }}
          />
        </div>
      </div>
    );
  }
);

RangeSlider.displayName = "RangeSlider";

export { RangeSlider };