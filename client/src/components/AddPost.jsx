import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../services/api';
import './AddPost.css';

const AddPost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const response = await createPost({
        title,
        content,
        author
      });
      
      if (response) {
        setSuccess('Post added successfully!');
        setTitle('');
        setContent('');
        setAuthor('');
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding post');
      console.error('Error:', err);
    }
  };

  return (
    <div className="form-container fade-in">
      <div className="form-header">
        <h2>Create New Post</h2>
        <p>Share your thoughts with the world</p>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            type="text"
            placeholder="Enter post title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Content</label>
          <textarea
            placeholder="Write your post content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="form-textarea"
          ></textarea>
        </div>
        
        <div className="form-group">
          <label className="form-label">Author</label>
          <input
            type="text"
            placeholder="Your name..."
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="form-input"
          />
        </div>
        
        <button type="submit" className="submit-button">
          Publish Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;