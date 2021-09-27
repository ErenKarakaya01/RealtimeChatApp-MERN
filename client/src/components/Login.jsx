import React, { useState } from "react"
import axios from "axios"
import { Redirect } from "react-router-dom"
import "../App.css"
import "../../node_modules/font-awesome/css/font-awesome.min.css"

const Login = ({ isAuthenticated }) => {
  const [redirect, setRedirect] = useState(false)
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
    
    if (res.data.isLoggedIn) {
      setFocused(true)
    }
  }

  // Toggling focused value
  const handleFocus = (e) => {
    if (!focused) setFocused((prevFocused) => !focused)
  }

  const handleFocusOut = (e) => {
    if (focused) setFocused((prevFocused) => !focused)
  }



  if (isAuthenticated) return <Redirect to="/" /> // Is authenticated
  if (isAuthenticated === null || isAuthenticated === undefined) return <div className="skeleton" /> // Skeleton loading effect
  if (redirect) return <Redirect to="/" /> // If submit is successful redirect to dashboard

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
