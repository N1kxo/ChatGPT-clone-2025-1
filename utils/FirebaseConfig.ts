// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDH4ae38Q7xjaDd7gwfHxYNFCjhX8R5snc",
  authDomain: "nikx-chatgpt-2025-1.firebaseapp.com",
  projectId: "nikx-chatgpt-2025-1",
  storageBucket: "nikx-chatgpt-2025-1.firebasestorage.app",
  messagingSenderId: "968514878450",
  appId: "1:968514878450:web:82c9af0935c9f86ed0896b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);