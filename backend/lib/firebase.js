// Import Firebase functions
import { initializeApp } from 'firebase/app';  // For initializing Firebase app
import { getFirestore, doc, setDoc, Timestamp } from 'firebase/firestore';  // For Firestore operations
import * as dotenv from 'dotenv';

dotenv.config()

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const uploadProcessedData = async () => {
  const dataToUpload = {
    key1: "test",
    createdAt: Timestamp.fromDate(new Date()) 
  };

  const documentRef = doc(db, collectionName, documentId);

  try {
    await setDoc(documentRef, dataToUpload, { merge: true });
    console.log("Data uploaded successfully.");
  } catch (error) {
    console.error("Error uploading data:", error);
  }
};

// Helper function to retrieve Firebase app
const getFirebaseApp = () => app;

export { app, getFirebaseApp, uploadProcessedData };
