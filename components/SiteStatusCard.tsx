'use client';

import Link from 'next/link';
import { Site } from '@/lib/types';
import { getStatusEmoji, getStatusLabel, formatRelativeTime } from '@/lib/utils';

interface SiteStatusCardProps {
  site: Site;
}

export function SiteStatusCard({ site }: SiteStatusCardProps) {
  const statusEmoji = getStatusEmoji(site.current_status);
  const statusLabel = getStatusLabel(site.current_status);

  return (
    <Link
      href={`/site/${encodeURIComponent(site.url)}`}
      className="block p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all bg-white"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{statusEmoji}</span>
            <div>
              <h3 className="font-semibold text-gray-900">{site.name}</h3>
              <p className="text-sm text-gray-500">{site.url.replace('https://', '')}</p>
            </div>
          </div>

          {site.framework && (
            <p className="text-xs text-gray-400 mt-2">Framework: {site.framework}</p>
          )}

          {site.next_action && (
            <p className="text-xs text-blue-600 mt-1">→ {site.next_action}</p>
          )}
        </div>

        <div className="text-right">
          <span className={`inline-block px-2 py-1 text-xs rounded-full ${
            site.current_status === 'live'
              ? 'bg-green-100 text-green-800'
              : site.current_status === 'building' || site.current_status === 'deploying'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {statusLabel}
          </span>

          {site.last_check && (
            <p className="text-xs text-gray-400 mt-2">
              {formatRelativeTime(site.last_check)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
