import React from 'react';
import StatCard from './StatCard';
import { ListTodo, CheckCircle2, Clock, AlertCircle, TrendingUp, Calendar } from 'lucide-react';
import { isToday, isOverdue } from '../../utils/dateUtils';

const AnalyticsDashboard = ({ todos }) => {
    
    const total = todos.length;
    const completed = todos.filter(t => t.status === 'Completed').length;
    const pending = total - completed;
    const archived = todos.filter(t => t.isArchived).length;
    
    const highPriority = todos.filter(t => t.priority === 'High' && t.status !== 'Completed').length;
    const dueToday = todos.filter(t => isToday(t.dueDate) && t.status !== 'Completed').length;
    const overdue = todos.filter(t => isOverdue(t.dueDate) && t.status !== 'Completed').length;
    
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    // Average completion time calculation
    const completedTasks = todos.filter(t => t.status === 'Completed' && t.completedAt && t.createdAt);
    let avgCompletionHours = 0;
    if (completedTasks.length > 0) {
        const totalMs = completedTasks.reduce((acc, t) => {
            return acc + (new Date(t.completedAt).getTime() - new Date(t.createdAt).getTime());
        }, 0);
        avgCompletionHours = Math.round(totalMs / completedTasks.length / (1000 * 60 * 60));
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard
                title="Total Tasks"
                value={total}
                icon={ListTodo}
                trend={`${completed} completed`}
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
                title="Overdue"
                value={overdue}
                icon={AlertCircle}
                trend={overdue > 0 ? 'High priority' : 'All caught up'}
                colorClass={overdue > 0 ? 'text-red-500' : 'text-primary'}
            />
        </div>
    );
};

export default AnalyticsDashboard;
