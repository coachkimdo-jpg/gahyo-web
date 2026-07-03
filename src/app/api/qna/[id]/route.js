import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const q = query(collection(db, 'qna'), where('id', '==', parseInt(id)));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    const docRef = snapshot.docs[0].ref;
    const updatedData = { ...snapshot.docs[0].data(), ...body };
    
    await updateDoc(docRef, updatedData);
    
    revalidatePath('/qna');
    revalidatePath('/admin');
    
    return NextResponse.json(updatedData);
  } catch (error) {
    console.error('Error updating qna:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    
    const q = query(collection(db, 'qna'), where('id', '==', parseInt(id)));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      await deleteDoc(snapshot.docs[0].ref);
    }
    
    revalidatePath('/qna');
    revalidatePath('/admin');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting qna:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
