const mongoose = require('mongoose');
const user = require('./User')
const InboxSchema = new mongoose.Schema({
  name: {
    type: String,
    default: user.name
  },
  email: {
    type: String,
    default: user.email
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