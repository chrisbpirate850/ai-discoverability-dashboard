# AI Discoverability Dashboard

A Next.js 15 monitoring dashboard for tracking the AI discoverability status of your websites. This dashboard helps you monitor which of your sites are accessible to AI assistants like Claude, ChatGPT, and others.

> 📋 **For full project context and detailed documentation**, see [PROJECT-CONTEXT.md](./PROJECT-CONTEXT.md)
>
> That file contains comprehensive information about architecture, monitored sites, how everything works, and tips for future development sessions.

## Features

- **Real-time Status Monitoring**: Track the status of all your sites with color-coded indicators (🟢🟡🔴)
- **Auto-Refresh**: Automatically checks all sites every 15 minutes with countdown timer
- **Manual Checks**: "Check All Sites Now" button for on-demand updates
- **Last Check Timestamps**: Shows when each site was last checked (e.g., "5m ago")
- **Ecosystem Organization**: Sites grouped by hub-and-spoke architecture
- **Individual Site Details**: Detailed pages for each site with historical data
- **Automated Checks**: API endpoints to check site availability and AI readability
- **Netlify Integration**: Webhook support for build notifications
- **Historical Tracking**: View uptime percentages and response time trends (requires Supabase)

## Tech Stack

- **Framework**: Next.js 15.5.6 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (optional, for historical tracking)
- **Deployment**: Netlify
- **GitHub**: https://github.com/chrisbpirate850/ai-discoverability-dashboard

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your configuration:

```env
# Optional: For historical tracking and database features
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Base URL for API endpoints
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3003](http://localhost:3003) to see the dashboard.

## Supabase Setup (Optional)

The dashboard works without Supabase, but you'll need it for historical tracking and persistent data.

### 1. Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Create a new project
3. Copy your project URL and anon key to `.env.local`

### 2. Run Database Schema

1. Open the Supabase SQL Editor
2. Copy the contents of `supabase-schema.sql`
3. Execute the SQL to create tables and insert initial data

### 3. Configure Row Level Security

The schema includes basic RLS policies. Adjust them based on your security needs.

## Site Configuration

Edit `lib/sites-data.ts` to customize the sites you want to monitor:

```typescript
export const SITES = [
  {
    name: 'Your Site Name',
    url: 'https://yoursite.com',
    ecosystem: 'hub', // or 'art-of-citizenship' or 'there-is-still-time'
    priority: 'HIGH', // HIGH, MEDIUM, or LOW
    current_status: 'live', // live, building, deploying, error, not-built
    framework: 'Next.js',
    ai_readable: true,
    next_action: 'Description of next task'
  },
  // Add more sites...
];
```

## API Endpoints

### Check Single Site

```bash
GET /api/check-site?url=https://yoursite.com
```

Returns the current status and AI readability of a site.

### Check All Sites

```bash
GET /api/check-all-sites
# or
POST /api/check-all-sites
```

Checks all configured sites and returns their status.

### Get Site History

```bash
GET /api/history?site=https://yoursite.com&limit=50
```

Returns check history for a specific site (requires Supabase).

### Netlify Webhook

```bash
POST /api/webhook/netlify
```

Endpoint for Netlify deployment notifications. Configure this in your Netlify site settings:

1. Go to Site Settings → Build & Deploy → Deploy notifications
2. Add a webhook for "Deploy succeeded" and "Deploy failed"
3. Set URL to: `https://your-dashboard-url.com/api/webhook/netlify`

## Automated Monitoring

### Using Vercel Cron Jobs

Add to `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/check-all-sites",
      "schedule": "*/15 * * * *"
    }
  ]
}
```

This will check all sites every 15 minutes.

### Using External Cron Services

You can use services like cron-job.org or GitHub Actions to periodically call:

```bash
curl -X POST https://your-dashboard-url.com/api/check-all-sites
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

```bash
npm run build
```

### Deploy to Netlify

1. Build the project:

```bash
npm run build
```

2. Deploy the `.next` folder or connect your Git repository

### Custom Domain

Configure a custom subdomain like:
- `status.christopherjbradley.com`
- `dashboard.christopherjbradley.com`

## Understanding AI Discoverability

### What Makes a Site AI-Readable?

**✅ Works:**
- Static Site Generation (SSG) - Astro, Next.js SSG
- Server-Side Rendering (SSR) - Next.js, Nuxt
- Traditional HTML/PHP/WordPress

**❌ Doesn't Work:**
- Client-Side Rendering (CSR) - Pure React, Vue, Svelte SPAs
- Sites built with Lovable, Bolt, or similar no-code tools (they use CSR)

### How This Dashboard Checks

The `/api/check-site` endpoint:
1. Fetches the site's HTML
2. Checks if substantial content exists in the HTML (not just a loading shell)
3. Measures response time
4. Determines if the site is AI-readable

## Project Structure

```
ai-discoverability-dashboard/
├── app/
│   ├── page.tsx                 # Home dashboard
│   ├── site/[url]/page.tsx      # Individual site detail page
│   └── api/
│       ├── check-site/          # Check single site
│       ├── check-all-sites/     # Check all sites
│       ├── history/             # Get site history
│       └── webhook/netlify/     # Netlify webhook handler
├── components/
│   ├── DashboardHeader.tsx      # Dashboard stats header
│   ├── EcosystemSection.tsx     # Ecosystem group component
│   └── SiteStatusCard.tsx       # Individual site card
├── lib/
│   ├── types.ts                 # TypeScript types
│   ├── sites-data.ts            # Site configuration
│   ├── supabase.ts              # Supabase client
│   └── utils.ts                 # Utility functions
├── supabase-schema.sql          # Database schema
└── README.md
```

## Troubleshooting

### Dashboard shows but no historical data

Make sure you've:
1. Created a Supabase project
2. Run the `supabase-schema.sql` script
3. Added environment variables to `.env.local`
4. Restarted your dev server

### Site checks timing out

Some sites may have slow response times. The checks have a default timeout. You can adjust this in `app/api/check-site/route.ts`.

### Netlify webhooks not working

1. Verify the webhook URL is correct
2. Check that your deployment is using HTTPS
3. Look at the webhook logs in Netlify

## Contributing

Feel free to customize this dashboard for your own needs. Key files to modify:

- `lib/sites-data.ts` - Your sites and ecosystems
- `lib/types.ts` - Data types
- Components in `components/` - UI customization

## License

MIT License - feel free to use this for your own projects!

## Support

For issues or questions, please check the inline code comments or create an issue in your repository.

---

Built with Next.js 14, TypeScript, and Tailwind CSS
