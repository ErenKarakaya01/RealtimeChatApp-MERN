import { useState } from "react"
import { UncontrolledAlert } from "reactstrap"

const useErrors = (defaultValue) => {
  const [errors, setErrors] = useState(defaultValue)

  const setAlerts = (errors) => {
    setErrors([])

    setErrors(
      errors.map((error, i) => (
        <UncontrolledAlert color="danger" key={i}>
          {error}
        </UncontrolledAlert>
      ))
    )
  }

  return [errors, setAlerts]
}

export default useErrors
