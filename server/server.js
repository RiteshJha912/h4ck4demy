const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const colors = require('colors')
require('dotenv').config()

const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')

// Connect to database
connectDB()

const app = express()

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? ['https://your-frontend-domain.vercel.app']
        : ['http://localhost:3000'],
    credentials: true,
  })
)

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/api', userRoutes)

// Health check route
app.get('/', (req, res) => {
  res.json({
    message: 'Cybersecurity Learning Gamification API',
    version: '1.0.0',
    status: 'Active',
    endpoints: {
      'POST /api/user': 'Create new user',
      'GET /api/user/:username': 'Get user by username',
      'POST /api/score': 'Update user score',
      'GET /api/leaderboard': 'Get leaderboard',
      'GET /api/stats': 'Get platform stats',
    },
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
  })
})

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
})
