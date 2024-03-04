//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
const firebaseConfig = {
    apiKey: "AIzaSyC2ZbWCqFjKYvfzamJkyj_0S9kaAw64Wck",
    authDomain: "comp1800-202410-demo-fa093.firebaseapp.com",
    projectId: "comp1800-202410-demo-fa093",
    storageBucket: "comp1800-202410-demo-fa093.appspot.com",
    messagingSenderId: "337176109144",
    appId: "1:337176109144:web:a827f69648c0b50f712a2d"
  };

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
