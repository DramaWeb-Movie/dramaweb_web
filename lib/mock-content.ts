import type { ContentType } from '@/types';

export interface BrowseItem {
  id: string;
  title: string;
  episodes: number;
  image: string;
  contentType: ContentType;
}

/** Single-part = movie (pay per title). Series = monthly subscription. */
export const BROWSE_ITEMS: BrowseItem[] = [
  { id: '1', title: "Sonny's Competition", episodes: 1, image: '/sampleData/movieTitle/movie1.png', contentType: 'movie' },
  { id: '2', title: 'Deliver Me', episodes: 55, image: '/sampleData/movieTitle/movie2.png', contentType: 'series' },
  { id: '3', title: 'My Billionaire Lover and Our Forgotten Love', episodes: 1, image: '/sampleData/movieTitle/movie3.png', contentType: 'movie' },
  { id: '4', title: "My Crush Thinks I'm A Boy", episodes: 59, image: '/sampleData/movieTitle/movie1.png', contentType: 'series' },
  { id: '5', title: "Everything's on My Side: Daddy, I'm Coming", episodes: 1, image: '/sampleData/movieTitle/movie2.png', contentType: 'movie' },
  { id: '6', title: 'Divorce? No Big Deal', episodes: 74, image: '/sampleData/movieTitle/movie3.png', contentType: 'series' },
  { id: '7', title: 'Another Drama Title', episodes: 1, image: '/sampleData/movieTitle/movie1.png', contentType: 'movie' },
  { id: '8', title: 'More Drama Content', episodes: 62, image: '/sampleData/movieTitle/movie2.png', contentType: 'series' },
  { id: '9', title: 'Epic Love Story', episodes: 1, image: '/sampleData/movieTitle/movie3.png', contentType: 'movie' },
  { id: '10', title: 'Revenge Plot', episodes: 67, image: '/sampleData/movieTitle/movie1.png', contentType: 'series' },
  { id: '11', title: 'Family Secrets', episodes: 1, image: '/sampleData/movieTitle/movie2.png', contentType: 'movie' },
  { id: '12', title: 'Hidden Identity', episodes: 48, image: '/sampleData/movieTitle/movie3.png', contentType: 'series' },
  { id: '13', title: 'Midnight in Seoul', episodes: 1, image: '/sampleData/movieTitle/movie1.png', contentType: 'movie' },
  { id: '14', title: 'The Last Letter', episodes: 1, image: '/sampleData/movieTitle/movie2.png', contentType: 'movie' },
  { id: '15', title: 'Silent Storm', episodes: 1, image: '/sampleData/movieTitle/movie3.png', contentType: 'movie' },
  { id: '16', title: 'Between Two Worlds', episodes: 1, image: '/sampleData/movieTitle/movie1.png', contentType: 'movie' },
  { id: '17', title: 'Echoes of Tomorrow', episodes: 1, image: '/sampleData/movieTitle/movie2.png', contentType: 'movie' },
  { id: '18', title: 'The Forgotten Garden', episodes: 1, image: '/sampleData/movieTitle/movie3.png', contentType: 'movie' },
  { id: '19', title: 'City of Shadows', episodes: 1, image: '/sampleData/movieTitle/movie1.png', contentType: 'movie' },
  { id: '20', title: 'One Summer Day', episodes: 1, image: '/sampleData/movieTitle/movie2.png', contentType: 'movie' },
];

export const MOVIES = BROWSE_ITEMS.filter((item) => item.contentType === 'movie');
export const SERIES = BROWSE_ITEMS.filter((item) => item.contentType === 'series');
