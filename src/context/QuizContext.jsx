import React, { createContext, useContext, useState, useEffect } from 'react';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const savedQuizzes = localStorage.getItem('quizzes');
        if (savedQuizzes) {
            setQuizzes(JSON.parse(savedQuizzes));
        } else {
            // Default sample quiz
            const defaultQuizzes = [
                {
                    id: '1',
                    title: 'General Knowledge',
                    description: 'Test your basic knowledge across various topics.',
                    questions: [
                        {
                            id: 'q1',
                            text: 'What is the capital of France?',
                            options: ['London', 'Berlin', 'Paris', 'Madrid'],
                            correctAnswer: 'Paris'
                        },
                        {
                            id: 'q2',
                            text: 'Which planet is known as the Red Planet?',
                            options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
                            correctAnswer: 'Mars'
                        }
                    ],
                    createdBy: 'System'
                }
            ];
            setQuizzes(defaultQuizzes);
            localStorage.setItem('quizzes', JSON.stringify(defaultQuizzes));
        }
    }, []);

    const addQuiz = (quiz) => {
        const newQuizzes = [...quizzes, { ...quiz, id: Date.now().toString() }];
        setQuizzes(newQuizzes);
        localStorage.setItem('quizzes', JSON.stringify(newQuizzes));
    };

    return (
        <QuizContext.Provider value={{ quizzes, addQuiz }}>
            {children}
        </QuizContext.Provider>
    );
};

export const useQuiz = () => useContext(QuizContext);
