import React, { useState } from "react"
import { NavLink, BrowserRouter as Router } from "react-router-dom"
import AddRoomModal from "./AddRoomModal"

const Navbar = () => {
  const [addRoom, setAddRoom] = useState(false)

  return (
    <Router>
      <nav>
        <div className="left">
          <NavLink to="/">SprinkaiChat</NavLink>
        </div>
        <div className="right">
          <i className="fa fa-plus" onClick={() => setAddRoom((prev) => !prev)} />
          {addRoom ? <AddRoomModal /> : null}
          <i className="fa fa-sign-in" />
          <i className="fa fa-user" />
        </div>
      </nav>
    </Router>
  )
}

export default Navbar
