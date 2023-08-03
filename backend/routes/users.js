const router = require('express').Router();

const {
  getUsers, getUserInfo, updateProfile, updateAvatar, getUserId,
} = require('../controllers/user');

const {
  validationUpdateAvatar, validationUpdateProfile, validationUserId,
} = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.patch('/me', validationUpdateProfile, updateProfile);
router.patch('/me/avatar', validationUpdateAvatar, updateAvatar);
router.get('/:userId', validationUserId, getUserId);

module.exports = router;
