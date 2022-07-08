import mongoose from 'mongoose';

const connect = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/PROFILE', () => {
      console.log('Connected to database');
    });
  } catch (error) {
    console.log('Error connectiing to db');
  }
};

export default connect;
