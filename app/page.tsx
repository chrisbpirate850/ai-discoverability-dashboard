'use client';

import { useState, useEffect } from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { EcosystemSection } from '@/components/EcosystemSection';
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
    checkAllSites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAllSites = async () => {
    setChecking(true);
    try {
      const response = await fetch('/api/check-all-sites');
      if (response.ok) {
        const data = await response.json();

        // Update sites with check results
        const updatedSites = sites.map((site) => {
          const result = data.results?.find((r: { url: string }) => r.url === site.url);
          if (result) {
            return {
              ...site,
              current_status: result.status,
              ai_readable: result.ai_readable,
              last_check: result.timestamp
            };
          }
          return site;
        });

        setSites(updatedSites);
        setLastUpdate(new Date());
        setNextCheck(15 * 60); // Reset countdown
      }
    } catch (error) {
      console.error('Failed to check sites:', error);
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

  // Calculate stats
  const totalSites = sites.length;
  const liveSites = sites.filter(s => s.current_status === 'live' && s.ai_readable).length;
  const inProgressSites = sites.filter(s =>
    s.current_status === 'building' || s.current_status === 'deploying'
  ).length;
  const notBuiltSites = sites.filter(s =>
    s.current_status === 'not-built' || s.current_status === 'error' || !s.ai_readable
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <DashboardHeader
          totalSites={totalSites}
          liveSites={liveSites}
          inProgressSites={inProgressSites}
          notBuiltSites={notBuiltSites}
        />

        {/* Check All Button and Status */}
        <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={checkAllSites}
              disabled={checking}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
            >
              {checking ? 'Checking All Sites...' : 'Check All Sites Now'}
            </button>
            <div className="text-sm text-gray-600">
              <div>
                Last updated: {lastUpdate.toLocaleTimeString()}
              </div>
              <div>
                Next auto-check in: <span className="font-mono font-semibold">{formatCountdown(nextCheck)}</span>
              </div>
            </div>
          </div>
          {checking && (
            <div className="flex items-center gap-2">
              <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
              <span className="text-sm text-gray-600">Checking...</span>
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
