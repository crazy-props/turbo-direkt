// import firebase from 'firebase'

// Initialize Firebase
const config = {
    apiKey: "AIzaSyBYi72o-SPs-cRpFeUdoWov5FrRXkWlT3Y",
    authDomain: "turbo-direct-project.firebaseapp.com",
    databaseURL: "https://turbo-direct-project.firebaseio.com",
    projectId: "turbo-direct-project",
    storageBucket: "turbo-direct-project.appspot.com",
    messagingSenderId: "740235688487"
}

firebase.initializeApp(config)

const auth = firebase.auth()
 const database = firebase.database()
 const db = firebase.database()



db.ref('/car_model').on('value', s=>(console.log(s.val())))