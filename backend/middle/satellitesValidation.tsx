const { body, validationResult } = require('express-validator')

exports.SatellitesValidator = [
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
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() })
    next()
  },
]
