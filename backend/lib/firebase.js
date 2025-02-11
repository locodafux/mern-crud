import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, query, getDocs, collection, updateDoc, deleteDoc,orderBy, limit } from 'firebase/firestore';
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
    const q = query(collection(db, collectionName), orderBy("id", "desc"), limit(1));
    const snapshot = await getDocs(q);
    return snapshot.empty ? 1 : snapshot.docs[0].data().id + 1;
  };

const uploadProcessedData = async (collectionName, data) => {
  try {
    const documentId = await getNextId(collectionName);
    const documentRef = doc(db, collectionName, documentId.toString());
    await setDoc(documentRef, data, { merge: true });

    return { message: "Data saved successfully."};

  } catch (error) {

    return { message: "Failed to save data.", error};
  };
};

const getCollection = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    
    return data;
  } catch (error) {
    console.error("Error fetching collection:", error);
    throw new Error("Could not fetch collection data.");
  }
};

const editDocument = async (collectionName, id, data) => {
  try {
    const documentRef = doc(db, collectionName, id);
    await updateDoc(documentRef, data);

    return { message: id +  " updated successfully" } 
  } catch (error) {

    return { message: "Failed to update data", error}
  }
}

const deleteDocument = (collectionName, id) =>  {
    try {
    const documentRef = doc(db, collectionName, id);
    deleteDoc(documentRef);
    return { message: "Data has been deleted successfully" }
    } catch (error) {
    return { message: "Failed to delete data", error }
    }
}

const getFirebaseApp = () => app;

export { app, getFirebaseApp, uploadProcessedData, getCollection, editDocument, deleteDocument };
