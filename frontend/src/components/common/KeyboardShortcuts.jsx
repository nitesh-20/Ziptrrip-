import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const KeyboardShortcuts = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleKeyDown = (e) => {
            // Don't trigger if user is typing in an input or textarea
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
                return;
            }

            if (e.key === 'n' || e.key === 'N') {
                e.preventDefault();
                navigate('/add');
            } else if (e.key === '/') {
                e.preventDefault();
                if (location.pathname !== '/') {
                    navigate('/');
                }
                setTimeout(() => {
                    const searchInput = document.getElementById('global-search-input');
                    if (searchInput) searchInput.focus();
                }, 100);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [navigate, location]);

    return null;
};

export default KeyboardShortcuts;
