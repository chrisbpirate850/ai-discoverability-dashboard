import { Site } from './types';

// Initial site data based on the blueprint
export const SITES: Omit<Site, 'id' | 'last_check'>[] = [
  // HUB
  {
    name: 'Christopher J Bradley',
    url: 'https://christopherjbradley.com',
    ecosystem: 'hub',
    priority: 'HIGH',
    current_status: 'live',
    framework: 'Astro',
    ai_readable: true,
    next_action: 'Site live and SEO optimized! Monitor and maintain.',
    domain_info: {
      registered: true,
      registrar: 'SiteGround',
      expiration_date: '2027-04-05',
      auto_renew: false,
      privacy_enabled: false,
      hosting_at_registrar: false,
      notes: 'Add privacy protection. Site successfully deployed with Astro SSG!'
    }
  },

  // ART OF CITIZENSHIP
  {
    name: 'The Art of Citizenship',
    url: 'https://theartofcitizenship.com',
    ecosystem: 'art-of-citizenship',
    priority: 'HIGH',
    current_status: 'live',
    framework: null,
    ai_readable: false,
    next_action: 'FIND REGISTRAR - Site is live but registrar unknown!',
    domain_info: {
      registered: true,
      registrar: 'Other',
      auto_renew: false,
      privacy_enabled: false,
      hosting_at_registrar: false,
      notes: '⚠️ SITE IS LIVE but registrar unknown! Check Cloudflare dashboard or old email receipts. Behind Cloudflare CDN (185.158.133.1)'
    }
  },
  {
    name: 'Liberty\'s Principles Pals',
    url: 'https://libertysprinciplespals.com',
    ecosystem: 'art-of-citizenship',
    priority: 'HIGH',
    current_status: 'live',
    framework: 'Next.js',
    ai_readable: true,
    next_action: 'Site live on Netlify! Monitor and optimize.',
    domain_info: {
      registered: true,
      registrar: 'Squarespace',
      expiration_date: '2026-04-30',
      auto_renew: false,
      privacy_enabled: true,
      hosting_at_registrar: false,
      notes: 'libertysprincipalspals.com redirects to this. Deployed on Netlify!'
    }
  },
  {
    name: 'The Citizens Compass',
    url: 'https://thecitizenscompass.com',
    ecosystem: 'art-of-citizenship',
    priority: 'HIGH',
    current_status: 'live',
    framework: 'Next.js',
    ai_readable: true,
    next_action: 'URGENT: Renew domain before Dec 21!',
    domain_info: {
      registered: true,
      registrar: 'SiteGround',
      expiration_date: '2025-12-21',
      auto_renew: false,
      privacy_enabled: false,
      hosting_at_registrar: false,
      notes: 'URGENT: Expires in less than 2 months! Add privacy protection.'
    }
  },
  {
    name: 'Family Unity Hub',
    url: 'https://familyunityhub.com',
    ecosystem: 'art-of-citizenship',
    priority: 'MEDIUM',
    current_status: 'not-built',
    framework: null,
    ai_readable: false,
    next_action: 'Rebuild after LPP',
    domain_info: {
      registered: true,
      registrar: 'Squarespace',
      expiration_date: '2026-04-15',
      auto_renew: false,
      privacy_enabled: true,
      hosting_at_registrar: false,
      notes: 'fumilyunityhub.com registered for typo protection'
    }
  },

  // THERE IS STILL TIME
  {
    name: 'There Is Still Time',
    url: 'https://thereisstilltime.com',
    ecosystem: 'there-is-still-time',
    priority: 'MEDIUM',
    current_status: 'not-built',
    framework: null,
    ai_readable: false,
    next_action: 'Marketing site rebuild',
    domain_info: {
      registered: true,
      registrar: 'WA/IONOS',
      expiration_date: '2026-10-05',
      auto_renew: true,
      privacy_enabled: false,
      hosting_at_registrar: false,
      notes: 'Main marketing domain - Add privacy protection'
    }
  },
  {
    name: 'There Is Still Time App',
    url: 'https://app.thereisstilltime.com',
    ecosystem: 'there-is-still-time',
    priority: 'LOW',
    current_status: 'live',
    framework: 'React (CSR)',
    ai_readable: false, // CSR app - intentionally not AI readable
    next_action: 'App - CSR is fine',
    domain_info: {
      registered: true,
      registrar: 'WA/IONOS',
      expiration_date: '2026-10-05',
      auto_renew: true,
      privacy_enabled: false,
      hosting_at_registrar: false,
      notes: 'Subdomain of thereisstilltime.com'
    }
  },
  {
    name: 'Love Everyone',
    url: 'https://loveeveryone.love',
    ecosystem: 'there-is-still-time',
    priority: 'MEDIUM',
    current_status: 'not-built',
    framework: null,
    ai_readable: false,
    next_action: 'Peace message site',
    domain_info: {
      registered: true,
      registrar: 'Name.com',
      expiration_date: '2026-03-23',
      auto_renew: false,
      privacy_enabled: true,
      hosting_at_registrar: false,
      notes: 'Special .love TLD domain - Privacy enabled'
    }
  },
  {
    name: 'Sunsets for the Soul',
    url: 'https://sunsetsforthesoul.com',
    ecosystem: 'there-is-still-time',
    priority: 'LOW',
    current_status: 'not-built',
    framework: null,
    ai_readable: false,
    next_action: 'Photo gallery site',
    domain_info: {
      registered: true,
      registrar: 'SiteGround',
      expiration_date: '2026-02-25',
      auto_renew: false,
      privacy_enabled: false,
      hosting_at_registrar: false,
      notes: 'Add privacy protection'
    }
  },

  // OTHER REGISTERED DOMAINS (Unmonitored)
  {
    name: 'Chris B Pirate',
    url: 'https://chrisbpirate.com',
    ecosystem: 'other',
    priority: 'LOW',
    current_status: 'not-built',
    framework: null,
    ai_readable: false,
    next_action: 'Decide usage or redirect',
    domain_info: {
      registered: true,
      registrar: 'SiteGround',
      expiration_date: '2027-06-08',
      auto_renew: false,
      privacy_enabled: false,
      hosting_at_registrar: false,
      notes: 'Alternate branding domain - Add privacy protection'
    }
  },
  {
    name: 'Sand Timer Hourglass',
    url: 'https://sandtimerhourglass.com',
    ecosystem: 'other',
    priority: 'LOW',
    current_status: 'not-built',
    framework: null,
    ai_readable: false,
    next_action: 'Decide usage',
    domain_info: {
      registered: true,
      registrar: 'SiteGround',
      expiration_date: '2027-11-15',
      auto_renew: false,
      privacy_enabled: false,
      hosting_at_registrar: false,
      notes: 'Time-related brand domain - Add privacy protection'
    }
  },
  {
    name: 'Fair Bill Analyzer',
    url: 'https://fairbillanalyzer.com',
    ecosystem: 'other',
    priority: 'LOW',
    current_status: 'not-built',
    framework: null,
    ai_readable: false,
    next_action: 'Decide usage',
    domain_info: {
      registered: true,
      registrar: 'SiteGround',
      expiration_date: '2026-10-24',
      auto_renew: false,
      privacy_enabled: false,
      hosting_at_registrar: false,
      notes: 'Bill analysis project - Add privacy protection'
    }
  },
  {
    name: 'Liberty\'s Principles',
    url: 'https://libertysprinciples.com',
    ecosystem: 'other',
    priority: 'LOW',
    current_status: 'not-built',
    framework: null,
    ai_readable: false,
    next_action: 'Decide usage or redirect to LPP',
    domain_info: {
      registered: true,
      registrar: 'SiteGround',
      expiration_date: '2026-10-16',
      auto_renew: false,
      privacy_enabled: false,
      hosting_at_registrar: false,
      notes: 'Similar to Liberty\'s Principles Pals - Add privacy protection'
    }
  },
  {
    name: 'Your Old Salt Life',
    url: 'https://youroldsaltlife.com',
    ecosystem: 'other',
    priority: 'LOW',
    current_status: 'not-built',
    framework: null,
    ai_readable: false,
    next_action: 'Decide usage',
    domain_info: {
      registered: true,
      registrar: 'SiteGround',
      expiration_date: '2026-09-03',
      auto_renew: false,
      privacy_enabled: false,
      hosting_at_registrar: false,
      notes: 'Sailing/nautical lifestyle site? - Add privacy protection'
    }
  },
  {
    name: 'Ru We The People',
    url: 'https://ruwethepeople.com',
    ecosystem: 'other',
    priority: 'LOW',
    current_status: 'not-built',
    framework: null,
    ai_readable: false,
    next_action: 'Decide usage',
    domain_info: {
      registered: true,
      registrar: 'SiteGround',
      expiration_date: '2026-06-05',
      auto_renew: false,
      privacy_enabled: false,
      hosting_at_registrar: false,
      notes: 'Add privacy protection. Possible citizenship project.'
    }
  },
  {
    name: 'ECM Wave',
    url: 'https://ecmwave.com',
    ecosystem: 'other',
    priority: 'LOW',
    current_status: 'not-built',
    framework: null,
    ai_readable: false,
    next_action: 'Decide usage',
    domain_info: {
      registered: true,
      registrar: 'SiteGround',
      expiration_date: '2026-02-23',
      auto_renew: false,
      privacy_enabled: false,
      hosting_at_registrar: false,
      notes: 'Add privacy protection'
    }
  },
  {
    name: 'Liberty\'s Principles Media',
    url: 'https://libertysprinciplesmedia.com',
    ecosystem: 'other',
    priority: 'LOW',
    current_status: 'not-built',
    framework: null,
    ai_readable: false,
    next_action: 'Decide usage or redirect to LPP',
    domain_info: {
      registered: true,
      registrar: 'SiteGround',
      expiration_date: '2025-11-26',
      auto_renew: false,
      privacy_enabled: true,
      hosting_at_registrar: false,
      notes: 'Related to Liberty\'s Principles Pals - expires soon!'
    }
  },
  {
    name: 'Fumily Unity Hub (Typo Protection)',
    url: 'https://fumilyunityhub.com',
    ecosystem: 'other',
    priority: 'LOW',
    current_status: 'not-built',
    framework: null,
    ai_readable: false,
    next_action: 'Redirect to familyunityhub.com',
    domain_info: {
      registered: true,
      registrar: 'Squarespace',
      expiration_date: '2026-04-12',
      auto_renew: false,
      privacy_enabled: true,
      hosting_at_registrar: false,
      notes: 'Typo protection - should redirect to main domain'
    }
  },
  {
    name: 'Liberty\'s Principals Pals (Typo Protection)',
    url: 'https://libertysprincipalspals.com',
    ecosystem: 'other',
    priority: 'LOW',
    current_status: 'live',
    framework: null,
    ai_readable: false,
    next_action: 'Already redirecting to libertysprinciplespals.com',
    domain_info: {
      registered: true,
      registrar: 'Squarespace',
      expiration_date: '2026-04-12',
      auto_renew: false,
      privacy_enabled: true,
      hosting_at_registrar: false,
      notes: 'Typo protection - redirects to libertysprinciplespals.com'
    }
  },
  {
    name: 'Common Sense Local Marketing',
    url: 'https://commonsenselocalmarketing.com',
    ecosystem: 'other',
    priority: 'LOW',
    current_status: 'not-built',
    framework: null,
    ai_readable: false,
    next_action: 'Decide usage - local marketing project?',
    domain_info: {
      registered: true,
      registrar: 'Name.com',
      expiration_date: '2026-04-15',
      auto_renew: false,
      privacy_enabled: true,
      hosting_at_registrar: false,
      notes: 'Marketing services domain - Privacy enabled'
    }
  },
  {
    name: 'There Is Still Time Store (TLD Protection)',
    url: 'https://thereisstilltime.store',
    ecosystem: 'other',
    priority: 'LOW',
    current_status: 'not-built',
    framework: null,
    ai_readable: false,
    next_action: 'Redirect to main .com or use for store',
    domain_info: {
      registered: true,
      registrar: 'WA/IONOS',
      expiration_date: '2026-10-05',
      auto_renew: true,
      privacy_enabled: false,
      hosting_at_registrar: false,
      notes: 'TLD protection for thereisstilltime brand - Add privacy'
    }
  },
  {
    name: 'There Is Still Time Online (TLD Protection)',
    url: 'https://thereisstilltime.online',
    ecosystem: 'other',
    priority: 'LOW',
    current_status: 'not-built',
    framework: null,
    ai_readable: false,
    next_action: 'Redirect to main .com',
    domain_info: {
      registered: true,
      registrar: 'WA/IONOS',
      expiration_date: '2026-10-05',
      auto_renew: true,
      privacy_enabled: false,
      hosting_at_registrar: false,
      notes: 'TLD protection for thereisstilltime brand - Add privacy'
    }
  },
  {
    name: 'There Is Still Time Net (TLD Protection)',
    url: 'https://thereisstilltime.net',
    ecosystem: 'other',
    priority: 'LOW',
    current_status: 'not-built',
    framework: null,
    ai_readable: false,
    next_action: 'Redirect to main .com',
    domain_info: {
      registered: true,
      registrar: 'WA/IONOS',
      expiration_date: '2026-10-05',
      auto_renew: true,
      privacy_enabled: false,
      hosting_at_registrar: false,
      notes: 'TLD protection for thereisstilltime brand - Add privacy'
    }
  }
];

export const ECOSYSTEM_CONFIG = {
  hub: {
    icon: '🏠',
    label: 'HUB',
    description: 'Central Identity'
  },
  'art-of-citizenship': {
    icon: '📚',
    label: 'ART OF CITIZENSHIP',
    description: 'Citizenship Education'
  },
  'there-is-still-time': {
    icon: '⏰',
    label: 'THERE IS STILL TIME',
    description: 'Time & Peace Movement'
  },
  other: {
    icon: '📦',
    label: 'OTHER DOMAINS',
    description: 'Additional Registered Domains'
  }
};
