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
const Room = require("./models/Room")
const Message = require("./models/Message")

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
  let lastUserName

  socket.on("joinRoom", async (room, userName) => {
    if (room === lastRoom) return
    
    socket.join(room)
    lastRoom = room
    lastUserName = userName

    let roomInfo = await Room.findById(room)
    socket.emit("roomInfo", roomInfo)

    socket.to(room).emit("joined", userName)
  })

  socket.on("sendMessage", async (from, message) => {
    let newMessage = new Message({
      from,
      message,
    })

    let { _id, date } = await newMessage.save()
    let room = await Room.findById(lastRoom)
    room.messages.push(_id)
    await room.save()

    socket.to(lastRoom).emit("receiveMessage", from, message, date)
  })

  socket.on("disconnect", () => {
    socket.to(lastRoom).emit("disconnected", lastUserName)
  })
})

app.use(express.static('client/build'))
app.get('*', (req,res ) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))

const port = process.env.port || 8080

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
