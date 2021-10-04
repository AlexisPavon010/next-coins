
const mongodburl = process.env.DATABASE_URL

import mongoose from 'mongoose';


const connectDB = async (req, res) => {
  try {
    // Use new db connection
    await mongoose.connect(mongodburl, {
      useUnifiedTopology: true,
      // useFindAndModify: false,
      // useCreateIndex: true,
      useNewUrlParser: true,
      bufferCommands: true,
      // bufferMaxEntries: 0
    });
    console.log('db is Connected 🚀')

  } catch (error) {
    console.log(error)
  }
};

export default connectDB;

// import { MongoClient } from 'mongodb'

// let uri = process.env.DATABASE_URL
// let dbName = 'movimientos'

// let cachedClient = null
// let cachedDb = null

// if (!uri) {
//   throw new Error(
//     'Please define the MONGODB_URI environment variable inside .env.local'
//   )
// }

// if (!dbName) {
//   throw new Error(
//     'Please define the MONGODB_DB environment variable inside .env.local'
//   )
// }

// export async function connectToDatabase() {
//   if (cachedClient && cachedDb) {
//     return { client: cachedClient, db: cachedDb }
//   }

//   const client = await MongoClient.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })

//   const db = await client.db(dbName)

//   cachedClient = client
//   cachedDb = db

//   return { client, db }
// }