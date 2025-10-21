export type SiteStatus = 'live' | 'building' | 'deploying' | 'error' | 'not-built';

export type Priority = 'HIGH' | 'MEDIUM' | 'LOW';

export type Ecosystem = 'hub' | 'art-of-citizenship' | 'there-is-still-time';

export interface Site {
  id: string;
  name: string;
  url: string;
  ecosystem: Ecosystem;
  priority: Priority;
  current_status: SiteStatus;
  last_check: string | null;
  framework: string | null;
  ai_readable: boolean;
  next_action: string | null;
}

export interface SiteCheck {
  id: string;
  site_id: string;
  timestamp: string;
  status: SiteStatus;
  content_found: boolean;
  response_time: number;
  error: string | null;
}

export interface Build {
  id: string;
  site_id: string;
  timestamp: string;
  status: 'success' | 'failed' | 'building';
  build_time: number | null;
  deploy_time: number | null;
}

export interface SiteWithChecks extends Site {
  recent_checks: SiteCheck[];
  uptime_percentage: number;
  avg_response_time: number;
}
