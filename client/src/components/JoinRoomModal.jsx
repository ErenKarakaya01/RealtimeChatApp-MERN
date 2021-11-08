import React, { useState } from "react"
import useErrors from "../hooks/useErrors"
import axios from "axios"

const JoinRoomModal = ({ display, setDisplay }) => {

  // Contains form input values
  const [form, setForm] = useState({
    room: "",
  })

  // Alerts
  const [errors, setErrors] = useErrors([])

  // Handles change for any input field
  const handleChange = (event) => {
    let name = event.target.name
    let value = event.target.value

    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let res = await axios.post("/rooms/joinroom", form)

    if (res.data.isPostSuccessful)
      window.location.reload()
    else setErrors(res.data.errors)
  }


  if (!display) return null

  return (
    <div className="modal">
      <div className="errorBox">{errors}</div>
      <form className="modalInputs" onSubmit={handleSubmit}>
        <div id="closeIcon"><i className="fa fa-times" onClick={() => setDisplay((prev) => !prev)} /></div>
        <div>
          <input placeholder="Room Id" name="room" onChange={handleChange} />
        </div>
        <div className="submitButton">
          <button className="btn btn-gradient" type="submit">
            Join Room
          </button>
        </div>
      </form>
    </div>
  )
}

export default JoinRoomModal