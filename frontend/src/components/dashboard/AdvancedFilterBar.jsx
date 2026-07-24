import React, { useState, useEffect } from 'react';
import { Search, X, Filter } from 'lucide-react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { useDebounce } from '../../hooks/useDebounce';

const CATEGORIES = ['All', 'Work', 'Personal', 'Study', 'Shopping', 'Health', 'Others'];

const AdvancedFilterBar = ({ 
    searchQuery, setSearchQuery, 
    filterPriority, setFilterPriority, 
    filterStatus, setFilterStatus,
    filterCategory, setFilterCategory,
    sortBy, setSortBy
}) => {
    const [localQuery, setLocalQuery] = useState(searchQuery);
    const debouncedQuery = useDebounce(localQuery, 300);

    useEffect(() => {
        setSearchQuery(debouncedQuery);
    }, [debouncedQuery, setSearchQuery]);

    useEffect(() => {
        setLocalQuery(searchQuery);
    }, [searchQuery]);

    const isFiltered = localQuery || filterPriority !== 'All' || filterStatus !== 'All' || filterCategory !== 'All';

    const clearFilters = () => {
        setLocalQuery('');
        setSearchQuery('');
        setFilterPriority('All');
        setFilterStatus('All');
        setFilterCategory('All');
    };

    return (
        <div className="bg-surface border border-border rounded-xl p-4 md:p-5 shadow-subtle mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={18} />
                    <Input 
                        id="global-search-input"
                        placeholder="Search by title, description, tags... (Press / to focus)" 
                        value={localQuery}
                        onChange={(e) => setLocalQuery(e.target.value)}
                        inputClassName="pl-9"
                    />
                    {searchQuery && (
                        <button 
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 rounded-md"
                            title="Clear search"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>
                
                <div className="flex flex-wrap md:flex-nowrap gap-3 w-full md:w-auto shrink-0">
                    <Select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full md:w-40 bg-muted/50"
                    >
                        <option value="Newest">Newest First</option>
                        <option value="Oldest">Oldest First</option>
                        <option value="DueDate">Due Date</option>
                        <option value="Priority">Priority</option>
                        <option value="Alphabetical">A-Z</option>
                    </Select>
                    
                    {isFiltered && (
                        <Button variant="ghost" onClick={clearFilters} className="px-3" title="Clear all filters">
                            <X size={16} className="mr-2" />
                            Clear
                        </Button>
                    )}
                </div>
            </div>

            <div className="flex flex-wrap gap-3 items-center pt-2 border-t border-border/50">
                <div className="flex items-center text-sm font-medium text-secondary mr-2">
                    <Filter size={14} className="mr-2" /> Filters:
                </div>
                
                <div className="flex flex-wrap gap-3 w-full md:w-auto">
                    <Select 
                        value={filterStatus} 
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-[120px] h-8 text-xs py-1"
                    >
                        <option value="All">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Archived">Archived</option>
                    </Select>
                    
                    <Select 
                        value={filterPriority} 
                        onChange={(e) => setFilterPriority(e.target.value)}
                        className="w-[120px] h-8 text-xs py-1"
                    >
                        <option value="All">All Priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </Select>

                    <Select 
                        value={filterCategory} 
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="w-[120px] h-8 text-xs py-1"
                    >
                        {CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
                        ))}
                    </Select>
                </div>
            </div>
        </div>
    );
};

export default AdvancedFilterBar;
