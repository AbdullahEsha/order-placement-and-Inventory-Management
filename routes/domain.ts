import express from 'express'

const router = express.Router()

//import controllers
import { getAllDomains, createDomain } from '../controllers'

//routes
router.route('/').get(getAllDomains).post(createDomain)

export { router as domainRouter }
