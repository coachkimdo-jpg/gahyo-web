import { NextResponse } from 'next/server';
import { filterCemeteries } from '@/lib/cemeteriesFilter';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || '';
  const search = searchParams.get('search') || '';
  const sido = searchParams.get('sido') || '전체';
  const sigungu = searchParams.get('sigungu') || '전체';

  const result = filterCemeteries({ type, search, sido, sigungu });

  return NextResponse.json(result);
}
