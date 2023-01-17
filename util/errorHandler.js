const errorHandler = (err, res) => {
  console.log('ПОЙМАНА ОШИБКА', err.name);
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(400).send({ message: err.message });
    return;
  }
  if (err.name === 'DocumentNotFound') {
    res.status(404).send({ message: err.message });
    return;
  }
  res.status(500).send({ message: 'Ошибка по умолчанию' });
};

module.exports = errorHandler;
