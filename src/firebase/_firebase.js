const dotenv = require('dotenv');
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_CONFIG_APIKEY,
  authDomain: process.env.FIREBASE_CONFIG_AUTHDOMAIN,
  databaseURL: process.env.FIREBASE_CONFIG_DATABASEURL,
  projectId: process.env.FIREBASE_CONFIG_PROJECTID,
  storageBucket: process.env.FIREBASE_CONFIG_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_CONFIG_MESSAGINGSENDERID,
  appId: process.env.FIREBASE_CONFIG_APPID
};

// const firebase = require('firebase');
import firebase from 'firebase';

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.db = firebase.database();
    this.auth = firebase.auth();
    this.userUid = null
    this.userInfo = null
  }

  signWithEmail = (email, password) => this.auth.signInWithEmailAndPassword(email, password);
  getUserWords = () => {
    console.log("!!!! --   getUserWords this", this, new Date().toUTCString())
    return this.db.ref(`/${this.userUid}`)
  };
  getAllData = () => {
    // console.log('getAllData   ..... ')
    return this.db.ref('/')
  };

  getClubs = ()=>this.db.ref(`/clubs/`);
  getNations = ()=>this.db.ref(`/nations/`);

  getFolder = (_folder) => {
    // console.log("!!!! --   data from", _folder, new Date().toUTCString())
    return this.db.ref(`/${_folder}`)
  };
  // setBor= (borObject) => {
  //   console.log("!!!! --   borObject length ", borObject.length, new Date().toUTCString())
  //   return this.db.ref(`/bor`).set(borObject,(err)=>{err ? console.log("setBor - " ,err): undefined })
  // };
  getAllData = () => {
    // console.log('getAllData   ..... ')
    return this.db.ref('/')
  };

  setUserUid = (uid) => this.userUid = uid;
  setUserInfo = (user) => this.userInfo = user;

  shutdownConnection = ()=> {
    this.db.goOffline();
  }
}

module.exports = Firebase
  // export default Firebase
