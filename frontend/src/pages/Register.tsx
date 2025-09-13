import React, { useState } from 'react';
import '../styles/RegisterPage.css';
import { registerUser } from '../services';

const RegisterPage = () => {
    const [form, setForm] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        password: '',
    });

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
            role: 'user',
        };
        try {
            const response = await registerUser(payload);
            console.log('Registration Success:', response);
        } catch (err) {
            console.error('Registration Error:', err);
        }
    };

    return (
        <div className="register-page">
            <div className="register-box">
                <h2 className="register-title">Create Account</h2>
                <p className="register-subtitle">Sign up to get started</p>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="middleName"
                        placeholder="Middle Name (optional)"
                        value={form.middleName}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Register</button>
                </form>
                <p className="register-note">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
