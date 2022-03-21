import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';

export const firebaseConfig = {
    apiKey: "AIzaSyDTLpiH0GWWZ3GoLqCjgnFz23YXnvk5ct8",
    authDomain: "marvel-inv.firebaseapp.com",
    projectId: "marvel-inv",
    storageBucket: "marvel-inv.appspot.com",
    messagingSenderId: "899085489452",
    appId: "1:899085489452:web:ef4ab32d297baff9228889"
  };

  export const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app)
  export const db  = getFirestore(app);

