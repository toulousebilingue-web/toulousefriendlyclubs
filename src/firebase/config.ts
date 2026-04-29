'use client';

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// 1. On ajoute "export" pour que les autres fichiers voient la config
export const firebaseConfig = {
  apiKey: "AIzaSyAcsM39u87QQRSFZBl_7UplogIMmAqB8uE",
  authDomain: "toulousefriendlyclubs.firebaseapp.com",
  projectId: "toulousefriendlyclubs",
  storageBucket: "toulousefriendlyclubs.firebasestorage.app",
  messagingSenderId: "368764389397",
  appId: "1:368764389397:web:f430952b21f2524b5be61c",
  measurementId: "G-R72RJRTR7J"
};

// 2. Initialisation sécurisée pour éviter l'erreur "Firebase App already exists"
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// 3. On exporte "auth" pour que votre bouton de login puisse s'en servir
export const auth = getAuth(app);
export default app;