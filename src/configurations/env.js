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
    accessTokenSecret: process.env.JWT_ACCESS_SECRET || '71G2dc4O6a-05ad-47cd-9a30-2dR1ac474c9U61',
    refreshTokenSecret:
      process.env.JWT_REFRESH_SECRET || '87G89c4Of4-9af5-4f65-a830-e5R99c2077bU76',
    accessTokenExpiry: process.env.JWT_ACCESS_EXPIRY || '15m',
    refreshTokenExpiry: process.env.JWT_REFRESH_EXPIRY || '7d'
  }
};

export default config;
