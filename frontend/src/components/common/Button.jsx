import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

const Button = forwardRef(({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false, 
    className = '', 
    disabled, 
    type = 'button',
    ...props 
}, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center font-medium transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-border disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
        primary: "bg-primary text-white hover:bg-primary/90 shadow-sm",
        secondary: "bg-surface text-primary border border-border hover:bg-muted shadow-sm",
        ghost: "bg-transparent text-secondary hover:text-primary hover:bg-muted",
        danger: "bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border border-transparent"
    };

    const sizes = {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base"
    };

    const activeVariant = variants[variant] || variants.primary;
    const activeSize = sizes[size] || sizes.md;

    return (
        <button
            ref={ref}
            type={type}
            disabled={disabled || isLoading}
            className={`${baseStyles} ${activeVariant} ${activeSize} ${className}`}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </button>
    );
});

Button.displayName = 'Button';

export default Button;
