import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckSquare } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();

    return (
        <header className="bg-white border-b sticky top-0 z-10">
            <div className="container mx-auto px-4 max-w-5xl h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
                    <CheckSquare size={28} />
                    <span className="font-bold text-xl text-gray-900 tracking-tight">TodoMaster</span>
                </Link>
                
                <nav className="flex items-center gap-4">
                    <Link 
                        to="/" 
                        className={`text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                        Dashboard
                    </Link>
                    <Link 
                        to="/add" 
                        className="btn btn-primary px-4 py-2 text-sm"
                    >
                        Add Todo
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
