import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit2, Trash2, Clock, Calendar, CheckCircle2, AlertCircle, Pin, Star, Archive, Tag } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Skeleton from '../components/common/Skeleton';
import { formatDateTime, isOverdue, formatRelativeDate } from '../utils/dateUtils';

const TodoDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [todo, setTodo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const response = await api.get(`/todos/${id}`);
                setTodo(response.data);
            } catch (error) {
                toast.error('Task not found');
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        fetchTodo();
    }, [id, navigate]);

    const handleToggleStatus = async () => {
        try {
            const newStatus = todo.status === 'Completed' ? 'Pending' : 'Completed';
            const response = await api.put(`/todos/${id}`, { status: newStatus });
            setTodo(response.data);
            toast.success(`Task marked as ${newStatus}`);
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await api.delete(`/todos/${id}`);
                toast.success('Task deleted');
                navigate('/');
            } catch (error) {
                toast.error('Failed to delete task');
            }
        }
    };

    if (loading) {
        return (
            <div className="max-w-3xl mx-auto space-y-6">
                <Skeleton className="w-24 h-8" />
                <div className="bg-surface border border-border rounded-xl p-8 shadow-subtle space-y-6">
                    <Skeleton className="w-3/4 h-10" />
                    <Skeleton className="w-full h-24" />
                    <div className="flex gap-4">
                        <Skeleton className="w-32 h-10" />
                        <Skeleton className="w-32 h-10" />
                    </div>
                </div>
            </div>
        );
    }

    if (!todo) return null;

    const isTaskOverdue = isOverdue(todo.dueDate) && todo.status !== 'Completed';

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <Link 
                to="/" 
                className="inline-flex items-center text-sm font-medium text-secondary hover:text-primary transition-colors"
            >
                <ArrowLeft size={16} className="mr-2" />
                Back to Dashboard
            </Link>

            <div className="bg-surface border border-border rounded-xl shadow-subtle overflow-hidden">
                {/* Header Section */}
                <div className="p-6 md:p-8 border-b border-border">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div className="space-y-4 flex-1">
                            <div className="flex items-center gap-3 flex-wrap">
                                <Badge variant={todo.status === 'Completed' ? 'success' : 'neutral'}>
                                    {todo.status}
                                </Badge>
                                <Badge variant={todo.priority === 'High' ? 'danger' : todo.priority === 'Medium' ? 'warning' : 'success'}>
                                    {todo.priority} Priority
                                </Badge>
                                {todo.category && todo.category !== 'Others' && (
                                    <Badge variant="neutral">{todo.category}</Badge>
                                )}
                                {todo.isPinned && <Pin size={16} className="text-amber-500" fill="currentColor" />}
                                {todo.isFavorite && <Star size={16} className="text-amber-500" fill="currentColor" />}
                                {todo.isArchived && <Archive size={16} className="text-secondary" />}
                            </div>
                            
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-primary leading-tight">
                                {todo.title}
                            </h1>
                            
                            <div className="flex flex-wrap items-center gap-4 text-sm text-secondary">
                                {todo.dueDate && (
                                    <div className={`flex items-center ${isTaskOverdue ? 'text-red-600 font-medium' : ''}`}>
                                        <Calendar size={14} className="mr-2 opacity-70" />
                                        Due {formatRelativeDate(todo.dueDate)}
                                    </div>
                                )}
                                {todo.estimatedTime && (
                                    <div className="flex items-center">
                                        <Clock size={14} className="mr-2 opacity-70" />
                                        Est. {todo.estimatedTime}m
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                            <Button 
                                variant={todo.status === 'Completed' ? 'secondary' : 'primary'}
                                onClick={handleToggleStatus}
                            >
                                <CheckCircle2 size={16} className="mr-2" />
                                {todo.status === 'Completed' ? 'Mark Pending' : 'Complete Task'}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Body Section */}
                <div className="p-6 md:p-8 space-y-8">
                    {todo.description ? (
                        <div className="prose prose-sm md:prose-base max-w-none text-primary">
                            <p className="whitespace-pre-wrap leading-relaxed">
                                {todo.description}
                            </p>
                        </div>
                    ) : (
                        <p className="text-secondary italic">No description provided.</p>
                    )}

                    {todo.tags && todo.tags.length > 0 && (
                        <div>
                            <h3 className="text-sm font-medium text-primary mb-3 flex items-center">
                                <Tag size={14} className="mr-2" /> Tags
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {todo.tags.map(tag => (
                                    <span key={tag} className="px-2.5 py-1 bg-muted rounded-md text-xs font-medium text-secondary border border-border">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Timeline & Metadata Section */}
                <div className="bg-muted p-6 md:p-8 border-t border-border flex flex-col md:flex-row justify-between gap-6 items-start md:items-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-xs text-secondary">
                        <div>
                            <span className="font-medium mr-2">Created:</span>
                            {formatDateTime(todo.createdAt)}
                        </div>
                        <div>
                            <span className="font-medium mr-2">Last updated:</span>
                            {formatDateTime(todo.updatedAt)}
                        </div>
                        {todo.completedAt && (
                            <div>
                                <span className="font-medium mr-2">Completed:</span>
                                {formatDateTime(todo.completedAt)}
                            </div>
                        )}
                        {todo.deletedAt && (
                            <div>
                                <span className="font-medium mr-2">Archived/Deleted:</span>
                                {formatDateTime(todo.deletedAt)}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <Link to={`/edit/${todo.id}`}>
                            <Button variant="secondary" size="sm">
                                <Edit2 size={14} className="mr-2" />
                                Edit
                            </Button>
                        </Link>
                        <Button variant="danger" size="sm" onClick={handleDelete}>
                            <Trash2 size={14} className="mr-2" />
                            Delete
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoDetail;
