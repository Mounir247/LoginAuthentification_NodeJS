const mongoose = require('mongoose');

const InboxSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
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