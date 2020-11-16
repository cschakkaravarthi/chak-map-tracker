import * as firebase from 'firebase';
import 'firebase/firestore';

//const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyCOuIvcGlxYRWIAuvaAuqVbDj3YOMDSB8Q",
    authDomain: "suba-map-tracker.firebaseapp.com",
    databaseURL: "https://suba-map-tracker.firebaseio.com",
    projectId: "suba-map-tracker",
    storageBucket: "suba-map-tracker.appspot.com",
    messagingSenderId: "895257903455"
  };
firebase.initializeApp(config);

//firebase.firestore().settings(settings);

export default firebase.firestore();