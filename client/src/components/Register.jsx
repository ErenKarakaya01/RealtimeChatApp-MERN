import React, { useState } from "react"
import axios from "axios"
import { Redirect } from "react-router-dom"
import "../App.css"
import "../../node_modules/font-awesome/css/font-awesome.min.css"
import { Alert } from "reactstrap"

const Register = ({ isAuthenticated }) => {
  const [redirect, setRedirect] = useState(false)

  const [focused, setFocused] = useState(false)

  // Contains form input values
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  })

  // Alerts
  const [errors, setErrors] = useState([])

  const [visible, setVisible] = useState(true)
  const onDismiss = () => setVisible(false)

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
    let res = await axios.post("/users/register", form)

    if (res.data.isRegistered) { // If logging is successful go to login page else show errors
      setErrors((prev) => [])
      setRedirect((prev) => true)
    } else {
      setErrors((prev) =>
        res.data.errors.map((error) => (
          <Alert color="danger" isOpen={visible} toggle={onDismiss}>
            {error}
          </Alert>
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
  if (redirect) return <Redirect to="/users/login" /> // If submit is successful redirect to dashboard

  return (
    <div className="form">
      {errors}
      <form id={focused ? "focused" : "notFocused"} onSubmit={handleSubmit}>
        <div>
          <i className="fa fa-user" />
        </div>
        <table>
          <tbody>
            <tr>
              <th>
                <label htmlFor="name">Name:</label>
              </th>
              <td>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleFocusOut}
                />
              </td>
            </tr>
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
            <tr>
              <th>
                <label htmlFor="password2">Confirm Password:</label>
              </th>
              <td>
                <input
                  type="password"
                  id="password2"
                  name="password2"
                  placeholder="Confirm Password"
                  value={form.password2}
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
            Register
          </button>
        </div>
      </form>
    </div>
  )
}

export default Register
