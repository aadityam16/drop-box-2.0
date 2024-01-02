import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAKVK9LbkJb5a6nW0znwETithxM_78xTZk",
  authDomain: "file-sharing-app-2628f.firebaseapp.com",
  projectId: "file-sharing-app-2628f",
  storageBucket: "file-sharing-app-2628f.appspot.com",
  messagingSenderId: "683674423227",
  appId: "1:683674423227:web:88922555a0780fc5f93e9e",
  measurementId: "G-5ZK3HGKN59",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
