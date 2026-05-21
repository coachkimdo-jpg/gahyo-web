import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'src', 'lib', 'qna.json');

function getQnaData() {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function saveQnaData(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    let posts = getQnaData();
    
    const postIndex = posts.findIndex(p => p.id === parseInt(id));
    
    if (postIndex === -1) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    // Update the post with new data (e.g., adding a reply)
    posts[postIndex] = { ...posts[postIndex], ...body };
    saveQnaData(posts);
    
    return NextResponse.json(posts[postIndex]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    let posts = getQnaData();
    
    posts = posts.filter(p => p.id !== parseInt(id));
    saveQnaData(posts);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
