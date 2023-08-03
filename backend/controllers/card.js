const { default: mongoose } = require('mongoose');
const Card = require('../models/card');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-error');
const Forbidden = require('../errors/forbidden');

const STATUS_OK = 200;
const STATUS_CREATED = 201;

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.status(STATUS_OK).send({ data: card }));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  return Card.create({ name, link, owner })
    .then((card) => res.status(STATUS_CREATED).send({ data: card }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        throw new BadRequestError('Переданы некорректные данные');
      }
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFoundError('Удаление карточки с несуществующим в БД id'))
    .then((card) => {
      if (String(card.owner) === String(req.user._id)) {
        Card.deleteOne(card)
          .then(() => res.status(STATUS_OK).send(card));
      } else {
        next(new Forbidden('Ошибка доступа'));
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail(new Error('DocumentNotFoundError'))
  .then((card) => res.status(STATUS_OK).send(card))
  .catch((err) => {
    if (err instanceof mongoose.Error.CastError) {
      throw new BadRequestError('Переданы некорректные данные для постановки лайка');
    }
    if (err.message === 'DocumentNotFoundError') {
      throw new NotFoundError('Передан несуществующий _id карточки');
    }
  })
  .catch(next);

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail(new Error('DocumentNotFoundError'))
  .then((card) => res.status(STATUS_OK).send(card))
  .catch((err) => {
    if (err instanceof mongoose.Error.CastError) {
      throw new BadRequestError('Переданы некорректные данные для снятия лайка');
    }
    if (err.message === 'DocumentNotFoundError') {
      throw new NotFoundError('Передан несуществующий _id карточки');
    }
  })
  .catch(next);
