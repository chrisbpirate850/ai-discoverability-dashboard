# AI Discoverability Dashboard - Project Context

## 🎯 Project Overview

**Purpose**: Monitor AI readability and deployment status of all Christopher J. Bradley web properties.

**Problem Solved**: Client-side rendered (CSR) websites are invisible to AI assistants like Claude. This dashboard tracks which sites are AI-readable (SSG/SSR) vs not readable (CSR), helping ensure proper discoverability.

**Live URL**: [Check Netlify deployment]
**GitHub**: https://github.com/chrisbpirate850/ai-discoverability-dashboard
**Local Dev**: `npm run dev` (runs on http://localhost:3003)

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

## 📊 Monitored Sites (9 Total)

### 🏠 HUB Ecosystem
1. **Christopher J Bradley** - https://christopherjbradley.com
   - Framework: Astro
   - Status: DNS propagating
   - Priority: HIGH

### 📚 Art of Citizenship Ecosystem
2. **The Art of Citizenship** - https://theartofcitizenship.com
   - Status: Not built
   - Priority: MEDIUM
   - Next: Decide rebuild or redirect

3. **Liberty's Principles Pals** - https://libertysprinciplespals.com
   - Framework: Next.js (in migration)
   - Status: Building
   - Priority: HIGH

4. **The Citizens Compass** - https://thecitizenscompass.com
   - Framework: Next.js
   - Status: Live & AI-readable ✅
   - Priority: LOW

5. **Family Unity Hub** - https://familyunityhub.com
   - Status: Not built
   - Priority: MEDIUM
   - Next: Rebuild after LPP

### ⏰ There Is Still Time Ecosystem
6. **There Is Still Time** - https://thereisstilltime.com
   - Status: Not built
   - Priority: MEDIUM
   - Next: Marketing site rebuild

7. **There Is Still Time App** - https://app.thereisstilltime.com
   - Framework: React (CSR)
   - Status: Live (intentionally not AI-readable - it's an app)
   - Priority: LOW

8. **Love Everyone** - https://loveeveryone.love
   - Status: Not built
   - Priority: MEDIUM
   - Next: Peace message site

9. **Sunsets for the Soul** - https://sunsetsforthesoul.com
   - Status: Not built
   - Priority: LOW
   - Next: Photo gallery site

---

## ✨ Current Features (As of Oct 21, 2025)

### Real-Time Monitoring
- ✅ Automatic site checks every 15 minutes
- ✅ Manual "Check All Sites Now" button
- ✅ Live countdown timer to next auto-check
- ✅ Color-coded status indicators (🟢🟡🔴)
- ✅ Last check timestamp with relative time ("5m ago")
- ✅ Loading states and animations

### Dashboard Views
- ✅ Home page with all sites grouped by ecosystem
- ✅ Individual site detail pages (click any site card)
- ✅ Statistics summary (total, live, in-progress, not built)
- ✅ Status legend for color codes

### API Endpoints
- `/api/check-site?url=<url>` - Check single site
- `/api/check-all-sites` - Check all sites
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
│   └── SiteStatusCard.tsx               # Individual site card
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
  ecosystem: 'hub' | 'art-of-citizenship' | 'there-is-still-time',
  priority: 'HIGH' | 'MEDIUM' | 'LOW',
  current_status: 'live' | 'building' | 'deploying' | 'not-built' | 'error',
  framework: 'Next.js' | 'Astro' | 'React (CSR)' | null,
  ai_readable: true | false,
  next_action: 'Description of next step'
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
1. User clicks "Check All Sites Now" OR 15-min timer expires
2. Frontend calls `/api/check-all-sites`
3. API fetches each URL via HTTP
4. Checks response status and HTML content
5. Determines if content is in HTML (AI-readable test)
6. Returns results to frontend
7. Frontend updates site cards with new status

### AI Readability Detection
- Fetches site URL
- Checks if meaningful content exists in initial HTML response
- If content only loads via JavaScript → Not AI-readable (CSR)
- If content in HTML → AI-readable (SSG/SSR)

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

### Nice-to-Have
- [ ] Dark mode toggle
- [ ] Mobile app view
- [ ] Site screenshots
- [ ] Performance metrics (Lighthouse scores)
- [ ] SEO health checks

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

---

## 🎓 Context for Future Sessions

**What this dashboard does**: Monitors 9 web properties across 3 ecosystems to ensure they're AI-discoverable.

**Why it exists**: CSR sites are invisible to AI assistants. This tracks which sites need SSG/SSR rebuilds.

**How to use it**: Visit dashboard, click "Check All Sites Now", review status indicators.

**How to modify**: Edit `lib/sites-data.ts` to update site info, push to GitHub, auto-deploys.

**Current state**: Fully functional with real-time monitoring, deployed on Netlify, AI-readable confirmed.

---

**Last Updated**: October 21, 2025
**Project Status**: ✅ Deployed and Active
**Maintainer**: Christopher J. Bradley
**AI Assistant**: Claude Code
