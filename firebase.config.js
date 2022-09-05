import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyD9sZzrqJejAYtZx8_fUZZDQf-N_gF8jH4",
  authDomain: "deploy-app-bb8cd.firebaseapp.com",
  projectId: "deploy-app-bb8cd",
  storageBucket: "deploy-app-bb8cd.appspot.com",
  messagingSenderId: "56485919433",
  appId: "1:56485919433:web:a8f05052216269e7722b18"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }
