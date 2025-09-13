import React, { useState } from 'react';
import '../styles/RegisterPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../store/slices/authSlice';
import type{ RootState } from '../store/store';
import Loader from '../components/Loader';

const RegisterPage = () => {
    const [form, setForm] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // Get loading and error from Redux store
    const { loading, error } = useSelector((state: RootState) => state.auth);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            firstName: form.firstName.trim(),
            middleName: form.middleName.trim(),
            lastName: form.lastName.trim(),
            email: form.email.trim(),
            password: form.password,
        };
        
        try {
            // DISPATCH the Redux thunk action
            const resultAction = await dispatch(registerUser(payload) as any);
            
            // Check if the registration was successful
            if (registerUser.fulfilled.match(resultAction)) {
                navigate('/'); // Redirect to home on success
            }
        } catch (err) {
            console.error('Registration Error:', err);
        }
    };

    return (
        <div className="register-page">
            {loading && <Loader message="Creating account..." />}
            <div className="register-box">
                <h2 className="register-title">Create Account</h2>
                <p className="register-subtitle">Sign up to get started</p>
                
                {/* Display error from Redux state */}
                {error && <div className="error-message">{error}</div>}
                
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                    <input
                        type="text"
                        name="middleName"
                        placeholder="Middle Name (optional)"
                        value={form.middleName}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Register'}
                    </button>
                </form>
                <p className="register-note">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;