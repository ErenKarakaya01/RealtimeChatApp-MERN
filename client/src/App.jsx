import React, { useEffect, useState } from "react"
import Dashboard from "./components/Dashboard"
import Register from "./components/Register"
import Login from "./components/Login"
import Logout from "./components/Logout"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import axios from "axios"
import Loading from "./components/Loading"
import { RefreshContext } from "./components/contexts/RefreshContext"

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  // Context value
  const [refresh, setRefresh] = useState(false)
  const value = { refresh, setRefresh }

  useEffect(() => {
    ;(async () => {
      let isAuthenticated = await axios.get("/users/isauthenticated") // Getting isAuthenticated info
      setIsAuthenticated(isAuthenticated.data.isAuthenticated)
    })()
  }, [isAuthenticated, refresh])

  if (isAuthenticated === null || isAuthenticated === undefined)
    return <Loading />

  return (
    <RefreshContext.Provider value={value}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Dashboard isAuthenticated={isAuthenticated} />
          </Route>
          <Route path="/users/register">
            <Register isAuthenticated={isAuthenticated} />
          </Route>
          <Route path="/users/login">
            <Login isAuthenticated={isAuthenticated} />
          </Route>
          <Route path="/users/logout">
            <Logout isAuthenticated={isAuthenticated} />
          </Route>
        </Switch>
      </Router>
    </RefreshContext.Provider>
  )
}

export default App
