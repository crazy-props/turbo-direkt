import firebase from 'firebase'

    // Initialize Firebase
    var config = {
    apiKey: "AIzaSyBYi72o-SPs-cRpFeUdoWov5FrRXkWlT3Y",
    authDomain: "turbo-direct-project.firebaseapp.com",
    databaseURL: "https://turbo-direct-project.firebaseio.com",
    projectId: "turbo-direct-project",
    storageBucket: "turbo-direct-project.appspot.com",
    messagingSenderId: "740235688487"
};
    firebase.initializeApp(config);

export const auth = firebase.auth()
export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
export const db = firebase.database()