import React, { useEffect, useState } from "react"
import Dashboard from "./components/Dashboard"
import Register from "./components/Register"
import Login from "./components/Login"
import {
  Route,
  Switch,
  withRouter,
} from "react-router-dom"
import axios from "axios"
import Loading from "./components/Loading"
import uuid from "react-uuid"

const App = ({ history }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  useEffect(() => {
    ;(async () => {
      let isAuthenticated = await axios.get("/users/isauthenticated") // Getting isAuthenticated info
      setIsAuthenticated(isAuthenticated.data.isAuthenticated)
    })()
  }, [isAuthenticated])

  history.listen((location, action) => {
    setIsAuthenticated(null)
  })

  if (isAuthenticated === null || isAuthenticated === undefined)
    return <Loading />

  return (
    <Switch>
      <Route
        path="/"
        exact
        render={() => <Dashboard isAuthenticated={isAuthenticated} />}
        key={uuid()}
      />
      <Route
        path="/users/register"
        render={() => <Register isAuthenticated={isAuthenticated} />}
      />
      <Route
        path="/users/login"
        render={() => <Login isAuthenticated={isAuthenticated} />}
        key={uuid()}
      />
    </Switch>
  )
}

export default withRouter(App)
