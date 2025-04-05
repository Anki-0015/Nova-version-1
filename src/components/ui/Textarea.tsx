import React, { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  autoResize?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, fullWidth = true, autoResize = false, className = '', ...props }, ref) => {
    const widthClass = fullWidth ? 'w-full' : '';
    const errorClass = error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : '';
    
    // Handle auto-resize
    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      if (autoResize) {
        const target = e.currentTarget;
        target.style.height = 'auto';
        target.style.height = `${target.scrollHeight}px`;
      }
    };
    
    return (
      <div className={`${widthClass} ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        
        <textarea
          ref={ref}
          className={`
            px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm 
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
            dark:bg-dark-200 dark:border-dark-400 dark:text-white
            ${errorClass}
            ${widthClass}
          `}
          onInput={autoResize ? handleInput : undefined}
          rows={props.rows || 3}
          {...props}
        />
        
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;