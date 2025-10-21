'use client';

import { useEffect, useState } from 'react';
import { formatDate } from '@/lib/utils';

interface DashboardHeaderProps {
  totalSites: number;
  liveSites: number;
  inProgressSites: number;
  notBuiltSites: number;
}

export function DashboardHeader({
  totalSites,
  liveSites,
  inProgressSites,
  notBuiltSites
}: DashboardHeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-lg shadow-lg mb-8">
      <h1 className="text-3xl font-bold mb-2">AI Discoverability Dashboard</h1>
      <p className="text-blue-100 mb-6">Last Updated: {formatDate(currentTime)}</p>

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
  );
}
