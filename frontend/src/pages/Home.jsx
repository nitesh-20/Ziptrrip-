import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ListTodo, AlertCircle, TrendingUp, Plus } from 'lucide-react';
import { useTodos } from '../hooks/useTodos';
import TodoCard from '../components/todos/TodoCard';
import StatCard from '../components/dashboard/StatCard';
import FilterBar from '../components/dashboard/FilterBar';
import Skeleton from '../components/common/Skeleton';
import Button from '../components/common/Button';
import { isToday } from '../utils/dateUtils'; // We'll add this next

const Home = () => {
    const { todos, loading, error, deleteTodo } = useTodos();
    
    // Filters and Sorting
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterPriority, setFilterPriority] = useState('All');
    const [sortBy, setSortBy] = useState('Newest');

    const handleResetFilters = () => {
        setSearchQuery('');
        setFilterStatus('All');
        setFilterPriority('All');
        setSortBy('Newest');
    };

    // Calculate Statistics
    const stats = useMemo(() => {
        const total = todos.length;
        const completed = todos.filter((t) => t.status === 'Completed').length;
        const pending = total - completed;
        const createdToday = todos.filter((t) => isToday(t.createdAt)).length;
        
        return { total, completed, pending, createdToday };
    }, [todos]);

    // Apply Filters & Sorting
    const filteredAndSortedTodos = useMemo(() => {
        let result = [...todos];

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (todo) =>
                    todo.title.toLowerCase().includes(query) ||
                    (todo.description && todo.description.toLowerCase().includes(query))
            );
        }

        if (filterStatus !== 'All') {
            result = result.filter((todo) => todo.status === filterStatus);
        }

        if (filterPriority !== 'All') {
            result = result.filter((todo) => todo.priority === filterPriority);
        }

        result.sort((a, b) => {
            if (sortBy === 'Newest') {
                return new Date(b.createdAt) - new Date(a.createdAt);
            } else if (sortBy === 'Oldest') {
                return new Date(a.createdAt) - new Date(b.createdAt);
            } else if (sortBy === 'Priority') {
                const priorityWeight = { High: 3, Medium: 2, Low: 1 };
                return priorityWeight[b.priority] - priorityWeight[a.priority];
            }
            return 0;
        });

        return result;
    }, [todos, searchQuery, filterStatus, filterPriority, sortBy]);

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                <AlertCircle className="text-red-500 mb-4" size={48} />
                <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
                <p className="text-secondary">{error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
                    <p className="text-secondary mt-1">Manage and track your tasks.</p>
                </div>
                <Link to="/add">
                    <Button>
                        <Plus size={16} className="mr-2" />
                        Create Task
                    </Button>
                </Link>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Skeleton className="h-28" />
                    <Skeleton className="h-28" />
                    <Skeleton className="h-28" />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <StatCard 
                        title="Total Tasks" 
                        value={stats.total} 
                        icon={ListTodo}
                        trend={stats.createdToday > 0 ? `+${stats.createdToday} created today` : 'No tasks created today'} 
                    />
                    <StatCard 
                        title="Completed" 
                        value={stats.completed} 
                        icon={CheckCircle2}
                        colorClass="text-emerald-600"
                        trend={`${stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}% completion rate`}
                    />
                    <StatCard 
                        title="Pending" 
                        value={stats.pending} 
                        icon={TrendingUp}
                        colorClass="text-orange-600"
                    />
                </div>
            )}

            <FilterBar 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                filterPriority={filterPriority}
                setFilterPriority={setFilterPriority}
                sortBy={sortBy}
                setSortBy={setSortBy}
                onReset={handleResetFilters}
            />

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-48" />)}
                </div>
            ) : filteredAndSortedTodos.length === 0 ? (
                <div className="text-center py-20 bg-surface border border-border rounded-xl border-dashed">
                    <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
                        <ListTodo className="text-secondary" size={24} />
                    </div>
                    <h3 className="text-lg font-medium text-primary mb-1">No tasks found</h3>
                    <p className="text-secondary mb-6 max-w-sm mx-auto">
                        {todos.length === 0 
                            ? "You haven't created any tasks yet. Get started by creating your first task." 
                            : "We couldn't find any tasks matching your current filters."}
                    </p>
                    {todos.length > 0 && (
                        <Button variant="secondary" onClick={handleResetFilters}>
                            Clear all filters
                        </Button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredAndSortedTodos.map((todo) => (
                        <TodoCard key={todo.id} todo={todo} onDelete={deleteTodo} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
