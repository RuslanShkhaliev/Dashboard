import Vue from 'vue';
import axios from "axios";
import {notify} from "./notifiy";

const config = {
  // eslint-disable-next-line no-undef
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 30000,
    validateStatus(status) {
        return status < 500
    }
}

const _axios = axios.create(config);
_axios.interceptors.response.use(
    (response) => {
        if (response.status !== 200) {
            notify({text: response, type: "error"})
            return
        }
        return response
    },error => Promise.reject(error)
)

class AxiosPlugin {
    install() {
        Object.defineProperties(Vue.prototype, {
            axios: {
              get() {
                  return _axios
              }
            },
            $axios: {
                get() {
                    return _axios
                }
            }
        })
    }
}

const axiosPlugin = new AxiosPlugin();

Vue.use(axiosPlugin)

export default axiosPlugin
export const $axios = _axios
