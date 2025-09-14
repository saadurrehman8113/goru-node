// Centralized error handlers
// 404 handler (kept separate for clarity)
import { MESSAGES } from '../constants/index.js';

export const notFoundHandler = (err, req, res, next) => {
  if (err && err.status === 404) {
    return res.status(404).json({
      message: err.message || MESSAGES.NOT_FOUND,
      data: {}
    });
  }
  return next(err);
};

// General error handler
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || MESSAGES.INTERNAL_SERVER_ERROR,
    data: {}
  });
};

export default {
  notFoundHandler,
  errorHandler
};
