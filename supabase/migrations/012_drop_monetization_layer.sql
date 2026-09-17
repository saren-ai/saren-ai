-- ============================================================================
-- 012_drop_monetization_layer.sql
--
-- Drops the digital-downloads monetization layer (2026-09-17): the paid
-- playbook paywall (entitlements) and the legacy /downloads storefront
-- (purchases). Both tables predate this repo's migration tracking — they
-- were part of the original Stripe checkout build, not created by 001-011.
-- Both were empty (never a real sale) at the time of removal. Revisit if
-- digital downloads comes back — this and the Stripe/checkout code it backed
-- are both gone as of the same commit.
-- ============================================================================

begin;

drop table if exists public.entitlements;
drop table if exists public.purchases;

commit;
