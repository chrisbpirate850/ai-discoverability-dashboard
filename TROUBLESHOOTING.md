# Troubleshooting Guide

## Turbopack Error on Development Server

**Issue:** Runtime error: "An unexpected Turbopack error occurred"

**Solution:** The issue was with Turbopack in Next.js 15.5.6. I've already fixed this in `package.json` by removing the `--turbopack` flag.

The dev script now runs as:
```json
"dev": "next dev"
```

This uses the traditional webpack compiler instead of Turbopack, which resolves the error.

### If You Still See the Error

1. Make sure you're using the updated `package.json`
2. Stop any running dev servers
3. Run: `npm run dev`
4. The server should start on http://localhost:3000 (or the next available port)

## Port Already in Use

**Issue:** Port 3000 is already in use

**Solution:** Next.js will automatically use the next available port (3001, 3002, etc.). Check the terminal output for the actual URL.

Alternatively, you can:
1. Stop the process using port 3000
2. Or specify a different port: `npm run dev -- -p 3001`

## Supabase Not Configured

**Issue:** Dashboard shows but no historical data

**Solution:** The dashboard works without Supabase for basic monitoring. To enable historical tracking:

1. Create a Supabase project at https://app.supabase.com
2. Run the SQL from `supabase-schema.sql` in the SQL Editor
3. Add your credentials to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
   ```
4. Restart the dev server

## Environment Variables Not Working

**Issue:** Changes to `.env.local` aren't being picked up

**Solution:**
1. Always restart the dev server after modifying `.env.local`
2. Make sure there are no typos in variable names
3. Verify the file is named `.env.local` (not `.env.local.txt`)

## Module Not Found Errors

**Issue:** "Module not found" errors in the terminal

**Solution:**
1. Delete `node_modules` and `.next`:
   ```bash
   rm -rf node_modules .next
   ```
2. Reinstall dependencies:
   ```bash
   npm install
   ```
3. Restart the dev server:
   ```bash
   npm run dev
   ```

## Site Checks Timeout

**Issue:** Site checks are timing out or failing

**Solution:**
- Some sites may have slow response times
- The default timeout is built into the fetch call
- For development, this is normal for the first checks
- If persistent, the site may be down or blocking requests

## TypeScript Errors

**Issue:** Type errors in the IDE or terminal

**Solution:** All types are defined in `lib/types.ts`. If you modify the site structure:
1. Update types in `lib/types.ts`
2. Update the corresponding data in `lib/sites-data.ts`
3. Restart your TypeScript server in your IDE

## Build Errors

**Issue:** `npm run build` fails

**Solution:**
1. Fix any TypeScript errors first
2. Make sure all environment variables are set (if using Supabase)
3. Check that all imports are correct
4. Try deleting `.next` and rebuilding

## Dashboard Shows Blank Page

**Issue:** Dashboard loads but shows nothing

**Solution:**
1. Check the browser console for errors
2. Verify `lib/sites-data.ts` has valid data
3. Make sure all components are imported correctly
4. Check that the dev server compiled successfully

## API Endpoints Return 404

**Issue:** `/api/check-site` or other endpoints return 404

**Solution:**
1. Verify the API route files exist in `app/api/`
2. Check the file structure matches:
   - `app/api/check-site/route.ts`
   - `app/api/check-all-sites/route.ts`
   - etc.
3. Restart the dev server

## Need More Help?

Check these files for detailed information:
- `README.md` - Full documentation
- `QUICK-START.md` - Setup guide
- Inline code comments in the source files

Or review the Next.js documentation at https://nextjs.org/docs
