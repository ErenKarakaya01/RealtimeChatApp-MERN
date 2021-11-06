const express = require("express")
const router = express.Router()
const { ensureAuthenticated } = require("../config/auth")

// Load Room model
const Room = require("../models/Room")

router.get("/:id", ensureAuthenticated, async (req, res) => {
  try {
    let room = await Room.findById(req.params.id)
    res.send({ room })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
