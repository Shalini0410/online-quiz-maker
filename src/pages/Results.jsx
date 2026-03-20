import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, RefreshCcw, Home as HomeIcon, CheckCircle2, XCircle } from 'lucide-react';

const Results = () => {
    const location = useLocation();
    const { score, total, quizTitle, questions, userAnswers } = location.state || { score: 0, total: 0, quizTitle: 'Unknown' };

    const percentage = Math.round((score / total) * 100);

    return (
        <div className="container" style={{ maxWidth: '900px' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass"
                style={{ padding: '4rem', textAlign: 'center', marginBottom: '3rem' }}
            >
                <Trophy size={80} color={percentage > 70 ? '#fbbf24' : '#94a3b8'} style={{ marginBottom: '2rem' }} />
                <h1>Quiz Completed!</h1>
                <p style={{ fontSize: '1.5rem', marginBottom: '3rem' }}>
                    Your score for <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{quizTitle}</span> is:
                </p>

                <div style={{ display: 'inline-block', position: 'relative', marginBottom: '3rem' }}>
                    <div style={{ fontSize: '5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                        {score} / {total}
                    </div>
                    <div style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
                        {percentage}% Accuracy
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                    <Link to="/quizzes" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>
                        <RefreshCcw size={20} /> Try Another
                    </Link>
                    <Link to="/" className="btn btn-secondary" style={{ padding: '1rem 2rem' }}>
                        <HomeIcon size={20} /> Go Home
                    </Link>
                </div>
            </motion.div>

            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Review Your Answers</h2>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {questions?.map((q, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass"
                            style={{
                                padding: '2rem',
                                borderLeft: `6px solid ${userAnswers[idx] === q.correctAnswer ? '#22c55e' : '#ef4444'}`
                            }}
                        >
                            <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{idx + 1}. {q.text}</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                <div style={{ padding: '1rem', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '8px', color: '#22c55e' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                        <CheckCircle2 size={14} /> CORRECT ANSWER
                                    </div>
                                    {q.correctAnswer}
                                </div>
                                <div style={{
                                    padding: '1rem',
                                    background: userAnswers[idx] === q.correctAnswer ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                    borderRadius: '8px',
                                    color: userAnswers[idx] === q.correctAnswer ? '#22c55e' : '#ef4444'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                        {userAnswers[idx] === q.correctAnswer ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                                        YOUR ANSWER
                                    </div>
                                    {userAnswers[idx] || 'No answer'}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Results;
