import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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
  
  let latestDoc = null;
  let maxTime = 0;

  snapshot.forEach(doc => {
    const data = doc.data();
    // parse createdAt if it exists
    let time = 0;
    if (data.createdAt) {
      if (typeof data.createdAt === 'string') {
        time = new Date(data.createdAt).getTime();
      } else if (data.createdAt.seconds) {
        time = data.createdAt.seconds * 1000;
      }
    }
    if (time > maxTime) {
      maxTime = time;
      latestDoc = doc;
    }
  });
  
  if (!latestDoc) {
    console.log('No matching documents.');
    process.exit(0);
  }
  
  const content = latestDoc.data().content;
  console.log("Title:", latestDoc.data().title);
  
  // Find img tags
  const imgRegex = /<img[^>]*>/gi;
  const match = content.match(imgRegex);
  console.log("Img tags:", match);
  process.exit(0);
}

check();
