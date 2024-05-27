import express from 'express'

const router = express.Router()

//import controllers
import { getAllColors, createColor } from '../controllers'

//routes
router.route('/').get(getAllColors).post(createColor)

export { router as colorRouter }
