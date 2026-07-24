import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import KeyboardShortcuts from './components/common/KeyboardShortcuts';

// Lazy loading pages
const Home = lazy(() => import('./pages/Home'));
const AddTodo = lazy(() => import('./pages/AddTodo'));
const EditTodo = lazy(() => import('./pages/EditTodo'));
const TodoDetail = lazy(() => import('./pages/TodoDetail'));

const App = () => {
    return (
        <Router>
            <div className="min-h-screen bg-background flex flex-col">
                <Navbar />
                <KeyboardShortcuts />
                <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
                    <Suspense fallback={
                        <div className="flex items-center justify-center min-h-[50vh]">
                            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                        </div>
                    }>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/add" element={<AddTodo />} />
                            <Route path="/edit/:id" element={<EditTodo />} />
                            <Route path="/todos/:id" element={<TodoDetail />} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    );
};

export default App;
