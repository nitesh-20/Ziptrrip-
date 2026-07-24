import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';

const TodoForm = ({ initialData, onSubmit, isLoading, isEditing = false }) => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            title: '',
            description: '',
            priority: 'Medium',
            status: 'Pending',
            dueDate: ''
        }
    });

    useEffect(() => {
        if (initialData) {
            reset({
                title: initialData.title,
                description: initialData.description,
                priority: initialData.priority,
                status: initialData.status,
                dueDate: initialData.dueDate ? initialData.dueDate.split('T')[0] : ''
            });
        }
    }, [initialData, reset]);

    const submitHandler = (data) => {
        onSubmit(data);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6 flex items-center gap-4">
                <button 
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
                    title="Go Back"
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-2xl font-bold text-gray-900">
                    {isEditing ? 'Edit Todo' : 'Create New Todo'}
                </h1>
            </div>

            <form onSubmit={handleSubmit(submitHandler)} className="card p-6 space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title <span className="text-red-500">*</span></label>
                    <input
                        id="title"
                        type="text"
                        className={`input ${errors.title ? 'border-red-500 focus:ring-red-500' : ''}`}
                        placeholder="What needs to be done?"
                        {...register('title', { required: 'Title is required', maxLength: { value: 100, message: 'Maximum 100 characters allowed' } })}
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        rows="4"
                        className={`input ${errors.description ? 'border-red-500 focus:ring-red-500' : ''}`}
                        placeholder="Add some details..."
                        {...register('description', { maxLength: { value: 500, message: 'Maximum 500 characters allowed' } })}
                    ></textarea>
                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                        <select
                            id="priority"
                            className="input"
                            {...register('priority')}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                            id="status"
                            className="input"
                            {...register('status')}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
                        <input
                            id="dueDate"
                            type="date"
                            className="input"
                            {...register('dueDate')}
                        />
                    </div>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="btn btn-secondary px-6 py-2"
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary px-6 py-2 gap-2"
                        disabled={isLoading}
                    >
                        <Save size={18} />
                        {isLoading ? 'Saving...' : 'Save Todo'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TodoForm;
