import React, { useState, useRef } from "react"
import axios from "axios"
import "../App.css"
import "../../node_modules/font-awesome/css/font-awesome.min.css"

const Register = () => {
  const [focused, setFocused] = useState(false)
  const [boxShadow, setBoxShadow] = useState({
    boxShadow: "0 0 3em 0 rgba(146, 221, 255, 0.651)",
  })
  const formRef = useRef(null)
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  })

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
    console.log(res.data)
    if (!res.data.isRegistered) {
      console.log(res)
    }
  }

  const handleFocus = (e) => {
    if (!focused) {
      setFocused((prevFocused) => !focused)
      setBoxShadow({
        transition: "all 1s ease-in-out forwards",
        boxShadow: "inset 0 0 3em 0 rgba(146, 221, 255, 0.651)",
      })
    }
  }

  const handleFocusOut = (e) => {
    if (focused) {
      setFocused((prevFocused) => !focused)
      setBoxShadow({
        transition: "all 1s ease-in-out forwards",
        boxShadow: "0 0 3em 0 rgba(146, 221, 255, 0.651)",
      })
      setTimeout(() => {
        formRef.current.style = boxShadow
      }, 20)
    }
  }

  return (
    <div className="register">
      <form
        ref={formRef}
        id={focused ? "focused" : "notFocused"}
        onSubmit={handleSubmit}
      >
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
