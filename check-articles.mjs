import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';

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

async function checkArticles() {
  try {
    const q = query(collection(db, "articles"), orderBy("id", "desc"));
    const snapshot = await getDocs(q);
    console.log(`Found ${snapshot.docs.length} articles in Firebase.`);
  } catch (e) {
    console.error("Firebase fetch error:", e);
  }
  process.exit(0);
}

checkArticles();
