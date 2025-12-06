import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api';
import './AuthForm.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await loginUser({ email, password });
      if (res?.token) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userName', res.user.name);
        localStorage.setItem('userId', res.user.id);
        // default caption for LinkedIn showcase
        localStorage.setItem('userCaption', 'Sharing ideas & stories');
        navigate('/home');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h2>Welcome back</h2>
        <div className="auth-subtitle">Log in to create and manage your posts</div>
      </div>

      {error && <div className="auth-error">{error}</div>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <input className="auth-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="auth-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <div className="auth-actions">
          <button className="auth-submit" type="submit">Log In</button>
          <Link to="/register" className="auth-link">Create account</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
