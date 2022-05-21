import Vue from 'vue';
import {store} from "../store";
/**
 * @property {string} modalName - name of modal
 * @property {object} data - data of modal
 */
const openModal = (modalName, data = {}) => {
  store.dispatch("modal/setModal", {modalName, data})
}

Vue.prototype.$openModal = openModal;

export default openModal
