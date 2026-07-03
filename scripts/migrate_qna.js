require('dotenv').config({ path: '.env.local' });
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs } = require('firebase/firestore');
const fs = require('fs');
const path = require('path');

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function migrate() {
  try {
    const dbPath = path.join(__dirname, '../src/lib/qna.json');
    if (!fs.existsSync(dbPath)) {
      console.log('No qna.json found. Skipping migration.');
      return;
    }
    
    const data = fs.readFileSync(dbPath, 'utf8');
    const posts = JSON.parse(data);
    
    if (!posts || posts.length === 0) {
      console.log('No posts to migrate.');
      return;
    }

    // Check if qna collection already has data to prevent duplicate migration
    const snapshot = await getDocs(collection(db, 'qna'));
    if (!snapshot.empty) {
      console.log(`QnA collection already has ${snapshot.size} documents. Skipping migration to prevent duplicates.`);
      return;
    }

    console.log(`Migrating ${posts.length} QnA posts to Firebase...`);
    
    for (const post of posts) {
      await addDoc(collection(db, 'qna'), post);
      console.log(`Migrated post: ${post.title}`);
    }
    
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

migrate();
