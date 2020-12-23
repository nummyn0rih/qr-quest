const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  question: [{ type: Types.ObjectId, ref: 'Question' }],
  userId: { type: String, required: true },
  isSuccessfully: { type: Boolean, default: false },
});

module.exports = model('Member', schema);
