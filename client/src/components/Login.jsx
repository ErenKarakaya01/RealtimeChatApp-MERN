import React, { useState } from "react"
import axios from "axios"
import { Redirect } from "react-router-dom"
import { UncontrolledAlert } from "reactstrap"
import nodejs from "../images/nodejs.png"

const Login = ({ isAuthenticated }) => {
  const [redirect, setRedirect] = useState(false)

  const [focused, setFocused] = useState(false)

  // Contains form input values
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  // Alerts
  const [errors, setErrors] = useState([])

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
    let res = await axios.post("/users/login", form)

    if (res.data.isLoggedIn) {
      // If logging is successful go to dashboard else show errors
      setErrors((prev) => [])
      setRedirect((prev) => true)
    } else {
      setErrors((prev) => [])
      setErrors((prev) =>
        res.data.errors.map((error) => (
          <UncontrolledAlert color="danger">{error}</UncontrolledAlert>
        ))
      )
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
  if (redirect) return <Redirect to="/" /> // If submit is successful redirect to dashboard

  return (
    <div className="form">
      {errors}
      <form id={focused ? "focused" : "notFocused"} onSubmit={handleSubmit}>
        <div>
          <img src={nodejs} alt="nodejs" />
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
