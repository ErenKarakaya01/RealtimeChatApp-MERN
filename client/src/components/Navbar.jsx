import React, { useState } from "react"
import { NavLink, BrowserRouter as Router } from "react-router-dom"
import AddRoomModal from "./AddRoomModal"
import JoinRoomModal from "./JoinRoomModal"

const Navbar = () => {
  const [addRoom, setAddRoom] = useState(false)
  const [joinRoom, setJoinRoom] = useState(false)

  return (
    <Router>
      <nav>
        <div className="left">
          <NavLink to="/">SprinkaiChat</NavLink>
        </div>
        <div className="right">
          <i className="fa fa-plus" onClick={() => setAddRoom((prev) => !prev)} />
          <AddRoomModal display={addRoom} setDisplay={setAddRoom} />
          <i className="fa fa-sign-in" onClick={() => setJoinRoom((prev) => !prev)} />
          <JoinRoomModal display={joinRoom} setDisplay={setJoinRoom} />
          <i className="fa fa-user" />
        </div>
      </nav>
    </Router>
  )
}

export default Navbar
