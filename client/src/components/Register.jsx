import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';
import './AuthForm.css';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await registerUser({ name, email, password });
      if (res?.token) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userName', res.user.name);
        localStorage.setItem('userId', res.user.id);
        // default caption shown in navbar (changeable later)
        localStorage.setItem('userCaption', 'Sharing ideas & stories');
        navigate('/home');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h2>Create account</h2>
        <div className="auth-subtitle">Start sharing your ideas — it's quick and free</div>
      </div>

      {error && <div className="auth-error">{error}</div>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <input className="auth-input" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input className="auth-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="auth-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <div className="auth-actions">
          <button className="auth-submit" type="submit">Create account</button>
          <Link to="/login" className="auth-link">Already have an account?</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
