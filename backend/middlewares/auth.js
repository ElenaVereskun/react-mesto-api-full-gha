const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const Unauthorized = require('../errors/unauthorized');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unauthorized('Необходима авторизация1');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new Unauthorized('Необходима авторизация');
  }
  req.user = payload;
  next();
};
