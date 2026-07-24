import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { todoService } from '../services/api';
import TodoForm from '../components/todos/TodoForm';
import Spinner from '../components/common/Spinner';

const EditTodo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [todo, setTodo] = useState(null);
    const [fetchError, setFetchError] = useState(false);

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const data = await todoService.getById(id);
                setTodo(data);
            } catch (error) {
                console.error('Failed to fetch todo for editing:', error);
                setFetchError(true);
            }
        };
        fetchTodo();
    }, [id]);

    const handleSubmit = async (data) => {
        try {
            setIsLoading(true);
            await todoService.update(id, data);
            toast.success('Todo updated successfully');
            navigate('/');
        } catch (error) {
            console.error('Failed to update todo:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (fetchError) {
        return (
            <div className="card p-12 text-center">
                <h3 className="text-xl font-bold text-red-600 mb-2">Todo Not Found</h3>
                <p className="text-gray-500 mb-6">The todo you are trying to edit does not exist or has been deleted.</p>
                <button onClick={() => navigate('/')} className="btn btn-primary px-6 py-2">
                    Return to Dashboard
                </button>
            </div>
        );
    }

    if (!todo) return <Spinner />;

    return <TodoForm initialData={todo} onSubmit={handleSubmit} isLoading={isLoading} isEditing={true} />;
};

export default EditTodo;
