import React, { Fragment, useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import "../App.css"
import io from "socket.io-client"
import Rooms from "./Rooms"
import Chat from "./Chat"
import Navbar from "./Navbar"

const Dashboard = ({ isAuthenticated }) => {
  
  const [socket, setSocket] = useState()
  
  useEffect(() => {
    const newSocket = io("http://localhost:8080")
    setSocket(newSocket) // Sets the socket
    
    return () => newSocket.close() // Closing the socket
  }, [])

  
  
  if (!isAuthenticated) return <Redirect to="/users/login" /> // Is authenticated
  if (isAuthenticated === null || isAuthenticated === undefined) return <div className="skeleton" /> // Skeleton loading effect

  return (
    <Fragment>
      <Navbar />
      <div className="dashboard">
        <Rooms socket={ socket ? socket : null } />
        <Chat socket={ socket ? socket : null } />
      </div>
    </Fragment>
  )
}

export default Dashboard
