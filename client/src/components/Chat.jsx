import React, { useState, useEffect } from "react"
import ToMessage from "./ToMessage"
import FromMessage from "./FromMessage"
import uuid from "react-uuid"

const Chat = ({ socket, userName }) => {
  const [messages, setMessages] = useState([])
  const [value, setValue] = useState("")
  const [roomInfo, setRoomInfo] = useState({ _id: "No Room!"})

  useEffect(() => {
    socket.on("joined", (userName) => {
      addFromMessage(`${userName} just joined the room!`)
    })

    socket.on("receiveMessage", (from, message, date) => {
      addFromMessage(from, message, date)
    })

    socket.on("roomInfo", (roomInfo) => {
      setRoomInfo(roomInfo)
    })

    socket.on("disconnected", (userName) => {
      addFromMessage(`${userName} just disconnected from the room!`)
    })
  }, [])

  const addFromMessage = (from, message, date) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      <FromMessage
        from={from}
        message={message}
        date={formatDate(date)}
        key={uuid()}
      />,
    ])
  }

  const addToMessage = (from, message, date) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      <ToMessage
        from={from}
        message={message}
        date={formatDate(date)}
        key={uuid()}
      />,
    ])
  }

  const formatDate = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  const messageHandler = (event) => { // Sending message to other sockets
    if (event.key === "Enter") {

      let message = value
      setValue(prevValue => "")

      let date = new Date()
      addToMessage(userName, message, date)
      socket.emit("sendMessage", userName, message) // Sends message
    }
  }

  const handleChange = (event) => {
    setValue(prevValue => event.target.value)
  }

  return (
    <div className="chat">
      <div className="roomInfo">
        <div className="leftRoomInfo">
          <div className="roomName">{roomInfo.name}</div>
          <div className="saying">{roomInfo.saying}</div>
        </div>
        <div>
          <div className="roomId"> {`Room Id: ${roomInfo._id}`}</div>
        </div>
      </div>
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
