
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