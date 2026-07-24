import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckSquare, LayoutDashboard, ListTodo, BarChart2, Archive } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();

    const navLinks = [
        { path: '/', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/tasks', label: 'Tasks', icon: ListTodo },
        { path: '/analytics', label: 'Analytics', icon: BarChart2 },
        { path: '/archived', label: 'Archived', icon: Archive },
    ];

    return (
        <header className="bg-white border-b sticky top-0 z-10">
            <div className="container mx-auto px-4 max-w-7xl h-16 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
                        <CheckSquare size={28} />
                        <span className="font-bold text-xl text-gray-900 tracking-tight">TodoMaster</span>
                    </Link>
                    
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map(({ path, label, icon: Icon }) => {
                            const isActive = location.pathname === path;
                            return (
                                <Link 
                                    key={path}
                                    to={path} 
                                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        isActive 
                                            ? 'bg-blue-50 text-blue-700' 
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                >
                                    <Icon size={16} />
                                    {label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <Link 
                        to="/add" 
                        className="btn btn-primary px-4 py-2 text-sm font-medium shadow-sm flex items-center gap-2"
                    >
                        <span className="hidden sm:inline">Add Task</span>
                        <span className="sm:hidden">+</span>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
