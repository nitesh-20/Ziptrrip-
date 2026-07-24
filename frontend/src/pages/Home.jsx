import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, ArrowRight } from 'lucide-react';
import { useTodos } from '../hooks/useTodos';
import TodoCard from '../components/todos/TodoCard';
import Skeleton from '../components/common/Skeleton';
import AnalyticsDashboard from '../components/dashboard/AnalyticsDashboard';

const Dashboard = () => {
    const { todos, loading, error, updateTodo, deleteTodo } = useTodos();

    const recentTasks = useMemo(() => {
        return todos
            .filter(todo => !todo.isArchived && todo.status !== 'Completed')
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5);
    }, [todos]);

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
                    {error}
                </div>
                <button 
                    onClick={() => window.location.reload()} 
                    className="btn btn-primary px-6 py-2"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto pb-24 space-y-10">
            {/* Hero Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
                        <LayoutDashboard size={28} className="text-accent" />
                        Dashboard Overview
                    </h1>
                    <p className="text-secondary mt-1 text-lg">Welcome back. Here is what's happening with your projects.</p>
                </div>
            </div>

            {/* Analytics */}
            <section>
                <h2 className="text-xl font-bold text-primary mb-4">Productivity Metrics</h2>
                <AnalyticsDashboard todos={todos} />
            </section>

            {/* Recent Tasks */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-primary">Recent Active Tasks</h2>
                    <Link to="/tasks" className="text-sm font-medium text-accent hover:underline flex items-center">
                        View all tasks
                        <ArrowRight size={16} className="ml-1" />
                    </Link>
                </div>

                <div className="space-y-3">
                    {loading ? (
                        [...Array(3)].map((_, i) => (
                            <div key={i} className="bg-surface rounded-xl p-5 border border-border shadow-sm flex gap-4">
                                <Skeleton className="w-6 h-6 rounded" />
                                <div className="flex-1 space-y-3">
                                    <Skeleton className="w-1/3 h-5" />
                                    <Skeleton className="w-2/3 h-4" />
                                </div>
                            </div>
                        ))
                    ) : recentTasks.length === 0 ? (
                        <div className="text-center py-12 bg-surface border border-dashed border-border rounded-xl">
                            <h3 className="text-lg font-medium text-primary mb-1">No active tasks</h3>
                            <p className="text-secondary mb-4">You're all caught up!</p>
                            <Link to="/add">
                                <button className="btn btn-primary px-6 py-2">
                                    Create New Task
                                </button>
                            </Link>
                        </div>
                    ) : (
                        recentTasks.map((todo) => (
                            <TodoCard 
                                key={todo.id} 
                                todo={todo}
                                isSelected={false}
                                onSelect={() => {}}
                                onToggleStatus={(id, currentStatus) => updateTodo(id, { status: currentStatus === 'Completed' ? 'Pending' : 'Completed' })}
                                onDelete={deleteTodo}
                                onUpdate={updateTodo}
                                onDuplicate={() => window.location.href = '/add'}
                            />
                        ))
                    )}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
