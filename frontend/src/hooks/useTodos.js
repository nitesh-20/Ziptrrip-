import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

export const useTodos = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTodos = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await api.get('/todos');
            setTodos(response.data);
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to fetch todos';
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    const deleteTodo = async (id) => {
        try {
            await api.delete(`/todos/${id}`);
            
            // Optimistic update for soft delete
            setTodos((prev) => prev.filter((todo) => todo.id !== id));
            
            toast.success('Task moved to trash', {
                action: {
                    label: 'Undo',
                    onClick: () => restoreTodo(id)
                },
                duration: 5000,
            });
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete task');
            return false;
        }
    };

    const restoreTodo = async (id) => {
        try {
            const response = await api.post(`/todos/${id}/restore`);
            setTodos((prev) => [...prev, response.data]);
            toast.success('Task restored successfully');
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to restore task');
            return false;
        }
    };

    const updateTodo = async (id, data) => {
        try {
            const response = await api.put(`/todos/${id}`, data);
            setTodos((prev) => prev.map((todo) => (todo.id === id ? response.data : todo)));
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update task');
            throw error;
        }
    };

    const bulkDelete = async (ids) => {
        try {
            await api.post('/todos/bulk/delete', { ids });
            setTodos((prev) => prev.filter((todo) => !ids.includes(todo.id)));
            toast.success(`Moved ${ids.length} tasks to trash`);
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete tasks');
            return false;
        }
    };

    const bulkUpdate = async (ids, updates) => {
        try {
            await api.post('/todos/bulk/update', { ids, updates });
            setTodos((prev) => prev.map((todo) => 
                ids.includes(todo.id) ? { ...todo, ...updates } : todo
            ));
            toast.success(`Updated ${ids.length} tasks`);
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update tasks');
            return false;
        }
    };

    return { 
        todos, 
        setTodos,
        loading, 
        error, 
        deleteTodo, 
        restoreTodo,
        updateTodo,
        bulkDelete,
        bulkUpdate,
        refetch: fetchTodos 
    };
};
