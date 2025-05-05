import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';

const UserButton = ({ onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!user) return null;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 focus:outline-none"
                aria-label="User menu"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <div className="size-8 overflow-hidden rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-700">
                        {user.first_name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                </div>
                <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">{user.first_name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg z-50 border border-gray-200 divide-y divide-gray-100">
                    <div className="px-4 py-3">
                        <p className="text-sm font-medium">{user.first_name} {user.last_name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <div className="py-1">
                        <button
                            onClick={() => {
                                navigate('/dashboard/profile');
                                setIsOpen(false);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            My Profile
                        </button>
                        <button
                            onClick={() => {
                                onLogout();
                                setIsOpen(false);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserButton;