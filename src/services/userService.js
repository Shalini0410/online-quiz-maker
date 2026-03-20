const USERS_KEY = 'quiz_users';
const CURRENT_USER_KEY = 'quiz_current_user';

export const userService = {
    getUsers: () => JSON.parse(localStorage.getItem(USERS_KEY) || '[]'),

    saveUser: (user) => {
        const users = userService.getUsers();
        users.push(user);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    },

    login: (email, password) => {
        const users = userService.getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
            return user;
        }
        return null;
    },

    logout: () => {
        localStorage.removeItem(CURRENT_USER_KEY);
    },

    getCurrentUser: () => JSON.parse(localStorage.getItem(CURRENT_USER_KEY)),

    updateStats: (userId, score, total) => {
        const users = userService.getUsers();
        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            const user = users[userIndex];
            user.totalQuizzes = (user.totalQuizzes || 0) + 1;
            user.totalScore = (user.totalScore || 0) + score;
            user.bestScore = Math.max(user.bestScore || 0, score);
            user.attempts = user.attempts || [];
            user.attempts.push({
                date: new Date().toISOString(),
                score,
                total
            });
            users[userIndex] = user;
            localStorage.setItem(USERS_KEY, JSON.stringify(users));
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        }
    }
};
