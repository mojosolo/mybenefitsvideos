"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface FormFieldProps {
  label: string;
  type: "text" | "email" | "tel" | "select" | "textarea";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  options?: string[];
  rows?: number;
  className?: string;
  error?: string;
}

export default function FormField({
  label,
  type,
  placeholder,
  value,
  onChange,
  required,
  options = [],
  rows = 3,
  className,
  error
}: FormFieldProps) {
  const baseInputClasses = cn(
    "w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-oklch(240.325 100% 50%)/20 focus:border-oklch(240.325 100% 50%) outline-none transition-colors",
    error && "border-red-300 focus:border-red-500 focus:ring-red-500/20",
    className
  );

  const renderInput = () => {
    switch (type) {
      case "select":
        return (
          <div className="relative">
            <select
              value={value}
              onChange={(e) => onChange(e.target.value)}
              required={required}
              className={cn(
                baseInputClasses,
                "appearance-none bg-white cursor-pointer pr-10",
                !value && "text-gray-400"
              )}
            >
              <option value="" disabled className="text-gray-400">
                {placeholder}
              </option>
              {options.map((option) => (
                <option key={option} value={option} className="text-gray-900">
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        );

      case "textarea":
        return (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            rows={rows}
            className={cn(
              baseInputClasses,
              "resize-vertical min-h-[100px]"
            )}
          />
        );

      default:
        return (
          <Input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            className={cn(
              "h-12 px-4 border-gray-200 focus:ring-oklch(240.325 100% 50%)/20 focus:border-oklch(240.325 100% 50%)",
              error && "border-red-300 focus:border-red-500 focus:ring-red-500/20"
            )}
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      <Label 
        htmlFor={label.toLowerCase().replace(/\s+/g, '-')}
        className="text-sm font-medium text-gray-900"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      {renderInput()}
      
      {error && (
        <p className="text-sm text-red-600 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}