import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Play, PlusCircle, Award, BookOpen, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    const { user } = useAuth();

    return (
        <div className="container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ textAlign: 'center', marginTop: '4rem' }}
            >
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>
                    Welcome to <span style={{ color: 'var(--primary)' }}>QuizMaker</span>
                </h1>
                <p style={{ fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto 3rem' }}>
                    The ultimate platform to create, share, and take interactive quizzes.
                    Challenge your friends or test your own knowledge today!
                </p>

                <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/quizzes" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                        <Play size={20} /> Take a Quiz
                    </Link>
                    <Link to="/create-quiz" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                        <PlusCircle size={20} /> Create a Quiz
                    </Link>
                </div>
            </motion.div>

            <div style={{ marginTop: '8rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                <FeatureCard
                    icon={<BookOpen size={40} color="var(--primary)" />}
                    title="Diverse Topics"
                    desc="Explore hundreds of quizzes across various categories."
                />
                <FeatureCard
                    icon={<PlusCircle size={40} color="var(--primary)" />}
                    title="Easy Creation"
                    desc="Build your own quizzes with our intuitive drag-and-drop builder."
                />
                <FeatureCard
                    icon={<Award size={40} color="var(--primary)" />}
                    title="Instant Results"
                    desc="Receive immediate feedback and detailed score analysis."
                />
                <FeatureCard
                    icon={<Users size={40} color="var(--primary)" />}
                    title="Social Sharing"
                    desc="Share your quizzes with the community and track leaderboards."
                />
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        className="glass"
        style={{ padding: '2rem', textAlign: 'center' }}
    >
        <div style={{ marginBottom: '1.5rem' }}>{icon}</div>
        <h3>{title}</h3>
        <p>{desc}</p>
    </motion.div>
);

export default Home;
