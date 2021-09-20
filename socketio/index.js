let io = require("socket.io")(4200, {
  cors: {
    origin: ["http://localhost:3000"],
  },
})

io.on("connection", (socket) => {
  console.log(socket.id)
  let lastRoom
  
  socket.on("joinRoom", (room) => {
    socket.join(room)

    lastRoom = room

    socket.to(room).emit("joined", socket.id)
    console.log(`Joined the room: ${room}`)
  })

  socket.on("sendMessage", (message) => {
    socket.to(lastRoom).emit("receiveMessage", message)
  })

  socket.on("disconnect", () => {
    console.log(lastRoom)
    socket.to(lastRoom).emit("disconnected", socket.id)
  })
})

console.log("Socket.io is listening on port 4200")
