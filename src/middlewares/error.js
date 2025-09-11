// Centralized error handlers
// 404 handler (kept separate for clarity)
export const notFoundHandler = (err, req, res, next) => {
  if (err && err.status === 404) {
    return res.status(404).json({
      message: err.message || 'Not Found'
    });
  }
  return next(err);
};

// General error handler
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || err.statusCode || 500;
  const payload = {
    message: err.message || 'Internal Server Error'
  };

  if (process.env.NODE_ENV !== 'production' && err.stack) {
    payload.stack = err.stack;
  }

  res.status(statusCode).json(payload);
};

export default {
  notFoundHandler,
  errorHandler
};
