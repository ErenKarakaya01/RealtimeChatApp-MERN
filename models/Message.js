const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

const Message = mongoose.model("message", MessageSchema)

module.exports = Message