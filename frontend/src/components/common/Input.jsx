import React, { forwardRef } from 'react';

const Input = forwardRef(({ 
    label, 
    error, 
    className = '', 
    inputClassName = '',
    id, 
    required,
    ...props 
}, ref) => {
    
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label 
                    htmlFor={inputId} 
                    className="block text-sm font-medium text-primary mb-1.5"
                >
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <div className="relative">
                <input
                    ref={ref}
                    id={inputId}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={error ? `${inputId}-error` : undefined}
                    className={`
                        flex h-10 w-full rounded-md border bg-surface px-3 py-2 text-sm text-primary
                        file:border-0 file:bg-transparent file:text-sm file:font-medium 
                        placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-border
                        disabled:cursor-not-allowed disabled:opacity-50
                        transition-colors
                        ${error ? 'border-red-500 focus-visible:ring-red-500/20' : 'border-border hover:border-gray-300'}
                        ${inputClassName}
                    `}
                    {...props}
                />
            </div>
            {error && (
                <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-500 font-medium animate-in fade-in slide-in-from-top-1">
                    {error}
                </p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
