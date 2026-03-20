import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const Timer = ({ initialTime, onTimeUp, isActive }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        setTimeLeft(initialTime);
    }, [initialTime]);

    useEffect(() => {
        let timer;
        if (isActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            onTimeUp();
        }

        return () => clearInterval(timer);
    }, [isActive, timeLeft, onTimeUp]);

    const percentage = (timeLeft / initialTime) * 100;
    const color = timeLeft < 5 ? '#ef4444' : timeLeft < 10 ? '#fbbf24' : 'var(--primary)';

    return (
        <div style={{ width: '100%', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', color }}>
                    <Clock size={18} /> {timeLeft}s remaining
                </div>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                <div
                    style={{
                        height: '100%',
                        width: `${percentage}%`,
                        background: color,
                        transition: 'width 1s linear, background 0.3s'
                    }}
                />
            </div>
        </div>
    );
};

export default Timer;
