import { Site, Ecosystem } from '@/lib/types';
import { ECOSYSTEM_CONFIG } from '@/lib/sites-data';
import { SiteStatusCard } from './SiteStatusCard';

interface EcosystemSectionProps {
  ecosystem: Ecosystem;
  sites: Site[];
}

export function EcosystemSection({ ecosystem, sites }: EcosystemSectionProps) {
  const config = ECOSYSTEM_CONFIG[ecosystem];

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-gray-200">
        <span className="text-2xl">{config.icon}</span>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{config.label}</h2>
          <p className="text-sm text-gray-500">{config.description}</p>
        </div>
      </div>

      <div className="space-y-3">
        {sites.map((site) => (
          <SiteStatusCard key={site.url} site={site} />
        ))}
      </div>
    </div>
  );
}
