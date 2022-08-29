import mongoose from 'mongoose'

const SatelliteSchema = new mongoose.Schema({
  sideNumber: {
    type: String,
    required: true,
  },
  producer: {
    type: String,
    required: true,
    min: 5,
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
    type: Date,
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
    required: true,
  },
  dateOfLastUpdate: {
    type: Date,
    required: true,
  },
})
