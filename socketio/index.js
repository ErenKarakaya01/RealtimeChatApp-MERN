let io = require("socket.io")(4200, {
  cors: {
    origin: ["http://localhost:3000"],
  },
})

io.on("connection", (socket) => {
  console.log(32)
  socket.on("joinRoom", () => {
    console.log(23)
    socket.emit("joinRoom", 30)
  })
})
