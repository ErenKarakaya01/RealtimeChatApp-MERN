import React from "react"

const FromMessage = ({ from, message, date }) => {
  return (
    <div className="fromMessage">
      <div className="messageInfo">
        <div className="userName">{from}</div>
        <div>{date}</div>
      </div>
      <div>{message}</div>
    </div>
  )
}

export default FromMessage
