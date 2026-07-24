import React from 'react';

const StatCard = ({ title, value, icon: Icon, trend, colorClass = "text-primary" }) => {
    return (
        <div className="bg-surface rounded-xl border border-border p-5 shadow-subtle flex flex-col justify-between hover:shadow-elevated transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <p className="text-sm font-medium text-secondary">{title}</p>
                {Icon && (
                    <div className={`p-2 rounded-lg bg-muted ${colorClass}`}>
                        <Icon size={18} />
                    </div>
                )}
            </div>
            <div>
                <p className={`text-3xl font-bold tracking-tight ${colorClass}`}>{value}</p>
                {trend && (
                    <p className="text-xs text-secondary mt-1.5 font-medium">{trend}</p>
                )}
            </div>
        </div>
    );
};

export default StatCard;
