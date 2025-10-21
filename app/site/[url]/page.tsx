'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { SITES } from '@/lib/sites-data';
import { getStatusEmoji, getStatusLabel, formatDate, formatResponseTime } from '@/lib/utils';
import { SiteCheck } from '@/lib/types';

export default function SiteDetailPage() {
  const params = useParams();
  const router = useRouter();
  const url = decodeURIComponent(params.url as string);

  const [checking, setChecking] = useState(false);
  const [history, setHistory] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const site = SITES.find(s => s.url === url);

  useEffect(() => {
    if (site) {
      fetchHistory();
    }
  }, [site]);

  const fetchHistory = async () => {
    try {
      const response = await fetch(`/api/history?site=${encodeURIComponent(url)}`);
      if (response.ok) {
        const data = await response.json();
        setHistory(data);
      } else {
        // History endpoint requires Supabase, which might not be configured yet
        console.log('History not available (Supabase not configured)');
      }
    } catch (err) {
      console.error('Failed to fetch history:', err);
    }
  };

  const handleCheckNow = async () => {
    setChecking(true);
    setError(null);

    try {
      const response = await fetch(`/api/check-site?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (response.ok) {
        // Refresh history after check
        await fetchHistory();
      } else {
        setError(data.error || 'Check failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setChecking(false);
    }
  };

  if (!site) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h1 className="text-xl font-bold text-red-900 mb-2">Site Not Found</h1>
            <p className="text-red-700">The site URL "{url}" was not found in the dashboard.</p>
            <button
              onClick={() => router.push('/')}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.push('/')}
          className="mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-2"
        >
          ← Back to Dashboard
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-4">
              <span className="text-5xl">{getStatusEmoji(site.current_status)}</span>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{site.name}</h1>
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-lg"
                >
                  {site.url}
                </a>
                <div className="mt-2 flex gap-2">
                  <span className={`inline-block px-3 py-1 text-sm rounded-full ${
                    site.current_status === 'live'
                      ? 'bg-green-100 text-green-800'
                      : site.current_status === 'building' || site.current_status === 'deploying'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {getStatusLabel(site.current_status)}
                  </span>
                  {site.ai_readable ? (
                    <span className="inline-block px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
                      AI Readable
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800">
                      Not AI Readable
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={handleCheckNow}
              disabled={checking}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {checking ? 'Checking...' : 'Check Now'}
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Details</h3>
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="text-gray-500">Ecosystem:</dt>
                  <dd className="font-medium capitalize">{site.ecosystem.replace('-', ' ')}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Priority:</dt>
                  <dd className="font-medium">{site.priority}</dd>
                </div>
                {site.framework && (
                  <div>
                    <dt className="text-gray-500">Framework:</dt>
                    <dd className="font-medium">{site.framework}</dd>
                  </div>
                )}
                {site.next_action && (
                  <div>
                    <dt className="text-gray-500">Next Action:</dt>
                    <dd className="font-medium text-blue-600">{site.next_action}</dd>
                  </div>
                )}
              </dl>
            </div>

            {history && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Statistics</h3>
                <dl className="space-y-2 text-sm">
                  <div>
                    <dt className="text-gray-500">Uptime:</dt>
                    <dd className="font-medium">{history.stats.uptime_percentage.toFixed(1)}%</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Avg Response Time:</dt>
                    <dd className="font-medium">{formatResponseTime(history.stats.avg_response_time)}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Total Checks:</dt>
                    <dd className="font-medium">{history.stats.total_checks}</dd>
                  </div>
                </dl>
              </div>
            )}
          </div>
        </div>

        {history && history.checks.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Checks</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b">
                  <tr className="text-left">
                    <th className="pb-3 font-semibold">Timestamp</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold">Content Found</th>
                    <th className="pb-3 font-semibold">Response Time</th>
                  </tr>
                </thead>
                <tbody>
                  {history.checks.map((check: SiteCheck) => (
                    <tr key={check.id} className="border-b last:border-b-0">
                      <td className="py-3">{formatDate(check.timestamp)}</td>
                      <td className="py-3">
                        <span className={`inline-block px-2 py-1 text-xs rounded ${
                          check.status === 'live'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {check.status}
                        </span>
                      </td>
                      <td className="py-3">{check.content_found ? '✓ Yes' : '✗ No'}</td>
                      <td className="py-3">{formatResponseTime(check.response_time)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!history && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-blue-800">
              Historical data is not available. Configure Supabase to enable tracking and history features.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
