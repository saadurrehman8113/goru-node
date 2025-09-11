import dotenv from 'dotenv';

dotenv.config();

const nodeEnv = process.env.NODE_ENV || 'development';

export const config = {
  env: nodeEnv,
  isDevelopment: nodeEnv === 'development',
  isProduction: nodeEnv === 'production',
  port: parseInt(process.env.PORT, 10) || 3000,
  cors: {
    origin: process.env.CORS_ORIGIN || '*'
  },
  logLevel: process.env.LOG_LEVEL || (nodeEnv === 'development' ? 'dev' : 'combined')
};

export default config;
