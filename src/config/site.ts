// ── SITE CONFIG ──────────────────────────────────────────────────────────────
// Single source of truth for personal data.
// Changes here propagate to both the terminal emulator and the web pages.

export const SITE = {
  handle:  '0x42sec',
  domain:  '0x42sec.io',
  // Shown in the terminal boot sequence and browser meta descriptions
  tagline: 'Cyber Transformation // AppSec // Offensive Adversary Simulation // Threat Intelligence // personal ops',
};

export const ABOUT = {
  handle: '0x42sec',
  role:   'Senior Cyber Security Leader //  Offensive Adversary Simulation Strategist',
  site:   '0x42sec.io — research lab & personal ops',

  // First paragraph on the web About page (larger/lead text)
  lead: 'Senior Cyber Security Leader with 10+ years across Security Engineering, AppSec, Cyber Assurance, Offensive Adversary Simulation, Vulnerability Management & Cyber Strategy. Penetration Tester → Team Lead → Function Senior Manager → Head of Cyber Security / Deputy CISO.',

  // Additional body paragraphs on the web About page
  paragraphs: [
    'Security programme builder, implementer and executionist with deep technical foundations shaped across dozens of industries, technology stacks, and organisational models. I think in programmes, not projects, designing capabilities that embed into engineering culture and mature over time.',
    'I design threat informed Offensive Security Strategies focused on realistic threat simulation, measurable risk, and building things that actually work in the field.',
  ],

  // Shown as skill chips on the web page and as a tree in the terminal
  expertise: [
    'Offensive adversary simulation & strategy',
    'Threat Intelligence',
    'Vulnerability Management',
    'Building, Leading & Managing High Performing Teams',
    'Assurance & Compliance Programmes',
    'Security Posture Management',
    'FAIR / Monte Carlo quantitative risk modelling',
    'Threat modelling: STRIDE, PASTA, LINDDUN, Attack Trees',
    'MITRE ATT\u0026CK TTP mapping',
  ],

  // Shown at the bottom of the terminal about output
  terminalFooter: 'Currently building this terminal.',
};

export const CONTACT = {
  // Add/remove channels here — both terminal and web page update automatically.
  // Set href to null for plain text values (no link).
  channels: [
    { label: 'EMAIL',    value: 'hello [at] 0x42sec.io',        href: null },
    // { label: 'GITHUB',   value: 'github.com/0x42sec',           href: 'https://github.com/0x42sec' },
    // { label: 'LINKEDIN', value: 'linkedin.com/in/0x42sec',      href: 'https://linkedin.com/in/0x42sec' },
    // { label: 'PGP',      value: 'Available on request',         href: null },
  ],
  // note: 'Encrypted communications preferred.',
};
