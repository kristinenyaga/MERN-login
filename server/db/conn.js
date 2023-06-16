import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
const connect = async () => {
  // its going to create a new mongodb instance whenever you start your server
  // mongo uri is inside mongod variable
  const mongod = await MongoMemoryServer.create()
  const getUri = mongod.getUri()

  const db = await mongoose.connect(getUri)
  console.log("connected")
  return db
}
export default connect