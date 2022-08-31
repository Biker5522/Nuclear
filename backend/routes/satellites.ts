import express, { Response, Request } from 'express'
const router = express.Router()
const Satellite = require('../models/satelliteModel')
import jwt_decode from 'jwt-decode'

//GET
router.get('/', async (req: Request, res: Response) => {
  try {
    const satellites = await Satellite.find()
    return res.status(200).json({ satellites })
  } catch (err) {
    const result = (err as Error).message
    return res.status(400).json({ result })
  }
})

//POST
router.post('/add', async (req: Request, res: Response) => {
  let decodedToken: any = jwt_decode(req.body.token)
  let nationToken = decodedToken.nation
  console.log(decodedToken)
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

  const dateValid = new Date('1900-01-01')
  if (
    !(
      satellite.yearOfProduction <= Date.now() &&
      satellite.yearOfProduction > dateValid
    )
  )
    return res.status(400).send('Invalid year of production')
  //save
  try {
    const savedSatellite = await satellite.save()
    return res.status(201).json(savedSatellite)
  } catch (err) {
    const result = (err as Error).message
    return res.status(400).json({ result })
  }
})

//GET specific pen
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const satellite = await Satellite.findById(req.params.id)
    return res.status(200).json(satellite)
  } catch (err) {
    const result = (err as Error).message
    return res.status(400).json({ result })
  }
})

//Delete
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const removedSatellite = await Satellite.deleteOne({ _id: req.params.id })
    return res.status(204)
  } catch (err) {
    const result = (err as Error).message
    return res.status(400).json({ result })
  }
})

//PUT
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedSatellite = await Satellite.findByIdAndUpdate(
      { _id: req.params.id },
      {
        sideNumber: req.body.sideNumber,
        producer: req.body.producer,
        model: req.body.model,
        softwareVersions: req.body.softwareVersion,
        yearOfProduction: req.body.yearOfProduction,
        dateOfLaunch: req.body.dateOfLaunch,
        quantityOfAmunnition: req.body.quantityOfAmmunition,
        orbitAltitude: req.body.orbitAltitude,
        AI: req.body.AI,
        dateOfCreation: req.body.dateOfCreation,
        dateOfLastUpdate: req.body.dateOfLastUpdate,
      },
    )
    return res.status(200).json(updatedSatellite)
  } catch (err) {
    const result = (err as Error).message
    return res.status(400).json({ result })
  }
})

module.exports = router
