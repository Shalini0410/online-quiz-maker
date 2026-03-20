import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Timer, ArrowRight, ArrowLeft } from 'lucide-react';

const TakeQuiz = () => {
    const { id } = useParams();
    const { quizzes } = useQuiz();
    const navigate = useNavigate();

    const [currentQuiz, setCurrentQuiz] = useState(null);
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        const quiz = quizzes.find(q => q.id === id);
        if (quiz) {
            setCurrentQuiz(quiz);
        } else {
            navigate('/quizzes');
        }
    }, [id, quizzes, navigate]);

    if (!currentQuiz) return <div className="container">Loading...</div>;

    const currentQuestion = currentQuiz.questions[currentQuestionIdx];
    const progress = ((currentQuestionIdx + 1) / currentQuiz.questions.length) * 100;

    const handleSelectAnswer = (opt) => {
        setAnswers({ ...answers, [currentQuestionIdx]: opt });
    };

    const handleNext = () => {
        if (currentQuestionIdx < currentQuiz.questions.length - 1) {
            setCurrentQuestionIdx(currentQuestionIdx + 1);
        } else {
            submitQuiz();
        }
    };

    const submitQuiz = () => {
        let score = 0;
        currentQuiz.questions.forEach((q, idx) => {
            if (answers[idx] === q.correctAnswer) {
                score++;
            }
        });

        navigate('/results', {
            state: {
                score,
                total: currentQuiz.questions.length,
                quizTitle: currentQuiz.title,
                questions: currentQuiz.questions,
                userAnswers: answers
            }
        });
    };

    return (
        <div className="container" style={{ maxWidth: '800px' }}>
            <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div>
                        <h2 style={{ marginBottom: '0.2rem' }}>{currentQuiz.title}</h2>
                        <p style={{ fontSize: '0.9rem' }}>Question {currentQuestionIdx + 1} of {currentQuiz.questions.length}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
                        <Timer size={20} />
                        <span style={{ fontWeight: 'bold' }}>Progress</span>
                    </div>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        style={{ height: '100%', background: 'var(--primary)' }}
                    />
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestionIdx}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="glass"
                    style={{ padding: '3rem' }}
                >
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>{currentQuestion.text}</h3>

                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {currentQuestion.options.map((opt, idx) => (
                            <motion.button
                                key={idx}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleSelectAnswer(opt)}
                                className="btn"
                                style={{
                                    width: '100%',
                                    padding: '1.5rem',
                                    fontSize: '1.1rem',
                                    justifyContent: 'flex-start',
                                    background: answers[currentQuestionIdx] === opt ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255,255,255,0.05)',
                                    border: `2px solid ${answers[currentQuestionIdx] === opt ? 'var(--primary)' : 'transparent'}`,
                                    color: 'white'
                                }}
                            >
                                <div style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    border: '2px solid var(--text-muted)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: '1rem',
                                    borderColor: answers[currentQuestionIdx] === opt ? 'var(--primary)' : 'var(--text-muted)'
                                }}>
                                    {answers[currentQuestionIdx] === opt && <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)' }} />}
                                </div>
                                {opt}
                            </motion.button>
                        ))}
                    </div>

                    <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'space-between' }}>
                        <button
                            className="btn btn-secondary"
                            onClick={() => setCurrentQuestionIdx(Math.max(0, currentQuestionIdx - 1))}
                            disabled={currentQuestionIdx === 0}
                            style={{ opacity: currentQuestionIdx === 0 ? 0.5 : 1 }}
                        >
                            <ArrowLeft size={18} /> Previous
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleNext}
                            disabled={!answers[currentQuestionIdx]}
                            style={{ opacity: !answers[currentQuestionIdx] ? 0.5 : 1, minWidth: '150px', justifyContent: 'center' }}
                        >
                            {currentQuestionIdx === currentQuiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'} <ArrowRight size={18} />
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default TakeQuiz;
