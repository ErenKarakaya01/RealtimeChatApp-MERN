import React from "react"
import "../../node_modules/font-awesome/css/font-awesome.min.css"
import "../App.css"
import { NavLink, BrowserRouter as Router } from "react-router-dom"

const Navbar = () => {
  return (
    <Router>
      <nav>
        <div className="left">
          <NavLink to="/" >SprinkaiChat</NavLink>
        </div>
        <div className="right">
          <i className="fa fa-plus" />
          <i className="fa fa-sign-in" />
          <i className="fa fa-user-plus" />
          <i className="fa fa-user" />
        </div>
      </nav>
    </Router>
  )
}

export default Navbar
