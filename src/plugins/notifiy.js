import Vue from 'vue';
import VueNotification from "vue-notification";
Vue.use(VueNotification)

/**
 * input parameters of notification
 * @property {string} type as theme of notify
 * @property {string} title
 * @property {string} text - description of notify
 * @property {number} duration - display time
 * @property {string} group - data of modal
 * @property {object} position - data of modal
 */
export const notify =
    ({
         type = "success",
         title = "Notification",
         text = null,
         duration = 3000,
         group = "app",
         max = 8,
         position = "top right",
     }) => {
        return Vue.notify({
            title,
            type,
            text,
            duration,
            group,
            max:max,
            position,
        })
    }

Object.defineProperty(Vue.prototype, "$notify", {
    get() {
        return notify
    }
})



