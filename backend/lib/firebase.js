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
  try {
    const q = query(collection(db, collectionName), orderBy("id", "desc"), limit(1));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return 1; // Start from 1 if no documents exist
    }

    const latestDoc = snapshot.docs[0].data();
    return latestDoc.id ? latestDoc.id + 1 : 1; // Ensure id exists before incrementing

  } catch (error) {
    console.error("Error getting next ID:", error);
    throw error; // Ensure errors are properly handled
  }
}; 

const uploadProcessedData = async (collectionName, data) => {
  try {
    const documentId = await getNextId(collectionName);
    const documentRef = doc(db, collectionName, documentId.toString());
    
    await setDoc(documentRef, { ...data, id: documentId }, { merge: true });

    return { message: "Data saved successfully.", id: documentId };

  } catch (error) {
    console.error("Error saving data:", error);
    return { message: "Failed to save data.", error };
  }
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
