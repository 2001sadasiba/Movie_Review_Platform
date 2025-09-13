import React, { useState } from 'react';
import '../styles/LoginPage.css';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/slices/authSlice';
import type{ RootState } from '../store/store';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    
    const { loading, error } = useSelector((state: RootState) => state.auth);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            email: email.trim(),
            password,
        };
        
        try {
           
            const resultAction = await dispatch(loginUser(payload) as any);
            
            
            if (loginUser.fulfilled.match(resultAction)) {
                navigate('/'); // Redirect on success
            }
            
        } catch (err) {
            console.error('Login Error:', err);
        }
    };

    return (
        <div className="login-page">
            {loading && <Loader message="Logging in..." />}
            <div className="login-box">
                <h2 className="login-title">Welcome Back</h2>
                <p className="login-subtitle">Login to your account</p>
                
                {/* Display error from Redux state */}
                {error && <div className="error-message">{error}</div>}
                
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        disabled={loading}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        disabled={loading}
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className="login-note">Don't have an account? <a href="/register">Register</a></p>
            </div>
        </div>
    );
};

export default LoginPage;