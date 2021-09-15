import React, { useEffect, useState } from "react"
import "../App.css"
import io from "socket.io-client"
import Rooms from "./Rooms"
import Chat from "./Chat"

const Main = () => {
  const [socket, setSocket] = useState()

  useEffect(() => {
    const newSocket = io("http://localhost:4200")
    setSocket(newSocket)

    return () => newSocket.close()
  }, [])

  return (
    <div className="main">
      <Rooms socket={ socket ? socket : null } />
      <Chat socket={ socket ? socket : null } />
    </div>
  )
}

export default Main
