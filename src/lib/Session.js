import axios from 'axios';
import Cookies from 'universal-cookie';

import config from '../config';
import { initializeStore } from '../store';

const cookies = new Cookies();
const store = initializeStore();

const KEY_IS_LOGGED_IN = 'is_logged_in';
const KEY_ACCESS_TOKEN = 'access_token';
const KEY_REFRESH_TOKEN = 'refresh_token';

class Session {
  isAuthenticated = () => {
    if (cookies.get(KEY_IS_LOGGED_IN) !== 'true') {
      return false;
    }

    store.loadUserProfile();
    return true;
  };

  login = async (email, password) => {
    if (!email || !password) {
      return false;
    }
    const params = new URLSearchParams({
      username: email,
      password: password,
      grant_type: 'password',
      scope: config.defaultScope,
    });
    const headers = {
      authorization: `Basic ${btoa(
        `${config.clientId}:${config.clientSecret}`,
      )}`,
    };

    try {
      const resp = await axios.post(config.TOKEN_URL, params, { headers });
      const { access_token, refresh_token } = resp.data;

      this.setAccessToken(access_token);
      this.setRefreshToken(refresh_token);
      this.setIsLoggedIn('true');

      const profileResp = await axios.post(config.USERINFO_URL);
      store.profile = profileResp.data;

      return true;
    } catch (e) {
      console.log(e);
    }
  };

  logout = () => {
    const keysToRemove = [
      KEY_ACCESS_TOKEN,
      KEY_REFRESH_TOKEN,
      KEY_IS_LOGGED_IN,
    ];
    keysToRemove.forEach((key, idx) => {
      try {
        cookies.remove(key);
      } catch (e) {}
    });
  };

  getAccessToken = () => {
    return cookies.get(KEY_ACCESS_TOKEN);
  };

  getRefreshToken = () => {
    return cookies.get(KEY_REFRESH_TOKEN);
  };

  setAccessToken = (token) => {
    return cookies.set(KEY_ACCESS_TOKEN, token);
  };

  setRefreshToken = (token) => {
    return cookies.set(KEY_REFRESH_TOKEN, token);
  };

  setIsLoggedIn = (val) => {
    cookies.set(KEY_IS_LOGGED_IN, val);
  };
}

const session = new Session();

export default session;
