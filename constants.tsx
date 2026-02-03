
import React from 'react';
import { DorkCategory, DorkPreset } from './types';

export const DORK_PRESETS: DorkPreset[] = [
  {
    id: 'gov-global',
    name: 'Global Gov Directory Leak',
    template: 'site:.gov | site:.gob intitle:index.of "parent directory"',
    category: DorkCategory.GOVERNMENT
  },
  {
    id: 'sqli-error',
    name: 'SQL Injection: Syntax Errors',
    template: 'intext:"sql syntax near" | intext:"syntax error in query expression" | inurl:id=',
    category: DorkCategory.EXPLOIT
  },
  {
    id: 'lfi-config',
    name: 'LFI/LFD: Config Discovery',
    template: 'inurl:config.php | inurl:wp-config.php.bak | inurl:settings.py',
    category: DorkCategory.EXPLOIT
  },
  {
    id: 'xss-search',
    name: 'XSS: Vulnerable Search Params',
    template: 'inurl:search.php?q= | inurl:query= | inurl:keyword=',
    category: DorkCategory.EXPLOIT
  },
  {
    id: 'upload-vuln',
    name: 'File Upload: Open Directories',
    template: 'inurl:/upload/ | intitle:"index of" "uploads" | inurl:upload.php',
    category: DorkCategory.SENSITIVE
  },
  {
    id: 'db-backup',
    name: 'Database: SQL/BKP Dumps',
    template: 'filetype:sql | filetype:bkp | filetype:bak "password"',
    category: DorkCategory.DATABASE
  },
  {
    id: 'shop-luxury',
    name: 'Luxury E-commerce (Jewelry/Perfume)',
    template: 'inurl:shop "jewelry" | inurl:store "perfumes" "checkout"',
    category: DorkCategory.COMMERCE
  },
  {
    id: 'travel-booking',
    name: 'Global Hotel & Ticket Portals',
    template: 'intitle:"booking" | inurl:hotels "tickets" | site:booking.com',
    category: DorkCategory.TRAVEL
  },
  {
    id: 'leak-passwords',
    name: 'Credentials: TXT Password Lists',
    template: 'filetype:txt intext:"password" | intext:"DB_PASSWORD" | intext:"admin_pass"',
    category: DorkCategory.SENSITIVE
  }
];

export const Icons = {
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
  ),
  Copy: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
  ),
  External: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
  ),
  Sparkles: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
  ),
  Shield: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
  )
};
