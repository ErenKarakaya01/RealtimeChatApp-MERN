import React, { useState, useEffect } from "react"
import axios from "axios"
import { Redirect } from "react-router-dom"
import Loading from "./Loading"

const Logout = ({ isAuthenticated, setIsAuthenticated }) => {
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    ;(async () => {
      await axios.get("/users/logout")

      setIsAuthenticated(null)
      setRedirect((prev) => true)
    })()
  }, [])

  // Is authenticated
  if (!isAuthenticated) return <Redirect to="/" />
  else if (redirect) return <Redirect to="/users/login" />
  else return <Loading />
}

export default Logout
