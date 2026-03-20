import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { motion } from 'framer-motion';
import { Play, User, HelpCircle, Share2 } from 'lucide-react';
import Toast from '../components/Toast';

const QuizList = () => {
    const { quizzes } = useQuiz();
    const [showToast, setShowToast] = useState(false);

    const handleShare = (quizId) => {
        const url = `${window.location.origin}/online-quiz-maker/#/take-quiz/${quizId}`;
        navigator.clipboard.writeText(url).then(() => {
            setShowToast(true);
        });
    };

    return (
        <div className="container">
            {showToast && <Toast message="Link copied to clipboard!" onClose={() => setShowToast(false)} />}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ marginBottom: '3rem' }}
            >
                <h1 style={{ textAlign: 'center' }}>Available <span style={{ color: 'var(--primary)' }}>Quizzes</span></h1>
                <p style={{ textAlign: 'center' }}>Choose a quiz and test your skills!</p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {quizzes.length === 0 ? (
                    <p style={{ gridColumn: '1/-1', textAlign: 'center' }}>No quizzes available. Why not create one?</p>
                ) : (
                    quizzes.map((quiz, index) => (
                        <motion.div
                            key={quiz.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="glass"
                            style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}
                        >
                            <h3 style={{ marginBottom: '1rem' }}>{quiz.title}</h3>
                            <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1 }}>{quiz.description}</p>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                    <HelpCircle size={16} /> {quiz.questions.length} Questions
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                    <User size={16} /> By {quiz.createdBy}
                                </span>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <Link to={`/take-quiz/${quiz.id}`} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                                    <Play size={18} /> Start
                                </Link>
                                <button
                                    onClick={() => handleShare(quiz.id)}
                                    className="btn btn-secondary"
                                    style={{ padding: '0.5rem 1rem' }}
                                >
                                    <Share2 size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default QuizList;
