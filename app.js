const express = require("express")
const path = require("path")
const app = express()
const mongoose = require("mongoose")
const passport = require("passport")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const User = require("./models/User")

// Bodyparser middleware
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, "public")))

// Session middleware
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())
require("./config/passport")(passport)

// Cookieparser middleware
app.use(cookieParser())

// CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  next()
})

const db =
  "mongodb+srv://sprinkai:eren123@chatappdb.l7biy.mongodb.net/ChatAppDB?retryWrites=true&w=majority"

try {
  ;(async () => {
    await mongoose.connect(db, { // Connecting mongodb
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  })()

  console.log("MongoDB connected...")
} catch (e) {
  console.log(e)
}


// Routes
app.use("/users", require("./routes/users.js"))

const port = process.env.port || 8080

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
