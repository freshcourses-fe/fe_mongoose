const { Schema, model } = require('../index');

const messageSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const Message = model('Message', messageSchema);

module.exports = Message;
