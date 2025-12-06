import React from 'react';
import { Link } from 'react-router-dom';
import { deleteAccount } from '../services/api';
import './Navbar.css'


const Navbar = () => {
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');
  const userCaption = localStorage.getItem('userCaption');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('userCaption');
    window.location.href = '/';
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone. All your posts will also be deleted.')) {
      try {
        await deleteAccount();
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        localStorage.removeItem('userCaption');
        window.location.href = '/';
      } catch (err) {
        alert('Failed to delete account');
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to={token ? "/home" : "/"} className="nav-link">Home</Link>
        <Link to="/add" className="nav-link">Add Post</Link>
      </div>

      <div className="nav-right">
        {token ? (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <span className="nav-user">{userName}</span>
              {userCaption && <small style={{ color: '#475569', fontWeight: 500 }}>{userCaption}</small>}
            </div>
            <button onClick={handleLogout} className="nav-link button-like">Logout</button>
            <button onClick={handleDeleteAccount} className="nav-link delete-account-btn">Delete Account</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
