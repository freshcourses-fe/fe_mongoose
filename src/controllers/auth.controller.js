const createHttpError = require('http-errors');
const bcrypt = require('bcrypt');
const User = require('../db/models/user');
const AuthService = require('../services/auth.service');

module.exports.register = async (req, res, next) => {
  try {
    const { body } = req;

    const user = await User.create(body);

    const sessionData = await AuthService.createSession(user);

    res.status(201).send({ data: sessionData });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;

    const user = await User.findOne({ email });

    if (!user) {
      return next(createHttpError(401, 'Invalid data'));
    }

    const isValidPass = bcrypt.compareSync(password, user.password);

    if (!isValidPass) {
      return next(createHttpError(401, 'Invalid data'));
    }
    const sessionData = await AuthService.createSession(user);

    res.status(200).send({ data: sessionData });
  } catch (error) {
    next(error);
  }
};

module.exports.refresh = async (req, res, next) => {
  const {
    refreshTokenInstance, // отвалидированный, не протухший екземпляр
  } = req;

  const sessionData = await AuthService.refreshSession(refreshTokenInstance);

  res.status(200).send({ data: sessionData });
};
