import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Trash2, Edit2, Eye } from 'lucide-react';
import Badge from '../common/Badge';
import { formatDate, isOverdue } from '../../utils/dateUtils';

const TodoCard = ({ todo, onDeleteClick }) => {
    const overdue = isOverdue(todo.dueDate, todo.status);

    return (
        <div className={`card p-5 border-l-4 ${todo.status === 'Completed' ? 'border-l-green-500 bg-gray-50/50' : overdue ? 'border-l-red-500' : 'border-l-blue-500'}`}>
            <div className="flex justify-between items-start gap-4">
                <div className="flex-grow min-w-0">
                    <h3 className={`text-lg font-semibold truncate ${todo.status === 'Completed' ? 'text-gray-500 line-through' : 'text-gray-900'}`} title={todo.title}>
                        {todo.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2" title={todo.description}>
                        {todo.description || 'No description provided'}
                    </p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                    <Badge variant={todo.status}>{todo.status}</Badge>
                    <Badge variant={todo.priority}>{todo.priority}</Badge>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500 gap-1.5">
                    <Calendar size={16} className={overdue ? 'text-red-500' : ''} />
                    <span className={overdue ? 'text-red-600 font-medium' : ''}>
                        {todo.dueDate ? formatDate(todo.dueDate) : 'No due date'}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <Link 
                        to={`/todos/${todo.id}`}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        title="View Details"
                    >
                        <Eye size={18} />
                    </Link>
                    <Link 
                        to={`/edit/${todo.id}`}
                        className="p-1.5 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-md transition-colors"
                        title="Edit"
                    >
                        <Edit2 size={18} />
                    </Link>
                    <button 
                        onClick={() => onDeleteClick(todo)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Delete"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoCard;
