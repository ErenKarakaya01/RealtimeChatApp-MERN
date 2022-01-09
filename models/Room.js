const mongoose = require("mongoose")

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  saying: {
    type: String,
    required: true,
  },
  messages: [{ type: mongoose.Types.ObjectId, ref: "message" }],
  date: {
    type: Date,
    default: Date.now,
  },
})

const Room = mongoose.model("room", RoomSchema)

module.exports = Room
