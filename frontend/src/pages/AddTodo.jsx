import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TodoForm from '../components/todos/TodoForm';
import Button from '../components/common/Button';

const AddTodo = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Button 
                variant="ghost" 
                onClick={() => navigate(-1)} 
                className="mb-6 -ml-4"
            >
                <ArrowLeft size={16} className="mr-2" />
                Back
            </Button>

            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-primary">Create Task</h1>
                <p className="text-secondary mt-1">Add a new task to your workspace.</p>
            </div>

            <TodoForm />
        </div>
    );
};

export default AddTodo;
