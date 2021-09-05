import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAEI8ljCzcxgF5LMZ2DcXI-hgiBBxjKQss",
    authDomain: "tenedores-9d083.firebaseapp.com",
    projectId: "tenedores-9d083",
    storageBucket: "tenedores-9d083.appspot.com",
    messagingSenderId: "408582204376",
    appId: "1:408582204376:web:91d65734ab161b1b1660ad"
  }

export const firebaseApp = firebase.initializeApp(firebaseConfig)