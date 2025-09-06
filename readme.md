# H4ck4demy

A gamified cybersecurity learning platform built with the MERN stack. Learn cybersecurity concepts through interactive quizzes and compete on a global leaderboard.

---

## Features
- **Interactive Quiz Games** - Cybersecurity-focused multiple choice questions  
- **Plug & Play Authentication** - No signup required, just enter a username  
- **Global Leaderboard** - Compete with players worldwide  
- **Responsive Design** - Works on desktop, tablet, and mobile  
- **Real-time Scoring** - Points awarded instantly for correct answers  
- **Statistics Dashboard** - Platform-wide stats and user analytics  

---

## Architecture
**Frontend (React)** → **Backend (Express)** → **Database (MongoDB)**  
- Port: 3000 → Port: 5000 → MongoDB Atlas  

---

## Project Structure
```
h4ck4demy/
├── client/ # React Frontend
│ ├── public/
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Page components
│ │ ├── utils/ # API utilities
│ │ ├── styles/ # CSS styles
│ │ └── App.js # Main App component
│ └── package.json
├── server/ # Express Backend
│ ├── config/ # Database configuration
│ ├── controllers/ # Business logic
│ ├── models/ # MongoDB schemas
│ ├── routes/ # API endpoints
│ ├── .env # Environment variables
│ └── server.js # Entry point
└── README.md
```

---

## Prerequisites
Make sure you have the following installed:
- Node.js (v16 or higher) - [Download here](https://nodejs.org)  
- npm (comes with Node.js)  
- MongoDB Atlas Account - [Sign up here](https://www.mongodb.com/atlas)  
- Git - [Download here](https://git-scm.com)  

---

## Quick Start

### 1. Clone the Repository
git clone https://github.com/yourusername/h4ck4demy.git
cd h4ck4demy

### 2. Backend Setup
Navigate to server directory
cd server

Install dependencies
npm install

Create .env file and add your MongoDB connection string
See .env.example for required variables

Start the backend server
npm run dev

The backend will run on: http://localhost:5000

### 3. Frontend Setup
# Navigate to client directory (open new terminal)
cd client

Install dependencies
npm install

Start the React app
npm start
The frontend will run on: http://localhost:3000

### 4. Environment Setup

Create a .env file in the server/ directory:

PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_here

## API Endpoints

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| POST   | /api/user             | Create new user          |
| GET    | /api/user/:username   | Get user by username     |
| POST   | /api/score            | Update user score        |
| GET    | /api/leaderboard      | Get top players          |
| GET    | /api/stats            | Get platform statistics  |

## Dependencies

### Backend
- **express**: Web framework  
- **mongoose**: MongoDB ODM  
- **cors**: Cross-origin resource sharing  
- **dotenv**: Environment variables  
- **colors**: Console colors  
- **nodemon**: Development server (dev dependency)  

### Frontend
- **react**: UI library  
- **react-router-dom**: Client-side routing  
- **axios**: HTTP client for API calls  
