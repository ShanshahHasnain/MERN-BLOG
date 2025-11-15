import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/add" className="nav-link">Add Post</Link>
    </nav>
  );
};

export default Navbar;
