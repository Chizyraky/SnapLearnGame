import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrmSXzBa4x9mxDHYQUDD9lr3eKQ-6okQk",
  authDomain: "snaplearngame.firebaseapp.com",
  projectId: "snaplearngame",
  storageBucket: "snaplearngame.appspot.com",
  messagingSenderId: "605807356757",
  appId: "1:605807356757:web:bcb2008a7b252a269fdddc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Get a reference to the database service
export const db = getFirestore(app);

// Get a reference to the Auth service
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
