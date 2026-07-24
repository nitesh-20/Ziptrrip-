import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response interceptor for centralized error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
        toast.error(message);
        return Promise.reject(error);
    }
);

export const todoService = {
    getAll: async () => {
        const response = await api.get('/todos');
        return response.data;
    },
    getById: async (id) => {
        const response = await api.get(`/todos/${id}`);
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('/todos', data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await api.put(`/todos/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/todos/${id}`);
        return response.data;
    }
};

export default api;
