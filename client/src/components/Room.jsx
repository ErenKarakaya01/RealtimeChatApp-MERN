import React, { useEffect } from "react"
import "../App.css"

const Room = ({ name, saying, room, socket }) => {

  useEffect(() => {
    
  })

  const joinRoom = () => {
    if (socket !== null || socket !== undefined) {
      socket.emit("joinRoom", room)
      console.log(room)
    }
  }

  return (
    <div className="room" onClick={ joinRoom }>
      <div className="circle">
        <i className="fa fa-user" />
      </div>
      <div className="personInfo">
        <div>{ name }</div>
        <div>{ saying }</div>
      </div>
    </div>
  )
}

export default Room
