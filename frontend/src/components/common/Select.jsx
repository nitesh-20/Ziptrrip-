import React, { forwardRef } from 'react';

const Select = forwardRef(({ 
    label, 
    error, 
    className = '', 
    id, 
    required,
    children,
    ...props 
}, ref) => {
    
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label 
                    htmlFor={selectId} 
                    className="block text-sm font-medium text-primary mb-1.5"
                >
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <div className="relative">
                <select
                    ref={ref}
                    id={selectId}
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={error ? `${selectId}-error` : undefined}
                    className={`
                        flex h-10 w-full appearance-none rounded-md border bg-surface px-3 py-2 pr-8 text-sm text-primary
                        placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-border
                        disabled:cursor-not-allowed disabled:opacity-50
                        transition-colors
                        ${error ? 'border-red-500 focus-visible:ring-red-500/20' : 'border-border hover:border-gray-300'}
                    `}
                    {...props}
                >
                    {children}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-secondary">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
            {error && (
                <p id={`${selectId}-error`} className="mt-1.5 text-sm text-red-500 font-medium animate-in fade-in slide-in-from-top-1">
                    {error}
                </p>
            )}
        </div>
    );
});

Select.displayName = 'Select';

export default Select;
