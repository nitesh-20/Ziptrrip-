import React from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Trash2, Calendar, Clock } from 'lucide-react';
import Badge from '../common/Badge';
import { formatDate } from '../../utils/dateUtils';
import Button from '../common/Button';

const TodoCard = ({ todo, onDelete }) => {
    return (
        <div className="group bg-surface rounded-xl border border-border p-5 shadow-subtle hover:shadow-elevated transition-all duration-200 relative flex flex-col h-full">
            <Link to={`/todo/${todo.id}`} className="absolute inset-0 z-0 rounded-xl" aria-label={`View details for ${todo.title}`}></Link>
            
            <div className="flex justify-between items-start mb-3 z-10 relative pointer-events-none">
                <div className="flex gap-2">
                    <Badge>{todo.priority}</Badge>
                    <Badge variant={todo.status}>{todo.status}</Badge>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 pointer-events-auto">
                    <Link to={`/edit/${todo.id}`}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Edit todo">
                            <Pencil size={14} />
                        </Button>
                    </Link>
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50" 
                        onClick={() => onDelete(todo.id)}
                        title="Delete todo"
                    >
                        <Trash2 size={14} />
                    </Button>
                </div>
            </div>

            <div className="mb-4 flex-grow z-10 relative pointer-events-none">
                <h3 className="text-lg font-semibold text-primary mb-1 line-clamp-1">{todo.title}</h3>
                <p className="text-sm text-secondary line-clamp-2">{todo.description || 'No description provided.'}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between mt-auto pt-4 border-t border-border z-10 relative pointer-events-none">
                <div className="flex items-center text-xs font-medium text-secondary">
                    <Clock size={12} className="mr-1.5" />
                    <span>Created {formatDate(todo.createdAt)}</span>
                </div>
                {todo.dueDate && (
                    <div className="flex items-center text-xs font-medium text-secondary">
                        <Calendar size={12} className="mr-1.5" />
                        <span>Due {formatDate(todo.dueDate)}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TodoCard;
