import mongoose from 'mongoose';
import config from './env.js';

const connectionOptions = {
  autoIndex: config.isDevelopment,
  maxPoolSize: parseInt(process.env.DB_MAX_POOL_SIZE || '10', 10)
};

export const connectDatabase = async () => {
  if (!config.db?.uri) {
    throw new Error('Missing MongoDB connection URI. Set MONGODB_URI in environment.');
  }

  // Avoid duplicate connections in dev with hot reload
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  await mongoose.connect(config.db.uri, connectionOptions);
  return mongoose.connection;
};

export const disconnectDatabase = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
};

// Connection events (simple logs)
mongoose.connection.on('connected', () => {
  // eslint-disable-next-line no-console
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  // eslint-disable-next-line no-console
  console.log('MongoDB disconnected');
});

export default {
  connectDatabase,
  disconnectDatabase
};
