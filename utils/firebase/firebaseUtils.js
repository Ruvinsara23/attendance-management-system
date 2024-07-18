// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,signWithRedirect,signInWithPopup, GoogleAuthProvider,signInWithEmailAndPassword,signOut
} from 'firebase/auth'
import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore'





const firebaseConfig = {
  apiKey: "AIzaSyBtq2g1DDMqPnp3aJptJiRoKgfFzPlJcJg",
  authDomain: "attendance-management-sy-8bf91.firebaseapp.com",
  projectId: "attendance-management-sy-8bf91",
  storageBucket: "attendance-management-sy-8bf91.appspot.com",
  messagingSenderId: "375485891902",
  appId: "1:375485891902:web:4f61c1948f053f04d3586f",
  measurementId: "G-EZ6SVEHVJ8"
};





const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp );
const provider=new GoogleAuthProvider()

provider.setCustomParameters({
    prompt:'select_account'

})

export const db = getFirestore(firebaseApp);

export const auth =getAuth();

export const signInWithEmail=(email, password)=>signInWithEmailAndPassword(auth,email, password)


export const signInWithGooglePopup=()=>signInWithPopup(auth,provider)
export const logout = () => {
    return signOut(auth,provider);
  };