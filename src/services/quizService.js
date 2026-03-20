const QUIZZES_KEY = 'quiz_data';

export const quizService = {
    getQuizzes: () => {
        const localQuizzes = JSON.parse(localStorage.getItem(QUIZZES_KEY) || '[]');
        // Default categories if needed
        return localQuizzes;
    },

    saveQuiz: (quiz) => {
        const quizzes = quizService.getQuizzes();
        quizzes.push({
            ...quiz,
            id: Date.now().toString(),
            createdAt: new Date().toISOString()
        });
        localStorage.setItem(QUIZZES_KEY, JSON.stringify(quizzes));
    },

    getQuizById: (id) => {
        const quizzes = quizService.getQuizzes();
        return quizzes.find(q => q.id === id);
    },

    getCategories: () => [
        'Technology', 'Science', 'History', 'Geography', 'General'
    ],

    getDifficultyLevels: () => [
        'Easy', 'Medium', 'Hard'
    ]
};
