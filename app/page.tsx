import { DashboardHeader } from '@/components/DashboardHeader';
import { EcosystemSection } from '@/components/EcosystemSection';
import { SITES } from '@/lib/sites-data';
import { Site } from '@/lib/types';

export default function Home() {
  // Generate site IDs and organize by ecosystem
  const sites: Site[] = SITES.map((site, index) => ({
    ...site,
    id: `site-${index}`,
    last_check: null
  }));

  const hubSites = sites.filter(s => s.ecosystem === 'hub');
  const artOfCitizenshipSites = sites.filter(s => s.ecosystem === 'art-of-citizenship');
  const thereIsStillTimeSites = sites.filter(s => s.ecosystem === 'there-is-still-time');

  // Calculate stats
  const totalSites = sites.length;
  const liveSites = sites.filter(s => s.current_status === 'live').length;
  const inProgressSites = sites.filter(s =>
    s.current_status === 'building' || s.current_status === 'deploying'
  ).length;
  const notBuiltSites = sites.filter(s =>
    s.current_status === 'not-built' || s.current_status === 'error'
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
