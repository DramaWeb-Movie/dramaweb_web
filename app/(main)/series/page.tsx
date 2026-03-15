import { getMovies } from '@/lib/movies';
import SeriesContent from '@/components/series/SeriesContent';

export default async function SeriesPage() {
  const items = await getMovies({ type: 'series', status: 'published' });

  return <SeriesContent initialItems={items} />;
}
