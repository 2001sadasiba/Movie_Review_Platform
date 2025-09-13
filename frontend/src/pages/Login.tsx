import React, { useState } from 'react';
import '../styles/LoginPage.css';
import { loginUser } from '../services';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            email: email.trim(),
            password,
        };
        try {
            const response = await loginUser(payload);
            console.log('Login Success:', response);
        } catch (err) {
            console.error('Login Error:', err);
        }
    };

    return (
        <div className="login-page">
            <div className="login-box">
                <h2 className="login-title">Welcome Back</h2>
                <p className="login-subtitle">Login to your account</p>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
                <p className="login-note">Don't have an account? <a href="/register">Register</a></p>
            </div>
        </div>
    );
};

export default LoginPage;
