import React, { useEffect, useState } from "react"
import Dashboard from "./components/Dashboard"
import Register from "./components/Register"
import Login from "./components/Login"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom"
import axios from "axios"
import Loading from "./components/Loading"
import Logout from "./components/Logout"

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  useEffect(() => {
    ;(async () => {
      let isAuthenticated = await axios.get("/users/isauthenticated") // Getting isAuthenticated info
      setIsAuthenticated(isAuthenticated.data.isAuthenticated)
    })()
  }, [isAuthenticated])

  if (isAuthenticated === null || isAuthenticated === undefined)
    return <Loading />

  return (
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
  )
}

export default App
