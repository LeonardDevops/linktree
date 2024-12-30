
import { initializeApp } from "firebase/app";
import { getFirestore  } from "firebase/firestore";
import {getAuth  } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAveC7vLja-bdp8mEReeMJxBJTiErFeZuI",
  authDomain: "reactlinks-980d3.firebaseapp.com",
  projectId: "reactlinks-980d3",
  storageBucket: "reactlinks-980d3.firebasestorage.app",
  messagingSenderId: "795872586549",
  appId: "1:795872586549:web:171405696efa3dfc98ba7c"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const  db = getFirestore(app);

export { auth , db}
