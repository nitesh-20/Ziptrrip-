import React, { forwardRef } from 'react';
import { Check } from 'lucide-react';

const Checkbox = forwardRef(({ checked, onChange, disabled, className = '', id }, ref) => {
    return (
        <div className={`relative flex items-center justify-center w-5 h-5 rounded border transition-colors cursor-pointer ${checked ? 'bg-primary border-primary' : 'bg-surface border-border hover:border-secondary'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`} onClick={() => !disabled && onChange(!checked)}>
            <input
                ref={ref}
                type="checkbox"
                id={id}
                className="absolute opacity-0 w-full h-full cursor-pointer"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                disabled={disabled}
                aria-label="Select item"
            />
            {checked && <Check size={14} className="text-white z-10" />}
        </div>
    );
});

Checkbox.displayName = 'Checkbox';
export default Checkbox;
