import express from 'express'
import { body, validationResult } from 'express-validator'
import User from '../models/user'
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'

const router = express.Router()

router.post(
  '/signup',
  //Validations of email and password
  body('email').isEmail().withMessage('The Email is invalid'),
  body('password').isLength({ min: 5 }).withMessage('The password is too short'),
  async (req, res) => {
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
      const errors = validationErrors.array().map((error) => ({ msg: error.msg }))
      return res.json({ errors, data: null })
    }
    const { email, password } = req.body
    //Check user exists or not
    const user = await User.findOne({ email })
    if (user) {
      return res.json({ errors: [{ msg: 'Email already exists' }], data: null })
    }

    //hashing password
    const hashedPassword = await bcrypt.hash(password, 10)

    //create user
    const newUser = await User.create({ email, password: hashedPassword })

    //create json web token
    const expiresIn = process.env.EXPIRES_IN ? parseInt(process.env.EXPIRES_IN) : 10800
    const token = JWT.sign({ email: newUser.email }, process.env.JWT_SECRET, {
      expiresIn
    })

    return res.json({
      errors: [],
      data: { token, user: { id: newUser._id, email: newUser.email } }
    })
  }
)

router.get(
  '/signin',
  body('email').isEmail().withMessage('Invalid Email!'),
  body('password').isLength({ min: 5 }),
  async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email }, { password: true })
      //check user
      if (!user) {
        return res.json({
          errors: [{ msg: 'Invalid Credentials!' }],
          data: null
        })
      }

      //compare password
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.json({
          errors: [{ msg: 'Invalid Credentials!' }],
          data: null
        })
      }

      //create json web token
      const expiresIn = process.env.EXPIRES_IN ? parseInt(process.env.EXPIRES_IN) : 10800
      const token = JWT.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn
      })

      return res.json({ errors: [], data: { token, user: { email, id: user._id } } })
    } catch (error) {
      return res.json({ errors: [{ msg: error.message }], data: null })
    }
  }
)

export default router
