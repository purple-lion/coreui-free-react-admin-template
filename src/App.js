import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import CouponsLayout from './containers/coupons/CouponsLayout';
import CoursesLayout from './containers/courses/CoursesLayout';
import UsersLayout from './containers/users/UsersLayout';

import './scss/style.scss';
import ProtectedRoute from './lib/ProtectedRoute';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

const mainRoutes = [
  {
    path: '/users',
    name: '회원',
    component: UsersLayout,
  },
  {
    path: '/courses',
    name: '강의',
    component: CoursesLayout,
  },
  {
    path: '/coupons',
    name: '쿠폰',
    component: CouponsLayout,
  },
  {
    path: '/',
    name: 'Home',
    component: TheLayout,
  },
];

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

class App extends Component {
  render() {
    return (
      <Router>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/login"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />
            <Route
              exact
              path="/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />
            <Route
              exact
              path="/404"
              name="Page 404"
              render={(props) => <Page404 {...props} />}
            />
            <Route
              exact
              path="/500"
              name="Page 500"
              render={(props) => <Page500 {...props} />}
            />
            {mainRoutes.map((el, idx) => {
              return (
                <ProtectedRoute
                  key={idx}
                  path={el.path}
                  name={el.name}
                  component={el.component}
                />
              );
            })}
          </Switch>
        </React.Suspense>
      </Router>
    );
  }
}

export default App;
