import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

const validLocales = ['en', 'km'] as const;
type Locale = (typeof validLocales)[number];

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const raw = cookieStore.get('NEXT_LOCALE')?.value ?? 'km';
  const locale: Locale = (validLocales as readonly string[]).includes(raw)
    ? (raw as Locale)
    : 'km';

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
