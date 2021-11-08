const express = require("express")
const router = express.Router()
const { ensureAuthenticated } = require("../config/auth")

// Load models
const Room = require("../models/Room")
const User = require("../models/User")

router.get("/:id", ensureAuthenticated, async (req, res) => {
  try {
    let room = await Room.findById(req.params.id)
    res.send({ room })
  } catch (error) {
    console.log(error)
  }
})

router.post("/createroom", ensureAuthenticated, async (req, res) => {
  try {
    const { name, saying } = req.body

    let errors = []

    if (!name || !saying) errors.push("Please enter all fields")

    if (errors.length > 0) res.send({ errors, isPostSuccessful: false })
    else {
      const newRoom = new Room({
        name,
        saying,
      })

      let room = await newRoom.save()

      let user = await User.findById(req.user._id)

      user.rooms.push(room._id)

      await user.save()

      res.send({ errors, isPostSuccessful: true })
    }
  } catch (error) {
    console.log(error)
  }
})

router.post("/joinroom", ensureAuthenticated, async (req, res) => {
  try {
    const { room } = req.body

    let errors = []

    let foundRoom = await Room.findById(room)

    if (!foundRoom) {
      errors.push("This room does not exist")
    }

    if (errors.length > 0) {
      res.send({ errors, isPostSuccessful: false })
    } else {
      let user = await User.findById(req.user._id)

      user.rooms.push(room)

      await user.save()

      res.send({ errors, isPostSuccessful: true })
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
