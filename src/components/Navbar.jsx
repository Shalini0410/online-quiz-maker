import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { LogOut, PlusCircle, Layout, User, Sun, Moon, Shield } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="glass" style={{ margin: '1rem', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: '1rem', zIndex: 100 }}>
            <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text)', textDecoration: 'none' }}>
                Quiz<span style={{ color: 'var(--primary)' }}>Maker</span>
            </Link>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <button
                    onClick={toggleTheme}
                    className="btn btn-secondary"
                    style={{ padding: '0.5rem', border: 'none', background: 'none' }}
                    title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
                >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {user ? (
                    <>
                        <Link to="/dashboard" className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
                            <Layout size={18} /> Dashboard
                        </Link>
                        <Link to="/quizzes" className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
                            Quizzes
                        </Link>
                        <Link to="/admin" className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
                            <Shield size={18} /> Admin
                        </Link>
                        <Link to="/create-quiz" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                            <PlusCircle size={18} /> Create
                        </Link>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '0.5rem' }}>
                            <User size={18} color="var(--primary)" />
                            <span style={{ fontSize: '0.9rem' }}>{user.name}</span>
                            <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.5rem' }}>
                                <LogOut size={18} />
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>Login</Link>
                        <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
