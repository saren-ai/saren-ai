# Changelog: Vercel Deployment Setup

**Date:** February 16, 2026
**Author:** Saren.ai (Assistant)

## Overview

Successfully configured and verified the automatic deployment pipeline from GitHub to Vercel. This ensures that all changes pushed to the `main` branch are automatically built and deployed to production.

## Decisions & Configuration

### 1. Deployment Pipeline
- **Source:** GitHub Repository (`saren-ai/saren-ai`)
- **Trigger:** Push to `main` branch
- **Platform:** Vercel
- **Status:** **Active & Verified**

### 2. Manual Deployment
- **Decision:** manual deployments via CLI (`vercel deploy --prod`) are **discouraged** for this project.
- **Reason:** The project contains large static assets that exceed the Vercel CLI file upload limit (100MB). The GitHub integration bypasses this limitation by building directly from the repository source.

### 3. Verification
- Confirmed `vercel.json` configuration is correct.
- Verified `.gitignore` properly excludes `node_modules`, `.next`, and other build artifacts.
- Triggered a test deployment via empty commit to confirm the pipeline is operational.

## Action Items
- [x] Link local project to Vercel project `saren-ai`.
- [x] Connect Vercel project to GitHub repository.
- [x] Verify deployment trigger.
