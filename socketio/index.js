let io = require("socket.io")(4200, {
  cors: {
    origin: ["http://localhost:3000"],
  },
})

io.on("connection", (socket) => {
  console.log(socket.id)
  socket.on("joinRoom", (room) => {
    socket.join(room)

    console.log(`Joined the room: ${room}`)
  })
})

console.log("Socket.io is listening on port 4200")
