import { Site } from '@/lib/types';

interface UnknownRegistrarAlertProps {
  sites: Site[];
}

export function UnknownRegistrarAlert({ sites }: UnknownRegistrarAlertProps) {
  const unknownRegistrarSites = sites.filter(
    site => site.domain_info?.registered &&
    (site.domain_info?.registrar === 'Other' || site.domain_info?.registrar === 'Not Registered') &&
    site.current_status === 'live'
  );

  if (unknownRegistrarSites.length === 0) return null;

  return (
    <div className="mb-6 bg-purple-50 border-l-4 border-purple-500 p-4 rounded-lg">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <span className="text-2xl">🔍</span>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-bold text-purple-800 mb-2">
            Action Required: Find Domain Registrar ({unknownRegistrarSites.length})
          </h3>
          <p className="text-sm text-purple-700 mb-3">
            The following sites are LIVE but we don't know where they're registered.
            You need to find the registrar to manage renewals!
          </p>
          <ul className="space-y-2">
            {unknownRegistrarSites.map((site) => (
              <li key={site.id} className="text-sm text-purple-700">
                <span className="font-semibold">{site.name}</span>
                <span className="ml-2 bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-bold">
                  LIVE
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-3 p-3 bg-white rounded border border-purple-200">
            <p className="text-sm font-semibold text-purple-800 mb-2">How to Find Registrar:</p>
            <ol className="text-sm text-purple-700 space-y-1 list-decimal list-inside">
              <li>Check your email for domain registration receipts</li>
              <li>Use <a href="https://lookup.icann.org/" target="_blank" rel="noopener noreferrer" className="underline font-semibold">ICANN WHOIS Lookup</a></li>
              <li>Check <a href="https://who.is/" target="_blank" rel="noopener noreferrer" className="underline font-semibold">Who.is</a> domain search</li>
              <li>Look in your Cloudflare dashboard (domains often use Cloudflare DNS)</li>
              <li>Check all your known registrar accounts (Name.com, IONOS, SiteGround, Squarespace)</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
