import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';
import TodoForm from '../components/todos/TodoForm';
import Button from '../components/common/Button';
import Skeleton from '../components/common/Skeleton';

const EditTodo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [todo, setTodo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) {
        return (
            <div className="max-w-2xl mx-auto space-y-6">
                <Skeleton className="w-24 h-6 mb-8" />
                <div className="bg-surface border border-border p-8 rounded-xl space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-10 w-1/2" />
                </div>
            </div>
        );
    }

    if (error || !todo) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                <AlertCircle className="text-red-500 mb-4" size={48} />
                <h2 className="text-xl font-semibold mb-2">Task Not Found</h2>
                <p className="text-secondary mb-6">{error || "The task you're trying to edit does not exist or has been removed."}</p>
                <Button onClick={() => navigate('/')}>Back to Dashboard</Button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Button 
                variant="ghost" 
                onClick={() => navigate(-1)} 
                className="mb-6 -ml-4"
            >
                <ArrowLeft size={16} className="mr-2" />
                Back
            </Button>

            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-primary">Edit Task</h1>
                <p className="text-secondary mt-1">Make changes to your task.</p>
            </div>

            <TodoForm initialData={todo} isEdit={true} />
        </div>
    );
};

export default EditTodo;
