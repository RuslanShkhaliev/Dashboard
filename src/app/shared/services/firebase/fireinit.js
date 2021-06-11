import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/storage'

const config = {
  apiKey: "AIzaSyA_EdaXKzEQ_Yg1YnAl8ikzQDooFirlTis",
  authDomain: "interview-5ac2c.firebaseapp.com",
  projectId: "interview-5ac2c",
};
!firebase.apps.length ? firebase.initializeApp(config) : ''

export const auth = firebase.auth()
export default firebase


