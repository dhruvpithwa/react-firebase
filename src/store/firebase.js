import firebase from 'firebase';
  
const firebaseConfig = {
    apiKey: "BbcEoD6rCBI2wB3XwZa4Lh4AMX262GxLGDI3NAUy",
    authDomain: "shrutlekha-a93f2.firebaseapp.com",
    databaseURL: "https://shrutlekha-a93f2-default-rtdb.firebaseio.com/",
    projectId: "shrutlekha-a93f2",
  };
    
firebase.initializeApp(firebaseConfig);

const db = firebase.database();

export default db;