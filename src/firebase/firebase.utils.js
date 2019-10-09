import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCgx2YkmAuhPGw7kcySdTSjf6yD43LKc0w',
  authDomain: 'crwn-db-2b9dc.firebaseapp.com',
  databaseURL: 'https://crwn-db-2b9dc.firebaseio.com',
  projectId: 'crwn-db-2b9dc',
  storageBucket: '',
  messagingSenderId: '709302811755',
  appId: '1:709302811755:web:f474a36dfa6e712e4ac52e',
  measurementId: 'G-K953GTFFBP'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
  
  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;