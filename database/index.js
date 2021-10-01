
const mongodburl = 'mongodb+srv://test:1234Pavon@cluster0.zgmq0.mongodb.net/Cluster0?retryWrites=true&w=majority'

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