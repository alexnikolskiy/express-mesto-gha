const Card = require('../models/card');
const errorHandler = require('../util/errorHandler');

module.exports.getCards = async function (req, res) {
  try {
    const cards = await Card.find({});
    if (!cards) {
      const err = new Error('Запрошенные карточки не найдены');
      err.name = 'DocumentNotFound';
      throw err;
    }
    res.send({ data: cards });
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports.createCard = async function (req, res) {
  try {
    const owner = req.user._id;
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner });
    if (!card) {
      const err = new Error('Запрошенная карточка не найдена');
      err.name = 'DocumentNotFound';
      throw err;
    }
    res.send({ data: card });
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports.deleteCardById = async function (req, res) {
  try {
    const card = await Card.findByIdAndRemove(req.params.cardId);
    if (!card) {
      const err = new Error('Запрошенная карточка не найдена');
      err.name = 'DocumentNotFound';
      throw err;
    }
    res.send({ data: card });
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports.addLikeCard = async function (req, res) {
  try {
    const owner = req.user._id;
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: owner } },
      { new: true },
    );
    if (!card) {
      const err = new Error('Запрошенная карточка не найдена');
      err.name = 'DocumentNotFound';
      throw err;
    }
    res.send({ data: card });
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports.deleteLikeCard = async function (req, res) {
  try {
    const owner = req.user._id;
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: owner } },
      { new: true },
    );
    if (!card) {
      const err = new Error('Запрошенная карточка не найдена');
      err.name = 'DocumentNotFound';
      throw err;
    }
    res.send({ data: card });
  } catch (err) {
    errorHandler(err, res);
  }
};
