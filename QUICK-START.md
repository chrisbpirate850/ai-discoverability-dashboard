# Quick Start Guide

Get your AI Discoverability Dashboard up and running in 5 minutes!

## Step 1: Run the Dashboard Locally

```bash
cd ai-discoverability-dashboard
npm install
npm run dev
```

Open http://localhost:3000 (or the port shown in your terminal)

**That's it!** The dashboard will work without Supabase, showing your sites from the static configuration.

## Step 2 (Optional): Add Supabase for Historical Tracking

### A. Create Supabase Project

1. Go to https://app.supabase.com
2. Click "New Project"
3. Fill in project details and wait for setup

### B. Get Your Credentials

1. In Supabase, go to Project Settings → API
2. Copy your:
   - Project URL
   - Anon/Public Key

### C. Configure Environment

1. Edit `.env.local`
2. Add your credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-url-here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key-here
   ```

### D. Create Database Tables

1. In Supabase, click "SQL Editor"
2. Click "New Query"
3. Copy and paste the entire contents of `supabase-schema.sql`
4. Click "Run"

### E. Restart Your Server

```bash
# Stop the dev server (Ctrl+C)
npm run dev
```

Now you'll have historical tracking!

## Step 3: Customize Your Sites

Edit `lib/sites-data.ts` to add/remove/modify your sites:

```typescript
{
  name: 'My New Site',
  url: 'https://mynewsite.com',
  ecosystem: 'hub', // hub, art-of-citizenship, or there-is-still-time
  priority: 'HIGH', // HIGH, MEDIUM, or LOW
  current_status: 'building', // live, building, deploying, error, not-built
  framework: 'Astro',
  ai_readable: false,
  next_action: 'Deploy to production'
}
```

## Step 4: Deploy to Production

### Option A: Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to https://vercel.com
3. Click "Import Project"
4. Select your repository
5. Add environment variables (if using Supabase)
6. Click "Deploy"

Vercel will automatically run checks every 15 minutes using the `vercel.json` config!

### Option B: Deploy to Netlify

1. Push your code to GitHub
2. Go to https://netlify.com
3. Click "Add new site" → "Import existing project"
4. Select your repository
5. Add environment variables (if using Supabase)
6. Click "Deploy"

## Next Steps

### Set up Netlify Webhooks

If your sites are hosted on Netlify:

1. Go to Site Settings → Build & Deploy → Deploy notifications
2. Add webhook for "Deploy succeeded"
3. URL: `https://your-dashboard.com/api/webhook/netlify`
4. Repeat for "Deploy failed"

### Test the API

Try these endpoints:

```bash
# Check a single site
curl https://your-dashboard.com/api/check-site?url=https://christopherjbradley.com

# Check all sites
curl -X POST https://your-dashboard.com/api/check-all-sites

# Get history (requires Supabase)
curl https://your-dashboard.com/api/history?site=https://christopherjbradley.com
```

## Troubleshooting

**Dashboard shows but sites aren't updating?**
- The dashboard uses static data by default
- Set up Supabase for dynamic updates

**Port 3000 already in use?**
- Next.js will automatically use the next available port
- Check the terminal output for the actual port

**Environment variables not working?**
- Make sure you restart the dev server after editing `.env.local`
- Check for typos in variable names

**Database errors?**
- Verify your Supabase credentials are correct
- Make sure you ran the schema SQL in Supabase

## Questions?

Check the full README.md for detailed documentation!
