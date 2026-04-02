const firebaseConfig = {
  apiKey: "AIzaSyDVApbFBI1YedRtcc0qY27UIglPjQx2mH0",
  authDomain: "nfc-dinamico-d3669.firebaseapp.com",
  projectId: "nfc-dinamico-d3669",
  storageBucket: "nfc-dinamico-d3669.firebasestorage.app",
  messagingSenderId: "442832061429",
  appId: "1:442832061429:web:5e73e3fea77dea8ca796bc",
  // measurementId removed
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
