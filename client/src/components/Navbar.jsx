import React, { useState } from "react"
import { NavLink, BrowserRouter as Router } from "react-router-dom"
import AddRoomModal from "./AddRoomModal"
import JoinRoomModal from "./JoinRoomModal"
import ReactTooltip from "react-tooltip"

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
          <i
            className="fa fa-plus"
            data-tip
            data-for="registerTip1"
            onClick={() => setAddRoom((prev) => !prev)}
          />
          <AddRoomModal display={addRoom} setDisplay={setAddRoom} />
          <i
            className="fa fa-sign-in"
            data-tip
            data-for="registerTip2"
            onClick={() => setJoinRoom((prev) => !prev)}
            id="right-i"
          />
          <JoinRoomModal display={joinRoom} setDisplay={setJoinRoom} />

          <div className="logout">
            <a href="/users/logout">Logout</a>
          </div>

          <ReactTooltip id="registerTip1" place="bottom" effect="solid">
            Create Room
          </ReactTooltip>
          <ReactTooltip id="registerTip2" place="bottom" effect="solid">
            Join Room
          </ReactTooltip>
        </div>
      </nav>
    </Router>
  )
}

export default Navbar
