import React, { useEffect, useState } from "react"
import axios from "axios"
import Room from "./Room"

const Rooms = ({ socket, userName }) => {
  let [rooms, setRooms] = useState([])
  
  useEffect(() => {
    (async () => {
      let res = await axios.get("/users/getrooms")
      
      if (res.data.rooms) {
        setRooms(res.data.rooms)
      }
    })()
    
  }, [])


  return (
    <div className="rooms">
      {
        rooms.map((room, i) => (
          <Room name={room.name} saying={room.saying} room={room._id} socket={socket ? socket : null} userName={userName} key={i} />
        ))
      }
    </div>
  )
}

export default Rooms
