const mongoose = require('mongoose');
const HttpError = require('../errors/HttpError');

const errorHandler = (err, res) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  }
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(404).send({ message: `Переданы некорректные данные. Подробнее: ${err.message}` });
    return;
  }
  res.status(500).send({ message: 'Ошибка по-умолчанию' });
};

module.exports = errorHandler;
