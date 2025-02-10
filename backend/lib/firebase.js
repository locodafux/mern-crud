import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import * as dotenv from 'dotenv';

dotenv.config();

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

const getNextId = async (collectionName) => {
  const counterRef = doc(db, "metadata", collectionName+"_counter");

  try {
    const counterSnap = await getDoc(counterRef);
    let newId = 1;

    if (counterSnap.exists()) {
      const currentId = counterSnap.data().lastId;
      newId = currentId + 1;
    }

    await setDoc(counterRef, { lastId: newId }, { merge: true });

    return newId;
  } catch (error) {
    console.error("Error fetching counter:", error);
    throw new Error("Could not generate document ID.");
  }
};

const uploadProcessedData = async (collectionName, data) => {
  try {
    const documentId = await getNextId(collectionName);
    const documentRef = doc(db, collectionName, documentId.toString());

    await setDoc(documentRef, data, { merge: true });

    return { message: "Data uploaded successfully.", documentId };
  } catch (error) {
    console.error("Error uploading data:", error);
    return { message: "Error uploading data", error };
  }
};

const getFirebaseApp = () => app;

export { app, getFirebaseApp, uploadProcessedData };
