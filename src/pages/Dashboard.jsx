import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Trophy, Target, Award, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();

    const stats = [
        { label: 'Total Quizzes', value: user?.totalQuizzes || 0, icon: Target, color: '#6366f1' },
        { label: 'Average Score', value: user?.totalQuizzes ? `${Math.round((user.totalScore || 0) / user.totalQuizzes)}%` : '0%', icon: Award, color: '#ec4899' },
        { label: 'Best Score', value: `${user?.bestScore || 0}%`, icon: Trophy, color: '#fbbf24' },
    ];

    const recentAttempts = user?.attempts || [];

    return (
        <div className="container" style={{ maxWidth: '1000px' }}>
            <header style={{ marginBottom: '3rem' }}>
                <h1>Welcome back, <span style={{ color: 'var(--primary)' }}>{user?.name}!</span></h1>
                <p>Track your progress and keep improving your skills.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass"
                        style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}
                    >
                        <div style={{ padding: '1rem', background: `${stat.color}20`, borderRadius: '12px' }}>
                            <stat.icon size={28} color={stat.color} />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{stat.label}</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stat.value}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                <section className="glass" style={{ padding: '2rem' }}>
                    <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={24} color="var(--primary)" /> Recent Activity
                    </h2>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {recentAttempts.length === 0 ? (
                            <p>No attempts yet. Take a quiz to see your activity here!</p>
                        ) : (
                            recentAttempts.slice(-5).reverse().map((attempt, idx) => (
                                <div key={idx} style={{ padding: '1rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ fontWeight: '600' }}>Quiz Attempt</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date(attempt.date).toLocaleDateString()}</div>
                                    </div>
                                    <div style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{attempt.score}/{attempt.total}</div>
                                </div>
                            ))
                        )}
                    </div>
                </section>

                <section className="glass" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
                    <h3>Ready for a challenge?</h3>
                    <p style={{ marginBottom: '2rem' }}>Test your knowledge with our latest quizzes.</p>
                    <Link to="/quizzes" className="btn btn-primary" style={{ justifyContent: 'center' }}>
                        Browse All Quizzes <ChevronRight size={18} />
                    </Link>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
