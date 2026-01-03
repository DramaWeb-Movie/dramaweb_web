// API functions for dramas
import type { Drama } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function getDramas(): Promise<Drama[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/dramas`);
    if (!response.ok) throw new Error('Failed to fetch dramas');
    return response.json();
  } catch (error) {
    console.error('Error fetching dramas:', error);
    return [];
  }
}

export async function getDramaById(id: string): Promise<Drama | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/dramas/${id}`);
    if (!response.ok) throw new Error('Failed to fetch drama');
    return response.json();
  } catch (error) {
    console.error('Error fetching drama:', error);
    return null;
  }
}

export async function searchDramas(query: string): Promise<Drama[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/dramas/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search dramas');
    return response.json();
  } catch (error) {
    console.error('Error searching dramas:', error);
    return [];
  }
}

export async function getDramasByGenre(genre: string): Promise<Drama[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/dramas/genre/${genre}`);
    if (!response.ok) throw new Error('Failed to fetch dramas by genre');
    return response.json();
  } catch (error) {
    console.error('Error fetching dramas by genre:', error);
    return [];
  }
}

