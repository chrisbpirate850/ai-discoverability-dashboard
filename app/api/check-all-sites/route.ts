import { NextResponse } from 'next/server';
import { SITES } from '@/lib/sites-data';

export async function POST() {
  const results = [];

  for (const site of SITES) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/check-site?url=${encodeURIComponent(site.url)}`,
        { method: 'GET' }
      );

      const data = await response.json();
      results.push({
        name: site.name,
        url: site.url,
        ...data
      });
    } catch (error) {
      results.push({
        name: site.name,
        url: site.url,
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    total_sites: SITES.length,
    results
  });
}

export async function GET() {
  return POST();
}
