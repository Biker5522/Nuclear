import express from 'express'
const router = express.Router()
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

//POST Add User
router.post('/register', async (req: any, res: any) => {
  //Add
  const user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    nation: req.body.nation,
    nuclearButton: req.body.nuclearButton,
  })
  //Check mail
  const emailExist = await User.findOne({ email: req.body.email })
  if (emailExist) return res.status(400).send('Email exist')

  //Check nation
  const nationExist = await User.findOne({ nation: req.body.nation })
  if (nationExist)
    return res.status(400).send('There is already president of that country')

  //save
  try {
    const savedUser = await user.save()
    res.status(201).send(savedUser)
  } catch (err) {
    res.status(400).send(err)
  }
})

//POST LOGIN
router.post('/login', async (req: any, res: any) => {
  //email validation
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Invalid account')
  //password validation
  const passVal = await (user.password == req.body.password)
  if (!passVal) return res.status(400).send('Invalid account')
  //create token and returnc cookie
  const token = jwt.sign(
    { _id: user._id, nation: user.nation },
    process.env.TOKEN_SECRET,
  )
  console.log(token)
  res.cookie('token', token).send(token)
})

module.exports = router
