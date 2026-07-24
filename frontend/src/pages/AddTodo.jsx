import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { todoService } from '../services/api';
import TodoForm from '../components/todos/TodoForm';

const AddTodo = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data) => {
        try {
            setIsLoading(true);
            await todoService.create(data);
            toast.success('Todo created successfully');
            navigate('/');
        } catch (error) {
            console.error('Failed to create todo:', error);
            // Error is handled by axios interceptor
        } finally {
            setIsLoading(false);
        }
    };

    return <TodoForm onSubmit={handleSubmit} isLoading={isLoading} />;
};

export default AddTodo;
