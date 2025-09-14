import createError from 'http-errors';
import { verifyAccessToken } from '../utils/jwt.js';
import User from '../models/user.model.js';

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      throw createError(401, 'Access token required');
    }

    const decoded = verifyAccessToken(token);
    const user = await User.findById(decoded.id);

    if (!user) {
      throw createError(401, 'Invalid token - user not found');
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      next(createError(401, 'Invalid or expired token'));
    } else {
      next(error);
    }
  }
};

export default {
  authenticateToken
};
