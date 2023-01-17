const User = require('../models/user');
const errorHandler = require('../util/errorHandler');

module.exports.getUsers = async function (req, res) {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports.getUserById = async function (req, res) {
  try {
    const user = await User.findById(req.params.userId);
    res.send(user);
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
      res.send(user);
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
    res.send(user);
  } catch (err) {
    errorHandler(err, res);
  }
};
