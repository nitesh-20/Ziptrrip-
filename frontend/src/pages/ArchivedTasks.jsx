import React, { useState } from 'react';
import { Archive, Trash2, RefreshCw } from 'lucide-react';
import { useTodos } from '../hooks/useTodos';
import TodoCard from '../components/todos/TodoCard';
import Skeleton from '../components/common/Skeleton';
import BulkActionBar from '../components/dashboard/BulkActionBar';

const ArchivedTasks = () => {
    const { todos, loading, error, updateTodo, deleteTodo, bulkUpdate, bulkDelete } = useTodos();
    const [selectedIds, setSelectedIds] = useState([]);

    const archivedTodos = todos.filter(todo => todo.isArchived);

    const handleSelect = (id, checked) => {
        if (checked) setSelectedIds(prev => [...prev, id]);
        else setSelectedIds(prev => prev.filter(item => item !== id));
    };

    const handleBulkUnarchive = async () => {
        const success = await bulkUpdate(selectedIds, { isArchived: false });
        if (success) setSelectedIds([]);
    };

    const handleBulkDelete = async () => {
        if (window.confirm(`Permanently delete ${selectedIds.length} archived tasks?`)) {
            const success = await bulkDelete(selectedIds);
            if (success) setSelectedIds([]);
        }
    };

    if (error) return null;

    return (
        <div className="max-w-5xl mx-auto pb-24 space-y-10">
            {/* Hero Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
                    <Archive size={28} className="text-secondary" />
                    Archived Tasks
                </h1>
                <p className="text-secondary mt-1 text-lg">Manage your soft-deleted or hidden tasks here.</p>
            </div>

            <div className="space-y-4">
                {loading ? (
                    [...Array(2)].map((_, i) => (
                        <div key={i} className="bg-surface rounded-xl p-5 border border-border shadow-sm flex gap-4">
                            <Skeleton className="w-6 h-6 rounded" />
                            <div className="flex-1 space-y-3">
                                <Skeleton className="w-1/3 h-5" />
                                <Skeleton className="w-2/3 h-4" />
                            </div>
                        </div>
                    ))
                ) : archivedTodos.length === 0 ? (
                    <div className="text-center py-20 bg-surface border border-dashed border-border rounded-xl">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 text-secondary">
                            <Archive size={28} />
                        </div>
                        <h3 className="text-lg font-medium text-primary mb-1">Archive is empty</h3>
                        <p className="text-secondary">No tasks have been archived yet.</p>
                    </div>
                ) : (
                    <div className="space-y-3 opacity-80 hover:opacity-100 transition-opacity">
                        {archivedTodos.map((todo) => (
                            <TodoCard 
                                key={todo.id} 
                                todo={todo}
                                isSelected={selectedIds.includes(todo.id)}
                                onSelect={(checked) => handleSelect(todo.id, checked)}
                                onToggleStatus={() => {}} // Disabled in archive
                                onDelete={deleteTodo}
                                onUpdate={updateTodo}
                                onDuplicate={() => {}} // Disabled in archive
                            />
                        ))}
                    </div>
                )}
            </div>

            {selectedIds.length > 0 && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5 duration-300">
                    <div className="bg-primary text-white rounded-full shadow-float px-6 py-3 flex items-center gap-6 border border-primary/20">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center justify-center bg-white/20 rounded-full w-6 h-6 text-xs font-medium">
                                {selectedIds.length}
                            </span>
                            <span className="text-sm font-medium">selected</span>
                        </div>
                        
                        <div className="h-4 w-px bg-white/20" />
                        
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={handleBulkUnarchive}
                                className="flex items-center px-3 py-1.5 rounded-md hover:bg-white/10 text-sm font-medium transition-colors"
                            >
                                <RefreshCw size={16} className="mr-2" />
                                Unarchive
                            </button>
                            <button 
                                onClick={handleBulkDelete}
                                className="flex items-center px-3 py-1.5 rounded-md hover:bg-red-500/20 text-red-300 text-sm font-medium transition-colors"
                            >
                                <Trash2 size={16} className="mr-2" />
                                Delete Forever
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArchivedTasks;
