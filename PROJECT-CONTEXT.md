# AI Discoverability Dashboard - Project Context

## 🎯 Project Overview

**Purpose**: Monitor AI readability and deployment status of all Christopher J. Bradley web properties.

**Problem Solved**: Client-side rendered (CSR) websites are invisible to AI assistants like Claude. This dashboard tracks which sites are AI-readable (SSG/SSR) vs not readable (CSR), helping ensure proper discoverability.

**Live URL**: [Check Netlify deployment]
**GitHub**: https://github.com/chrisbpirate850/ai-discoverability-dashboard
**Local Dev**: `npm run dev` (runs on http://localhost:3004)

---

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 15.5.6 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (optional - works without it)
- **Deployment**: Netlify
- **Version Control**: GitHub

### Key Design Decisions

1. **Next.js App Router** - Modern React patterns with server components
2. **Client-Side Monitoring** - Dashboard page is a client component for real-time updates
3. **Supabase Optional** - Works without database for simple monitoring
4. **15-Minute Auto-Refresh** - Balances freshness with API costs
5. **Color-Coded Status** - Visual at-a-glance site health (🟢🟡🔴)

---

## 📊 Monitored Sites (23 Total)

### 🏠 HUB Ecosystem (1 site)
1. **Christopher J Bradley** - https://christopherjbradley.com
   - Framework: Astro
   - Status: Live & AI-readable ✅
   - Priority: HIGH
   - SEO Score: 95+/100
   - Domain: SiteGround (expires 2027-04-05)

### 📚 Art of Citizenship Ecosystem (4 sites)
2. **The Art of Citizenship** - https://theartofcitizenship.com
   - Status: Live (registrar unknown)
   - Priority: HIGH
   - Domain: Unknown registrar (needs investigation)

3. **Liberty's Principles Pals** - https://libertysprinciplespals.com
   - Framework: Next.js
   - Status: Live & AI-readable ✅
   - Priority: HIGH
   - Domain: Squarespace (expires 2026-04-30)

4. **The Citizens Compass** - https://thecitizenscompass.com
   - Framework: Next.js
   - Status: Live & AI-readable ✅
   - Priority: HIGH
   - Domain: SiteGround (expires 2025-12-21) ⚠️ URGENT

5. **Family Unity Hub** - https://familyunityhub.com
   - Status: Not built
   - Priority: MEDIUM
   - Domain: Squarespace (expires 2026-04-15)

### ⏰ There Is Still Time Ecosystem (4 sites)
6. **There Is Still Time** - https://thereisstilltime.com
   - Status: Not built
   - Priority: MEDIUM
   - Domain: WA/IONOS (expires 2026-10-05, auto-renew)

7. **There Is Still Time App** - https://app.thereisstilltime.com
   - Framework: React (CSR)
   - Status: Live (intentionally not AI-readable - it's an app)
   - Priority: LOW
   - Domain: Subdomain of thereisstilltime.com

8. **Love Everyone** - https://loveeveryone.love
   - Status: Not built
   - Priority: MEDIUM
   - Domain: Name.com (expires 2026-03-23)

9. **Sunsets for the Soul** - https://sunsetsforthesoul.com
   - Status: Not built
   - Priority: LOW
   - Domain: SiteGround (expires 2026-02-25)

### 📦 Other Registered Domains (14 sites)
Includes TLD protection domains, typo protection, and additional registered domains:
- chrisbpirate.com, sandtimerhourglass.com, fairbillanalyzer.com
- libertysprinciples.com, libertysprinciplesmedia.com
- youroldsaltlife.com, ruwethepeople.com, ecmwave.com
- commonsenselocalmarketing.com
- fumilyunityhub.com, libertysprincipalspals.com (typo protection)
- thereisstilltime.store, thereisstilltime.online, thereisstilltime.net (TLD protection)

---

## ✨ Current Features (As of Oct 25, 2025)

### Real-Time Monitoring
- ✅ Automatic site checks every 15 minutes
- ✅ Manual "Check All Sites Now" button
- ✅ Live countdown timer to next auto-check
- ✅ Color-coded status indicators (🟢🟡🔴)
- ✅ Last check timestamp with relative time ("5m ago")
- ✅ Loading states and animations
- ✅ **NEW: Live HTTP requests to all sites on every check**
- ✅ **NEW: Console logging showing real-time progress**
- ✅ **NEW: Initial check runs immediately on page load**

### SEO Analysis (NEW!)
- ✅ 100-point SEO scoring system
- ✅ Title tag analysis (15 points)
- ✅ Meta description analysis (20 points)
- ✅ Mobile viewport check (15 points)
- ✅ Open Graph tags (20 points)
- ✅ Twitter Card tags (15 points)
- ✅ Structured data detection (15 points)
- ✅ Visual SEO score badges (green/yellow/red)
- ✅ Icon indicators for each SEO element (📝📱🌐🐦📊)

### Domain Management (NEW!)
- ✅ Full domain registration tracking (23 domains)
- ✅ Registrar information (WA/IONOS, SiteGround, Squarespace, Name.com)
- ✅ Expiration date monitoring
- ✅ Auto-renew status tracking
- ✅ Privacy protection status
- ✅ **Domain expiration alerts** (critical <30 days, warning 30-90 days)
- ✅ **Unknown registrar alerts** with investigation instructions
- ✅ Domain statistics in header (registered, expiring soon)

### Dashboard Views
- ✅ Home page with all sites grouped by ecosystem
- ✅ Individual site detail pages (click any site card)
- ✅ Statistics summary (sites, deployment status, domain status)
- ✅ Status legend for color codes
- ✅ **NEW: Domain expiration alerts banner**
- ✅ **NEW: Unknown registrar alerts banner**
- ✅ **NEW: Initial loading banner with progress info**

### API Endpoints
- `/api/check-site?url=<url>` - Check single site with SEO analysis
- `/api/check-all-sites` - Check all sites with detailed logging
- `/api/history?site=<url>` - Get historical data (requires Supabase)
- `/api/webhook/netlify` - Netlify build webhooks (requires Supabase)

---

## 📁 Project Structure

```
ai-discoverability-dashboard/
├── app/
│   ├── api/
│   │   ├── check-all-sites/route.ts    # Checks all sites
│   │   ├── check-site/route.ts         # Checks single site
│   │   ├── history/route.ts            # Historical data
│   │   └── webhook/netlify/route.ts    # Netlify webhooks
│   ├── site/[url]/page.tsx             # Site detail page
│   ├── layout.tsx                       # Root layout
│   ├── page.tsx                         # Main dashboard (CLIENT COMPONENT)
│   └── globals.css                      # Global styles
├── components/
│   ├── DashboardHeader.tsx              # Stats summary header
│   ├── EcosystemSection.tsx             # Group of sites by ecosystem
│   ├── SiteStatusCard.tsx               # Individual site card
│   ├── DomainExpirationAlert.tsx        # Domain expiration warnings (NEW)
│   └── UnknownRegistrarAlert.tsx        # Unknown registrar alerts (NEW)
├── lib/
│   ├── sites-data.ts                    # ** SITE DATA SOURCE **
│   ├── supabase.ts                      # Supabase client (optional)
│   ├── types.ts                         # TypeScript types
│   └── utils.ts                         # Helper functions
├── public/                              # Static assets
├── netlify.toml                         # Netlify config
├── package.json                         # Dependencies
├── tsconfig.json                        # TypeScript config
├── tailwind.config.ts                   # Tailwind config
├── PROJECT-CONTEXT.md                   # This file
├── README.md                            # Standard readme
├── QUICK-START.md                       # Quick setup guide
└── TROUBLESHOOTING.md                   # Common issues
```

---

## 🔧 How to Modify Sites

### Adding/Updating Sites

**File to Edit**: `lib/sites-data.ts`

```typescript
{
  name: 'Site Name',
  url: 'https://example.com',
  ecosystem: 'hub' | 'art-of-citizenship' | 'there-is-still-time' | 'other',
  priority: 'HIGH' | 'MEDIUM' | 'LOW',
  current_status: 'live' | 'building' | 'deploying' | 'not-built' | 'error',
  framework: 'Next.js' | 'Astro' | 'React (CSR)' | null,
  ai_readable: true | false,
  next_action: 'Description of next step',
  domain_info: {
    registered: true | false,
    registrar: 'WA/IONOS' | 'SiteGround' | 'Squarespace' | 'Name.com' | 'Other',
    expiration_date: '2026-04-15', // ISO date format
    auto_renew: true | false,
    privacy_enabled: true | false,
    hosting_at_registrar: true | false,
    notes: 'Any relevant domain notes'
  }
}
```

### Status Meanings

- **live**: Site is deployed and accessible
- **building**: Currently building
- **deploying**: Build complete, deploying
- **not-built**: Needs to be built/rebuilt
- **error**: Build or deployment error

### Color Indicator Logic

- 🟢 Green: `current_status === 'live' AND ai_readable === true`
- 🟡 Yellow: `current_status === 'building' OR 'deploying'`
- 🔴 Red: `current_status === 'not-built' OR 'error' OR ai_readable === false`

---

## 🚀 Deployment

### Current Setup
- **Hosting**: Netlify
- **Build Command**: `npm run build`
- **Publish Directory**: `.next`
- **Auto-Deploy**: Enabled from GitHub main/master branch

### Environment Variables (Optional)
If using Supabase features:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

### Deployment Process
1. Push to GitHub: `git push`
2. Netlify auto-deploys in 2-3 minutes
3. Check deployment at Netlify URL

### Manual Deploy
```bash
cd ai-discoverability-dashboard
netlify deploy --prod
```

---

## 🔬 How Site Checking Works

### Check Flow
1. User clicks "Check All Sites Now" OR 15-min timer expires OR page loads
2. Frontend calls `/api/check-all-sites`
3. API makes **real HTTP request** to each site sequentially
4. For each site:
   - Checks response status (200 = live)
   - Analyzes HTML content for AI readability
   - Performs comprehensive SEO analysis (100-point system)
   - Logs progress to console: `[CHECK 1/23] Fetching https://...`
5. Returns results with status, SEO scores, and timestamps
6. Frontend **overrides initial data** with live results
7. Dashboard updates with current deployment status and SEO scores

### AI Readability Detection
- Fetches site URL via HTTP GET
- Checks if meaningful content exists in initial HTML response
- If content only loads via JavaScript → Not AI-readable (CSR)
- If content in HTML → AI-readable (SSG/SSR)
- Used by LLMs like Claude to determine if site is crawlable

### SEO Analysis System (NEW!)
Analyzes 6 key SEO factors with 100-point scoring:

1. **Title Tag (15 points)** - Checks for title tag, optimal length 30-60 chars
2. **Meta Description (20 points)** - Checks for description, optimal length 120-160 chars
3. **Viewport Tag (15 points)** - Mobile-friendly viewport meta tag
4. **Open Graph (20 points)** - Facebook/social sharing (og:title, og:description, og:image)
5. **Twitter Card (15 points)** - Twitter sharing (twitter:card, twitter:title, etc.)
6. **Structured Data (15 points)** - JSON-LD or schema.org markup

**Score Ranges:**
- 🟢 80-100: Excellent SEO
- 🟡 60-79: Good SEO, room for improvement
- 🔴 0-59: Needs SEO work

---

## 🐛 Known Issues & Solutions

### Issue: Supabase Not Configured
**Solution**: Dashboard works without Supabase! Historical features disabled but monitoring works.

### Issue: CORS Errors on Site Checks
**Solution**: Some sites may block API requests. This is expected. Status will show as error.

### Issue: Build Fails
**Check**:
1. `npm run build` locally first
2. Fix any TypeScript errors
3. Ensure all imports are correct

---

## 📚 Important Learnings

### AI Discoverability Rules
1. **Client-Side Rendering (CSR) = Invisible to AI**
   - React with client-side routing
   - Lovable/Bolt generated sites
   - Vue/Svelte SPAs

2. **What Works for AI**
   - Static Site Generation (SSG) - Astro, Next.js SSG
   - Server-Side Rendering (SSR) - Next.js SSR
   - Plain HTML/PHP/WordPress

3. **Testing AI Readability**
   - View Page Source in browser
   - If content is in HTML → AI can read it
   - If just shell/scripts → AI cannot read it

---

## 🎯 Future Enhancements (Potential)

### Planned Features
- [ ] Supabase integration for historical tracking
- [ ] Uptime percentage graphs
- [ ] Response time monitoring
- [ ] Email/Slack alerts on status changes
- [ ] Custom domain setup (status.christopherjbradley.com)
- [ ] Netlify webhook integration for build tracking
- [ ] Export data as CSV/JSON
- [ ] Automated domain renewal reminders
- [ ] WHOIS integration for automatic registrar lookup

### Nice-to-Have
- [ ] Dark mode toggle
- [ ] Mobile app view
- [ ] Site screenshots
- [ ] Performance metrics (Lighthouse scores)
- [ ] Advanced SEO recommendations
- [ ] Link checker (broken links detection)
- [ ] SSL certificate expiration monitoring

---

## 🔑 Key Files to Remember

### Most Frequently Modified
1. **lib/sites-data.ts** - Update site information here
2. **app/page.tsx** - Main dashboard logic
3. **components/SiteStatusCard.tsx** - How sites are displayed

### Configuration Files
- **netlify.toml** - Netlify deployment config
- **package.json** - Dependencies and scripts
- **tsconfig.json** - TypeScript settings

### Documentation
- **PROJECT-CONTEXT.md** - This file (comprehensive context)
- **README.md** - User-facing documentation
- **QUICK-START.md** - Setup instructions
- **TROUBLESHOOTING.md** - Common problems

---

## 💡 Development Tips

### Local Development
```bash
cd ai-discoverability-dashboard
npm install
npm run dev
# Open http://localhost:3003
```

### Testing Changes
```bash
npm run build     # Test production build
npm run lint      # Check for errors
```

### Git Workflow
```bash
git add .
git commit -m "Description of changes"
git push
# Netlify auto-deploys
```

---

## 📞 Project History

### Initial Build (Oct 21, 2025)
- Created from dashboard-blueprint.md specifications
- Set up Next.js 15 with TypeScript and Tailwind CSS
- Implemented basic site listing and organization

### Enhancement Phase (Oct 21, 2025)
- Added real-time monitoring with auto-refresh
- Implemented "Check All Sites Now" button
- Added countdown timer for next check
- Enhanced timestamps with relative time
- Updated ChristopherJBradley.com status

### Deployment (Oct 21, 2025)
- Pushed to GitHub
- Connected to Netlify
- Verified AI-readability with Claude.ai ✅

### Major Feature Update (Oct 25, 2025)
**Domain Management System:**
- Integrated domain registration data from 4 registrars (WA/IONOS, SiteGround, Squarespace, Name.com)
- Added domain tracking for all 23 domains
- Implemented expiration date monitoring
- Created domain expiration alert system (critical and warning levels)
- Added unknown registrar alerts with investigation guides
- Expanded from 9 to 23 total domains being monitored
- Added "other" ecosystem for TLD/typo protection domains

**SEO Analysis System:**
- Implemented 100-point SEO scoring system
- Added 6-factor analysis: title, meta description, viewport, Open Graph, Twitter Cards, structured data
- Created visual SEO score badges (green/yellow/red)
- Added icon indicators for each SEO element
- SEO scores display on all live sites

**Live Checking Enhancements:**
- Confirmed real HTTP requests to all sites on every check
- Added comprehensive console logging for transparency
- Implemented initial check on page load with loading banner
- Added detailed progress tracking (CHECK 1/23, 2/23, etc.)
- Live data completely overrides initial static data
- Check completion logs total time taken

**UI/UX Improvements:**
- Fixed hydration errors with time display
- Added suppressHydrationWarning for browser extensions
- Created purple banner showing live check in progress
- Added deployment status badges
- Added "Find Registrar!" badges for unknown registrars
- Enhanced site cards with domain info and SEO scores
- Updated dashboard header with domain statistics

**Bug Fixes:**
- Corrected domain registrar information for 10+ domains
- Updated deployment status for christopherjbradley.com, libertysprinciplespals.com, theartofcitizenship.com
- Fixed port to 3004 (3000 was in use)
- Resolved React hydration mismatch errors

---

## 🎓 Context for Future Sessions

**What this dashboard does**: Monitors 23 web properties across 4 ecosystems for AI-discoverability, SEO optimization, and domain management.

**Why it exists**: CSR sites are invisible to AI assistants. This tracks which sites need SSG/SSR rebuilds, monitors SEO health, and prevents domain expiration.

**How to use it**:
- Visit http://localhost:3004 for local dev
- Dashboard automatically checks all 23 sites on page load
- Manual checks via "Check All Sites Now" button
- Auto-refresh every 15 minutes
- Open browser console (F12) to see real-time progress
- Review color-coded status, SEO scores, and domain alerts

**How to modify**:
- Edit `lib/sites-data.ts` to update site info
- Push to GitHub → Netlify auto-deploys
- All changes immediately reflected in live checks

**Current state**:
- ✅ Fully functional with real-time monitoring
- ✅ 100-point SEO analysis on all live sites
- ✅ Complete domain tracking for 23 domains
- ✅ Live HTTP checking with console logging
- ✅ Deployed on Netlify, AI-readable confirmed
- ⚠️ 2 domains expiring soon (thecitizenscompass.com Dec 21, libertysprinciplesmedia.com Nov 26)
- ⚠️ 1 unknown registrar (theartofcitizenship.com)

---

**Last Updated**: October 25, 2025
**Project Status**: ✅ Deployed and Active
**Maintainer**: Christopher J. Bradley
**AI Assistant**: Claude Code
