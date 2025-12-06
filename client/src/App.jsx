import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PostList from './components/PostList';
import AddPost from './components/AddPost';
import Login from './components/Login';
import Register from './components/Register';
import AuthLanding from './components/AuthLanding';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      {token && <Navbar />}
      <Routes>
        <Route path="/" element={<AuthLanding />} />
        <Route path="/home" element={<PostList />} />
        <Route path="/add" element={<AddPost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
