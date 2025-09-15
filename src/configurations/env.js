import dotenv from 'dotenv';

dotenv.config();

const nodeEnv = process.env.NODE_ENV || 'development';

export const config = {
  env: nodeEnv,
  isDevelopment: nodeEnv === 'development',
  isProduction: nodeEnv === 'production',
  port: parseInt(process.env.PORT, 10) || 3001,
  cors: {
    origin: process.env.CORS_ORIGIN || '*'
  },
  logLevel: process.env.LOG_LEVEL || (nodeEnv === 'development' ? 'dev' : 'combined'),
  db: {
    uri: process.env.MONGODB_URL
  },
  jwt: {
    accessTokenSecret: process.env.JWT_ACCESS_SECRET || 'e23c16bc-ab3b-4e86-ae2b-3171e4c43ef2',
    refreshTokenSecret:
      process.env.JWT_REFRESH_SECRET || '87G89e59acd4b-fac6-4f16-bd06-c6045c35102a',
    accessTokenExpiry: process.env.JWT_ACCESS_EXPIRY || '15m',
    refreshTokenExpiry: process.env.JWT_REFRESH_EXPIRY || '7d'
  }
};

export default config;
