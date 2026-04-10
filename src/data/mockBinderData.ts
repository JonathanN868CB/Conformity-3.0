import { BinderData } from '../types/binder';

export const mockBinderData: BinderData = {
  aircraft: {
    tailNumber: 'N563CB',
    registration: 'N563CB',
    serialNumber: '511',
    serial: '511',
    manufacturer: 'Gulfstream Aerospace',
    model: 'G650ER',
    type: 'Gulfstream G650ER',
  },
  event: {
    title: 'Annual Airworthiness Conformity',
    publishedDate: '2026-04-10',
    status: 'published',
    version: '2026.5',
  },
  sections: [
    { id: 'technical', name: 'Technical Data', color: '#2563eb', pageCount: 45 },
    { id: 'ac13544', name: 'AC 135-44 Appendix A', color: '#0f766e', pageCount: 8 },
    { id: 'bluetail', name: 'Bluetail Accordion', color: '#1d4ed8', pageCount: 6 },
    { id: 'maintenance', name: 'Maintenance Records', color: '#dc2626', pageCount: 67 },
    { id: 'modifications', name: 'Modifications', color: '#16a34a', pageCount: 23 },
    { id: 'weight', name: 'Weight & Balance', color: '#ea580c', pageCount: 12 },
    { id: 'flight', name: 'Flight Manual', color: '#7c3aed', pageCount: 89 },
    { id: 'airworthiness', name: 'Airworthiness Directives', color: '#0891b2', pageCount: 34 },
    { id: 'inspection', name: 'Inspection Program', color: '#db2777', pageCount: 28 },
    { id: 'placards', name: 'Placards & Markings', color: '#65a30d', pageCount: 15 },
  ],
  publishedVersion: '2026.5',
  publishedDate: '2026-04-10',
};
