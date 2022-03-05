import express from 'express'
import { body, validationResult } from 'express-validator'

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
      return res.json({ errors })
    }
    res.send(`Sign up route${req?.body?.name}`)
  }
)

export default router
