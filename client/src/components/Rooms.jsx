import React, { useEffect, useState } from "react"
import "../App.css"
import axios from "axios"
import Room from "./Room"

const Rooms = ({ socket }) => {
  let [rooms, setRooms] = useState([])
  
  useEffect(() => {
    /* (async () => {
      let friends = await axios.get("/users/friends")
      
      setFriends(friends)
    })() */
    
  }, [])


  return (
    <div className="rooms">
      <Room name="Eren" saying="sözler" room="1" socket={ socket ? socket : null } />
      <Room name="Adar" saying="sözler" room="2" socket={ socket ? socket : null } />
      <Room name="Yusuf" saying="sözler" room="3" socket={ socket ? socket : null } />
      <Room name="Serdar" saying="sözler" room="4" socket={ socket ? socket : null } />
    </div>
  )
}

export default Rooms
