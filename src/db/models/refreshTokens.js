const { Schema, model } = require('../index');

const refreshTokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, required: true },
    ip: { type: String },
  },
  { timestamps: true, collection: 'refreshTokens' }
);

const RefreshToken = model('RefreshToken', refreshTokenSchema);

module.exports = RefreshToken;
