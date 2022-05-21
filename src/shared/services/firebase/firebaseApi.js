import {auth} from "./fireinit";

const REG_USER = "createUserWithEmailAndPassword",
  LOGIN = "signInWithEmailAndPassword"

export const firebaseApi = {
  auth: (type, formData) => {
    let method = type === 'registration' ? REG_USER : LOGIN;
    return auth[method](...formData)
  },
}
