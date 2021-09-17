import React, { Fragment } from "react"
import Main from "./components/Main"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

const App = () => {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Main />
        </Switch>
      </Router>
    </Fragment>
  )
}

export default App
