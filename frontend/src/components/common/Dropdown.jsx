import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';

const Dropdown = ({ trigger, items, align = 'right' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }} className="cursor-pointer">
                {trigger || (
                    <button className="p-1 rounded-md hover:bg-muted text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20">
                        <MoreVertical size={18} />
                    </button>
                )}
            </div>

            {isOpen && (
                <div 
                    className={`absolute z-50 mt-1 w-48 rounded-md bg-surface shadow-elevated border border-border py-1 ${align === 'right' ? 'right-0 origin-top-right' : 'left-0 origin-top-left'}`}
                >
                    <div className="flex flex-col">
                        {items.map((item, index) => {
                            if (item.divider) {
                                return <div key={`divider-${index}`} className="h-px bg-border my-1" />;
                            }
                            return (
                                <button
                                    key={index}
                                    className={`flex items-center w-full px-4 py-2 text-sm text-left transition-colors ${item.danger ? 'text-red-600 hover:bg-red-50' : 'text-primary hover:bg-muted'}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsOpen(false);
                                        if (item.onClick) item.onClick();
                                    }}
                                >
                                    {item.icon && <span className="mr-2">{item.icon}</span>}
                                    {item.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
