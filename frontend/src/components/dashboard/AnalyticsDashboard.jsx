import React from 'react';
import StatCard from './StatCard';
import { ListTodo, CheckCircle2, Clock, AlertCircle, TrendingUp, Calendar, Trophy, Timer } from 'lucide-react';
import { isToday, isOverdue } from '../../utils/dateUtils';

const AnalyticsDashboard = ({ todos }) => {
    
    const total = todos.length;
    const completed = todos.filter(t => t.status === 'Completed').length;
    const pending = total - completed;
    
    const highPriority = todos.filter(t => t.priority === 'High' && t.status !== 'Completed').length;
    const dueToday = todos.filter(t => isToday(t.dueDate) && t.status !== 'Completed').length;
    const overdue = todos.filter(t => isOverdue(t.dueDate) && t.status !== 'Completed').length;
    
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    // Calculate Productivity Score (0-100)
    let productivityScore = completionRate;
    if (overdue > 0) {
        productivityScore = Math.max(0, productivityScore - (overdue * 5)); // Penalty for overdue
    }
    if (completed > 0 && overdue === 0) {
        productivityScore = Math.min(100, productivityScore + 10); // Bonus for no overdue
    }

    // Find Longest Pending Task
    const pendingTasks = todos.filter(t => t.status !== 'Completed');
    let longestPendingDays = 0;
    if (pendingTasks.length > 0) {
        const oldestTask = pendingTasks.reduce((oldest, current) => {
            return new Date(current.createdAt) < new Date(oldest.createdAt) ? current : oldest;
        }, pendingTasks[0]);
        
        const diffTime = Math.abs(new Date() - new Date(oldestTask.createdAt));
        longestPendingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard
                title="Productivity Score"
                value={total === 0 ? '-' : productivityScore}
                icon={Trophy}
                trend={productivityScore > 80 ? 'Excellent work!' : productivityScore > 50 ? 'Keep it up' : 'Needs focus'}
                colorClass={productivityScore > 80 ? 'text-amber-500' : productivityScore > 50 ? 'text-green-600' : 'text-red-500'}
            />
            <StatCard
                title="Completion Rate"
                value={`${completionRate}%`}
                icon={TrendingUp}
                trend={completionRate > 50 ? 'On track' : 'Needs attention'}
                colorClass={completionRate > 50 ? 'text-green-600' : 'text-amber-500'}
            />
            <StatCard
                title="Due Today"
                value={dueToday}
                icon={Calendar}
                trend={dueToday > 0 ? 'Action required' : 'All clear'}
                colorClass={dueToday > 0 ? 'text-amber-500' : 'text-primary'}
            />
            <StatCard
                title="Longest Pending"
                value={longestPendingDays > 0 ? `${longestPendingDays}d` : '-'}
                icon={Timer}
                trend="Oldest active task"
                colorClass="text-secondary"
            />
        </div>
    );
};

export default AnalyticsDashboard;
