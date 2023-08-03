const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-error');
const Unauthorized = require('../errors/unauthorized');
const Confict = require('../errors/confict');

const STATUS_OK = 200;
const STATUS_CREATED = 201;

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(STATUS_CREATED).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        throw new BadRequestError('Переданы некорректные данные');
      }
      if (err.code === 11000) {
        throw new Confict('Пользователь уже зарегистрирован');
      } else {
        res.send({ message: err.message });
      }
    })
    .catch(next);
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(STATUS_OK).send(users));
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new Error('DocumentNotFoundError'))
    .then((user) => res.status(STATUS_OK).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        throw new BadRequestError('Переданы некорректные данные');
      }
      if (err.message === 'DocumentNotFoundError') {
        throw new NotFoundError('Пользователь не найден');
      }
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .orFail(new Error('DocumentNotFoundError'))
    .then((user) => res.status(STATUS_OK).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        throw new BadRequestError('Переданы некорректные данные');
      }
      if (err.message === 'DocumentNotFoundError') {
        throw new NotFoundError('Нет пользователя с таким id');
      }
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail(new Error('DocumentNotFoundError'))
    .then((user) => res.status(STATUS_OK).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        throw new BadRequestError('Переданы некорректные данные');
      }
      if (err.message === 'DocumentNotFoundError') {
        throw new NotFoundError('Нет пользователя с таким id');
      }
    })
    .catch(next);
};

module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new Error('DocumentNotFoundError'))
    .then((user) => res.status(STATUS_OK).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        throw new BadRequestError('Переданы некорректные данные');
      }
      if (err.message === 'DocumentNotFoundError') {
        throw new NotFoundError('Нет пользователя с таким id');
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.status(STATUS_OK).send({ _id: token });
    })
    .catch(() => {
      throw new Unauthorized('Нет пользователя с таким логином и паролем');
    })
    .catch(next);
};
