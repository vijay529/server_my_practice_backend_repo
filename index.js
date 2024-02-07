import express from 'express';
import mongoose from 'mongoose';
import router from './routes/memes.js'
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGODB = process.env.MONGODB;

// Connect to MongoDB
const connect = async()=>{
  try{
    await mongoose.connect(MONGODB);
    console.log('connected to database');
  }catch(err){
    console.log('db connection err');
  }
}

mongoose.connection.on('disconnected',()=>{
  console.log('disconnected from database !!');
})

// Middleware
app.use(express.json());
app.use(cors({}));

// routes
app.use('/api', router);

// server
app.listen(PORT, () => {
  connect();
  console.log(`Server is running`);
});
