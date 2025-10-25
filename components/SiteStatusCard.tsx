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

  // Calculate days until expiration
  const getDaysUntilExpiration = (expirationDate: string) => {
    const today = new Date();
    const expDate = new Date(expirationDate);
    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const domainInfo = site.domain_info;
  const daysUntilExpiration = domainInfo?.expiration_date
    ? getDaysUntilExpiration(domainInfo.expiration_date)
    : null;

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

          {/* Domain Info */}
          {domainInfo && (
            <div className="mt-2 space-y-1">
              <div className="flex items-center gap-2">
                {!domainInfo.registered ? (
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded font-semibold">
                    Not Registered
                  </span>
                ) : (
                  <>
                    <span className="text-xs text-gray-500">
                      {domainInfo.registrar}
                    </span>
                    {domainInfo.expiration_date && (
                      <>
                        {daysUntilExpiration !== null && daysUntilExpiration <= 30 && (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded font-semibold">
                            Expires in {daysUntilExpiration}d
                          </span>
                        )}
                        {daysUntilExpiration !== null && daysUntilExpiration > 30 && daysUntilExpiration <= 90 && (
                          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded font-semibold">
                            Expires in {daysUntilExpiration}d
                          </span>
                        )}
                        {!domainInfo.auto_renew && (
                          <span className="text-xs text-orange-600">⚠️ Manual</span>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {site.next_action && (
            <p className="text-xs text-blue-600 mt-1">→ {site.next_action}</p>
          )}

          {/* SEO Score */}
          {site.seo_score && site.current_status === 'live' && (
            <div className="mt-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">SEO Score:</span>
                <div className={`text-xs font-bold px-2 py-1 rounded ${
                  site.seo_score.total >= 80 ? 'bg-green-100 text-green-800' :
                  site.seo_score.total >= 60 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {site.seo_score.total}/100
                </div>
              </div>
              <div className="mt-1 flex flex-wrap gap-1">
                {site.seo_score.checks.hasTitle && (
                  <span className="text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded" title="Has Title Tag">📝</span>
                )}
                {site.seo_score.checks.hasMetaDescription && (
                  <span className="text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded" title="Has Meta Description">📄</span>
                )}
                {site.seo_score.checks.hasViewport && (
                  <span className="text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded" title="Mobile Friendly">📱</span>
                )}
                {site.seo_score.checks.hasOpenGraph && (
                  <span className="text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded" title="Has Open Graph">🌐</span>
                )}
                {site.seo_score.checks.hasTwitterCard && (
                  <span className="text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded" title="Has Twitter Card">🐦</span>
                )}
                {site.seo_score.checks.hasStructuredData && (
                  <span className="text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded" title="Has Structured Data">📊</span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="text-right flex flex-col items-end gap-2">
          {site.current_status === 'live' && (
            <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 font-semibold">
              🌐 DEPLOYED
            </span>
          )}

          <span className={`inline-block px-2 py-1 text-xs rounded-full ${
            site.current_status === 'live'
              ? 'bg-green-100 text-green-800'
              : site.current_status === 'building' || site.current_status === 'deploying'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {statusLabel}
          </span>

          {domainInfo?.registrar === 'Other' && site.current_status === 'live' && (
            <span className="inline-block px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 font-semibold">
              🔍 Find Registrar!
            </span>
          )}

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
