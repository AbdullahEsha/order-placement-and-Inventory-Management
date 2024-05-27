import express from 'express'

const router = express.Router()

//import controllers
import { createReview, getAllReviews } from '../controllers'

//routes
router.route('/').get(getAllReviews).post(createReview)

export { router as reviewRouter }
