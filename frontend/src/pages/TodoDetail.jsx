import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit2, Trash2, Clock, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';
import Badge from '../components/common/Badge';
import { formatDate } from '../utils/dateUtils';
import Button from '../components/common/Button';
import Skeleton from '../components/common/Skeleton';

const TodoDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [todo, setTodo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const response = await api.get(`/todos/${id}`);
                setTodo(response.data);
                setError(null);
            } catch (error) {
                const message = error.response?.data?.message || 'Failed to fetch task details';
                setError(message);
                toast.error(message);
            } finally {
                setLoading(false);
            }
        };

        fetchTodo();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
            setIsDeleting(true);
            try {
                await api.delete(`/todos/${id}`);
                toast.success('Task deleted successfully');
                navigate('/');
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to delete task');
                setIsDeleting(false);
            }
        }
    };

    if (loading) {
        return (
            <div className="max-w-3xl mx-auto space-y-6">
                <Skeleton className="w-24 h-6 mb-8" />
                <div className="bg-surface border border-border p-8 rounded-xl space-y-4">
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-20 w-full" />
                    <div className="flex gap-4 pt-4">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-6 w-20" />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !todo) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                <AlertCircle className="text-red-500 mb-4" size={48} />
                <h2 className="text-xl font-semibold mb-2">Task Not Found</h2>
                <p className="text-secondary mb-6">{error || "The task you're looking for doesn't exist or has been removed."}</p>
                <Button onClick={() => navigate('/')}>Back to Dashboard</Button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Button 
                variant="ghost" 
                onClick={() => navigate('/')} 
                className="mb-6 -ml-4"
            >
                <ArrowLeft size={16} className="mr-2" />
                Back to Dashboard
            </Button>

            <div className="bg-surface border border-border rounded-xl shadow-subtle overflow-hidden">
                <div className="p-6 md:p-8 border-b border-border">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-primary leading-tight">
                            {todo.title}
                        </h1>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <Badge>{todo.priority}</Badge>
                            <Badge variant={todo.status}>{todo.status}</Badge>
                        </div>
                    </div>

                    <div className="prose prose-sm max-w-none text-secondary">
                        <p className="whitespace-pre-wrap">{todo.description || 'No description provided.'}</p>
                    </div>
                </div>

                <div className="bg-muted/50 p-6 md:p-8 flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center">
                    <div className="space-y-3">
                        <div className="flex items-center text-sm font-medium text-secondary">
                            <Clock size={14} className="mr-2 text-primary/40" />
                            <span>Created: {formatDate(todo.createdAt)}</span>
                        </div>
                        {todo.dueDate && (
                            <div className="flex items-center text-sm font-medium text-secondary">
                                <Calendar size={14} className="mr-2 text-primary/40" />
                                <span>Due: {formatDate(todo.dueDate)}</span>
                            </div>
                        )}
                        {todo.status === 'Completed' && (
                            <div className="flex items-center text-sm font-medium text-emerald-600">
                                <CheckCircle2 size={14} className="mr-2 opacity-70" />
                                <span>Completed</span>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-3 w-full sm:w-auto">
                        <Button 
                            variant="danger" 
                            onClick={handleDelete}
                            isLoading={isDeleting}
                            className="flex-1 sm:flex-none"
                        >
                            <Trash2 size={16} className="mr-2" />
                            Delete
                        </Button>
                        <Link to={`/edit/${todo.id}`} className="flex-1 sm:flex-none">
                            <Button className="w-full">
                                <Edit2 size={16} className="mr-2" />
                                Edit Task
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoDetail;
