export type SiteStatus = 'live' | 'building' | 'deploying' | 'error' | 'not-built';

export type Priority = 'HIGH' | 'MEDIUM' | 'LOW';

export type Ecosystem = 'hub' | 'art-of-citizenship' | 'there-is-still-time' | 'other';

export type Registrar = 'WA/IONOS' | 'SiteGround' | 'Squarespace' | 'Name.com' | 'Other' | 'Not Registered';

export interface DomainInfo {
  registered: boolean;
  registrar?: Registrar;
  expiration_date?: string; // ISO date format
  auto_renew: boolean;
  privacy_enabled: boolean;
  hosting_at_registrar: boolean;
  notes?: string;
}

export interface SEOScore {
  total: number;
  maxScore: number;
  checks: {
    hasTitle: boolean;
    hasMetaDescription: boolean;
    hasViewport: boolean;
    hasOpenGraph: boolean;
    hasTwitterCard: boolean;
    hasStructuredData: boolean;
    titleLength: number;
    descriptionLength: number;
  };
  details: Record<string, string>;
}

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
  domain_info?: DomainInfo;
  seo_score?: SEOScore;
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
