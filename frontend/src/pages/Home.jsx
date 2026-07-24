import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { todoService } from '../services/api';
import TodoCard from '../components/todos/TodoCard';
import Spinner from '../components/common/Spinner';
import Modal from '../components/common/Modal';

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterPriority, setFilterPriority] = useState('All');
    const [sortBy, setSortBy] = useState('Newest');
    
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [todoToDelete, setTodoToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            setIsLoading(true);
            const data = await todoService.getAll();
            setTodos(data);
        } catch (error) {
            console.error('Failed to fetch todos:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteClick = (todo) => {
        setTodoToDelete(todo);
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!todoToDelete) return;
        
        try {
            setIsDeleting(true);
            await todoService.delete(todoToDelete.id);
            setTodos(todos.filter(t => t.id !== todoToDelete.id));
            toast.success('Todo deleted successfully');
        } catch (error) {
            console.error('Failed to delete todo:', error);
        } finally {
            setIsDeleting(false);
            setDeleteModalOpen(false);
            setTodoToDelete(null);
        }
    };

    // Derived state for statistics
    const stats = useMemo(() => {
        const total = todos.length;
        const completed = todos.filter(t => t.status === 'Completed').length;
        const pending = total - completed;
        const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
        return { total, completed, pending, percentage };
    }, [todos]);

    // Derived state for filtered and sorted todos
    const filteredTodos = useMemo(() => {
        let result = todos;

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(t => t.title.toLowerCase().includes(query));
        }

        if (filterStatus !== 'All') {
            result = result.filter(t => t.status === filterStatus);
        }

        if (filterPriority !== 'All') {
            result = result.filter(t => t.priority === filterPriority);
        }

        result = [...result].sort((a, b) => {
            if (sortBy === 'Newest') {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }
            if (sortBy === 'Oldest') {
                return new Date(a.createdAt) - new Date(b.createdAt);
            }
            if (sortBy === 'Priority') {
                const priorityWeight = { High: 3, Medium: 2, Low: 1 };
                return priorityWeight[b.priority] - priorityWeight[a.priority];
            }
            return 0;
        });

        return result;
    }, [todos, searchQuery, filterStatus, filterPriority, sortBy]);

    if (isLoading) return <Spinner />;

    return (
        <div className="space-y-6">
            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="card p-4">
                    <p className="text-gray-500 text-sm font-medium">Total Todos</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
                </div>
                <div className="card p-4">
                    <p className="text-gray-500 text-sm font-medium">Completed</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">{stats.completed}</p>
                </div>
                <div className="card p-4">
                    <p className="text-gray-500 text-sm font-medium">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
                </div>
                <div className="card p-4">
                    <p className="text-gray-500 text-sm font-medium">Progress</p>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="flex-grow bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${stats.percentage}%` }}></div>
                        </div>
                        <span className="text-sm font-bold text-gray-900">{stats.percentage}%</span>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="card p-4 flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="input pl-10 w-full"
                        placeholder="Search todos by title..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 flex-wrap md:flex-nowrap">
                    <select 
                        className="input min-w-[120px]"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="All">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <select 
                        className="input min-w-[120px]"
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}
                    >
                        <option value="All">All Priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    <select 
                        className="input min-w-[120px]"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="Newest">Newest First</option>
                        <option value="Oldest">Oldest First</option>
                        <option value="Priority">Priority</option>
                    </select>
                </div>
            </div>

            {/* Todo List */}
            <div className="space-y-4">
                {filteredTodos.length > 0 ? (
                    filteredTodos.map(todo => (
                        <TodoCard 
                            key={todo.id} 
                            todo={todo} 
                            onDeleteClick={handleDeleteClick} 
                        />
                    ))
                ) : (
                    <div className="card p-12 text-center flex flex-col items-center">
                        <div className="bg-gray-50 p-4 rounded-full mb-4 text-gray-400">
                            <AlertCircle size={48} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">No todos found</h3>
                        <p className="text-gray-500 mt-1 mb-6 max-w-sm">
                            {todos.length === 0 
                                ? "You don't have any todos yet. Get started by creating one!" 
                                : "No todos match your current filters. Try adjusting them."}
                        </p>
                        {todos.length === 0 && (
                            <Link to="/add" className="btn btn-primary px-6 py-2 gap-2">
                                <Plus size={18} />
                                Add Your First Todo
                            </Link>
                        )}
                    </div>
                )}
            </div>

            {/* Delete Modal */}
            <Modal
                isOpen={deleteModalOpen}
                onClose={() => !isDeleting && setDeleteModalOpen(false)}
                title="Delete Todo"
            >
                <div className="space-y-4">
                    <p className="text-gray-600">
                        Are you sure you want to delete the todo <span className="font-semibold text-gray-900">"{todoToDelete?.title}"</span>? This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            onClick={() => setDeleteModalOpen(false)}
                            className="btn btn-secondary px-4 py-2"
                            disabled={isDeleting}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmDelete}
                            className="btn btn-danger px-4 py-2"
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Home;
