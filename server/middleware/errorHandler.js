function notFound(req, res, next) {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode && err.statusCode !== 200 ? err.statusCode : res.statusCode !== 200 ? res.statusCode : 500;

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ success: false, message: messages.join(', ') });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ success: false, message: `Invalid value for ${err.path}` });
  }

  if (err.code === 11000) {
    return res.status(400).json({ success: false, message: 'Duplicate value provided for a unique field' });
  }

  console.error(`[error] ${err.message}`);

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Server Error',
  });
}

module.exports = { notFound, errorHandler };
