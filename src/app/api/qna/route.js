import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, query, orderBy } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const q = query(collection(db, 'qna'), orderBy('id', 'desc'));
    const snapshot = await getDocs(q);
    const posts = snapshot.docs.map(doc => doc.data());
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error reading qna from Firebase:', error);
    return NextResponse.json({ error: 'Failed to read qna' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const newPost = await request.json();
    
    // Auto-increment ID based on timestamp or max id
    const newId = Date.now();
    const postWithId = { 
      ...newPost, 
      id: newId,
      date: new Date().toISOString().split('T')[0]
    };
    
    await addDoc(collection(db, 'qna'), postWithId);
    
    revalidatePath('/qna');
    revalidatePath('/admin');
    
    return NextResponse.json(postWithId, { status: 201 });
  } catch (error) {
    console.error('Error saving qna to Firebase:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
