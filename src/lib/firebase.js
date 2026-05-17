import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Firebase configuration using environment variables with default test fallbacks
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDEl-fF_7-Wc192_fake_api_key_test",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "drivefleet-auth-app.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "drivefleet-auth-app",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "drivefleet-auth-app.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "103984592032",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:103984592032:web:9c6c8e312bc85c5432d84a"
};

// Initialize Firebase App only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Force Google Account Picker selection dialog on every sign-in attempt
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
