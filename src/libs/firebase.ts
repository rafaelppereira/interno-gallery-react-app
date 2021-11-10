import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_FIREBASE_APIID
// };

const firebaseConfig = {
  apiKey: "AIzaSyCSvmV5VCqGFP2X8Jg1YLa791X6AEhbhas",
  authDomain: "gallery-exiospace.firebaseapp.com",
  projectId: "gallery-exiospace",
  storageBucket: "gallery-exiospace.appspot.com",
  messagingSenderId: "823276877007",
  appId: "1:823276877007:web:a70f6c3abb00e566dff3ba"
};

const firebaseApp = initializeApp(firebaseConfig);

export const storage = getStorage(firebaseApp);