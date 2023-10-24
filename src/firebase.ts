import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyDJLTSOi7VjGZ3IYRPak2yfBZIee20nbrw",
  authDomain: "perfume-website-58714.firebaseapp.com",
  projectId: "perfume-website-58714",
  storageBucket: "perfume-website-58714.appspot.com",
  messagingSenderId: "549051584716",
  appId: "1:549051584716:web:b72494bb16d0f71552f269",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage()

