import React, { useState } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import "../App.css"
import "../../node_modules/font-awesome/css/font-awesome.min.css"

const Login = ({ isAuthenticated }) => {
  let history = useHistory()
  const [focused, setFocused] = useState(false)
  const [form, setForm] = useState({
    // Contains form input values
    email: "",
    password: "",
  })

  const handleChange = (event) => {
    // Handles change for any input field
    let name = event.target.name
    let value = event.target.value

    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let res = await axios.post("/users/login", form)
    console.log(res.data.isLoggedIn)
    if (res.data.isLoggedIn) {
      history.push("../")
    }
  }

  // Toggling focused value
  const handleFocus = (e) => {
    if (!focused) setFocused((prevFocused) => !focused)
  }

  const handleFocusOut = (e) => {
    if (focused) setFocused((prevFocused) => !focused)
  }

  if (isAuthenticated) history.push("/") // Is authenticated

  return (
    <div className="form">
      <form id={focused ? "focused" : "notFocused"} onSubmit={handleSubmit}>
        <div>
          <i className="fa fa-user" />
        </div>
        <table>
          <tbody>
            <tr>
              <th>
                <label htmlFor="email">E-mail:</label>
              </th>
              <td>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleFocusOut}
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="password">Password:</label>
              </th>
              <td>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleFocusOut}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="submitButton">
          <button className="btn btn-gradient" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
