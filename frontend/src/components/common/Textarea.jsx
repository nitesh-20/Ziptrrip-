import React, { forwardRef } from 'react';

const Textarea = forwardRef(({ 
    label, 
    error, 
    className = '', 
    id, 
    required,
    maxLength,
    value,
    ...props 
}, ref) => {
    
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const currentLength = value?.length || 0;

    return (
        <div className={`w-full ${className}`}>
            <div className="flex justify-between items-end mb-1.5">
                {label && (
                    <label 
                        htmlFor={textareaId} 
                        className="block text-sm font-medium text-primary"
                    >
                        {label} {required && <span className="text-red-500">*</span>}
                    </label>
                )}
                {maxLength && (
                    <span className={`text-xs ${currentLength > maxLength ? 'text-red-500' : 'text-secondary'}`}>
                        {currentLength} / {maxLength}
                    </span>
                )}
            </div>
            
            <div className="relative">
                <textarea
                    ref={ref}
                    id={textareaId}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={error ? `${textareaId}-error` : undefined}
                    value={value}
                    className={`
                        flex min-h-[80px] w-full rounded-md border bg-surface px-3 py-2 text-sm text-primary
                        placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-border
                        disabled:cursor-not-allowed disabled:opacity-50
                        transition-colors resize-y
                        ${error ? 'border-red-500 focus-visible:ring-red-500/20' : 'border-border hover:border-gray-300'}
                    `}
                    {...props}
                />
            </div>
            {error && (
                <p id={`${textareaId}-error`} className="mt-1.5 text-sm text-red-500 font-medium animate-in fade-in slide-in-from-top-1">
                    {error}
                </p>
            )}
        </div>
    );
});

Textarea.displayName = 'Textarea';

export default Textarea;
