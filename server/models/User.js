const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add a username'],
      unique: true,
      trim: true,
      minlength: [2, 'Username must be at least 2 characters'],
      maxlength: [30, 'Username cannot exceed 30 characters'],
    },
    score: {
      type: Number,
      default: 0,
      min: [0, 'Score cannot be negative'],
    },
    gamesPlayed: {
      type: Number,
      default: 0,
    },
    lastPlayed: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

// Index for faster leaderboard queries
userSchema.index({ score: -1 })

module.exports = mongoose.model('User', userSchema)
