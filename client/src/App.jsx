import React, { Fragment, useEffect } from "react"
import Main from "./components/Main"
import Register from "./components/Register"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

const App = () => {
  useEffect(() => {
    console.log("something happened")
  })

  return (
    <Fragment>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
          <Route path="/users/register">
            <Register />
          </Route>
        </Switch>
      </Router>
    </Fragment>
  )
}

export default App
