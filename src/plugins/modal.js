import Vue from 'vue';
import {store} from "../app/store";

const openModal = (modalName, data = {}) => {
  store.dispatch("modal/setModal", {modalName, data})
}

Vue.prototype.$openModal = openModal;

export default openModal
