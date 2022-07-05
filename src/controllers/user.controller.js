const createHttpError = require('http-errors');
const User = require('../db/models/user');

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;

    const user = await User.create(body);

    res.status(201).send({ data: user });
  } catch (error) {
    next(error);
  }
};

module.exports.getUsers = async (req, res, next) => {
  try {
    const {
      query: { limit = 0, offset = 0 },
    } = req;
    const users = await User.find()
      .select('-password -__v')
      .limit(limit)
      .skip(offset);

    res.status(200).send({ data: users });
  } catch (error) {
    next(error);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;

    const user = await User.findById(userId, '-password');

    if (!user) {
      return next(createHttpError(404, 'User not found'));
    }

    res.status(200).send({ data: user });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const {
      body,
      params: { userId },
    } = req;

    const user = await User.findOneAndUpdate({ _id: userId }, body, {
      new: true,
    });

    if (!user) {
      return next(createHttpError(404, 'User not found'));
    }

    res.status(200).send({ data: user });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return next(createHttpError(404, 'User not found'));
    }

    res.status(200).send({ data: user });
  } catch (error) {
    next(error);
  }
};
