import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, query, orderBy, where } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const q = query(collection(db, 'articles'), orderBy('id', 'desc'));
    const snapshot = await getDocs(q);
    const articles = snapshot.docs.map(doc => doc.data());
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error reading articles from Firebase:', error);
    return NextResponse.json({ error: 'Failed to read articles' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const newArticle = await req.json();
    
    let generatedSlug = newArticle.title
      .replace(/[^\w\sㄱ-ㅎㅏ-ㅣ가-힣-]/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase();
    
    let finalSlug = generatedSlug;
    let counter = 1;
    let slugExists = true;
    
    while (slugExists) {
      const q = query(collection(db, 'articles'), where('slug', '==', finalSlug));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        slugExists = false;
      } else {
        finalSlug = `${generatedSlug}-${counter}`;
        counter++;
      }
    }

    // Use timestamp for sequential unique ID
    const newId = Date.now();
    const articleToSave = { ...newArticle, id: newId, slug: finalSlug };
    
    await addDoc(collection(db, 'articles'), articleToSave);
    
    revalidatePath('/guide');
    revalidatePath('/admin');
    
    return NextResponse.json(articleToSave, { status: 201 });
  } catch (error) {
    console.error('Error saving article to Firebase:', error);
    return NextResponse.json({ error: 'Failed to save article' }, { status: 500 });
  }
}
