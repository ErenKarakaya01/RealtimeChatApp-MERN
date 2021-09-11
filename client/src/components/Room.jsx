import React, { useEffect } from "react"
import "../App.css"
import io from "socket.io-client"

const socket = io.connect("http://localhost:4200/") // Socket.io connection

const Friend = ({ name, saying, room }) => {

  useEffect(() => {
    
  })

  const joinRoom = () => {
    socket.emit("joinRoom", room)
    console.log(room)
  }

  return (
    <div className="friend" onClick={ joinRoom }>
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

export default Friend
