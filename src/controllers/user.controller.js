const User = require('../db/models/user')

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req

    const user = await User.create(body)

    res.status(201).send({data: user})
    
  } catch (error) {
    next(error)
  }
}
