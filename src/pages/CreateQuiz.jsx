import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, CheckCircle, ArrowRight, ArrowLeft, Save } from 'lucide-react';

const CreateQuiz = () => {
    const [step, setStep] = useState(1);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([
        { id: 'q1', text: '', options: ['', '', '', ''], correctAnswer: '' }
    ]);

    const { addQuiz } = useQuiz();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleAddQuestion = () => {
        setQuestions([
            ...questions,
            { id: `q${Date.now()}`, text: '', options: ['', '', '', ''], correctAnswer: '' }
        ]);
    };

    const handleRemoveQuestion = (id) => {
        if (questions.length > 1) {
            setQuestions(questions.filter(q => q.id !== id));
        }
    };

    const handleQuestionChange = (id, field, value) => {
        setQuestions(questions.map(q =>
            q.id === id ? { ...q, [field]: value } : q
        ));
    };

    const handleOptionChange = (qId, optIdx, value) => {
        setQuestions(questions.map(q => {
            if (q.id === qId) {
                const newOptions = [...q.options];
                newOptions[optIdx] = value;
                return { ...q, options: newOptions };
            }
            return q;
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (questions.some(q => !q.text || !q.correctAnswer || q.options.some(o => !o))) {
            alert('Please fill all questions, options and select a correct answer for each.');
            return;
        }

        addQuiz({
            title,
            description,
            questions,
            createdBy: user?.name || 'Anonymous',
            createdAt: new Date().toISOString()
        });
        navigate('/quizzes');
    };

    return (
        <div className="container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass"
                style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto' }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2>{step === 1 ? 'Quiz Details' : 'Add Questions'}</h2>
                    <span style={{ color: 'var(--text-muted)' }}>Step {step} of 2</span>
                </div>

                {step === 1 ? (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Quiz Title</label>
                            <input
                                placeholder="e.g. JavaScript Masterclass"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
                            <textarea
                                rows="4"
                                placeholder="What is this quiz about?"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                style={{ resize: 'vertical' }}
                            />
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={() => step === 1 && title && description ? setStep(2) : alert('Fill details')}
                            style={{ width: '100%', justifyContent: 'center' }}
                        >
                            Next <ArrowRight size={18} />
                        </button>
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <div style={{ maxHeight: '500px', overflowY: 'auto', marginBottom: '2rem', paddingRight: '0.5rem' }}>
                            {questions.map((q, qIdx) => (
                                <div key={q.id} className="glass" style={{ padding: '1.5rem', marginBottom: '1.5rem', background: 'rgba(15, 23, 42, 0.4)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                        <strong>Question {qIdx + 1}</strong>
                                        <button
                                            onClick={() => handleRemoveQuestion(q.id)}
                                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    <input
                                        placeholder="Enter question text"
                                        value={q.text}
                                        onChange={(e) => handleQuestionChange(q.id, 'text', e.target.value)}
                                    />
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                                        {q.options.map((opt, optIdx) => (
                                            <div key={optIdx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                                <input
                                                    placeholder={`Option ${optIdx + 1}`}
                                                    value={opt}
                                                    onChange={(e) => handleOptionChange(q.id, optIdx, e.target.value)}
                                                    style={{ marginBottom: 0 }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleQuestionChange(q.id, 'correctAnswer', opt)}
                                                    className={q.correctAnswer === opt && opt !== '' ? 'btn btn-primary' : 'btn btn-secondary'}
                                                    style={{ padding: '0.5rem', borderRadius: '50%' }}
                                                >
                                                    <CheckCircle size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="btn btn-secondary" onClick={handleAddQuestion} style={{ width: '100%', marginBottom: '1rem', borderStyle: 'dashed' }}>
                            <Plus size={18} /> Add Another Question
                        </button>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button className="btn btn-secondary" onClick={() => setStep(1)} style={{ flex: 1, justifyContent: 'center' }}>
                                <ArrowLeft size={18} /> Back
                            </button>
                            <button className="btn btn-primary" onClick={handleSubmit} style={{ flex: 2, justifyContent: 'center' }}>
                                <Save size={18} /> Create Quiz
                            </button>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default CreateQuiz;
