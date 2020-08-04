import axios from 'axios'
import Cookies from 'universal-cookie'
import {observable} from 'mobx'

import config from '../config'
import {initializeStore} from '../store'

const cookies = new Cookies()
const store = initializeStore({})

const IS_LOGGED_IN = 'is_logged_in';
const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

class Auth {
  // @observable isAuthenticated = false;
  @observable profile = null

  isAuthenticated = () => {
    if (cookies.get(IS_LOGGED_IN) !== 'true') {
      return false
    }
    store.loadUserProfile()
    return true
  }

  login = async (email, password, returnUrl = '/') => {
    if (!email || !password) {
      return false
    }
    const params = new URLSearchParams()
    params.set('username', email)
    params.set('password', password)
    params.set('grant_type', 'password')
    params.set('scope', config.defaultScope)

    const headers = {
      Authorization: `Basic ${btoa(
        `${config.clientId}:${config.clientSecret}`
      )}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }

    try {
      const resp = await axios.post(`${config.AUTH_BASE}/token`, params, {
        headers,
      })
      const {access_token, refresh_token} = resp.data
      cookies.set(ACCESS_TOKEN, access_token)
      cookies.set(REFRESH_TOKEN, refresh_token)

      cookies.set(IS_LOGGED_IN, 'true')

      const authHeader = {
        Authorization: `Bearer ${access_token}`,
      }
      const profileResp = await axios.post(
        `${config.AUTH_BASE}/userinfo`,
        {token: access_token},
        {headers: authHeader}
      )
      store.profile = profileResp.data

      return true
    } catch (e) {
      //
      console.log(e)
      // return false;
      throw e
    }
  }

  logout = async () => {
    cookies.remove(IS_LOGGED_IN)
    cookies.remove(ACCESS_TOKEN)
    cookies.remove(REFRESH_TOKEN)
  }
}

const auth = new Auth()

export default auth
