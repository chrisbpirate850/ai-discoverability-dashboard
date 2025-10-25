import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

// SEO Analysis Function
function analyzeSEO(html: string) {
  const score = {
    total: 0,
    maxScore: 100,
    checks: {
      hasTitle: false,
      hasMetaDescription: false,
      hasViewport: false,
      hasOpenGraph: false,
      hasTwitterCard: false,
      hasStructuredData: false,
      titleLength: 0,
      descriptionLength: 0
    },
    details: {} as Record<string, string>
  };

  // Title tag (15 points)
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) {
    score.checks.hasTitle = true;
    score.checks.titleLength = titleMatch[1].length;
    score.details.title = titleMatch[1];
    if (titleMatch[1].length >= 30 && titleMatch[1].length <= 60) {
      score.total += 15;
    } else if (titleMatch[1].length > 0) {
      score.total += 10;
    }
  }

  // Meta description (20 points)
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  if (descMatch) {
    score.checks.hasMetaDescription = true;
    score.checks.descriptionLength = descMatch[1].length;
    score.details.description = descMatch[1];
    if (descMatch[1].length >= 120 && descMatch[1].length <= 160) {
      score.total += 20;
    } else if (descMatch[1].length > 0) {
      score.total += 15;
    }
  }

  // Viewport meta tag (15 points)
  if (html.includes('name="viewport"') || html.includes('name=\'viewport\'')) {
    score.checks.hasViewport = true;
    score.total += 15;
  }

  // Open Graph tags (20 points)
  const ogTitleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i);
  const ogDescMatch = html.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i);
  const ogImageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);

  if (ogTitleMatch && ogDescMatch) {
    score.checks.hasOpenGraph = true;
    score.total += ogImageMatch ? 20 : 15;
    score.details.ogTitle = ogTitleMatch[1];
  }

  // Twitter Card (15 points)
  if (html.includes('twitter:card')) {
    score.checks.hasTwitterCard = true;
    score.total += 15;
  }

  // Structured Data / JSON-LD (15 points)
  if (html.includes('application/ld+json') || html.includes('itemscope')) {
    score.checks.hasStructuredData = true;
    score.total += 15;
  }

  return score;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json(
      { error: 'URL parameter is required' },
      { status: 400 }
    );
  }

  try {
    const startTime = Date.now();

    // Fetch the site
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'AI-Discoverability-Checker/1.0'
      }
    });

    const responseTime = Date.now() - startTime;
    const html = await response.text();

    // Check if content exists in the HTML (not just client-side rendered shell)
    const hasContent = html.length > 5000 &&
      !html.includes('id="__next"') ||
      (html.includes('id="__next"') && html.length > 50000);

    // SEO Analysis
    const seoScore = analyzeSEO(html);

    const result = {
      url,
      status: response.ok ? 'live' : 'error',
      content_found: hasContent,
      response_time: responseTime,
      timestamp: new Date().toISOString(),
      ai_readable: hasContent && response.ok,
      html_length: html.length,
      seo: seoScore
    };

    // Store in Supabase if configured
    if (isSupabaseConfigured()) {
      try {
        // First, find or create the site
        const { data: siteData } = await supabase
          .from('sites')
          .select('id')
          .eq('url', url)
          .single();

        if (siteData) {
          // Store the check result
          await supabase.from('checks').insert({
            site_id: siteData.id,
            timestamp: result.timestamp,
            status: result.status,
            content_found: result.content_found,
            response_time: result.response_time,
            error: response.ok ? null : `HTTP ${response.status}`
          });

          // Update the site's last check
          await supabase
            .from('sites')
            .update({
              current_status: result.status,
              last_check: result.timestamp,
              ai_readable: result.ai_readable
            })
            .eq('id', siteData.id);
        }
      } catch (dbError) {
        console.error('Database error:', dbError);
        // Continue even if DB write fails
      }
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        url,
        status: 'error',
        content_found: false,
        response_time: 0,
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
        ai_readable: false
      },
      { status: 500 }
    );
  }
}
