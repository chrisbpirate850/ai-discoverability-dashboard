'use client';

import { useEffect, useState } from 'react';
import { formatDate } from '@/lib/utils';

interface DashboardHeaderProps {
  totalSites: number;
  liveSites: number;
  inProgressSites: number;
  notBuiltSites: number;
  registeredDomains?: number;
  unregisteredDomains?: number;
  expiringDomains?: number;
}

export function DashboardHeader({
  totalSites,
  liveSites,
  inProgressSites,
  notBuiltSites,
  registeredDomains = 0,
  unregisteredDomains = 0,
  expiringDomains = 0
}: DashboardHeaderProps) {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-lg shadow-lg mb-8">
      <h1 className="text-3xl font-bold mb-2">AI Discoverability Dashboard</h1>
      <p className="text-blue-100 mb-6" suppressHydrationWarning>
        Last Updated: {mounted && currentTime ? formatDate(currentTime) : 'Loading...'}
      </p>

      <div className="space-y-4">
        {/* Site Status Stats */}
        <div>
          <h2 className="text-sm font-semibold text-blue-100 mb-2">SITE STATUS</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl font-bold">{totalSites}</div>
              <div className="text-sm text-blue-100">Total Sites</div>
            </div>
            <div className="bg-green-500/20 backdrop-blur rounded-lg p-4">
              <div className="text-2xl font-bold">{liveSites}</div>
              <div className="text-sm text-blue-100">Live & Readable</div>
            </div>
            <div className="bg-yellow-500/20 backdrop-blur rounded-lg p-4">
              <div className="text-2xl font-bold">{inProgressSites}</div>
              <div className="text-sm text-blue-100">In Progress</div>
            </div>
            <div className="bg-red-500/20 backdrop-blur rounded-lg p-4">
              <div className="text-2xl font-bold">{notBuiltSites}</div>
              <div className="text-sm text-blue-100">Not Built</div>
            </div>
          </div>
        </div>

        {/* Domain Stats */}
        <div>
          <h2 className="text-sm font-semibold text-blue-100 mb-2">DOMAIN STATUS</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-green-500/20 backdrop-blur rounded-lg p-4">
              <div className="text-2xl font-bold">{registeredDomains}</div>
              <div className="text-sm text-blue-100">Registered</div>
            </div>
            <div className="bg-red-500/20 backdrop-blur rounded-lg p-4">
              <div className="text-2xl font-bold">{unregisteredDomains}</div>
              <div className="text-sm text-blue-100">Not Registered</div>
            </div>
            <div className="bg-yellow-500/20 backdrop-blur rounded-lg p-4">
              <div className="text-2xl font-bold">{expiringDomains}</div>
              <div className="text-sm text-blue-100">Expiring Soon</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
