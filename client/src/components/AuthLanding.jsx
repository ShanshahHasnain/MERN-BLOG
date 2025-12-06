import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/api';
import './AuthLanding.css';

const AuthLanding = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  React.useEffect(() => {
    if (token) {
      navigate('/home');
    }
  }, [token, navigate]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await loginUser({ email: loginEmail, password: loginPassword });
      if (res?.token) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userName', res.user.name);
        localStorage.setItem('userId', res.user.id);
        localStorage.setItem('userCaption', 'Sharing ideas & stories');
        navigate('/home');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await registerUser({ name: regName, email: regEmail, password: regPassword });
      if (res?.token) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userName', res.user.name);
        localStorage.setItem('userId', res.user.id);
        localStorage.setItem('userCaption', 'Sharing ideas & stories');
        navigate('/home');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-landing">
      <div className="auth-card">
        {error && <div className="auth-landing-error">{error}</div>}

        {isLogin ? (
          <>
            <h2 className="auth-title">Login</h2>
            <form onSubmit={handleLoginSubmit} className="auth-landing-form">
              <input type="email" placeholder="Gmail" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
              <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
              <button type="submit" className="auth-btn">Login</button>
            </form>
            <p className="auth-toggle">
              Don't have an account? <button type="button" onClick={() => { setIsLogin(false); setError(''); }}>Create account</button>
            </p>
          </>
        ) : (
          <>
            <h2 className="auth-title">Create Account</h2>
            <form onSubmit={handleRegisterSubmit} className="auth-landing-form">
              <input type="text" placeholder="Full Name" value={regName} onChange={(e) => setRegName(e.target.value)} required />
              <input type="email" placeholder="Gmail" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required />
              <input type="password" placeholder="Password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} required />
              <button type="submit" className="auth-btn">Create Account</button>
            </form>
            <p className="auth-toggle">
              Already have an account? <button type="button" onClick={() => { setIsLogin(true); setError(''); }}>Login</button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthLanding;
