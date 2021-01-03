import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBPBf1Se8VyUq2I0xA5LvJusnmz4V5lSGc",
    authDomain: "web-dokumen.firebaseapp.com",
    databaseURL: "https://web-dokumen.firebaseio.com",
    projectId: "web-dokumen",
    storageBucket: "web-dokumen.appspot.com",
    messagingSenderId: "362654476218",
    appId: "1:362654476218:web:10ede35ff504ac01f5df83",
    measurementId: "G-7BRNX3BFC6"
  };

firebase.initializeApp(firebaseConfig)

export default firebase;