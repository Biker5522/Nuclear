const express = require('express')
const router = express.Router()
const User = require('..//Models/UserModel')
const jwt = require('jsonwebtoken')

//POST Add User
router.post('/register', async (req: any, res: any) => {
  //Add
  const user = new User({
    fullName: req.body.fullName,
    nation: req.body.nation,
    mail: req.body.mail,
    password: req.body.password,
    nuclearButton: req.body.nuclearButton,
    dateOfCreation: req.body.dateOfCreation,
  })
  const emailExist = await User.findOne({ email: req.body.email })
  if (emailExist) return res.status(400).send('Email exist')
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
    { _id: user._id, _role: user.role },
    process.env.TOKEN_SECRET,
  )
  console.log(token)
  res.cookie('token', token).send(token)
})

module.exports = router
