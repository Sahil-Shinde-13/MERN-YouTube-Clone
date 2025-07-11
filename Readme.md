#  MERN YouTube Clone – Full Stack Video Sharing Platform

This is a full-stack **YouTube Clone** built using the **MERN stack (MongoDB, Express, React, Node.js)**. It includes features such as user authentication, channel management, video upload/edit/delete, commenting, subscribing, and category-based filtering – all wrapped in a responsive, user-friendly UI.

---

##  Features

###  Authentication
- JWT-based login and registration
- User tokens stored securely in `localStorage`

###  Channels
- Create your own channel with name and avatar
- Public channel view with videos and subscribe/unsubscribe functionality
- Display of subscriber count

###  Video Management
- Upload videos with title, description, thumbnail, and category
- Edit and delete your own videos
- View uploaded videos on personal channel page
- View all videos on the home page with category filter

###  Comments
- Add, edit, and delete comments on videos
- Comments visible publicly on video watch page

###  Navigation & Responsiveness
- Sidebar and top header with seamless routing via `react-router-dom`
- Fully responsive layout using Tailwind CSS

---

##  Getting Started

###  Prerequisites
- Node.js & npm
- MongoDB installed locally or MongoDB Atlas URI
- Cloudinary account (for video/image upload)

###  Backend Setup
- cd backend
- npm install

## Create a .env file:
- PORT=5000
- MONGODB_URI=your_mongodb_uri
- JWT_SECRET=your_jwt_secret
- CLOUDINARY_CLOUD_NAME=your_cloud_name
- CLOUDINARY_API_KEY=your_api_key
- CLOUDINARY_API_SECRET=your_api_secret

## start the backend with:
- npm start or node server.js

###  Frontend Setup
- cd frontend
- npm install
- npm run dev

---

###  API Endpoints 
Auth
- POST /api/auth/register
- POST /api/auth/login

Channels
- POST /api/channels (create)
- GET /api/channels/me (your channel)
- GET /api/channels/:id (public view)
- PUT /api/channels/:id/subscribe (toggle subscription)

Videos
- POST /api/videos/upload (upload new)
- GET /api/videos (get all)
- GET /api/videos/:id (single)
- GET /api/videos/my (your uploaded videos)
- PUT /api/videos/:id (edit)
- DELETE /api/videos/:id (delete)

Comments
- POST /api/comments/:videoId
- GET /api/comments/:videoId
- PUT /api/comments/:commentId
- DELETE /api/comments/:commentId


