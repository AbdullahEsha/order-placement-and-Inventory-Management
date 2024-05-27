import express from 'express'

const router = express.Router()

//import controllers
import { getAllProducts, createProduct } from '../controllers'

//routes
router.route('/').get(getAllProducts).post(createProduct)

export { router as productRouter }
