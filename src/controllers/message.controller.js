const Message = require('../db/models/message');

module.exports.getMesages = async (req, res, next) => {
  try {
    const messages = await Message.find().populate({
      path: 'user',
      select: ['firstName', 'lastName'],
    });

    res.send({ data: messages });
  } catch (error) {
    next(error);
  }
};
