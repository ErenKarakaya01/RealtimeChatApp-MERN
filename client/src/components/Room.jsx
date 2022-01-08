import React, { useEffect } from "react"

const Room = ({ name, saying, room, socket, userName }) => {
  useEffect(() => {})

  const joinRoom = () => {
    socket.emit("joinRoom", room, userName) // Joins room
  }

  return (
    <div className="room" onClick={joinRoom}>
      <div className="circle">
        <i className="fa fa-user" />
      </div>
      <div className="personInfo">
        <div>{name}</div>
        <div>{saying}</div>
      </div>
    </div>
  )
}

export default Room
