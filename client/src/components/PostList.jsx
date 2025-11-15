import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PostList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPost, setEditingPost] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/posts');
      setPosts(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts');
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`http://localhost:5000/api/posts/${postId}`);
        setPosts(posts.filter(post => post._id !== postId));
      } catch (err) {
        setError('Failed to delete post');
      }
    }
  };

  const handleEdit = (post) => {
    setEditingPost({ ...post });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/posts/${editingPost._id}`, editingPost);
      setPosts(posts.map(post => 
        post._id === editingPost._id ? editingPost : post
      ));
      setEditingPost(null);
    } catch (err) {
      setError('Failed to update post');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="posts-container">
      <div className="posts-header">
        <h2>All Blog Posts</h2>
      </div>
      {posts.length === 0 ? (
        <div className="no-posts">No posts found. Create your first post!</div>
      ) : (
        <div className="posts-grid">
          {posts.map(post => (
            <div key={post._id} className="post-card">
              {editingPost && editingPost._id === post._id ? (
                <form onSubmit={handleUpdate} className="edit-form">
                  <input
                    type="text"
                    value={editingPost.title}
                    onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                    className="edit-input"
                  />
                  <textarea
                    value={editingPost.content}
                    onChange={(e) => setEditingPost({...editingPost, content: e.target.value})}
                    className="edit-textarea"
                  />
                  <input
                    type="text"
                    value={editingPost.author}
                    onChange={(e) => setEditingPost({...editingPost, author: e.target.value})}
                    className="edit-input"
                  />
                  <div className="edit-buttons">
                    <button type="submit" className="save-btn">Save</button>
                    <button type="button" onClick={() => setEditingPost(null)} className="cancel-btn">Cancel</button>
                  </div>
                </form>
              ) : (
                <>
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-content">{post.content}</p>
                  <div className="post-metadata">
                    <div className="post-author">
                      <div className="post-author-avatar">
                        {post.author ? post.author[0].toUpperCase() : 'A'}
                      </div>
                      <span>{post.author}</span>
                    </div>
                    <div className="post-actions">
                      <button onClick={() => handleEdit(post)} className="edit-btn">Edit</button>
                      <button onClick={() => handleDelete(post._id)} className="delete-btn">Delete</button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
