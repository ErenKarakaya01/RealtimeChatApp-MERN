import React, { useState, useEffect, useContext } from "react"
import axios from "axios"
import { Redirect } from "react-router-dom"
import Loading from "./Loading"
import { RefreshContext } from "./contexts/RefreshContext"

const Logout = ({ isAuthenticated }) => {
  const [redirect, setRedirect] = useState(false)
  const { refresh, setRefresh } = useContext(RefreshContext)

  useEffect(() => {
    ;(async () => {
      await axios.get("/users/logout")

      setRedirect((prev) => true)
    })()
  }, [])

  // Is authenticated
  if (redirect) {
    setRefresh((prev) => !prev)
    return <Redirect to="/users/login" />
  }
  else return <Loading />
}

export default Logout
