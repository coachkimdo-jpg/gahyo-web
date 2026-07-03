import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import fs from 'fs';
import path from 'path';

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
const storage = getStorage(app);

async function uploadAndUpdate() {
  const imagePath = "C:\\Users\\PC\\.gemini\\antigravity\\brain\\6a36c0b3-1a14-424f-ba72-3055c50fd306\\funeral_home_cost_1779453091393.png";
  const imageBuffer = fs.readFileSync(imagePath);
  
  const filename = `ai-post-${Date.now()}.png`;
  const storageRef = ref(storage, `ai-posts/${filename}`);
  
  console.log("Uploading image...");
  await uploadBytes(storageRef, new Uint8Array(imageBuffer), { contentType: 'image/png' });
  
  const downloadURL = await getDownloadURL(storageRef);
  console.log("Uploaded! URL:", downloadURL);
  
  const docRef = doc(db, 'articles', 's7hFqsAb80cXHIsOc62H');
  
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    let content = docSnap.data().content;
    const imgTag = `<img src="${downloadURL}" alt="장례식장 비용 투명하고 합리적인 선택을 위한 가이드 이미지" width="800" height="400" loading="eager" style="width:100%;height:auto;border-radius:12px;margin:1.5rem 0;" />`;
    
    if (content.includes('</h1>')) {
      content = content.replace('</h1>', `</h1>\n${imgTag}`);
    } else {
      content = imgTag + '\n' + content;
    }
    
    console.log("Updating document...");
    await updateDoc(docRef, { content });
    console.log("Done!");
  }
}

uploadAndUpdate().catch(console.error).then(() => process.exit(0));
