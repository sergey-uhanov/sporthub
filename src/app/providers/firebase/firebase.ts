import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAH19-yWtX34aPsD12Uw6HVHH9-ZuwZOjg",
    authDomain: "sporthub-df119.firebaseapp.com",
    projectId: "sporthub-df119",
    storageBucket: "sporthub-df119.firebasestorage.app",
    messagingSenderId: "182179420235",
    appId: "1:182179420235:web:6c38660410bd9dffa895ce"
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);


const db = getFirestore(app);
// const storage = getStorage(app);


export {auth, db};
