import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';
import Input from '../common/Input';
import Select from '../common/Select';
import Textarea from '../common/Textarea';
import Button from '../common/Button';
import { X } from 'lucide-react';

const CATEGORIES = ['Work', 'Personal', 'Study', 'Shopping', 'Health', 'Others'];

const TodoForm = ({ initialData, isEdit = false }) => {
    const navigate = useNavigate();
    const [tags, setTags] = useState(initialData?.tags || []);
    const [tagInput, setTagInput] = useState('');
    
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
            category: initialData?.category || 'Others',
            estimatedTime: initialData?.estimatedTime || '',
            dueDate: initialData?.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : ''
        }
    });

    const descriptionValue = watch('description');

    const handleAddTag = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const trimmed = tagInput.trim();
            if (trimmed && !tags.includes(trimmed)) {
                if (tags.length >= 5) {
                    toast.error('Maximum 5 tags allowed');
                    return;
                }
                setTags([...tags, trimmed]);
            }
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(t => t !== tagToRemove));
    };

    const onSubmit = async (data) => {
        const payload = {
            ...data,
            tags,
            estimatedTime: data.estimatedTime ? Number(data.estimatedTime) : null
        };

        try {
            if (isEdit) {
                await api.put(`/todos/${initialData.id}`, payload);
                toast.success('Task updated successfully');
            } else {
                await api.post('/todos', payload);
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
                    
                    <Select
                        label="Category"
                        error={errors.category?.message}
                        {...register('category')}
                    >
                        {CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </Select>
                    
                    <Input
                        type="number"
                        label="Estimated Time (minutes)"
                        placeholder="e.g. 30"
                        error={errors.estimatedTime?.message}
                        {...register('estimatedTime', {
                            min: { value: 1, message: 'Must be at least 1 minute' }
                        })}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Input
                        type="date"
                        label="Due Date"
                        error={errors.dueDate?.message}
                        {...register('dueDate')}
                    />
                    
                    <div>
                        <label className="block text-sm font-medium text-primary mb-1.5">Tags (Press Enter)</label>
                        <Input
                            placeholder="Add tags..."
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleAddTag}
                        />
                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {tags.map(tag => (
                                    <span key={tag} className="inline-flex items-center px-2 py-1 rounded bg-muted text-xs text-secondary">
                                        {tag}
                                        <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-primary">
                                            <X size={12} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
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
