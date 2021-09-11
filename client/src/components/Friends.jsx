import React, { useEffect, useState } from "react"
import "../App.css"
import axios from "axios"
import Room from "./Room"

const Friends = () => {
  let [friends, setFriends] = useState([])
  
  useEffect(() => {
    /* (async () => {
      let friends = await axios.get("/users/friends")
      
      setFriends(friends)
    })() */
    
  }, [])


  return (
    <div className="friends">
      <Room name="Eren" saying="sözler" room="1" />
      <Room name="Adar" saying="sözler" room="2" />
      <Room name="Yusuf" saying="sözler" room="3" />
      <Room name="Serdar" saying="sözler" room="4" />
    </div>
  )
}

export default Friends
