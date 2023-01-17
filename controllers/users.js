const User = require('../models/user');
const DocumentNotFoundError = require('../errors/DocumentNotFoundError');
const errorHandler = require('../util/errorHandler');

module.exports.getUsers = async function (req, res) {
  try {
    const users = await User.find({});
    if (users) {
      res.send(users);
    } else {
      throw new DocumentNotFoundError('Запрашиваемые пользователи не найдены');
    }
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports.getUserById = async function (req, res) {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      res.send(user);
    } else {
      throw new DocumentNotFoundError(`Пользователь по указанному _id:${req.params.userId} не найден`);
    }
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports.createUser = async function (req, res) {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
    res.send(user);
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports.updateUser = async function (req, res) {
  try {
    const owner = req.user._id;
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      owner,
      { name, about },
      {
        new: true,
        runValidators: true,
      },
    );
    if (user) {
      res.json(user);
    } else {
      throw new DocumentNotFoundError(`Пользователь с указанным _id:${owner} не найден`);
    }
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports.updateAvatar = async function (req, res) {
  try {
    const owner = req.user._id;
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      owner,
      { avatar },
      {
        new: true,
      },
    );
    if (user) {
      res.send(user);
    } else {
      throw new DocumentNotFoundError(`Пользователь с указанным _id:${owner} не найден`);
    }
  } catch (err) {
    errorHandler(err, res);
  }
};
