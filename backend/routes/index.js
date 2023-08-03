const router = require('express').Router();
const { login, createUser } = require('../controllers/user');
const { auth } = require('../middlewares/auth');
const { validationCreateUser, validationLogin } = require('../middlewares/validation');

const userRouter = require('./users');
const cardRouter = require('./cards');

router.post('/signin', validationLogin, login);
router.post('/signup', validationCreateUser, createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);

module.exports = router;
