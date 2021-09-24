import React, { Fragment, useEffect, useState } from "react"
import "../App.css"
import io from "socket.io-client"
import Rooms from "./Rooms"
import Chat from "./Chat"
import Navbar from "./Navbar"

const Main = () => {
  const [socket, setSocket] = useState()

  useEffect(() => {
    const newSocket = io("http://localhost:8080")
    setSocket(newSocket) // Sets the socket

    return () => newSocket.close() // Closing the socket
  }, [])

  return (
    <Fragment>
      <Navbar />
      <div className="main">
        <Rooms socket={ socket ? socket : null } />
        <Chat socket={ socket ? socket : null } />
      </div>
    </Fragment>
  )
}

export default Main
