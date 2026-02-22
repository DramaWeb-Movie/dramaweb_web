import { NextRequest } from 'next/server';
import { getMovieById } from '@/lib/movies';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    return Response.json({ error: 'Missing id' }, { status: 400 });
  }
  try {
    const movie = await getMovieById(id);
    if (!movie) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }
    return Response.json(movie);
  } catch (e) {
    console.error('GET /api/movies/[id] error:', e);
    return Response.json({ error: 'Failed to fetch movie' }, { status: 500 });
  }
}
