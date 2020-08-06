import { action, observable } from 'mobx';
import axios from 'axios';
import config from './config';

class Store {
  constructor(initialData = {}) {}

  @observable sidebarShow = 'responsive';
  @observable profile = null;

  @action
  setSidebarShow(val) {
    this.sidebarShow = val;
  }

  loadUserProfile = () => {
    axios.get(config.USERINFO_URL).then((res) => (this.profile = res.data));
  };
}

let store = null;

export function initializeStore(initialData) {
  if (store === null) {
    store = new Store(initialData);
  }

  return store;
}
