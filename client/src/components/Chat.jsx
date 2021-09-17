import React, { useState, useEffect, useRef } from "react"
import "../App.css"
import ToMessage from "./ToMessage"
import FromMessage from "./FromMessage"
import uuid from "react-uuid"

const Chat = ({ socket }) => {
  const [messages, setMessages] = useState([])
  const inputRef = useRef(null)

  useEffect(() => {
    if (socket === null || socket === undefined) return

    socket.on("joined", (socketId) => {
      addFromMessage(`${socketId} just joined the room!`)
      console.log(messages)
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

      let message = event.target.value
      event.target.value = ""

      addToMessage(message)
      socket.emit("sendMessage", message)
    }
  }

  return (
    <div className="chat">
      <div className="messages">
        {messages}
      </div>
      <div className="writeMessage">
        <input
          ref={inputRef}
          type="text"
          onKeyDown={messageHandler}
          autoFocus
        />
      </div>
    </div>
  )
}

export default Chat
