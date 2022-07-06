const router = require('express').Router();
const userRouter = require('./user.router');
const { checkAccessToken } = require('../middlewares/token.mw');

router.use('/users', userRouter);
router.get('/test', checkAccessToken, (req, res, next) => {
  res.send({ message: 'authorized users only route' });
});

module.exports = router;
