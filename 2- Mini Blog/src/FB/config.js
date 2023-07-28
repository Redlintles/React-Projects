
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAmarnjEFJUVcCGmfoLt0zchnNlikOY8NU",
  authDomain: "miniblog-f7b3c.firebaseapp.com",
  projectId: "miniblog-f7b3c",
  storageBucket: "miniblog-f7b3c.appspot.com",
  messagingSenderId: "369169053139",
  appId: "1:369169053139:web:1dc295f5ad17c1d5372b26"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };

