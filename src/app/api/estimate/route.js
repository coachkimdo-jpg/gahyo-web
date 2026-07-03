import { NextResponse } from 'next/server';
import estimateData from '@/lib/estimateData.json';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const hallName = searchParams.get('hall');
  const category = searchParams.get('category');

  if (!hallName || !category) {
    return NextResponse.json({ error: 'Missing hall or category' }, { status: 400 });
  }

  const hallEstimates = estimateData[hallName];
  if (hallEstimates && hallEstimates[category]) {
    return NextResponse.json(hallEstimates[category]);
  }

  // Fallback
  return NextResponse.json({
    min: 0,
    max: 0,
    details: {
      anchi: 0, ipgwan: 0, susi: 0, binso: 0, binsoName: '', gwanri: 0, chungso: 0, meal: 0, floralMin: 0, floralMax: 0
    }
  });
}
