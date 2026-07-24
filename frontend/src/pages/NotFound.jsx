import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-yellow-50 text-yellow-500 p-6 rounded-full mb-6">
                <AlertTriangle size={64} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">404 - Page Not Found</h1>
            <p className="text-xl text-gray-500 mb-8 max-w-md">
                Oops! The page you are looking for doesn't exist or has been moved.
            </p>
            <Link to="/" className="btn btn-primary px-8 py-3 gap-2 text-lg">
                <Home size={20} />
                Back to Dashboard
            </Link>
        </div>
    );
};

export default NotFound;
