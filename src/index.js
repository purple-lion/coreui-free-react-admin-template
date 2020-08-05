import "react-app-polyfill/ie11"; // For IE 11 support
import "react-app-polyfill/stable";
import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import {icons} from "./assets/icons";

import {Provider} from "mobx-react";
import {initializeStore} from "./store";
import axios from "axios"
import auth from "./lib/Auth"
import config from "./config"
import Cookies from 'universal-cookie'

const store = initializeStore({});


React.icons = icons;

// import config from "./config"
// import auth from "./lib/Auth"

const cookies = new Cookies()
axios.interceptors.request.use(
  cfg => {
    // const token = auth.
    console.log('---- config -----')
    console.log(cfg)

    if (cfg.url.startsWith(config.API_BASE)) {
      console.log('API REQUEST', cfg.url)
    } else if (cfg.url.startsWith(config.AUTH_BASE)) {
      console.log('AUTH REQUEST', cfg.url)
    } else {
      console.log('ETC REQUEST', cfg.url)
    }

    return cfg

  },
)
axios.interceptors.response.use((response) => {
    return response
  },
  error => {
    console.log('------- interceptors.response.user --- axios error --------')
    const originalRequest = error.config
    const TOKEN_ENDPOINT = `${config.AUTH_BASE}/token`

    console.log(JSON.stringify(error))
    console.log('originalRequest._retry', originalRequest._retry)

    if (
      error.message === "Network Error"
      && originalRequest.url === TOKEN_ENDPOINT
    ) {
      console.log('TOKEN REQUEST ERROR')
      return Promise.reject(error);
    }

    if (
      error.message === "Network Error"
      && !originalRequest._retry
    ) {
      console.log('== refresh_token 획득 후 재시도 ==')
      originalRequest._retry = true;
      const refreshToken = cookies.get('refresh_token')
      if (refreshToken) {
        const headers = {
          Authorization: `Basic ${btoa(`${config.clientId}:${config.clientSecret}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        }
        const params = new URLSearchParams()
        params.set('grant_type', 'refresh_token')
        params.set('refresh_token', refreshToken)

        return axios.post(
          `${config.AUTH_BASE}/token`, params, {headers}
        ).then(
          res => {
            console.log(res.status, res)
            const {access_token, refresh_token} = res.data

            cookies.set('access_token', access_token)
            cookies.set('refresh_token', refresh_token)

            originalRequest.headers.authorization = `Bearer ${access_token}`
            return axios(originalRequest)
          }
        )
      }

      return Promise.reject(error)
    }
    Promise.reject(error);
  }
)


ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
