import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Star, Pin, Edit2, Trash2, Copy } from 'lucide-react';
import Badge from '../common/Badge';
import Checkbox from '../common/Checkbox';
import Dropdown from '../common/Dropdown';
import { isOverdue, formatRelativeDate } from '../../utils/dateUtils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const TodoCard = ({ todo, onToggleStatus, onDelete, onUpdate, onDuplicate, isSelected, onSelect }) => {
    
    // Sortable setup (optional if wrapped in SortableContext)
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: todo.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
    };

    const isTaskOverdue = isOverdue(todo.dueDate) && todo.status !== 'Completed';

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return 'danger';
            case 'Medium': return 'warning';
            case 'Low': return 'success';
            default: return 'neutral';
        }
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case 'Work': return 'bg-blue-100 text-blue-800';
            case 'Personal': return 'bg-green-100 text-green-800';
            case 'Study': return 'bg-purple-100 text-purple-800';
            case 'Health': return 'bg-rose-100 text-rose-800';
            case 'Shopping': return 'bg-amber-100 text-amber-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const togglePin = (e) => {
        e.stopPropagation();
        onUpdate(todo.id, { isPinned: !todo.isPinned });
    };

    const toggleFavorite = (e) => {
        e.stopPropagation();
        onUpdate(todo.id, { isFavorite: !todo.isFavorite });
    };

    const dropdownItems = [
        { label: 'Edit Task', icon: <Edit2 size={16} />, onClick: () => document.getElementById(`edit-link-${todo.id}`).click() },
        { label: 'Duplicate', icon: <Copy size={16} />, onClick: () => onDuplicate(todo) },
        { divider: true },
        { label: todo.isArchived ? 'Unarchive' : 'Archive', onClick: () => onUpdate(todo.id, { isArchived: !todo.isArchived }) },
        { label: 'Delete', icon: <Trash2 size={16} />, danger: true, onClick: () => onDelete(todo.id) }
    ];

    return (
        <div 
            ref={setNodeRef}
            style={style}
            className={`group bg-surface rounded-xl border p-4 transition-all hover:shadow-elevated
                ${isSelected ? 'border-primary ring-1 ring-primary' : 'border-border'}
                ${todo.status === 'Completed' ? 'opacity-75' : ''}
                ${isTaskOverdue ? 'border-red-200 bg-red-50/30' : ''}
            `}
        >
            <div className="flex gap-3">
                <div className="pt-1 flex items-start gap-2">
                    <div {...attributes} {...listeners} className="cursor-grab hover:text-primary text-border">
                        <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                            <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
                        </svg>
                    </div>
                    <Checkbox checked={isSelected} onChange={onSelect} />
                </div>
                
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                {todo.isPinned && <Pin size={14} fill="currentColor" className="text-amber-500" />}
                                {todo.isFavorite && <Star size={14} fill="currentColor" className="text-amber-500" />}
                                <Link to={`/todos/${todo.id}`} className={`text-lg font-semibold hover:text-accent transition-colors line-clamp-1 ${todo.status === 'Completed' ? 'text-secondary line-through' : 'text-primary'}`}>
                                    {todo.title}
                                </Link>
                            </div>
                            {todo.description && (
                                <p className="text-sm text-secondary line-clamp-2 mb-3">
                                    {todo.description}
                                </p>
                            )}
                        </div>
                        
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={togglePin} className={`p-1.5 rounded hover:bg-muted ${todo.isPinned ? 'text-amber-500' : 'text-secondary'}`} title={todo.isPinned ? 'Unpin' : 'Pin'}>
                                <Pin size={16} fill={todo.isPinned ? 'currentColor' : 'none'} />
                            </button>
                            <button onClick={toggleFavorite} className={`p-1.5 rounded hover:bg-muted ${todo.isFavorite ? 'text-amber-500' : 'text-secondary'}`} title={todo.isFavorite ? 'Unfavorite' : 'Favorite'}>
                                <Star size={16} fill={todo.isFavorite ? 'currentColor' : 'none'} />
                            </button>
                            <Dropdown items={dropdownItems} />
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-3">
                        <Badge 
                            variant={todo.status === 'Completed' ? 'success' : 'neutral'}
                            className="cursor-pointer"
                            onClick={() => onToggleStatus(todo.id, todo.status)}
                        >
                            {todo.status}
                        </Badge>
                        <Badge variant={getPriorityColor(todo.priority)}>
                            {todo.priority}
                        </Badge>
                        
                        {todo.category && todo.category !== 'Others' && (
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(todo.category)}`}>
                                {todo.category}
                            </span>
                        )}

                        <div className="flex items-center gap-3 ml-auto text-xs font-medium">
                            {todo.dueDate && (
                                <div className={`flex items-center gap-1.5 ${isTaskOverdue ? 'text-red-600' : 'text-secondary'}`}>
                                    <Calendar size={14} />
                                    <span>{formatRelativeDate(todo.dueDate)}</span>
                                </div>
                            )}
                            {todo.estimatedTime && (
                                <div className="flex items-center gap-1.5 text-secondary" title="Estimated Time">
                                    <Clock size={14} />
                                    <span>{todo.estimatedTime}m</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Hidden edit link for dropdown */}
            <Link to={`/edit/${todo.id}`} id={`edit-link-${todo.id}`} className="hidden" />
        </div>
    );
};

export default TodoCard;
