import React, { useState } from "react"
import axios from "axios"
import useErrors from "../hooks/useErrors"

const AddRoomModal = ({ display, setDisplay }) => {
  // Contains form input values
  const [form, setForm] = useState({
    name: "",
    saying: "",
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

    let res = await axios.post("/rooms/createroom", form)

    if (res.data.isPostSuccessful)
      window.location.reload()
    else setErrors(res.data.errors)
  }

  if (!display) return null

  return (
    <div className="modal">
      <div className="errorBox">{errors}</div>
      <form className="modalInputs" onSubmit={handleSubmit} >
        <div id="closeIcon">
          <i
            className="fa fa-times"
            onClick={() => setDisplay((prev) => !prev)}
          />
        </div>
        <div className="inputs">
          <input placeholder="Name" name="name" onChange={handleChange} />
          <input placeholder="Saying" name="saying" onChange={handleChange} />
        </div>
        <div className="submitButton">
          <button className="btn btn-gradient" type="submit">
            Create Room
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddRoomModal
