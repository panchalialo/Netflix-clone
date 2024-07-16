import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";
import { addDoc, collection, getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDyvVHJhOcAqXj9tg9gwhYvoNUYBwaq7SU",
  authDomain: "netflix-clone-7c113.firebaseapp.com",
  projectId: "netflix-clone-7c113",
  storageBucket: "netflix-clone-7c113.appspot.com",
  messagingSenderId: "262760754444",
  appId: "1:262760754444:web:6e3798f8566a3ee1a52d29",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.log(err);
    toast.error(err.code.split('/')[1].split('-').join(' '));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.log(err);
    toast.error(err.code.split('/')[1].split('-').join(' '));
  }
};

const logout = async () => {
  signOut(auth);
};

export { auth, db, login, signup, logout };
