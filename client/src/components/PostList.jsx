import React, { useEffect, useState } from 'react';
import { getPosts, deletePost, updatePost } from '../services/api';
import './PostList.css';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPost, setEditingPost] = useState(null);

  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts. Please try again later.');
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(postId);
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
      await updatePost(editingPost._id, editingPost);
      setPosts(posts.map(post => 
        post._id === editingPost._id ? editingPost : post
      ));
      setEditingPost(null);
    } catch (err) {
      setError('Failed to update post');
    }
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return (
    <div className="posts-container">
      <div className="loading-spinner">Loading posts...</div>
    </div>
  );
  
  if (error) return (
    <div className="posts-container">
      <div className="error-message">
        {error}
        <button 
          onClick={fetchPosts} 
          style={{ marginLeft: '10px', padding: '5px 10px' }}
        >
          Retry
        </button>
      </div>
    </div>
  );

  return (
    <div className="posts-container">
      <div className="posts-header">
        <h2>📝 All Blog Posts</h2>
        <p>Discover amazing stories and insights</p>
      </div>
      
      {posts.length === 0 ? (
        <div className="no-posts">
          <h3>No posts yet</h3>
          <p>Be the first to share your story!</p>
        </div>
      ) : (
        <div className="posts-grid">
          {posts.map(post => (
            <div key={post._id} className="post-card fade-in">
              {editingPost && editingPost._id === post._id ? (
                <form onSubmit={handleUpdate} className="edit-form">
                  <input
                    type="text"
                    value={editingPost.title}
                    onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                    className="edit-input"
                    placeholder="Post title"
                    required
                  />
                  <textarea
                    value={editingPost.content}
                    onChange={(e) => setEditingPost({...editingPost, content: e.target.value})}
                    className="edit-textarea"
                    placeholder="Post content"
                    required
                  />
                  <input
                    type="text"
                    value={editingPost.author}
                    onChange={(e) => setEditingPost({...editingPost, author: e.target.value})}
                    className="edit-input"
                    placeholder="Author name"
                    required
                  />
                  <div className="edit-buttons">
                    <button type="submit" className="save-btn">💾 Save</button>
                    <button type="button" onClick={handleCancelEdit} className="cancel-btn">❌ Cancel</button>
                  </div>
                </form>
              ) : (
                <>
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-content">
                    {post.content.length > 150 
                      ? `${post.content.substring(0, 150)}...` 
                      : post.content
                    }
                  </p>
                  <div className="post-metadata">
                    <div className="post-author">
                      <div className="post-author-avatar">
                        {post.author ? post.author[0].toUpperCase() : 'A'}
                      </div>
                      <span>{post.author}</span>
                    </div>
                    <div className="post-date">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="post-actions">
                    <button onClick={() => handleEdit(post)} className="edit-btn">
                      ✏️ Edit
                    </button>
                    <button onClick={() => handleDelete(post._id)} className="delete-btn">
                      🗑️ Delete
                    </button>
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