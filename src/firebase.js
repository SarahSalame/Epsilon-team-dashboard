import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYRmfnD6wmYqZosNBj_TmGgri5CFSjwkQ",
  authDomain: "teamtasks-91c2e.firebaseapp.com",
  projectId: "teamtasks-91c2e",
  storageBucket: "teamtasks-91c2e.appspot.com",
  messagingSenderId: "348614043098",
  appId: "1:348614043098:web:44f59878c0c308011c8ce3",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
