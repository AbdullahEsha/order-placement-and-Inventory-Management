import express from 'express'

const router = express.Router()

//import controllers
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers'
import { checkAdmin, protect, checkUser } from '../middlewares'

//routes
router.route('/').post(createUser)
router.route('/:id').get(getUser)

// protect the routes below
router.route('/').get(protect, checkAdmin, getAllUsers)

router.route('/:id').put(updateUser).delete(protect, checkAdmin, deleteUser)

export { router as userRouter }
