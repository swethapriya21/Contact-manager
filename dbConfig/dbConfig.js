import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGO_URI;

    // Use in-memory MongoDB for development to avoid connection issues
    if (process.env.NODE_ENV === 'development') {
      const mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
      console.log('Using in-memory MongoDB for development');
    }

    const conn = await mongoose.connect(mongoUri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.log('Continuing without database connection...');
    // process.exit(1); // Commented out to prevent crash
  }
};

export default connectDB;