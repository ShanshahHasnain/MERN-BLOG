# MERN Blog Application

A complete full-stack blog application built with React, Node.js, Express, and MongoDB. Features user authentication, ownership-based post control, and fully responsive design across all devices.

## ✨ Features

### Authentication & User Management
- 🔐 User Registration with secure password hashing (bcryptjs)
- 🔑 JWT-based Login/Logout with token persistence
- 👤 Account Deletion with cascade delete of user's posts
- 💾 LocalStorage token management for persistent sessions

### Blog Post Management
- 📝 Create blog posts (title, content) with automatic author assignment
- ✏️ Edit posts (only post owners can edit)
- 🗑️ Delete posts (only post owners can delete)
- 👥 View all posts with author information
- 📖 "Read more" expand/collapse for long content
- ⋯ Three-dot menu with Edit/Delete options (owner only)

### User Interface & UX
- 🎨 Modern, minimal design with gradient accents
- 📱 Fully responsive across all devices (320px to 4K+)
- 🎭 Smooth animations and transitions
- 🌈 Clean color scheme with blue/cyan gradients
- ✅ Real-time form validation
- ⚠️ Error handling with user-friendly messages

### Technical Features
- 🔄 Real-time post updates without page reload
- 🛡️ Secure JWT-based authentication
- 🔒 Ownership verification for post modifications
- 📊 MongoDB with Mongoose ODM
- 🚀 Vite-powered fast development builds
- 🎯 React Router for smooth navigation

## Prerequisites

Before running this application, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community)
- npm (comes with Node.js)

## Project Structure

```
MERN-BLOG/
├── client/                          # React frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Navigation with user info & logout
│   │   │   ├── AuthLanding.jsx     # Login/Register form (toggle UI)
│   │   │   ├── Login.jsx           # Login component
│   │   │   ├── Register.jsx        # Registration component
│   │   │   ├── PostList.jsx        # Display all posts with edit/delete
│   │   │   ├── AddPost.jsx         # Create new post form
│   │   │   └── *.css               # Responsive component styles
│   │   ├── pages/
│   │   │   └── Home.jsx            # Home page layout
│   │   ├── services/
│   │   │   └── api.js              # Axios API client with token interceptor
│   │   ├── App.jsx                 # Main app with routing
│   │   └── index.css               # Global styles
│   ├── vite.config.js              # Vite configuration
│   └── package.json
│
└── server/                          # Node.js/Express backend
    ├── models/
    │   ├── User.js                 # User schema with email uniqueness
    │   └── Post.js                 # Post schema with author reference
    ├── routes/
    │   ├── auth.js                 # Register, Login, Delete Account
    │   └── posts.js                # CRUD operations (protected)
    ├── middleware/
    │   └── auth.js                 # JWT verification middleware
    ├── server.js                   # Express app entry point
    ├── config.env                  # Environment variables
    └── package.json
```

## Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `config.env` file in the server directory with the following content:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/blog-crud
```

4. Start the server:
- For development (with nodemon):
  ```bash
  npm run dev
  ```
- For production:
  ```bash
  npm start
  ```

The server will start on `http://localhost:5000`

### API Endpoints

- GET `/api/posts` - Get all posts
- GET `/api/posts/:id` - Get a single post
- POST `/api/posts` - Create a new post
- PUT `/api/posts/:id` - Update a post
- DELETE `/api/posts/:id` - Delete a post

## Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The client will start on `http://localhost:5173`

## Using the Application

1. **View Posts**
   - Visit the home page to see all blog posts
   - Posts are displayed in a responsive grid layout

2. **Create a Post**
   - Click "Add Post" in the navigation bar
   - Fill in the title, content, and author
   - Click "Create Post" to submit

3. **Edit a Post**
   - Click the "Edit" button on any post
   - Modify the content in the form that appears
   - Click "Save" to update or "Cancel" to discard changes

4. **Delete a Post**
   - Click the "Delete" button on any post
   - Confirm the deletion in the popup dialog

## Technology Stack

### Frontend
- React (with Hooks)
- React Router for navigation
- Axios for API requests
- CSS3 for styling
- Vite for build tooling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS for cross-origin requests
- dotenv for environment variables

## Common Issues & Solutions

1. **MongoDB Connection Failed**
   - Ensure MongoDB is running on your system
   - Check if the MONGO_URI in config.env is correct
   - Verify MongoDB port (default: 27017) is not blocked

2. **Server Not Starting**
   - Check if port 5000 is available
   - Ensure all dependencies are installed
   - Verify config.env file exists with correct variables

3. **Client Can't Connect to Server**
   - Confirm server is running on port 5000
   - Check for CORS issues
   - Verify API endpoint URLs in client code

## Development

### Adding New Features
1. Server: Add routes in `/server/routes/posts.js`
2. Client: Add components in `/client/src/components/`
3. Update API integration in the relevant components

### Modifying Styles
- Global styles: Edit `/client/src/App.css`
- Component styles: Edit the corresponding CSS file in the component directory

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Contact

If you have any questions, feel free to open an issue in the repository.

---

Happy coding! 🚀