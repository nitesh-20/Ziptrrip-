import React from 'react';

const Badge = ({ children, variant = 'gray', className = '' }) => {
    const variants = {
        High: 'bg-red-100 text-red-800',
        Medium: 'bg-yellow-100 text-yellow-800',
        Low: 'bg-blue-100 text-blue-800',
        Completed: 'bg-green-100 text-green-800',
        Pending: 'bg-gray-100 text-gray-800',
        gray: 'bg-gray-100 text-gray-800'
    };

    const activeVariant = variants[children] || variants[variant] || variants.gray;

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${activeVariant} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;
