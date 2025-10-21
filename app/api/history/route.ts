import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: 'Supabase is not configured. Please set up environment variables.' },
      { status: 503 }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const siteUrl = searchParams.get('site');
  const limit = parseInt(searchParams.get('limit') || '50');

  if (!siteUrl) {
    return NextResponse.json(
      { error: 'Site URL parameter is required' },
      { status: 400 }
    );
  }

  try {
    // Get site ID
    const { data: siteData, error: siteError } = await supabase
      .from('sites')
      .select('id, name, url')
      .eq('url', siteUrl)
      .single();

    if (siteError || !siteData) {
      return NextResponse.json(
        { error: 'Site not found' },
        { status: 404 }
      );
    }

    // Get check history
    const { data: checks, error: checksError } = await supabase
      .from('checks')
      .select('*')
      .eq('site_id', siteData.id)
      .order('timestamp', { ascending: false })
      .limit(limit);

    if (checksError) {
      throw checksError;
    }

    // Calculate uptime percentage
    const totalChecks = checks?.length || 0;
    const successfulChecks = checks?.filter(c => c.status === 'live').length || 0;
    const uptimePercentage = totalChecks > 0
      ? (successfulChecks / totalChecks) * 100
      : 0;

    // Calculate average response time
    const validResponseTimes = checks?.filter(c => c.response_time > 0) || [];
    const avgResponseTime = validResponseTimes.length > 0
      ? validResponseTimes.reduce((sum, c) => sum + c.response_time, 0) / validResponseTimes.length
      : 0;

    return NextResponse.json({
      site: siteData,
      checks: checks || [],
      stats: {
        total_checks: totalChecks,
        successful_checks: successfulChecks,
        uptime_percentage: uptimePercentage,
        avg_response_time: avgResponseTime
      }
    });
  } catch (error) {
    console.error('History fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch history' },
      { status: 500 }
    );
  }
}
