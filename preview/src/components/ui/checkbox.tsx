import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  error?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error, children, ...props }, ref) => {
    return (
      <div className="flex items-start gap-3">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            ref={ref}
            className={cn(
              "peer h-4 w-4 shrink-0 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-oklch(240.325_100%_50%) focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
              "checked:bg-oklch(240.325_100%_50%) checked:border-oklch(240.325_100%_50%)",
              error && "border-red-500 focus:ring-red-500",
              className
            )}
            {...props}
          />
          <Check className="absolute h-3 w-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-0.5 top-0.5" />
        </div>
        
        {(label || children) && (
          <div className="flex-1">
            {label && (
              <label
                htmlFor={props.id}
                className={cn(
                  "text-sm font-medium leading-none cursor-pointer",
                  error ? "text-red-900" : "text-gray-900",
                  props.disabled && "cursor-not-allowed opacity-50"
                )}
              >
                {label}
              </label>
            )}
            {children && (
              <div className={cn(
                "text-sm leading-none cursor-pointer",
                error ? "text-red-900" : "text-gray-900",
                props.disabled && "cursor-not-allowed opacity-50"
              )}>
                {children}
              </div>
            )}
            {description && (
              <p className={cn(
                "text-sm text-gray-600 mt-1",
                props.disabled && "opacity-50"
              )}>
                {description}
              </p>
            )}
            {error && (
              <p className="text-sm text-red-600 mt-1">
                {error}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };