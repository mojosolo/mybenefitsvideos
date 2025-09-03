import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  showCharCount?: boolean;
  maxLength?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, showCharCount, maxLength, value, onChange, ...props }, ref) => {
    const [charCount, setCharCount] = React.useState(0);

    React.useEffect(() => {
      if (typeof value === 'string') {
        setCharCount(value.length);
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      
      if (maxLength && newValue.length > maxLength) {
        return; // Don't allow typing beyond max length
      }
      
      setCharCount(newValue.length);
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className="relative">
        <textarea
          className={cn(
            "flex min-h-[60px] w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-oklch(240.325_100%_50%) focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 resize-none",
            showCharCount && "pb-8", // Add padding for character count
            className
          )}
          ref={ref}
          value={value}
          onChange={onChange ? handleChange : undefined}
          maxLength={maxLength}
          {...props}
        />
        {showCharCount && (
          <div className="absolute bottom-2 right-2 text-xs text-gray-400">
            {charCount}
            {maxLength && ` / ${maxLength}`}
          </div>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };