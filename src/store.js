import {action, observable} from "mobx";
import Cookies from "universal-cookie";
import axios from "axios";
import config from "./config"

class Store {
  constructor(initialData = {}) {
  }

  @observable sidebarShow = "responsive";
  @observable profile = null

  @action
  setSidebarShow(val) {
    this.sidebarShow = val;
  }

  loadUserProfile = async () => {
    const cookies = new Cookies()
    const accessToken = cookies.get('access_token')

    if (accessToken) {
      try {
        const res = await axios.get(config.USERINFO_URL,)
        this.profile = res.data
      } catch (e) {
        console.log(e)
      }
    }
  }
}

let store = null;

export function initializeStore(initialData) {
  if (store === null) {
    store = new Store(initialData);
  }

  return store;
}
