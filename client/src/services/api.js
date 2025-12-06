import axios from 'axios';

// Development URL - Change this to your Render URL after deployment
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request interceptor to attach token if present
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add response interceptor for better error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error);
        throw error;
    }
);

export const getPosts = async () => {
    const response = await api.get('/posts');
    return response.data;
};

export const getPost = async (id) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
};

export const createPost = async (postData) => {
    const response = await api.post('/posts', postData);
    return response.data;
};

export const updatePost = async (id, postData) => {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data;
};

export const deletePost = async (id) => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
};

// Auth
export const registerUser = async (data) => {
    const response = await api.post('/auth/register', data);
    return response.data;
};

export const loginUser = async (data) => {
    const response = await api.post('/auth/login', data);
    return response.data;
};

export const deleteAccount = async () => {
    const response = await api.delete('/auth/account');
    return response.data;
};