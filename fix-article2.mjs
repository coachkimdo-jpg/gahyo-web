import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore';

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

async function fix() {
  const querySnapshot = await getDocs(collection(db, "articles"));
  for (const document of querySnapshot.docs) {
    if (document.id === 'JhK0pBVxZ8zzQqhpolqg') {
      const data = document.data();
      let content = data.content;
      content = content.replace(
        '<p>갑작스러운 부고 소식에 경황이 없을 때, 많은 분들이 헷',
        '<p>갑작스러운 부고 소식에 경황이 없을 때, 많은 분들이 헷갈려 하시는 것이 바로 부의금 봉투 작성법입니다. 아래 표를 통해 올바른 작성 위치와 방법을 확인해 보세요.</p>'
      );
      content = content.replace(
        '</div>\n    </p>',
        '</div>'
      );
      await updateDoc(doc(db, "articles", document.id), {
        content: content
      });
      console.log('Fixed successfully.');
    }
  }
  process.exit(0);
}
fix().catch(e => {
  console.error(e);
  process.exit(1);
});
