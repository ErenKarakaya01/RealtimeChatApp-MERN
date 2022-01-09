import React, { useState, useEffect, useRef } from "react"
import ToMessage from "./ToMessage"
import FromMessage from "./FromMessage"
import uuid from "react-uuid"
import axios from "axios"

const Chat = ({ socket, userName }) => {
  const [messages, setMessages] = useState([])
  const [value, setValue] = useState("")
  const [roomInfo, setRoomInfo] = useState({ _id: "No Room!"})
  const messagesRef = useRef(null)

  useEffect(() => {
    socket.on("joined", (userName) => {
      addFromMessage("", `${userName} just joined the room!`, new Date())
    })

    socket.on("receiveMessage", (from, message, date) => {
      addFromMessage(from, message, date)
    })

    socket.on("roomInfo", async (roomInfo) => {
      setRoomInfo(roomInfo)

      let res = await axios.get(`/rooms/getmessages/${roomInfo._id}`) // Getting old messages that were written before
      let messagesArray = res.data.room.messages

      for (let message of messagesArray) {
        let funcWillBeUsed

        if (message.from === userName)
          funcWillBeUsed = addToMessage
        else
          funcWillBeUsed = addFromMessage
          
        funcWillBeUsed(message.from, message.message, message.date)
      }
    })

    socket.on("disconnected", (userName) => {
      addFromMessage("", `${userName} just disconnected from the room!`, new Date())
    })
  }, [])

  useEffect(() => { // Updating scroll height whenever messages change
    updateScroll()
  }, [messages])

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
    date = new Date(date)
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  const updateScroll = () => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight
  }

  const messageHandler = (event) => { // Sending message to other sockets
    if (value === "") return
    if (roomInfo._id === "No Room!") return
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
      <div className="messages" ref={messagesRef}>
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
