'use client';

import { useState, useEffect } from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { EcosystemSection } from '@/components/EcosystemSection';
import { DomainExpirationAlert } from '@/components/DomainExpirationAlert';
import { UnknownRegistrarAlert } from '@/components/UnknownRegistrarAlert';
import { SITES } from '@/lib/sites-data';
import { Site } from '@/lib/types';

export default function Home() {
  const [sites, setSites] = useState<Site[]>(() =>
    SITES.map((site, index) => ({
      ...site,
      id: `site-${index}`,
      last_check: null
    }))
  );
  const [checking, setChecking] = useState(false);
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [nextCheck, setNextCheck] = useState<number>(15 * 60); // 15 minutes in seconds

  // Auto-refresh countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setNextCheck((prev) => {
        if (prev <= 1) {
          checkAllSites();
          return 15 * 60; // Reset to 15 minutes
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Initial check on mount
  useEffect(() => {
    // Run check immediately when component mounts
    const runInitialCheck = async () => {
      await checkAllSites();
      setInitialCheckDone(true);
    };
    runInitialCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAllSites = async () => {
    setChecking(true);
    console.log('🔍 Starting comprehensive site analysis...');
    console.log(`📊 Checking ${sites.length} sites for: deployment status, AI-readability, SEO optimization`);

    try {
      const startTime = Date.now();
      const response = await fetch('/api/check-all-sites');

      if (response.ok) {
        const data = await response.json();
        const checkTime = Date.now() - startTime;

        console.log(`✅ Analysis complete! Checked ${data.total_sites} sites in ${(checkTime / 1000).toFixed(1)}s`);
        console.log('📈 Results:', data.results.map((r: any) => ({
          name: r.name,
          status: r.status,
          aiReadable: r.ai_readable,
          seoScore: r.seo?.total
        })));

        // Update sites with REAL-TIME check results (overrides initial data)
        const updatedSites = sites.map((site) => {
          const result = data.results?.find((r: { url: string }) => r.url === site.url);
          if (result) {
            return {
              ...site,
              current_status: result.status, // LIVE status from HTTP check
              ai_readable: result.ai_readable, // LIVE AI-readability check
              last_check: result.timestamp,
              seo_score: result.seo // LIVE SEO analysis
            };
          }
          return site;
        });

        setSites(updatedSites);
        setLastUpdate(new Date());
        setNextCheck(15 * 60); // Reset countdown

        console.log('✨ Dashboard updated with live data!');
      }
    } catch (error) {
      console.error('❌ Failed to check sites:', error);
    } finally {
      setChecking(false);
    }
  };

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const hubSites = sites.filter(s => s.ecosystem === 'hub');
  const artOfCitizenshipSites = sites.filter(s => s.ecosystem === 'art-of-citizenship');
  const thereIsStillTimeSites = sites.filter(s => s.ecosystem === 'there-is-still-time');
  const otherSites = sites.filter(s => s.ecosystem === 'other');

  // Calculate site stats
  const totalSites = sites.length;
  const liveSites = sites.filter(s => s.current_status === 'live' && s.ai_readable).length;
  const inProgressSites = sites.filter(s =>
    s.current_status === 'building' || s.current_status === 'deploying'
  ).length;
  const notBuiltSites = sites.filter(s =>
    s.current_status === 'not-built' || s.current_status === 'error' || !s.ai_readable
  ).length;

  // Calculate domain stats
  const registeredDomains = sites.filter(s => s.domain_info?.registered).length;
  const unregisteredDomains = sites.filter(s => !s.domain_info?.registered).length;

  // Calculate domains expiring within 90 days
  const today = new Date();
  const ninetyDaysFromNow = new Date(today);
  ninetyDaysFromNow.setDate(ninetyDaysFromNow.getDate() + 90);

  const expiringDomains = sites.filter(s => {
    if (!s.domain_info?.expiration_date) return false;
    const expirationDate = new Date(s.domain_info.expiration_date);
    return expirationDate <= ninetyDaysFromNow;
  }).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <DashboardHeader
          totalSites={totalSites}
          liveSites={liveSites}
          inProgressSites={inProgressSites}
          notBuiltSites={notBuiltSites}
          registeredDomains={registeredDomains}
          unregisteredDomains={unregisteredDomains}
          expiringDomains={expiringDomains}
        />

        {/* Initial Load Banner */}
        {!initialCheckDone && (
          <div className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center gap-4">
              <div className="animate-spin h-8 w-8 border-4 border-white border-t-transparent rounded-full"></div>
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-2">🔍 Running LIVE Site Analysis...</h3>
                <p className="text-blue-100 text-sm mb-2">
                  Making real HTTP requests to all {sites.length} sites to check:
                </p>
                <ul className="text-blue-100 text-xs space-y-1 ml-4">
                  <li>✓ Deployment status (live vs offline)</li>
                  <li>✓ AI-readability (SSG/SSR vs CSR)</li>
                  <li>✓ SEO optimization (meta tags, Open Graph, etc.)</li>
                  <li>✓ Response time & performance</li>
                </ul>
                <p className="text-blue-100 text-sm mt-2 font-semibold">
                  ⏱️ This takes 30-45 seconds. Check your browser console (F12) to see real-time progress!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Domain Expiration Alerts */}
        <DomainExpirationAlert sites={sites} />

        {/* Unknown Registrar Alerts */}
        <UnknownRegistrarAlert sites={sites} />

        {/* Check All Button and Status */}
        <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <button
                onClick={checkAllSites}
                disabled={checking}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
              >
                {checking ? 'Checking All Sites...' : 'Check All Sites Now'}
              </button>
              <div className="text-sm text-gray-600">
                <div suppressHydrationWarning>
                  Last updated: {lastUpdate.toLocaleTimeString()}
                </div>
                <div suppressHydrationWarning>
                  Next auto-check in: <span className="font-mono font-semibold">{formatCountdown(nextCheck)}</span>
                </div>
              </div>
            </div>
            {checking && (
              <div className="flex items-center gap-2">
                <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                <span className="text-sm text-gray-600">Analyzing...</span>
              </div>
            )}
          </div>
          {checking && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
              <p className="text-sm text-blue-800 font-semibold">
                🔍 Comprehensive Analysis Running...
              </p>
              <p className="text-xs text-blue-700 mt-1">
                Checking deployment status, AI-readability, and SEO optimization for all {sites.length} sites
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <EcosystemSection
            ecosystem="hub"
            sites={hubSites}
          />

          <EcosystemSection
            ecosystem="art-of-citizenship"
            sites={artOfCitizenshipSites}
          />

          <EcosystemSection
            ecosystem="there-is-still-time"
            sites={thereIsStillTimeSites}
          />

          <EcosystemSection
            ecosystem="other"
            sites={otherSites}
          />
        </div>

        <div className="mt-12 p-6 bg-white rounded-lg border border-gray-200">
          <h3 className="font-bold text-lg mb-3">Legend</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🟢</span>
              <span>Live & AI-Readable</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🟡</span>
              <span>In Progress (Building/Deploying/DNS)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔴</span>
              <span>Not AI-Readable (Needs Rebuild)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
