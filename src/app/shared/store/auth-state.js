import {firebaseApi} from "../services/firebase/firebaseApi";
import {notify} from "../../../plugins/notifiy";
import {router} from "../../config";

const TOKEN_KEY = "user-token";

export const auth = {
  state: {
    token: null,
    user: null,
  },
  getters: {
    isAuthenticated: state => !!state.user
  },
  mutations: {
    SET_STATE(state, {user, token}) {
      state.token = token
      state.user = user
    },
    CLEAR_STATE(state) {
      state.user = null
      state.token = null
    }
  },
  actions: {
    async auth({commit}, [type, ...emailAndPassword]) {
      try {
        const {user} = await firebaseApi.auth(type, emailAndPassword)
        const {email, uid, photoURL, phoneNumber, displayName, za: token} = user;
        commit("SET_STATE", {
          user: {email, uid, photoURL, phoneNumber, displayName},
          token
        })
        localStorage.setItem(TOKEN_KEY, token)
        notify({title: `Successful ${type}`})
      } catch (err) {
        notify({text: err.message, type: "error", position: "left bottom"})
        throw err
      }
    },
    logout({commit}) {
      commit("CLEAR_STATE")
      localStorage.removeItem(TOKEN_KEY);
      router.replace("/")
      notify({type: "info", title: "You are logged out"})
    },
  },
}
