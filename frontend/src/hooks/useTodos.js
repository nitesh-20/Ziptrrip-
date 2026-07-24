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
            setTodos((prev) => prev.filter((todo) => todo.id !== id));
            toast.success('Todo deleted successfully');
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete todo');
            return false;
        }
    };

    return { todos, loading, error, deleteTodo, refetch: fetchTodos };
};
