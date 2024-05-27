import mongoose from 'mongoose'
import { TDBConn } from '../types'
import {
  MONGO_DB_HOST,
  MONGO_DB_NAME,
  MONGO_DB_PASSWORD,
  MONGO_DB_USER,
} from '../envSetup'

const MONGO_DB_URL = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`

//db connection
export const dbConnect = async (): Promise<TDBConn> => {
  try {
    const conn = await mongoose.connect(MONGO_DB_URL)
    console.log('MongoDB connection successful: ', conn.connection.host)
    return { isConn: true, conn: conn.connection.host }
  } catch (error) {
    // Catch any potential errors
    const err = error as any
    console.log('MongoDB connection error: ', err.message)
    return { isConn: false, conn: err.message }
  }
}
