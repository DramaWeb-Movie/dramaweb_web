import { getMovies, getPurchasedMovieIdsForCurrentUser } from '@/lib/movies';
import MoviesContent from '@/components/movies/MoviesContent';

export default async function MoviesPage() {
  const [items, purchasedMovieIds] = await Promise.all([
    getMovies({ type: 'single', status: 'published' }),
    getPurchasedMovieIdsForCurrentUser(),
  ]);

  return (
    <MoviesContent
      initialItems={items}
      purchasedMovieIds={Array.from(purchasedMovieIds)}
    />
  );
}
