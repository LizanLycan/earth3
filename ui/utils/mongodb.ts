import mongoose from 'mongoose'
import { MONGO_URI } from './constants'
mongoose.Promise = global.Promise

const mongoConnection = () => {
  mongoose.connection.on('connected', () => {
    console.error('Successfully connect to MongoDB.')
  })

  mongoose.connection.on('error', (err) => {
    console.error('Connection error', err)
    process.exit(1)
  })

  return mongoose.connect(MONGO_URI)
}

export default mongoConnection
