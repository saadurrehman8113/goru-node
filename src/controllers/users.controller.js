import createError from 'http-errors';
import User from '../models/user.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import { MESSAGES } from '../constants/index.js';
import { generateTokenPair } from '../utils/jwt.js';

export const register = asyncHandler(async (req, res) => {
  const { emailAddress, passwordHash, firstName, lastName, phoneNumber } = req.body || {};

  if (!emailAddress || !passwordHash || !firstName || !lastName) {
    throw createError(400, MESSAGES.MISSING_REQUIRED_FIELDS);
  }

  const existing = await User.findOne({ emailAddress });

  if (existing) {
    throw createError(409, MESSAGES.USER_EXISTS);
  }

  const user = await User.create({ emailAddress, passwordHash, firstName, lastName, phoneNumber });
  const tokens = generateTokenPair(user);

  res.status(201).json({
    message: MESSAGES.USER_REGISTER_SUCCESS,
    data: {
      user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    }
  });
});

export const login = asyncHandler(async (req, res) => {
  const { emailAddress, passwordHash } = req.body || {};

  if (!emailAddress || !passwordHash) {
    throw createError(400, MESSAGES.MISSING_REQUIRED_FIELDS);
  }

  const user = await User.findOne({ emailAddress });

  if (!user || user.passwordHash !== passwordHash) {
    throw createError(401, MESSAGES.INVALID_CREDENTIALS);
  }

  const tokens = generateTokenPair(user);

  res.status(200).json({
    message: MESSAGES.LOGIN_SUCCESS,
    data: {
      user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    }
  });
});

export const refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body || {};

  if (!refreshToken) {
    throw createError(400, MESSAGES.MISSING_REQUIRED_FIELDS);
  }

  try {
    const { verifyRefreshToken, generateTokenPair } = await import('../utils/jwt.js');
    const decoded = verifyRefreshToken(refreshToken);

    const user = await User.findById(decoded.id);
    if (!user) {
      throw createError(401, MESSAGES.INVALID_REFRESH_TOKEN);
    }

    const tokens = generateTokenPair(user);

    res.status(200).json({
      message: MESSAGES.TOKEN_REFRESH_SUCCESS,
      data: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
      }
    });
  } catch (error) {
    throw createError(401, MESSAGES.INVALID_REFRESH_TOKEN);
  }
});

export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: 'User profile retrieved successfully',
    data: req.user
  });
});

export default {
  register,
  login,
  refresh,
  getMe
};
