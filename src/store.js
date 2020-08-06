import { action, observable } from 'mobx';
import axios from 'axios';
import config from './config';

class Store {
  @observable sidebarShow = 'responsive';
  @observable profile = null;

  @action
  setSidebarShow(val) {
    this.sidebarShow = val;
  }

  loadUserProfile = () => {
    axios
      .get(config.USERINFO_URL)
      .then((res) => (this.profile = res.data))
      .catch((error) => {return})
    ;
  };
}

let store = null;

export function initializeStore() {
  if (store === null) {
    store = new Store();
  }

  return store;
}
