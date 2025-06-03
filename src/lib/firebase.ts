import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqpdQgeF-n1YjX39KELMyKtuao8UEHJYs",
  authDomain: "viejo-sabroso.firebaseapp.com",
  projectId: "viejo-sabroso",
  storageBucket: "viejo-sabroso.firebasestorage.app",
  messagingSenderId: "23070398500",
  appId: "1:23070398500:web:85a5c9d925d94b2eda20b1",
  measurementId: "G-7RX1JG9KX4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
