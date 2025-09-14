import jwt from 'jsonwebtoken';
import config from '../configurations/env.js';

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, config.jwt.accessTokenSecret, {
    expiresIn: config.jwt.accessTokenExpiry
  });
};

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, config.jwt.refreshTokenSecret, {
    expiresIn: config.jwt.refreshTokenExpiry
  });
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, config.jwt.accessTokenSecret);
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, config.jwt.refreshTokenSecret);
};

export const generateTokenPair = (user) => {
  const payload = {
    id: user.id,
    emailAddress: user.emailAddress
  };

  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload)
  };
};

export default {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  generateTokenPair
};
