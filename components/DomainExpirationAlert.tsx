import { Site } from '@/lib/types';

interface DomainExpirationAlertProps {
  sites: Site[];
}

export function DomainExpirationAlert({ sites }: DomainExpirationAlertProps) {
  const today = new Date();
  const threeMonthsFromNow = new Date(today);
  threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);

  // Find domains expiring soon or not registered
  const urgentDomains = sites.filter(site => {
    if (!site.domain_info) return false;

    // Not registered
    if (!site.domain_info.registered) return true;

    // Expiring soon
    if (site.domain_info.expiration_date) {
      const expirationDate = new Date(site.domain_info.expiration_date);
      return expirationDate <= threeMonthsFromNow;
    }

    return false;
  });

  if (urgentDomains.length === 0) return null;

  // Separate by severity
  const criticalDomains = urgentDomains.filter(site => {
    if (!site.domain_info?.registered) return true;
    if (site.domain_info.expiration_date) {
      const expirationDate = new Date(site.domain_info.expiration_date);
      const oneMonthFromNow = new Date(today);
      oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
      return expirationDate <= oneMonthFromNow;
    }
    return false;
  });

  const warningDomains = urgentDomains.filter(site => !criticalDomains.includes(site));

  const getDaysUntilExpiration = (expirationDate: string) => {
    const expDate = new Date(expirationDate);
    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="mb-6 space-y-3">
      {/* Critical Alerts - Red */}
      {criticalDomains.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <span className="text-2xl">🚨</span>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-bold text-red-800 mb-2">
                URGENT: Critical Domain Issues ({criticalDomains.length})
              </h3>
              <ul className="space-y-2">
                {criticalDomains.map((site) => (
                  <li key={site.id} className="text-sm text-red-700">
                    <span className="font-semibold">{site.name}</span>
                    {!site.domain_info?.registered ? (
                      <span className="ml-2 bg-red-200 px-2 py-1 rounded text-xs font-bold">
                        NOT REGISTERED
                      </span>
                    ) : site.domain_info?.expiration_date ? (
                      <span className="ml-2">
                        Expires in{' '}
                        <span className="font-bold">
                          {getDaysUntilExpiration(site.domain_info.expiration_date)} days
                        </span>
                        {' '}({site.domain_info.expiration_date})
                        {!site.domain_info.auto_renew && (
                          <span className="ml-2 bg-red-200 px-2 py-1 rounded text-xs font-bold">
                            MANUAL RENEWAL
                          </span>
                        )}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Warning Alerts - Yellow */}
      {warningDomains.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <span className="text-2xl">⚠️</span>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-bold text-yellow-800 mb-2">
                Warning: Domains Expiring Within 3 Months ({warningDomains.length})
              </h3>
              <ul className="space-y-2">
                {warningDomains.map((site) => (
                  <li key={site.id} className="text-sm text-yellow-700">
                    <span className="font-semibold">{site.name}</span>
                    {site.domain_info?.expiration_date && (
                      <span className="ml-2">
                        Expires in{' '}
                        <span className="font-bold">
                          {getDaysUntilExpiration(site.domain_info.expiration_date)} days
                        </span>
                        {' '}({site.domain_info.expiration_date})
                        {!site.domain_info.auto_renew && (
                          <span className="ml-2 bg-yellow-200 px-2 py-1 rounded text-xs font-bold">
                            MANUAL RENEWAL
                          </span>
                        )}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
