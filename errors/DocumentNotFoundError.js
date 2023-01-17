const HttpError = require('./HttpError');

class DocumentNotFoundError extends HttpError {
  constructor(message) {
    super(message);
    this.name = 'DocumentNotFoundError';
    this.statusCode = 404;
  }
}

module.exports = DocumentNotFoundError;
