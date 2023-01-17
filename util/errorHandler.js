const { errorCodes } = require('./constants.ts');

const errorHandler = (err, res) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(errorCodes.HTTP_BAD_REQUEST).send({ message: err.message });
    return;
  }
  if (err.name === 'DocumentNotFound') {
    res.status(errorCodes.HTTP_NOT_FOUND).send({ message: err.message });
    return;
  }
  res.status(errorCodes.HTTP_DEFAULT_ERROR).send({ message: 'Ошибка по умолчанию' });
};

module.exports = errorHandler;
