import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";

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
  const articlesRef = collection(db, 'articles');
  const q = query(articlesRef, where('slug', '==', '장례식장-비용-투명하고-합리적인-선택을-위한-모든-것-feat-가효상조'));
  const snapshot = await getDocs(q);
  
  if (snapshot.empty) {
    console.log('No matching documents.');
    process.exit(0);
  }
  
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data().content.includes('<img'));
    console.log(doc.data().content.substring(0, 500));
  });
  process.exit(0);
}

check();
