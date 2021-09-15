import React, { useEffect, useState } from "react"
import "../App.css"
import io from "socket.io-client"
import ToMessage from "./ToMessage"
import FromMessage from "./FromMessage"
import uuid from "react-uuid"

const Main = () => {
  const [socket, setSocket] = useState()
  const [messages, setMessages] = useState([])
  const [rooms, setRooms] = useState([
    { name: "eren", saying: "bir şeyler" },
    { name: "adar", saying: "bir şeyler" },
    { name: "yusuf", saying: "bir şeyler" },
    { name: "serdar", saying: "bir şeyler" },
  ])

  useEffect(() => {
    const newSocket = io("http://localhost:4200")
    setSocket(newSocket)

    return () => newSocket.close()
  }, [])

  useEffect(() => {
    if (socket == null || socket == undefined) return

    socket.emit("joinRoom", "1")
  })


  return (
    <div className="main">
      <div className="rooms">
        {rooms.map((person, i) => (
          <div className="room" key={i}>
            <div className="circle">
              <i className="fa fa-user" />
            </div>
            <div className="personInfo">
              <div>{person.name}</div>
              <div>{person.saying}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="chat">
        <div className="messages">
          <ToMessage message="Hello World!" />
          <FromMessage message="Hello World!" />
          {messages}
        </div>
        <div className="writeMessage">
          <input type="text" />
        </div>
      </div>
    </div>
  )
}

export default Main
