import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import PropTypes from 'prop-types'
import session from './Session'


const ProtectedRoute = (props) => {
  const {component: Component, ...rest} = props
  return (
    <Route
      {...rest}
      render={props =>
        session.isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{pathname: '/login', state: {from: props.location}}}
          />
        )
      }
    />

  )
}

ProtectedRoute.propTypes = {component: PropTypes.any}

export default ProtectedRoute
