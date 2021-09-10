import React from "react"
import "../App.css"

const Friend = ({ name, saying }) => {
  return (
    <div className="friend">
      <div className="circle">
        <i className="fa fa-user" />
      </div>
      <div className="personInfo">
        <div>{ name }</div>
        <div>{ saying }</div>
      </div>
    </div>
  )
}

export default Friend
