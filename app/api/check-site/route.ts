import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

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

    const result = {
      url,
      status: response.ok ? 'live' : 'error',
      content_found: hasContent,
      response_time: responseTime,
      timestamp: new Date().toISOString(),
      ai_readable: hasContent && response.ok,
      html_length: html.length
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
