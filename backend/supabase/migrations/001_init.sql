-- Laxman Rekha — Initial Database Migration
-- Run this in: Supabase Dashboard > SQL Editor > New Query

-- 1. BUYERS (Users / Creators)
CREATE TABLE IF NOT EXISTS public.buyers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  email           TEXT UNIQUE NOT NULL,
  password_hash   TEXT NOT NULL,
  wallet_address  TEXT,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- 2. IMAGES (Protected Digital Assets)
CREATE TABLE IF NOT EXISTS public.images (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id         UUID REFERENCES public.buyers(id) ON DELETE CASCADE,
  filename         TEXT NOT NULL,
  title            TEXT,
  image_url        TEXT,
  status           TEXT DEFAULT 'pending' CHECK (status IN ('watermarked', 'pending', 'alert')),
  protection_type  TEXT DEFAULT 'DCT Watermark',
  sha256           TEXT,
  blockchain_tx    TEXT,
  confidence       NUMERIC DEFAULT 0,
  created_at       TIMESTAMPTZ DEFAULT now()
);

-- 3. BREACH REPORTS
CREATE TABLE IF NOT EXISTS public.breach_reports (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_id      UUID REFERENCES public.images(id) ON DELETE SET NULL,
  suspect_url   TEXT NOT NULL,
  confidence    NUMERIC DEFAULT 0,
  blockchain_tx TEXT,
  status        TEXT DEFAULT 'flagged' CHECK (status IN ('flagged', 'resolved', 'dismissed')),
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- 4. CO-OWNERSHIP SPLITS
CREATE TABLE IF NOT EXISTS public.co_ownership_splits (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_id     UUID REFERENCES public.images(id) ON DELETE CASCADE,
  owner_name   TEXT NOT NULL,
  owner_role   TEXT,
  wallet       TEXT NOT NULL,
  share        NUMERIC NOT NULL CHECK (share >= 0 AND share <= 100),
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- 5. LICENSES
CREATE TABLE IF NOT EXISTS public.licenses (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_id          UUID REFERENCES public.images(id) ON DELETE SET NULL,
  buyer_wallet      TEXT NOT NULL,
  license_terms     TEXT,
  type              TEXT DEFAULT 'Commercial' CHECK (type IN ('Commercial', 'Personal', 'Exclusive')),
  price             TEXT,
  status            TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'revoked')),
  watermark_payload TEXT,
  created_at        TIMESTAMPTZ DEFAULT now()
);

-- 6. Enable RLS + allow service_role full access
ALTER TABLE public.buyers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.breach_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.co_ownership_splits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.licenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Full access buyers" ON public.buyers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Full access images" ON public.images FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Full access breach_reports" ON public.breach_reports FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Full access co_ownership_splits" ON public.co_ownership_splits FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Full access licenses" ON public.licenses FOR ALL USING (true) WITH CHECK (true);
