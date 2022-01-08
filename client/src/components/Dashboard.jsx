import React, { Fragment, useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import io from "socket.io-client"
import Rooms from "./Rooms"
import Chat from "./Chat"
import Navbar from "./Navbar"
import Loading from "./Loading"
import axios from "axios"

const Dashboard = ({ isAuthenticated }) => {
  const [socket, setSocket] = useState(null)
  const [userName, setUserName] = useState("")

  useEffect(() => {
    ;(async () => {
      let { data } = await axios.get("/users/getname")
      setUserName(data.name)

      const newSocket = io("http://localhost:8080")
      setSocket(newSocket) // Sets the socket

      return () => newSocket.close() // Closing the socket
    })()
  }, [])

  if (!isAuthenticated) return <Redirect to="/users/login" /> // Is authenticated
  if (socket === null || socket === undefined) return <Loading />

  return (
    <Fragment>
      <Navbar />
      <div className="dashboard">
        <Rooms socket={socket} userName={userName} />
        <Chat socket={socket} userName={userName} />
      </div>
    </Fragment>
  )
}

export default Dashboard
