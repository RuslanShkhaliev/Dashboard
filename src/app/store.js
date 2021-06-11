import Vue from "vue";
import Vuex from 'vuex';
import {auth} from "./shared/store/auth-state";
import {modal} from "./shared/modals/modals-state";

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  modules: {
    auth,
    modal
  }
})
