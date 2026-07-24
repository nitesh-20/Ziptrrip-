import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';
import Input from '../common/Input';
import Select from '../common/Select';
import Textarea from '../common/Textarea';
import Button from '../common/Button';

const TodoForm = ({ initialData, isEdit = false }) => {
    const navigate = useNavigate();
    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            title: initialData?.title || '',
            description: initialData?.description || '',
            priority: initialData?.priority || 'Medium',
            status: initialData?.status || 'Pending',
            dueDate: initialData?.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : ''
        }
    });

    const descriptionValue = watch('description');

    const onSubmit = async (data) => {
        try {
            if (isEdit) {
                await api.put(`/todos/${initialData.id}`, data);
                toast.success('Task updated successfully');
            } else {
                await api.post('/todos', data);
                toast.success('Task created successfully');
            }
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data?.message || `Failed to ${isEdit ? 'update' : 'create'} task`);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-surface border border-border rounded-xl p-6 shadow-subtle space-y-5">
                <Input
                    label="Task Title"
                    required
                    placeholder="E.g., Review Q3 roadmap"
                    error={errors.title?.message}
                    {...register('title', { 
                        required: 'Title is required',
                        maxLength: { value: 100, message: 'Title cannot exceed 100 characters' }
                    })}
                />

                <Textarea
                    label="Description"
                    placeholder="Provide more details about this task..."
                    error={errors.description?.message}
                    maxLength={500}
                    value={descriptionValue}
                    {...register('description', {
                        maxLength: { value: 500, message: 'Description cannot exceed 500 characters' }
                    })}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Select
                        label="Priority"
                        error={errors.priority?.message}
                        {...register('priority')}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </Select>

                    <Select
                        label="Status"
                        error={errors.status?.message}
                        {...register('status')}
                    >
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </Select>
                </div>

                <Input
                    type="date"
                    label="Due Date"
                    error={errors.dueDate?.message}
                    {...register('dueDate')}
                />
            </div>

            <div className="flex gap-3 justify-end">
                <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => navigate(-1)}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
                <Button 
                    type="submit" 
                    isLoading={isSubmitting}
                >
                    {isEdit ? 'Save Changes' : 'Create Task'}
                </Button>
            </div>
        </form>
    );
};

export default TodoForm;
