const User = require('../models/user');
const errorHandler = require('../util/errorHandler');

module.exports.getUsers = async function (req, res) {
  try {
    const users = await User.find({});
    if (!users) {
      const err = new Error('Запрошенные пользователи не найдены');
      err.name = 'DocumentNotFound';
      throw err;
    }
    res.send({ data: users });
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports.getUserById = async function (req, res) {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      const err = new Error('Запрошенный пользователь не найден');
      err.name = 'DocumentNotFound';
      throw err;
    }
    res.send({ data: user });
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports.createUser = async function (req, res) {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
    res.send({ data: user });
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
    ).exec();
    if (!user) {
      const err = new Error('Запрошенный пользователь не найден');
      err.name = 'DocumentNotFound';
      throw err;
    }
    res.send({ data: user });
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
    ).exec();
    if (!user) {
      const err = new Error('Запрошенный пользователь не найден');
      err.name = 'DocumentNotFound';
      throw err;
    }
    res.send({ data: user });
  } catch (err) {
    errorHandler(err, res);
  }
};
