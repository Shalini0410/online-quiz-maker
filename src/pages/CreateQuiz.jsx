import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, CheckCircle, ArrowRight, ArrowLeft, Save, Clock, BarChart3, Info } from 'lucide-react';

const CreateQuiz = () => {
    const [step, setStep] = useState(1);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('General');
    const [questions, setQuestions] = useState([
        { id: 'q1', text: '', options: ['', '', '', ''], correctAnswer: '', difficulty: 'Medium', timeLimit: 30, explanation: '' }
    ]);

    const { addQuiz } = useQuiz();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleAddQuestion = () => {
        setQuestions([
            ...questions,
            { id: `q${Date.now()}`, text: '', options: ['', '', '', ''], correctAnswer: '', difficulty: 'Medium', timeLimit: 30, explanation: '' }
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
            category,
            questions,
            createdBy: user?.name || 'Anonymous',
            createdAt: new Date().toISOString()
        });
        navigate('/quizzes');
    };

    return (
        <div className="container" style={{ maxWidth: '900px' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass"
                style={{ padding: '2.5rem', margin: '0 auto' }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <h2>{step === 1 ? 'Quiz Details' : 'Add Questions'}</h2>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <div style={{ width: '40px', height: '4px', borderRadius: '2px', background: 'var(--primary)' }} />
                        <div style={{ width: '40px', height: '4px', borderRadius: '2px', background: step === 2 ? 'var(--primary)' : 'var(--border)' }} />
                    </div>
                </div>

                {step === 1 ? (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 200px', gap: '1.5rem', marginBottom: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Quiz Title*</label>
                                <input
                                    placeholder="e.g. JavaScript Masterclass"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Category</label>
                                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option value="General">General</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Science">Science</option>
                                    <option value="History">History</option>
                                </select>
                            </div>
                        </div>
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Description*</label>
                            <textarea
                                rows="4"
                                placeholder="What is this quiz about?"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                style={{ resize: 'vertical' }}
                                required
                            />
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={() => (title && description) ? setStep(2) : alert('Please fill in title and description')}
                            style={{ width: '100%', justifyContent: 'center' }}
                        >
                            Next: Add Questions <ArrowRight size={18} />
                        </button>
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <div style={{ maxHeight: '600px', overflowY: 'auto', marginBottom: '2rem', paddingRight: '0.5rem' }}>
                            {questions.map((q, qIdx) => (
                                <div key={q.id} className="glass" style={{ padding: '2rem', marginBottom: '2rem', background: 'rgba(99, 102, 241, 0.05)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <h3 style={{ margin: 0 }}>Question {qIdx + 1}</h3>
                                        <button
                                            onClick={() => handleRemoveQuestion(q.id)}
                                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                    <input
                                        placeholder="Enter question text"
                                        value={q.text}
                                        onChange={(e) => handleQuestionChange(q.id, 'text', e.target.value)}
                                        style={{ fontSize: '1.1rem' }}
                                    />

                                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) 1fr', gap: '2rem', marginTop: '1.5rem' }}>
                                        <div>
                                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontWeight: '600', fontSize: '0.9rem' }}>
                                                Options & Answer
                                            </label>
                                            <div style={{ display: 'grid', gap: '0.75rem' }}>
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
                                                            style={{ padding: '0.6rem', borderRadius: '50%' }}
                                                            title="Mark as correct"
                                                        >
                                                            <CheckCircle size={16} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div style={{ display: 'grid', gap: '1rem' }}>
                                            <div>
                                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                                                    <BarChart3 size={14} /> Difficulty
                                                </label>
                                                <select value={q.difficulty} onChange={(e) => handleQuestionChange(q.id, 'difficulty', e.target.value)}>
                                                    <option value="Easy">Easy</option>
                                                    <option value="Medium">Medium</option>
                                                    <option value="Hard">Hard</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                                                    <Clock size={14} /> Seconds
                                                </label>
                                                <input type="number" value={q.timeLimit} onChange={(e) => handleQuestionChange(q.id, 'timeLimit', parseInt(e.target.value))} min="5" />
                                            </div>
                                            <div>
                                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                                                    <Info size={14} /> Explanation
                                                </label>
                                                <textarea rows="2" value={q.explanation} onChange={(e) => handleQuestionChange(q.id, 'explanation', e.target.value)} placeholder="Why is this correct?" style={{ marginBottom: 0 }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="btn btn-secondary" onClick={handleAddQuestion} style={{ width: '100%', marginBottom: '2.5rem', borderStyle: 'dashed' }}>
                            <Plus size={18} /> Add Another Question
                        </button>

                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <button className="btn btn-secondary" onClick={() => setStep(1)} style={{ flex: 1, justifyContent: 'center' }}>
                                <ArrowLeft size={18} /> Back
                            </button>
                            <button className="btn btn-primary" onClick={handleSubmit} style={{ flex: 2, justifyContent: 'center' }}>
                                <Save size={18} /> Finish & Create Quiz
                            </button>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default CreateQuiz;
