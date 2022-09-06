import express from 'express'
const router = express.Router()
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
import bcrypt from 'bcrypt'
const { body, validationResult } = require('express-validator')
//POST Add User
router.post(
  '/register',
  body('email')
    .notEmpty()
    .withMessage('email required')
    .isEmail()
    .withMessage('must be an email')
    .normalizeEmail(),
  body('fullName')
    .notEmpty()
    .withMessage('fullname required')
    .isLength({ min: 3 })
    .withMessage('full name must be at least 3 chars long'),
  body('password')
    .notEmpty()
    .withMessage('password required')
    .isLength({ min: 6 })
    .withMessage('password must be at least 6 chars long')
    .matches(/\d/)
    .withMessage('must contain a number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('your password should have at least one special character'),
  body('nuclearButton')
    .notEmpty()
    .withMessage('nuxlear button required')
    .isBoolean({ loose: true })
    .withMessage('nuclear button must be boolean'),
  body('nation').notEmpty().withMessage('nation required'),
  async (req: any, res: any) => {
    var err = validationResult(req)
    if (!err.isEmpty()) return res.status(400).send(err.mapped())
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
    const nationPresidentExist = await User.findOne({ nation: req.body.nation })
    if (nationPresidentExist)
      return res.status(400).send('There is already president of that country')
    //save
    try {
      const savedUser = await user.save()
      res.status(201).send(savedUser)
    } catch (err) {
      res.status(400).send(err)
    }
  },
)

//POST LOGIN
router.post('/login', async (req: any, res: any) => {
  //email validation
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Invalid account')
  //password validation
  const passVal = await bcrypt.compare(req.body.password, user.password)
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
