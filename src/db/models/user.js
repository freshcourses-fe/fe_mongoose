const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../../constants');
const { Schema, model } = require('../index');

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /\w+@\w+\.\w+/,
    },
    password: {
      type: String,
      required: true,
      set: pass => {
        const hashedPass = bcrypt.hashSync(pass, SALT_ROUNDS);
        return hashedPass;
      },
    },
    isMale: Boolean,
    birthday: { type: Date },
  },
  { timestamps: true }
);

const User = model('User', userSchema);

module.exports = User;
