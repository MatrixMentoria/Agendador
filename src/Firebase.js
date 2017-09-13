import Firebase from 'firebase'
const firebaseApp = Firebase.initializeApp ({
    apiKey: "AIzaSyCGdLFWep-fuAlpc9RterbDSPxtn0SEIHU",
    authDomain: "agendador-projetomatrix2.firebaseapp.com",
    databaseURL: "https://agendador-projetomatrix2.firebaseio.com",
    projectId: "agendador-projetomatrix2",
    storageBucket: "agendador-projetomatrix2.appspot.com",
    messagingSenderId: "759238728235"
});

export const firebase = firebaseApp