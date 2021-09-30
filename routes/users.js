const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const passport = require("passport")
const { ensureAuthenticated } = require("../config/auth")

// Load User model
const User = require("../models/User")

// Get isAuthenticated
router.get("/isauthenticated", (req, res) => {
  res.send({ isAuthenticated: req.isAuthenticated() })
})

// Get name
router.get("/getname", ensureAuthenticated, (req, res) => {
  res.send({ name: req.user.name })
})

// Register
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body
  let errors = []

  // Checking the errors
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please enter all fields" })
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" })
  }

  if (password === undefined || password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" })
  }

  if (errors.length > 0) {
    res.send({
      isRegistered: false,
      errors,
    })
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "Email already exists" })
        res.send({
          isRegistered: false,
          errors,
        })
      } else {
        const newUser = new User({
          // Creating new user
          name,
          email,
          password,
        })

        bcrypt.genSalt(10, (err, salt) => {
          // Encrypting the password
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser
              .save()
              .then((user) => {
                res.send({
                  isRegistered: true,
                  errors,
                })
              })
              .catch((err) => console.log(err))
          })
        })
      }
    })
  }
})

// Login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err)
    }

    if (!user) {
      return res.send({
        isLoggedIn: false,
        errors: ["Wrong password or email!"],
      })
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err)
      }
      return res.send({ isLoggedIn: true, errors: [] })
    })
  })(req, res, next)
})

// Logout
router.get("/logout", ensureAuthenticated, (req, res) => {
  req.logout()
  res.end()
})

module.exports = router
