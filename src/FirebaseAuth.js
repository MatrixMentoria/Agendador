import Firebase from 'firebase'
const firebaseApp = Firebase.initializeApp ({
    apiKey: "AIzaSyBFk5L8simT9Oj5LUA5zRjH1YpEi8LatX8",
    authDomain: "agendador-unicarioca.firebaseapp.com",
    databaseURL: "https://agendador-unicarioca.firebaseio.com",
    projectId: "agendador-unicarioca",
    storageBucket: "agendador-unicarioca.appspot.com",
    messagingSenderId: "681569781782"
});

export const firebaseauth = firebaseApp.auth();