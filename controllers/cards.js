const Card = require('../models/card');
const ValidationError = require('../errors/ValidationError');
const DocumentNotFoundError = require('../errors/DocumentNotFoundError');
const errorHandler = require('../util/errorHandler');

module.exports.getCards = async function (req, res) {
  try {
    const cards = await Card.find({});
    if (cards) {
      res.send(cards);
    } else {
      throw new DocumentNotFoundError('Запрашиваемые карточки не найдены');
    }
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports.createCard = async function (req, res) {
  try {
    const owner = req.user._id;
    const { name, link } = req.body;
    if (!(name && link && owner)) {
      throw new ValidationError('Переданы некорректные данные при создании карточки');
    }
    const card = await Card.create({ name, link, owner });
    res.send(card);
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports.deleteCardById = async function (req, res) {
  try {
    const card = await Card.findByIdAndRemove(req.params.cardId);
    if (card) {
      res.send(card);
    } else {
      throw new DocumentNotFoundError(`Карточка с указанным _id:${req.params.cardId} не найдена.`);
    }
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports.addLikeCard = async function (req, res) {
  try {
    const owner = req.user._id;
    if (!owner) {
      throw new ValidationError('Не передан id автора карточки');
    }
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: owner } },
      { new: true },
    );
    if (card) {
      res.send(card);
    } else {
      throw new DocumentNotFoundError(`Карточка с указанным _id:${req.params.cardId} не найдена.`);
    }
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports.deleteLikeCard = async function (req, res) {
  try {
    const owner = req.user._id;
    if (!owner) {
      throw new ValidationError('Не передан id автора карточки');
    }
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: owner } },
      { new: true },
    );
    if (card) {
      res.send(card);
    } else {
      throw new DocumentNotFoundError(`Карточка с указанным _id:${req.params.cardId} не найдена.`);
    }
  } catch (err) {
    errorHandler(err, res);
  }
};
