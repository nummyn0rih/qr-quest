const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  question: { type: String, required: true },
  options: { type: Map, required: true },
  answer: { type: Number, required: true },
  owner: { type: Types.ObjectId, ref: 'User' },
  members: [{ type: Schema.Types.ObjectId, ref: 'Member' }],
});

module.exports = model('Question', schema);
