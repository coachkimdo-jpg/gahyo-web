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

export async function GET() {
  const posts = getQnaData();
  return NextResponse.json(posts);
}

export async function POST(request) {
  try {
    const newPost = await request.json();
    const posts = getQnaData();
    
    // Auto-increment ID
    const maxId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) : 0;
    const postWithId = { 
      ...newPost, 
      id: maxId + 1,
      date: new Date().toISOString().split('T')[0]
    };
    
    posts.unshift(postWithId); // Add to beginning
    saveQnaData(posts);
    
    return NextResponse.json(postWithId, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
