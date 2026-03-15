import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from Server Component - can ignore
          }
        },
      },
    }
  );
}

/**
 * Supabase client that does NOT use cookies(). Safe to use inside unstable_cache()
 * and other cached scopes. Use for public data only (no auth/session).
 */
export function createAnonClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey!,
    {
      cookies: {
        getAll: () => [],
        setAll: () => {},
      },
    }
  );
}
