import React from 'react';
import { Search, X } from 'lucide-react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';

const FilterBar = ({ 
    searchQuery, setSearchQuery, 
    filterStatus, setFilterStatus, 
    filterPriority, setFilterPriority, 
    sortBy, setSortBy,
    onReset
}) => {
    return (
        <div className="bg-surface rounded-xl border border-border p-4 shadow-subtle flex flex-col lg:flex-row gap-4 items-end">
            <div className="flex-grow w-full relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary z-10" />
                <Input 
                    placeholder="Search tasks..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    inputClassName="pl-9"
                    id="search"
                />
            </div>
            
            <div className="flex w-full lg:w-auto gap-3 flex-wrap md:flex-nowrap">
                <Select 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="min-w-[140px]"
                >
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </Select>
                
                <Select 
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="min-w-[140px]"
                >
                    <option value="All">All Priorities</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </Select>
                
                <Select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="min-w-[140px]"
                >
                    <option value="Newest">Newest First</option>
                    <option value="Oldest">Oldest First</option>
                    <option value="Priority">Priority</option>
                </Select>

                <Button 
                    variant="ghost" 
                    onClick={onReset}
                    className="px-3"
                    title="Reset filters"
                >
                    <X size={16} />
                </Button>
            </div>
        </div>
    );
};

export default FilterBar;
