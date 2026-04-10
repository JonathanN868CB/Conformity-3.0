import type { AircraftProfile, BinderSection } from './types';

export const aircraftProfile: AircraftProfile = {
  tailNumber: 'N618SJ',
  serialNumber: 'G280-2245',
  eventTitle: 'SkyShare FAA Conformity Inspection Package',
  publishedOn: 'April 10, 2026',
};

export const sections: BinderSection[] = [
  {
    key: 'overview',
    label: 'Overview',
    accent: '#c6a46a',
    summary:
      'Program charter, airframe baseline, and readiness statement for conformity review.',
  },
  {
    key: 'airworthiness',
    label: 'Airworthiness',
    accent: '#294e77',
    summary:
      'Aircraft records index, AD status, and compliance references for FAA alignment.',
  },
  {
    key: 'configuration',
    label: 'Configuration',
    accent: '#54697f',
    summary:
      'Installed equipment list, configuration matrix, and serial traceability documentation.',
  },
  {
    key: 'maintenance',
    label: 'Maintenance',
    accent: '#72869b',
    summary:
      'Inspection milestones, interval planning, and continuity entries for release readiness.',
  },
  {
    key: 'quality',
    label: 'Quality',
    accent: '#8f6f47',
    summary:
      'Conformity findings register, discrepancy controls, and closure documentation.',
  },
];
