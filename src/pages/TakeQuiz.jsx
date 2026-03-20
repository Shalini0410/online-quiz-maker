import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Timer as TimerIcon, ArrowRight, ArrowLeft, Info } from 'lucide-react';
import Timer from '../components/Timer';

const TakeQuiz = () => {
    const { id } = useParams();
    const { quizzes } = useQuiz();
    const { updateStats } = useAuth();
    const navigate = useNavigate();

    const [currentQuiz, setCurrentQuiz] = useState(null);
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showExplanation, setShowExplanation] = useState(false);
    const [isTimeUp, setIsTimeUp] = useState(false);

    useEffect(() => {
        const quiz = quizzes.find(q => q.id === id);
        if (quiz) {
            setCurrentQuiz(quiz);
        } else {
            navigate('/quizzes');
        }
    }, [id, quizzes, navigate]);

    const submitQuiz = useCallback(() => {
        let score = 0;
        currentQuiz.questions.forEach((q, idx) => {
            if (answers[idx] === q.correctAnswer) {
                score++;
            }
        });

        updateStats(score, currentQuiz.questions.length);

        navigate('/results', {
            state: {
                score,
                total: currentQuiz.questions.length,
                quizTitle: currentQuiz.title,
                questions: currentQuiz.questions,
                userAnswers: answers
            }
        });
    }, [answers, currentQuiz, navigate, updateStats]);

    const handleNext = useCallback(() => {
        setShowExplanation(false);
        setIsTimeUp(false);
        if (currentQuestionIdx < currentQuiz.questions.length - 1) {
            setCurrentQuestionIdx(currentQuestionIdx + 1);
        } else {
            submitQuiz();
        }
    }, [currentQuestionIdx, currentQuiz, submitQuiz]);

    const handleTimeUp = useCallback(() => {
        setIsTimeUp(true);
        setShowExplanation(true);
        // Auto-advance after 3 seconds if time is up
        setTimeout(handleNext, 3000);
    }, [handleNext]);

    if (!currentQuiz) return <div className="container">Loading...</div>;

    const currentQuestion = currentQuiz.questions[currentQuestionIdx];
    const progress = ((currentQuestionIdx + 1) / currentQuiz.questions.length) * 100;

    const handleSelectAnswer = (opt) => {
        if (isTimeUp) return;
        setAnswers({ ...answers, [currentQuestionIdx]: opt });
        setShowExplanation(true);
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
                        <TimerIcon size={20} />
                        <span style={{ fontWeight: 'bold' }}>Live Quiz</span>
                    </div>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden', marginBottom: '1rem' }}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        style={{ height: '100%', background: 'var(--primary)' }}
                    />
                </div>

                <Timer
                    initialTime={currentQuestion.timeLimit || 30}
                    onTimeUp={handleTimeUp}
                    isActive={!showExplanation && !isTimeUp}
                />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestionIdx}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="glass"
                    style={{ padding: '2rem' }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.4rem', margin: 0 }}>{currentQuestion.text}</h3>
                        <span className="glass" style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem', background: 'rgba(99, 102, 241, 0.1)' }}>
                            {currentQuestion.difficulty || 'Medium'}
                        </span>
                    </div>

                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {currentQuestion.options.map((opt, idx) => {
                            const isSelected = answers[currentQuestionIdx] === opt;
                            const isCorrect = opt === currentQuestion.correctAnswer;
                            const showResult = showExplanation || isTimeUp;

                            let backgroundColor = 'rgba(255,255,255,0.05)';
                            let borderColor = 'transparent';

                            if (showResult) {
                                if (isCorrect) {
                                    backgroundColor = 'rgba(34, 197, 94, 0.2)';
                                    borderColor = '#22c55e';
                                } else if (isSelected) {
                                    backgroundColor = 'rgba(239, 68, 68, 0.2)';
                                    borderColor = '#ef4444';
                                }
                            } else if (isSelected) {
                                backgroundColor = 'rgba(99, 102, 241, 0.2)';
                                borderColor = 'var(--primary)';
                            }

                            return (
                                <motion.button
                                    key={idx}
                                    whileHover={!showResult ? { scale: 1.01 } : {}}
                                    whileTap={!showResult ? { scale: 0.99 } : {}}
                                    onClick={() => handleSelectAnswer(opt)}
                                    disabled={showResult}
                                    className="btn"
                                    style={{
                                        width: '100%',
                                        padding: '1.2rem',
                                        fontSize: '1.1rem',
                                        justifyContent: 'flex-start',
                                        background: backgroundColor,
                                        border: `2px solid ${borderColor}`,
                                        color: 'var(--text)',
                                        cursor: showResult ? 'default' : 'pointer'
                                    }}
                                >
                                    <div style={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        border: '2px solid var(--text-muted)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginRight: '1rem',
                                        borderColor: isSelected || (showResult && isCorrect) ? (isCorrect ? '#22c55e' : '#ef4444') : 'var(--text-muted)'
                                    }}>
                                        {(isSelected || (showResult && isCorrect)) && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: isCorrect ? '#22c55e' : '#ef4444' }} />}
                                    </div>
                                    {opt}
                                </motion.button>
                            );
                        })}
                    </div>

                    {showResult && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '12px' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--primary)', fontWeight: 'bold' }}>
                                <Info size={18} /> Explanation
                            </div>
                            <p style={{ fontSize: '0.95rem', margin: 0 }}>{currentQuestion.explanation || "Correct answer: " + currentQuestion.correctAnswer}</p>
                        </motion.div>
                    )}

                    <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                            className="btn btn-primary"
                            onClick={handleNext}
                            disabled={!showExplanation && !isTimeUp}
                            style={{ opacity: (!showExplanation && !isTimeUp) ? 0.5 : 1, minWidth: '150px', justifyContent: 'center' }}
                        >
                            {currentQuestionIdx === currentQuiz.questions.length - 1 ? 'See Results' : 'Next Question'} <ArrowRight size={18} />
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default TakeQuiz;
