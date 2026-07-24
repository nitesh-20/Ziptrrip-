import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit2, Calendar, Clock, AlertCircle } from 'lucide-react';
import { todoService } from '../services/api';
import Spinner from '../components/common/Spinner';
import Badge from '../components/common/Badge';
import { formatDate, isOverdue } from '../utils/dateUtils';

const TodoDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [todo, setTodo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                setIsLoading(true);
                const data = await todoService.getById(id);
                setTodo(data);
            } catch (error) {
                console.error('Failed to fetch todo details:', error);
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTodo();
    }, [id]);

    if (isLoading) return <Spinner />;

    if (error || !todo) {
        return (
            <div className="card p-12 text-center max-w-2xl mx-auto">
                <div className="bg-red-50 text-red-500 p-4 rounded-full inline-block mb-4">
                    <AlertCircle size={48} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Todo Not Found</h3>
                <p className="text-gray-500 mb-6">The todo you are looking for does not exist or has been deleted.</p>
                <button onClick={() => navigate('/')} className="btn btn-primary px-6 py-2">
                    Return to Dashboard
                </button>
            </div>
        );
    }

    const overdue = isOverdue(todo.dueDate, todo.status);

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft size={20} />
                    <span>Back</span>
                </button>
                <Link 
                    to={`/edit/${todo.id}`}
                    className="btn btn-primary px-4 py-2 gap-2"
                >
                    <Edit2 size={16} />
                    Edit Todo
                </Link>
            </div>

            <div className={`card overflow-hidden border-t-4 ${todo.status === 'Completed' ? 'border-t-green-500' : overdue ? 'border-t-red-500' : 'border-t-blue-500'}`}>
                <div className="p-6 md:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                        <h1 className="text-3xl font-bold text-gray-900 break-words flex-grow">
                            {todo.title}
                        </h1>
                        <div className="flex gap-2 shrink-0">
                            <Badge variant={todo.status} className="text-sm px-3 py-1">{todo.status}</Badge>
                            <Badge variant={todo.priority} className="text-sm px-3 py-1">{todo.priority}</Badge>
                        </div>
                    </div>

                    <div className="prose max-w-none mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                        <p className="text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg border border-gray-100 min-h-[100px]">
                            {todo.description || <span className="text-gray-400 italic">No description provided for this task.</span>}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${overdue ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                                <Calendar size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Due Date</p>
                                <p className={`font-semibold ${overdue ? 'text-red-600' : 'text-gray-900'}`}>
                                    {todo.dueDate ? formatDate(todo.dueDate) : 'Not set'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-gray-50 text-gray-600">
                                <Clock size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Created At</p>
                                <p className="font-semibold text-gray-900">
                                    {formatDate(todo.createdAt)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-gray-50 text-gray-600">
                                <Edit2 size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Last Updated</p>
                                <p className="font-semibold text-gray-900">
                                    {formatDate(todo.updatedAt)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoDetail;
