import React, { useEffect, useState } from "react"
import "../App.css"
import axios from "axios"
import io from "socket.io-client"
import Friend from "./Friend"

const socket = io.connect("http://localhost:4200/")

const Friends = () => {
  let [friends, setFriends] = useState([])
  
  useEffect(() => {
    /* (async () => {
      let friends = await axios.get("/users/friends")
      
      setFriends(friends)
    })() */
    
    socket.emit("joinRoom", 35)
    
    socket.on("joinRoom", number => console.log(36))
  }, [])


  return (
    <div className="friends">
      <Friend />
    </div>
  )
}

export default Friends
