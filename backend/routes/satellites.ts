import express, { Response, Request } from 'express'
const router = express.Router()
const Satellite = require('../models/satelliteModel')
import jwt_decode from 'jwt-decode'
import mongoose from 'mongoose'
const { body, validationResult } = require('express-validator')

//GET
router.get('/', async (req: Request, res: Response) => {
  let token: any = req.headers['token']
  if (!token) return res.status(400).json('Invalid Token')
  let decodedToken: any = jwt_decode(token)
  let nationToken = decodedToken.nation
  try {
    const satellites = await Satellite.find({ nation: nationToken })
    if (!satellites) return res.status(404)
    return res.status(200).json({ satellites })
  } catch (err) {
    const result = (err as Error).message
    return res.status(400).json({ result })
  }
})

//POST
router.post(
  '/',
  body('sideNumber').notEmpty().withMessage('side number cannot be empty'),
  body('producer').notEmpty().withMessage('producer cannot be empty'),
  body('model').notEmpty().withMessage('model cannot be empty'),
  body('softwareVersion')
    .notEmpty()
    .withMessage('software version cannot be empty'),
  body('yearOfProduction')
    .isInt({ min: 1970, max: new Date().getFullYear() })
    .withMessage('year of production must be valid'),
  body('dateOfLaunch')
    .notEmpty()
    .withMessage('year of launch cannot be empty')
    .isBefore(new Date(Date.now()).toString())
    .withMessage('year of launch must be earlier')
    .isAfter('1970-01-01T00:00:01')
    .withMessage('year of launch must be later that 1970 '),
  body('orbitAltitude')
    .notEmpty()
    .withMessage('orbit altitude cannot be empty')
    .isInt({ min: 150 })
    .withMessage('orbit altitude must be higher than 150 km'),
  body('AI')
    .notEmpty()
    .withMessage('orbit altitude cannot be empty')
    .isBoolean()
    .withMessage('Ai must be boolean'),
  async (req: Request, res: Response) => {
    var err = validationResult(req)
    if (!err.isEmpty()) return res.status(400).send(err)
    let token: any = req.headers['token']
    if (!token) return res.status(400).json('Invalid Token')
    let decodedToken: any = jwt_decode(token)
    let nationToken = decodedToken.nation
    const satellite = new Satellite({
      sideNumber: req.body.sideNumber,
      producer: req.body.producer,
      model: req.body.model,
      softwareVersion: req.body.softwareVersion,
      yearOfProduction: req.body.yearOfProduction,
      dateOfLaunch: req.body.dateOfLaunch,
      quantityOfAmmunition: req.body.quantityOfAmmunition,
      orbitAltitude: req.body.orbitAltitude,
      AI: req.body.AI,
      nation: nationToken,
    })
    //save
    try {
      const savedSatellite = await satellite.save()
      return res.status(201).json(savedSatellite)
    } catch (err) {
      if (err instanceof Error) {
        const result = err.message
        return res.status(400).json({ result })
      } else {
        console.log('Unexpected error', err)
      }
    }
  },
)

//GET specific satellite
router.get('/:id', async (req: Request, res: Response) => {
  try {
    let token: any = req.headers['token']
    if (!token) return res.status(400).json('Invalid Token')
    let decodedToken: any = jwt_decode(token)
    let nationToken = decodedToken.nation
    const satellite = await Satellite.findById(req.params.id)
    if (!satellite) return res.status(404)
    if (satellite.nation != nationToken) res.status(400).send('No permissions')
    return res.status(200).json(satellite)
  } catch (err) {
    if (err instanceof Error) {
      const result = err.message
      return res.status(400).json({ result })
    } else {
      console.log('Unexpected error', err)
    }
  }
})

//Delete
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const removedSatellite = await Satellite.deleteOne({ _id: req.params.id })
    return res.status(204)
  } catch (err) {
    if (err instanceof Error) {
      const result = err.message
      return res.status(400).json({ result })
    } else {
      console.log('Unexpected error', err)
    }
  }
})

//PUT
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const satellite = await Satellite.exists({ _id: req.params.id })
    if (satellite == null) return res.status(404)
    console.log(satellite)
    const updatedSatellite = await Satellite.findByIdAndUpdate(
      { _id: req.params.id },
      {
        sideNumber: req.body.sideNumber,
        producer: req.body.producer,
        model: req.body.model,
        softwareVersion: req.body.softwareVersion,
        yearOfProduction: req.body.yearOfProduction,
        dateOfLaunch: req.body.dateOfLaunch,
        quantityOfAmunnition: req.body.quantityOfAmmunition,
        orbitAltitude: req.body.orbitAltitude,
        AI: req.body.AI,
        dateOfLastUpdate: Date.now(),
      },
    )
    return res.status(200).json(updatedSatellite)
  } catch (err) {
    if (err instanceof Error) {
      const result = err.message
      return res.status(400).json({ result })
    } else {
      return res.status(400).json('Unexpected error')
    }
  }
})

module.exports = router
