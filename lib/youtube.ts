/**
 * Get YouTube embed URL from a watch or share URL.
 * Supports: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID
 */
export function getYoutubeEmbedUrl(url: string): string | null {
  if (!url?.trim()) return null;
  const u = url.trim();
  try {
    const parsed = new URL(u);
    if (parsed.hostname === 'www.youtube.com' || parsed.hostname === 'youtube.com') {
      const v = parsed.searchParams.get('v');
      if (v) return `https://www.youtube.com/embed/${v}`;
      const pathMatch = parsed.pathname.match(/^\/embed\/([a-zA-Z0-9_-]+)/);
      if (pathMatch) return `https://www.youtube.com/embed/${pathMatch[1]}`;
    }
    if (parsed.hostname === 'youtu.be') {
      const id = parsed.pathname.slice(1).split('/')[0];
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
  } catch {
    // ignore invalid URLs
  }
  return null;
}
