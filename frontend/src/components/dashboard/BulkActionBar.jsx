import React from 'react';
import { Trash2, CheckCircle2, X } from 'lucide-react';
import Button from '../common/Button';
import Dropdown from '../common/Dropdown';

const BulkActionBar = ({ selectedCount, onClearSelection, onBulkDelete, onBulkStatus, onBulkPriority }) => {
    
    if (selectedCount === 0) return null;

    const priorityItems = [
        { label: 'Set High', onClick: () => onBulkPriority('High') },
        { label: 'Set Medium', onClick: () => onBulkPriority('Medium') },
        { label: 'Set Low', onClick: () => onBulkPriority('Low') }
    ];

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5 duration-300">
            <div className="bg-primary text-white rounded-full shadow-float px-6 py-3 flex items-center gap-6 border border-primary/20">
                <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center bg-white/20 rounded-full w-6 h-6 text-xs font-medium">
                        {selectedCount}
                    </span>
                    <span className="text-sm font-medium">selected</span>
                </div>
                
                <div className="h-4 w-px bg-white/20" />
                
                <div className="flex items-center gap-2">
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-white hover:bg-white/10 hover:text-white border-transparent"
                        onClick={() => onBulkStatus('Completed')}
                    >
                        <CheckCircle2 size={16} className="mr-2" />
                        Complete
                    </Button>

                    <Dropdown 
                        trigger={
                            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 hover:text-white border-transparent">
                                Priority
                            </Button>
                        }
                        items={priorityItems}
                        align="center"
                    />

                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-400 hover:bg-red-500/20 hover:text-red-300 border-transparent"
                        onClick={onBulkDelete}
                    >
                        <Trash2 size={16} className="mr-2" />
                        Delete
                    </Button>
                </div>

                <div className="h-4 w-px bg-white/20" />

                <button 
                    onClick={onClearSelection}
                    className="p-1 hover:bg-white/10 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                    title="Clear selection"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
};

export default BulkActionBar;
