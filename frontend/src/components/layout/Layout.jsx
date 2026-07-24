import React from 'react';
import Navbar from './Navbar';
import { Toaster } from 'react-hot-toast';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Toaster position="top-right" />
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
                {children}
            </main>
            <footer className="bg-white border-t py-6 text-center text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} Intern Todo App. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Layout;
