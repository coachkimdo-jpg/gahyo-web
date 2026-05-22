import fs from 'fs';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

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

async function migrate() {
  try {
    const dbPath = './src/lib/qna.json';
    if (!fs.existsSync(dbPath)) {
      console.log('No qna.json found. Skipping migration.');
      process.exit(0);
    }
    
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    
    if (!data || data.length === 0) {
      console.log('No posts to migrate.');
      process.exit(0);
    }

    const snapshot = await getDocs(collection(db, 'qna'));
    if (!snapshot.empty) {
      console.log(`QnA collection already has ${snapshot.size} documents. Skipping migration to prevent duplicates.`);
      process.exit(0);
    }

    console.log(`Migrating ${data.length} QnA posts to Firebase...`);
    
    for (const post of data) {
      await addDoc(collection(db, 'qna'), post);
      console.log(`Migrated post: ${post.title}`);
    }
    
    console.log('Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
