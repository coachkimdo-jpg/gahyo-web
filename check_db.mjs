import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDDf772uA8N4EU9QVB4o1Jhoej2gkAegbQ",
  authDomain: "gahyo-sangjo.firebaseapp.com",
  projectId: "gahyo-sangjo",
  storageBucket: "gahyo-sangjo.firebasestorage.app",
  messagingSenderId: "1078791115249",
  appId: "1:1078791115249:web:f38174eaa24f3bbb677450"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function check() {
  const snapshot = await getDocs(collection(db, 'articles'));
  snapshot.forEach(doc => {
    const data = doc.data();
    console.log(`Doc ID: ${doc.id}, Article ID: ${data.id} (type: ${typeof data.id}), Title: ${data.title}`);
  });
  process.exit(0);
}

check();
