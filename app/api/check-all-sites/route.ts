import { NextResponse } from 'next/server';
import { SITES } from '@/lib/sites-data';

export async function POST() {
  const results = [];
  const startTime = Date.now();

  console.log(`[CHECK-ALL-SITES] Starting live check of ${SITES.length} sites...`);

  for (let i = 0; i < SITES.length; i++) {
    const site = SITES[i];
    const siteStartTime = Date.now();

    console.log(`[CHECK ${i + 1}/${SITES.length}] Fetching ${site.url}...`);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/check-site?url=${encodeURIComponent(site.url)}`,
        { method: 'GET' }
      );

      const data = await response.json();
      const siteTime = Date.now() - siteStartTime;

      console.log(`[CHECK ${i + 1}/${SITES.length}] ✓ ${site.name}: ${data.status} (${siteTime}ms) - SEO: ${data.seo?.total || 'N/A'}/100`);

      results.push({
        name: site.name,
        url: site.url,
        ...data
      });
    } catch (error) {
      const siteTime = Date.now() - siteStartTime;
      console.log(`[CHECK ${i + 1}/${SITES.length}] ✗ ${site.name}: ERROR (${siteTime}ms)`);

      results.push({
        name: site.name,
        url: site.url,
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  const totalTime = Date.now() - startTime;
  console.log(`[CHECK-ALL-SITES] ✓ Completed ${SITES.length} sites in ${totalTime}ms (${(totalTime / 1000).toFixed(1)}s)`);

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    total_sites: SITES.length,
    total_time_ms: totalTime,
    results
  });
}

export async function GET() {
  return POST();
}
