import React from "react"

const ToMessage = ({ from, message, date }) => {
  return (
    <div className="toMessage">
      <div className="messageInfo">
        <div className="userName">{from}</div>
        <div>{date}</div>
      </div>
      <div>{message}</div>
    </div>
  )
}

export default ToMessage
