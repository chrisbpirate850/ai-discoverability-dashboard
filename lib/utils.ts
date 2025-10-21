import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { SiteStatus } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStatusEmoji(status: SiteStatus): string {
  switch (status) {
    case 'live':
      return '🟢';
    case 'building':
    case 'deploying':
      return '🟡';
    case 'error':
    case 'not-built':
      return '🔴';
    default:
      return '⚪';
  }
}

export function getStatusLabel(status: SiteStatus): string {
  switch (status) {
    case 'live':
      return 'Live & AI-Readable';
    case 'building':
      return 'Building';
    case 'deploying':
      return 'Deploying';
    case 'error':
      return 'Error';
    case 'not-built':
      return 'Not Built';
    default:
      return 'Unknown';
  }
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(d);
}

export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  return `${diffDay}d ago`;
}

export function formatResponseTime(ms: number): string {
  if (ms < 1000) {
    return `${ms}ms`;
  }
  return `${(ms / 1000).toFixed(2)}s`;
}
