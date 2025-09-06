const User = require('../models/User')

// @desc    Create new user
// @route   POST /api/user
// @access  Public
const createUser = async (req, res) => {
  try {
    const { username } = req.body

    if (!username) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a username',
      })
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      username: username.toLowerCase(),
    })

    if (existingUser) {
      return res.status(200).json({
        success: true,
        message: 'User already exists',
        data: existingUser,
      })
    }

    // Create new user
    const user = await User.create({
      username: username.toLowerCase(),
      score: 0,
    })

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Server Error',
    })
  }
}

// @desc    Update user score
// @route   POST /api/score
// @access  Public
const updateScore = async (req, res) => {
  try {
    const { username, scoreToAdd } = req.body

    if (!username || scoreToAdd === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide username and score to add',
      })
    }

    const user = await User.findOne({ username: username.toLowerCase() })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    // Update score and increment games played
    user.score += parseInt(scoreToAdd)
    user.gamesPlayed += 1
    user.lastPlayed = new Date()

    await user.save()

    res.status(200).json({
      success: true,
      message: 'Score updated successfully',
      data: user,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Server Error',
    })
  }
}

// @desc    Get leaderboard
// @route   GET /api/leaderboard
// @access  Public
const getLeaderboard = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50

    const users = await User.find({})
      .sort({ score: -1, lastPlayed: -1 })
      .limit(limit)
      .select('username score gamesPlayed lastPlayed')

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Server Error',
    })
  }
}

// @desc    Get user by username
// @route   GET /api/user/:username
// @access  Public
const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params

    const user = await User.findOne({ username: username.toLowerCase() })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Server Error',
    })
  }
}

// @desc    Get user stats
// @route   GET /api/stats
// @access  Public
const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments()
    const totalGamesPlayed = await User.aggregate([
      { $group: { _id: null, total: { $sum: '$gamesPlayed' } } },
    ])

    const topPlayer = await User.findOne().sort({ score: -1 })

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalGamesPlayed: totalGamesPlayed[0]?.total || 0,
        topPlayer: topPlayer
          ? {
              username: topPlayer.username,
              score: topPlayer.score,
            }
          : null,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Server Error',
    })
  }
}

module.exports = {
  createUser,
  updateScore,
  getLeaderboard,
  getUserByUsername,
  getStats,
}
