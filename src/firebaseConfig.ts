import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
const config = {
	apiKey: "AIzaSyAFiB3nyaFDLcEZobAjWaC6uh_mTc0VPdM",
	authDomain: "localhost",
	databaseURL: "https://raveendra-28e35.firebaseio.com/",
	projectId: "raveendra-28e35",
	storageBucket: "gs://raveendra-28e35.appspot.com",
	messagingSenderId: ""
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.database()
const auth = firebase.auth()
const currentUser = auth.currentUser

// firebase collections
const batchCollection = db.ref('batch')
const classCollection = db.ref('class')
const studentCollection = db.ref('student')

export {
    db,
    auth,
    currentUser,
    batchCollection,
    classCollection,
    studentCollection
}