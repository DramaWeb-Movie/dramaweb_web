import { createClient } from '@/lib/supabase/server';
import LogoAndNav from '@/components/layout/LogoAndNav';
import HeaderScrollWrapper from '@/components/layout/HeaderScrollWrapper';
import HeaderActions from '@/components/layout/HeaderActions';

export default async function Header() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <HeaderScrollWrapper
      leftContent={<LogoAndNav />}
      rightContent={<HeaderActions initialUser={user} />}
    />
  );
}
