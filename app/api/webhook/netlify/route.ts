import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    // Netlify webhook payload structure
    const {
      id,
      site_id,
      build_id,
      state, // ready, building, error
      name,
      url,
      ssl_url,
      created_at,
      deploy_time,
    } = payload;

    console.log('Netlify webhook received:', {
      id,
      state,
      name,
      url: ssl_url || url
    });

    if (!isSupabaseConfigured()) {
      console.log('Supabase not configured, webhook logged but not stored');
      return NextResponse.json({ received: true, stored: false });
    }

    // Find the site in our database by URL
    const siteUrl = ssl_url || url;
    const { data: siteData } = await supabase
      .from('sites')
      .select('id')
      .eq('url', siteUrl)
      .single();

    if (siteData) {
      // Store build information
      await supabase.from('builds').insert({
        site_id: siteData.id,
        timestamp: created_at || new Date().toISOString(),
        status: state === 'ready' ? 'success' : state === 'building' ? 'building' : 'failed',
        build_time: deploy_time || null,
        deploy_time: deploy_time || null
      });

      // Update site status based on build state
      const newStatus = state === 'ready' ? 'live' : state === 'building' ? 'building' : 'error';

      await supabase
        .from('sites')
        .update({
          current_status: newStatus,
          last_check: new Date().toISOString()
        })
        .eq('id', siteData.id);

      return NextResponse.json({
        received: true,
        stored: true,
        site_id: siteData.id
      });
    }

    return NextResponse.json({
      received: true,
      stored: false,
      message: 'Site not found in database'
    });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}
