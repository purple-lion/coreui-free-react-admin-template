import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import auth from './Auth'

// class PrivateRoute extends Component {
//   render() {
//     let { component: Component, ...rest } = this.props
//     return (
//       <Route
//         {...rest}
//         render={props =>
//           auth.isAuthenticated() ? (
//             <Component {...props} />
//           ) : (
//             <Redirect
//               to={{ pathname: '/login', state: { from: props.location } }}
//             />
//           )
//         }
//       />
//     )
//   }
// }

const PrivateRoute = (props) => {
    const { component: Component, ...rest } = props
  return (
      <Route
        {...rest}
        render={props =>
          auth.isAuthenticated() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          )
        }
      />

  )
}

PrivateRoute.propTypes = { component: PropTypes.any }

export default PrivateRoute
