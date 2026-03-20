import React from 'react';
import { Link } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { motion } from 'framer-motion';
import { Play, User, HelpCircle } from 'lucide-react';

const QuizList = () => {
    const { quizzes } = useQuiz();

    return (
        <div className="container">
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

                            <Link to={`/take-quiz/${quiz.id}`} className="btn btn-primary" style={{ justifyContent: 'center' }}>
                                <Play size={18} /> Start Quiz
                            </Link>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default QuizList;
