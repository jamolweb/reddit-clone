// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: AIzaSyCZVGYZQb7LdBu3uyF7U8EY6x-TN6yY10s,
  authDomain: reddit-9f9fc.firebaseapp.com,
  projectId: reddit-9f9fc,
  storageBucket: reddit-9f9fc.appspot.com,
  messagingSenderId: 360667477106,
  appId: 1:360667477106:web:e979d9f6cd3cb7ab677eeb
};

// Initialize Firebase for SSR
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { app, db, auth, storage };
