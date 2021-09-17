import React from "react"

const Register = () => {
  return (
    <div className="register">
      <form className="registerForm">
        <table>
          <tr>
            <th>
              <label htmlFor="name">Name:</label>
            </th>
            <td>
              <input type="text" id="name" name="name" placeholder="Name" />
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="email">E-mail:</label>
            </th>
            <td>
              <input type="text" id="email" name="email" placeholder="Email" />
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
              />
            </td>
          </tr>
        </table>
      </form>
    </div>
  )
}

export default Register
