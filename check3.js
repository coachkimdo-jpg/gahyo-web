import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDf772uA8N4EU9QVB4o1Jhoej2gkAegbQ",
  authDomain: "gahyo-sangjo.firebaseapp.com",
  projectId: "gahyo-sangjo",
  storageBucket: "gahyo-sangjo.appspot.com",
  messagingSenderId: "1078791115249",
  appId: "1:1078791115249:web:f38174eaa24f3bbb677450"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function check() {
  const articlesRef = collection(db, 'articles');
  const snapshot = await getDocs(articlesRef);
  
  let targetDoc = null;

  snapshot.forEach(doc => {
    const title = doc.data().title || "";
    if (title.includes("사망신고")) {
      targetDoc = doc;
    }
  });
  
  if (!targetDoc) {
    console.log('No matching documents.');
    process.exit(0);
  }
  
  const content = targetDoc.data().content;
  console.log("Title:", targetDoc.data().title);
  
  // Find img tags
  const imgRegex = /<img[^>]*>/gi;
  const match = content.match(imgRegex);
  console.log("Img tags:", match);
  process.exit(0);
}

check();
