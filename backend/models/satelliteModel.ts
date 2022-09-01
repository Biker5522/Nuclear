import mongoose from 'mongoose'

const SatelliteSchema = new mongoose.Schema({
  sideNumber: {
    type: String,
    required: true,
  },
  producer: {
    type: String,
    required: true,
    min: 2,
  },
  model: {
    type: String,
    required: true,
  },
  softwareVersion: {
    type: String,
    required: true,
  },
  yearOfProduction: {
    type: Number,
    required: true,
  },
  dateOfLaunch: {
    type: Date,
    default: Date.now,
  },
  quantityOfAmmunition: {
    type: String,
    required: true,
  },
  orbitAltitude: {
    type: String,
    required: true,
  },
  AI: {
    type: Boolean,
    default: false,
    required: true,
  },
  dateOfCreation: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  dateOfLastUpdate: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  nation: {
    type: String,
    required: false,
  },
})
module.exports = mongoose.model('Satellite', SatelliteSchema)
