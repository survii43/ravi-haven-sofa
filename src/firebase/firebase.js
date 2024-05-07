// import firebase from 'firebase/compat/app';
// import 'firebase/compat/storage';

// const firebaseConfig = {
//   apiKey: "AIzaSyAj8_Py86ZprkTr0Z9XFjjNPF1iK2WjZCc",
//   authDomain: "ravi-sofa.firebaseapp.com",
//   projectId: "ravi-sofa",
//   storageBucket: "ravi-sofa.appspot.com",
//   messagingSenderId: "790258240656",
//   appId: "1:790258240656:web:80ff7423fef93ad17fdc15",
//   measurementId: "G-XGMHPNVL8G"
// };

// firebase.initializeApp(firebaseConfig);

// export const storage = firebase.storage(); // Export storage module if needed

// export default firebase; // Export the initialized Firebase app
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/auth'; 

const firebaseConfig = {
  apiKey: "AIzaSyAj8_Py86ZprkTr0Z9XFjjNPF1iK2WjZCc",
  authDomain: "ravi-sofa.firebaseapp.com",
  projectId: "ravi-sofa",
  storageBucket: "ravi-sofa.appspot.com",
  messagingSenderId: "790258240656",
  appId: "1:790258240656:web:80ff7423fef93ad17fdc15",
  measurementId: "G-XGMHPNVL8G"
};

// Check if Firebase app is already initialized
if (!firebase.apps.length) {
  // Initialize Firebase with the provided configuration
  firebase.initializeApp(firebaseConfig);
}

// Export Firebase storage module
export const storage = firebase.storage();
export const auth = firebase.auth();

// Export initialized Firebase app
export default firebase;
