import { NextRequest, NextResponse } from 'next/server';
import { getMovies, getFeaturedMovies } from '@/lib/movies';

const LIST_CACHE_CONTROL = 'public, s-maxage=60, stale-while-revalidate=120';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') as 'single' | 'series' | null;
  const featured = searchParams.get('featured') === 'true';

  try {
    if (featured) {
      const limit = Math.min(Number(searchParams.get('limit')) || 10, 20);
      const items = await getFeaturedMovies(limit);
      return NextResponse.json(items, {
        headers: { 'Cache-Control': LIST_CACHE_CONTROL },
      });
    }

    const items = await getMovies({
      type: type ?? undefined,
      status: 'published',
    });
    return NextResponse.json(items, {
      headers: { 'Cache-Control': LIST_CACHE_CONTROL },
    });
  } catch (e) {
    console.error('GET /api/movies error:', e);
    return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
  }
}
