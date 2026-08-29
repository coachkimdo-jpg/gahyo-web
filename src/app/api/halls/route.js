import { NextResponse } from 'next/server';
import { filterHalls } from '@/lib/hallsFilter';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sido = searchParams.get('sido') || '전체';
  const sigungu = searchParams.get('sigungu') || '전체';
  const search = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '20', 10);

  const result = filterHalls({ sido, sigungu, search, page, limit });

  return NextResponse.json(result);
}
