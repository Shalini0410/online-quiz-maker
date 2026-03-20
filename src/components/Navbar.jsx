import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, PlusCircle, Layout, User } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
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

            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                {user ? (
                    <>
                        <Link to="/quizzes" className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
                            <Layout size={18} /> Quizzes
                        </Link>
                        <Link to="/create-quiz" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                            <PlusCircle size={18} /> Create
                        </Link>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '1rem' }}>
                            <User size={18} color="var(--primary)" />
                            <span>{user.name}</span>
                            <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginLeft: '0.5rem' }}>
                                <LogOut size={18} />
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ color: 'var(--text)', textDecoration: 'none' }}>Login</Link>
                        <Link to="/register" className="btn btn-primary">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
