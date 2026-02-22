import { NextRequest } from 'next/server';
import { getMovies, getFeaturedMovies } from '@/lib/movies';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') as 'single' | 'series' | null;
  const featured = searchParams.get('featured') === 'true';

  try {
    if (featured) {
      const limit = Math.min(Number(searchParams.get('limit')) || 10, 20);
      const items = await getFeaturedMovies(limit);
      return Response.json(items);
    }

    const items = await getMovies({
      type: type ?? undefined,
      status: 'published',
    });
    return Response.json(items);
  } catch (e) {
    console.error('GET /api/movies error:', e);
    return Response.json({ error: 'Failed to fetch movies' }, { status: 500 });
  }
}
