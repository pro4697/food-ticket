const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    key: {
      type: String,
      maxlength: 90,
    },
    name: {
      type: String,
      maxlength: 50,
    },
    url: String,
    section: Number,
  },
  { timestamps: true }
);

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = { Ticket };
