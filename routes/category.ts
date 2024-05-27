import express from 'express'

const router = express.Router()

//import controllers
import { createCategory, getAllCategories } from '../controllers'

//routes
router.route('/').get(getAllCategories).post(createCategory)

export { router as categoryRouter }
