const mongoose = require('mongoose');

const InboxSchema = new mongoose.Schema({
  name: {
    type: String,
    default: user.name
  },
  email: {
    type: String,
    defalut: user.email
  },
  number: {
    type: Number,
    default: user.number
  },
  object: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Inbox = mongoose.model('Inbox', InboxSchema);

module.exports = Inbox;