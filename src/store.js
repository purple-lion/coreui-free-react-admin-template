import { action, observable } from "mobx";
import Cookies from "universal-cookie";
import axios from "axios";

class Store {
  constructor(initialData = {}) {}

  @observable sidebarShow = "responsive";

  @action
  setSidebarShow(val) {
    this.sidebarShow = val;
  }
}

let store = null;

export function initializeStore(initialData) {
  if (store === null) {
    store = new Store(initialData);
  }

  return store;
}
