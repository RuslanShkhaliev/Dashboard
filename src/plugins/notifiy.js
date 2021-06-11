import Vue from 'vue';
import VueNotification from "vue-notification";
Vue.use(VueNotification)

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



