import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0Y3efMe6xawlyFKpQ0gZGs6zOkNwO-Jk",
  authDomain: "silent-auction-app-5a16e.firebaseapp.com",
  projectId: "silent-auction-app-5a16e",
  storageBucket: "silent-auction-app-5a16e.firebasestorage.app",
  messagingSenderId: "487089786960",
  appId: "1:487089786960:web:c904d9cc4441ed12400155"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// firebase copied code from here
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyA0Y3efMe6xawlyFKpQ0gZGs6zOkNwO-Jk",
//   authDomain: "silent-auction-app-5a16e.firebaseapp.com",
//   projectId: "silent-auction-app-5a16e",
//   storageBucket: "silent-auction-app-5a16e.firebasestorage.app",
//   messagingSenderId: "487089786960",
//   appId: "1:487089786960:web:c904d9cc4441ed12400155"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);