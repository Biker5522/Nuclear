import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    enum: ['admin', 'user', 'moderator'],
    default: 'user',
  },
  nation: {
    type: String,
    required: true,
    min: 5,
  },
  mail: {
    type: String,
    required: true,
    min: 5,
    max: 255,
  },
  password: {
    type: String,
    required: true,
  },
  nuclearButton: {
    type: Boolean,
    default: false,
  },
  dateOfCreation: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('User', UserSchema)
