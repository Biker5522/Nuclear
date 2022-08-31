import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    max: 40,
  },
  nation: {
    type: String,
    required: true,
    min: 5,
  },
  email: {
    type: String,
    required: true,
    min: 5,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    max: 50,
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
