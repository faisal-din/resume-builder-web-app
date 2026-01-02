import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    });

    let mongoDbURI = process.env.MONGODB_URI;
    const projectName = 'resume-builder';

    if (!mongoDbURI) {
      throw new Error('MONGODB_URI environment variable is not set.');
    }

    if (mongoDbURI.endsWith('/')) {
      mongoDbURI = mongoDbURI.slice(0, -1);
    }

    await mongoose.connect(`${mongoDbURI}/${projectName}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
