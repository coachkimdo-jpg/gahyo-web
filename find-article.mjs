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

async function find() {
  const querySnapshot = await getDocs(collection(db, "articles"));
  for (const document of querySnapshot.docs) {
    if (document.id === 'JhK0pBVxZ8zzQqhpolqg') {
      const data = document.data();
      console.log(data.content);
    }
  }
  process.exit(0);
}
find().catch(e => {
  console.error(e);
  process.exit(1);
});
