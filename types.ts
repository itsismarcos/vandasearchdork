
export interface DorkResult {
  query: string;
  description: string;
  category: string;
}

export enum DorkCategory {
  GOVERNMENT = 'GOV/GOB (Global)',
  COMMERCE = 'Shops/Luxury/Tickets',
  TRAVEL = 'Hotels/Travel/Booking',
  EXPLOIT = 'XSS/LFI/SQLi (Vulnerability)',
  DATABASE = 'DB/SQL/Backups',
  SENSITIVE = 'Credentials/Uploads',
  CUSTOM = 'Neural Override'
}

export interface DorkPreset {
  id: string;
  name: string;
  template: string;
  category: DorkCategory;
}
