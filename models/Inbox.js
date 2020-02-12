const mongoose = require('mongoose');

const InboxSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  number: {
    type: Number,
    required: false
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