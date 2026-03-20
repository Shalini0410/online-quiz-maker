import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit2, Search, Filter } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';

const AdminPanel = () => {
    const { quizzes } = useQuiz();
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="container">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1>Admin <span style={{ color: 'var(--primary)' }}>Dashboard</span></h1>
                    <p>Manage quiz content and structure.</p>
                </div>
                <button className="btn btn-primary">
                    <Plus size={18} /> Add New Quiz
                </button>
            </header>

            <div className="glass" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search quizzes..."
                        style={{ paddingLeft: '3rem', marginBottom: 0 }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="btn btn-secondary">
                    <Filter size={18} /> Filters
                </button>
            </div>

            <div className="glass" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)' }}>
                            <th style={{ padding: '1.5rem' }}>QUIZ TITLE</th>
                            <th style={{ padding: '1.5rem' }}>QUESTIONS</th>
                            <th style={{ padding: '1.5rem' }}>CREATED BY</th>
                            <th style={{ padding: '1.5rem', textAlign: 'right' }}>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quizzes.length === 0 ? (
                            <tr>
                                <td colSpan="4" style={{ padding: '3rem', textAlign: 'center' }}>No quizzes found.</td>
                            </tr>
                        ) : (
                            quizzes.map((quiz) => (
                                <tr key={quiz.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }}>
                                    <td style={{ padding: '1.5rem', fontWeight: '600' }}>{quiz.title}</td>
                                    <td style={{ padding: '1.5rem' }}>{quiz.questions.length}</td>
                                    <td style={{ padding: '1.5rem' }}>{quiz.createdBy}</td>
                                    <td style={{ padding: '1.5rem', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                            <button className="btn btn-secondary" style={{ padding: '0.5rem' }} title="Edit">
                                                <Edit2 size={16} />
                                            </button>
                                            <button className="btn btn-secondary" style={{ padding: '0.5rem', color: '#ef4444', borderColor: '#ef4444' }} title="Delete">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPanel;
