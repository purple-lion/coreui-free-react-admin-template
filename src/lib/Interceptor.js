import axios from 'axios'
import config from "../config";
import session from "./Session"
import {redirectToLoginPage} from "./history";


axios.interceptors.request.use(
  cfg => {
    if (cfg.url === config.TOKEN_URL) {
      return cfg
    } else if (
      cfg.url.startsWith(config.API_BASE) || cfg.url.startsWith(config.USERINFO_URL)
    ) {
      cfg.headers['authorization'] = `Bearer ${(session.getAccessToken())}`
    }

    return cfg
  },
)
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    let errResponseStatus = null
    const originalRequest = error.config
    const TOKEN_URL = config.TOKEN_URL

    try {
      errResponseStatus = error.response.status
    } catch (e) {
    }

    if (
      originalRequest.url === TOKEN_URL
    ) {
      console.log('TOKEN REQUEST ERROR')
    }

    if (
      (error.message === "Network Error" || 401 === errResponseStatus)
      && !originalRequest._retry
    ) {
      const refreshToken = session.getRefreshToken()
      originalRequest._retry = true;

      if (refreshToken) {
        const headers = {
          Authorization: `Basic ${btoa(`${config.clientId}:${config.clientSecret}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        }
        const params = new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        })

        return axios.post(
          config.TOKEN_URL, params.toString(), {headers}
        ).then(
          res => {
            const {access_token, refresh_token} = res.data
            session.setAccessToken(access_token)
            session.setRefreshToken(refresh_token)
            originalRequest.headers.authorization = `Bearer ${access_token}`

            return axios(originalRequest)
          }
        ).catch(
          error => {
            session.logout()
            return redirectToLoginPage()
          }
        )
      }

      return Promise.reject(error)
    }
    Promise.reject(error);
  }
)
