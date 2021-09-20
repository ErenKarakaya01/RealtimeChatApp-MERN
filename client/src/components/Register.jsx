import React, { useState } from "react"
import axios from "axios"

const Register = () => {
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

  return (
    <div className="register">
      <form className="registerForm" onSubmit={handleSubmit}>
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
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Register
