import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyAHcVxS20-0xM6-hX-MObrkU8mTKMh5d7w",
  authDomain: "asifdiplom.firebaseapp.com",
  databaseURL: "https://asifdiplom-default-rtdb.firebaseio.com",
  projectId: "asifdiplom",
  storageBucket: "asifdiplom.appspot.com",
  messagingSenderId: "520174617312",
  appId: "1:520174617312:web:b0877bb22cfd18bffe0685",
  measurementId: "G-Q7WLXW97DG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export var database = getDatabase(app)