const express = require('express')
const {
  createUser,
  updateScore,
  getLeaderboard,
  getUserByUsername,
  getStats,
} = require('../controllers/userController')

const router = express.Router()

// User routes
router.post('/user', createUser)
router.get('/user/:username', getUserByUsername)

// Score routes
router.post('/score', updateScore)

// Leaderboard route
router.get('/leaderboard', getLeaderboard)

// Stats route
router.get('/stats', getStats)

module.exports = router
