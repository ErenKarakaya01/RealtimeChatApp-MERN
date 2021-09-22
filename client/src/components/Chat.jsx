import React, { useState, useEffect, useRef } from "react"
import "../App.css"
import ToMessage from "./ToMessage"
import FromMessage from "./FromMessage"
import uuid from "react-uuid"

const Chat = ({ socket }) => {
  const [messages, setMessages] = useState([])
  const [value, setValue] = useState("")

  useEffect(() => {
    if (socket === null || socket === undefined) return // If socket is not connected returns the function

    socket.on("joined", (socketId) => {
      addFromMessage(`${socketId} just joined the room!`)
    })

    socket.on("receiveMessage", (message) => {
      addFromMessage(message)
    })

    socket.on("disconnected", (socketId) => {
      addFromMessage(`${socketId} just disconnected from the room!`)
    })
  }, [socket, messages])

  const addFromMessage = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      <FromMessage
        message={message}
        key={uuid()}
      />,
    ])
  }

  const addToMessage = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      <ToMessage
        message={message}
        key={uuid()}
      />,
    ])
  }

  const messageHandler = (event) => {
    if (event.key === "Enter") {
      if (socket === null || socket === undefined) return

      let message = value
      setValue(prevValue => "")

      addToMessage(message)
      socket.emit("sendMessage", message) // Sends message
    }
  }

  const handleChange = (event) => {
    setValue(prevValue => event.target.value)
  }

  return (
    <div className="chat">
      <div className="messages">
        {messages}
      </div>
      <div className="writeMessage">
        <input
          type="text"
          value={value}
          onKeyDown={messageHandler}
          onChange={handleChange}
          autoFocus
        />
      </div>
    </div>
  )
}

export default Chat