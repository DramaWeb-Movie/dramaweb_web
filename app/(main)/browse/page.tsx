import { getMovies, getPurchasedMovieIdsForCurrentUser } from '@/lib/movies';
import BrowseContent from '@/components/browse/BrowseContent';

export default async function BrowsePage() {
  const [dramas, purchasedMovieIds] = await Promise.all([
    getMovies({ status: 'published' }),
    getPurchasedMovieIdsForCurrentUser(),
  ]);

  return (
    <BrowseContent
      initialDramas={dramas}
      purchasedMovieIds={Array.from(purchasedMovieIds)}
    />
  );
}
