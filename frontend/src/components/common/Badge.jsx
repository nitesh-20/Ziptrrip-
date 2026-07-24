import React from 'react';

const Badge = ({ children, variant = 'default', className = '' }) => {
    const variants = {
        High: 'bg-red-50 text-red-600 border-red-200/50',
        Medium: 'bg-orange-50 text-orange-600 border-orange-200/50',
        Low: 'bg-blue-50 text-blue-600 border-blue-200/50',
        Completed: 'bg-emerald-50 text-emerald-600 border-emerald-200/50',
        Pending: 'bg-zinc-100 text-zinc-600 border-zinc-200/50',
        default: 'bg-zinc-100 text-zinc-600 border-zinc-200/50'
    };

    const activeVariant = variants[children] || variants[variant] || variants.default;

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium uppercase tracking-wider border ${activeVariant} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;
