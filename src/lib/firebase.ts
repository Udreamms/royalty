import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getAuth } from "firebase/auth";

// Tus credenciales de Firebase para el lado del cliente (son seguras para exponer en el navegador)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Inicializa Firebase solo si aún no se ha inicializado
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Exporta los servicios de Firebase que usarás en tu aplicación de frontend
const db = getFirestore(app);
const functions = getFunctions(app);
const auth = getAuth(app);

export { app, db, auth, functions };