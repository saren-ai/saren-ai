# Deploy

Prepare and deploy to production via Vercel (GitHub integration).

## Steps

1. Run `npm run build` — must pass clean
2. Run `npm run lint` — must pass clean
3. Run `git status` — ensure working tree is clean
4. If there are uncommitted changes, ask whether to commit first
5. Push to `main` branch — this triggers Vercel's automatic deployment
6. Remind: CLI deploy (`vercel deploy`) is NOT recommended due to file size limits. Always use the GitHub integration.
7. Region: iad1 (US East). Security headers are configured in vercel.json.
