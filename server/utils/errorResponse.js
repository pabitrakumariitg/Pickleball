/**
 * Custom error class for API responses
 * Extends the built-in Error class with statusCode property
 */
class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorResponse;