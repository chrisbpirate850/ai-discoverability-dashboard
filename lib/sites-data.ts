import { Site } from './types';

// Initial site data based on the blueprint
export const SITES: Omit<Site, 'id' | 'last_check'>[] = [
  // HUB
  {
    name: 'Christopher J Bradley',
    url: 'https://christopherjbradley.com',
    ecosystem: 'hub',
    priority: 'HIGH',
    current_status: 'deploying',
    framework: 'Astro',
    ai_readable: false,
    next_action: 'Fix DNS typo, verify'
  },

  // ART OF CITIZENSHIP
  {
    name: 'The Art of Citizenship',
    url: 'https://theartofcitizenship.com',
    ecosystem: 'art-of-citizenship',
    priority: 'MEDIUM',
    current_status: 'not-built',
    framework: null,
    ai_readable: false,
    next_action: 'Decide: rebuild or redirect?'
  },
  {
    name: 'Liberty\'s Principles Pals',
    url: 'https://libertysprinciplespals.com',
    ecosystem: 'art-of-citizenship',
    priority: 'HIGH',
    current_status: 'building',
    framework: 'Next.js',
    ai_readable: false,
    next_action: 'Complete Next.js migration'
  },
  {
    name: 'The Citizens Compass',
    url: 'https://thecitizenscompass.com',
    ecosystem: 'art-of-citizenship',
    priority: 'LOW',
    current_status: 'live',
    framework: 'Next.js',
    ai_readable: true,
    next_action: 'Optimize SEO'
  },
  {
    name: 'Family Unity Hub',
    url: 'https://familyunityhub.com',
    ecosystem: 'art-of-citizenship',
    priority: 'MEDIUM',
    current_status: 'not-built',
    framework: null,
    ai_readable: false,
    next_action: 'Rebuild after LPP'
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
    next_action: 'Marketing site rebuild'
  },
  {
    name: 'There Is Still Time App',
    url: 'https://app.thereisstilltime.com',
    ecosystem: 'there-is-still-time',
    priority: 'LOW',
    current_status: 'live',
    framework: 'React (CSR)',
    ai_readable: false, // CSR app - intentionally not AI readable
    next_action: 'App - CSR is fine'
  },
  {
    name: 'Love Everyone',
    url: 'https://loveeveryone.love',
    ecosystem: 'there-is-still-time',
    priority: 'MEDIUM',
    current_status: 'not-built',
    framework: null,
    ai_readable: false,
    next_action: 'Peace message site'
  },
  {
    name: 'Sunsets for the Soul',
    url: 'https://sunsetsforthesoul.com',
    ecosystem: 'there-is-still-time',
    priority: 'LOW',
    current_status: 'not-built',
    framework: null,
    ai_readable: false,
    next_action: 'Photo gallery site'
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
  }
};
