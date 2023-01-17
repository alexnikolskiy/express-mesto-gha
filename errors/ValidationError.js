const HttpError = require('./HttpError');

class ValidationError extends HttpError {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

module.exports = ValidationError;
