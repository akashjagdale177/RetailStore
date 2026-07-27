const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode && err.statusCode !== 200 ? err.statusCode : 500;
  console.error(`[notification-service] ${err.stack || err}`);
  res.status(statusCode).json({ success: false, message: err.message || 'Internal Server Error' });
};
const notFound = (req, res) => res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
module.exports = { errorHandler, notFound };
