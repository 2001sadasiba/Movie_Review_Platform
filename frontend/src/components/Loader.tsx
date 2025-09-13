import React from 'react';
import '../styles/Loader.css';

interface LoaderProps {
    message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message = 'Loading...' }) => {
    return (
        <div className="loader-overlay">
            <div className="loader-container">
                <div className="spinner"></div>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Loader;
