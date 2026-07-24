import React from 'react';
import { BarChart2, CheckCircle2, AlertCircle, TrendingUp, Trophy } from 'lucide-react';
import { useTodos } from '../hooks/useTodos';
import AnalyticsDashboard from '../components/dashboard/AnalyticsDashboard';

const AnalyticsPage = () => {
    const { todos, error } = useTodos();

    if (error) return null;

    const total = todos.length;
    const completed = todos.filter(t => t.status === 'Completed').length;
    const categoryStats = todos.reduce((acc, todo) => {
        const cat = todo.category || 'Others';
        acc[cat] = (acc[cat] || 0) + 1;
        return acc;
    }, {});

    const maxCatValue = Math.max(...Object.values(categoryStats), 1);

    return (
        <div className="max-w-5xl mx-auto pb-24 space-y-10">
            {/* Hero Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
                    <BarChart2 size={28} className="text-accent" />
                    Analytics & Insights
                </h1>
                <p className="text-secondary mt-1 text-lg">Deep dive into your productivity patterns.</p>
            </div>

            <AnalyticsDashboard todos={todos} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {/* Category Distribution */}
                <div className="bg-surface border border-border rounded-xl p-6 shadow-subtle">
                    <h3 className="text-lg font-bold text-primary mb-6 flex items-center">
                        <Trophy size={18} className="mr-2 text-amber-500" />
                        Category Distribution
                    </h3>
                    
                    <div className="space-y-4">
                        {Object.entries(categoryStats).map(([cat, count]) => {
                            const percentage = Math.round((count / total) * 100);
                            const widthPercent = Math.round((count / maxCatValue) * 100);
                            return (
                                <div key={cat} className="space-y-1.5">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium text-primary">{cat}</span>
                                        <span className="text-secondary">{count} tasks ({percentage}%)</span>
                                    </div>
                                    <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-accent rounded-full" 
                                            style={{ width: `${widthPercent}%`, transition: 'width 1s ease-out' }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                        {Object.keys(categoryStats).length === 0 && (
                            <p className="text-secondary text-sm">No task data available to analyze.</p>
                        )}
                    </div>
                </div>

                {/* Quick Summary */}
                <div className="bg-surface border border-border rounded-xl p-6 shadow-subtle">
                    <h3 className="text-lg font-bold text-primary mb-6 flex items-center">
                        <TrendingUp size={18} className="mr-2 text-green-500" />
                        Execution Summary
                    </h3>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-green-100 text-green-700 rounded-lg shrink-0">
                                <CheckCircle2 size={24} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-primary">Task Completion</h4>
                                <p className="text-sm text-secondary mt-1">
                                    You have completed {completed} out of {total} total tasks across all time.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-amber-100 text-amber-700 rounded-lg shrink-0">
                                <AlertCircle size={24} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-primary">Efficiency</h4>
                                <p className="text-sm text-secondary mt-1">
                                    {completed > 0 
                                        ? "Great job getting things done! Keep focusing on High Priority items."
                                        : "You haven't completed any tasks yet. Start small and build momentum!"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
