const path = require("path")
const express = require("express")
const app = express()
const server = require("http").createServer(app)
const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
})
const mongoose = require("mongoose")
const passport = require("passport")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const cors = require("cors")
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
app.use(
  cors({
    origin: "http://localhost:3000",
  })
)

const db =
  "mongodb+srv://sprinkai:eren123@chatappdb.l7biy.mongodb.net/ChatAppDB?retryWrites=true&w=majority"

try {
  ;(async () => {
    await mongoose.connect(db, {
      // Connecting mongodb
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("MongoDB connected...")
  })()

} catch (e) {
  console.log(e)
}

// Routes
app.use("/users", require("./routes/users.js"))
app.use("/rooms", require("./routes/rooms.js"))

// Socket.io
io.on("connection", (socket) => {
  let lastRoom

  socket.on("joinRoom", (room) => {
    socket.join(room)

    lastRoom = room

    socket.to(room).emit("joined", socket.id)
  })

  socket.on("sendMessage", (message) => {
    socket.to(lastRoom).emit("receiveMessage", message)
  })

  socket.on("disconnect", () => {
    socket.to(lastRoom).emit("disconnected", socket.id)
  })
})

const port = process.env.port || 8080

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
