-- RLS policies so the app can read/write data when RLS is enabled.
-- Run this in Supabase SQL Editor (or via supabase db push) after enabling RLS on your tables.

-- =============================================================================
-- MOVIES: allow everyone (anon + authenticated) to read published movies
-- =============================================================================
ALTER TABLE public.movies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "movies_select_published" ON public.movies;
CREATE POLICY "movies_select_published"
  ON public.movies
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- =============================================================================
-- SUBSCRIPTION_PLANS: allow everyone to read (public pricing)
-- =============================================================================
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "subscription_plans_select_all" ON public.subscription_plans;
CREATE POLICY "subscription_plans_select_all"
  ON public.subscription_plans
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- =============================================================================
-- SERIES_EPISODES: allow everyone to read (for series detail/watch)
-- =============================================================================
ALTER TABLE public.series_episodes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "series_episodes_select_all" ON public.series_episodes;
CREATE POLICY "series_episodes_select_all"
  ON public.series_episodes
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- =============================================================================
-- PURCHASES: users can only read their own purchases
-- =============================================================================
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "purchases_select_own" ON public.purchases;
CREATE POLICY "purchases_select_own"
  ON public.purchases
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- (INSERT/UPDATE for purchases are done by webhook with service role, so no policy needed)

-- =============================================================================
-- SUBSCRIPTIONS: users can only read their own subscription
-- =============================================================================
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "subscriptions_select_own" ON public.subscriptions;
CREATE POLICY "subscriptions_select_own"
  ON public.subscriptions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- =============================================================================
-- PROFILES: users can read and update their own profile
-- =============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
CREATE POLICY "profiles_select_own"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
CREATE POLICY "profiles_update_own"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
CREATE POLICY "profiles_insert_own"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- =============================================================================
-- PAYMENTS: users can read and insert their own payment rows (for checkout)
-- =============================================================================
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "payments_select_own" ON public.payments;
CREATE POLICY "payments_select_own"
  ON public.payments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "payments_insert_own" ON public.payments;
CREATE POLICY "payments_insert_own"
  ON public.payments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- (UPDATE payments is done by webhook with service role)
