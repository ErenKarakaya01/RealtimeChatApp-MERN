const mongoose = require("mongoose")
import { v4 as uuidv4 } from 'uuid'

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  saying: {
    type: String,
    required: true,
  },
  messages: [String],
  date: {
    type: Date,
    default: Date.now,
  },
})

const Room = mongoose.model("room", RoomSchema)

module.exports = Room
