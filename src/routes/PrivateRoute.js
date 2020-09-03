import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../context/auth'

function PrivateRoute({ component: Component, ...rest }) {

  // const [isLoggedIn, setLoggedIn] = useState(false)
  const { authToken, setAuthTokens } = useAuth()
  return  (
    <Route
      {...rest}
      render={(props) =>
        authToken ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}

export default PrivateRoute
