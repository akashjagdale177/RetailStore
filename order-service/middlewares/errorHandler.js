const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode && err.statusCode !== 200 ? err.statusCode : 500;
  let message = err.message || 'Internal Server Error';
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map((e) => e.message).join(', ');
  }
  console.error(`[order-service] ${err.stack || err}`);
  res.status(statusCode).json({ success: false, message });
};
const notFound = (req, res) => res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
module.exports = { errorHandler, notFound };
