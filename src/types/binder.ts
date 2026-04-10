export interface AircraftInfo {
  tailNumber: string;
  registration: string;
  serialNumber: string;
  serial: string;
  manufacturer: string;
  model: string;
  type: string;
}

export interface ConformityEvent {
  title: string;
  publishedDate: string;
  status: 'published' | 'draft' | 'archived';
  version: string;
}

export interface BinderSection {
  id: string;
  name: string;
  color: string;
  pageCount: number;
}

export interface BinderData {
  aircraft: AircraftInfo;
  event: ConformityEvent;
  sections: BinderSection[];
  publishedVersion: string;
  publishedDate: string;
}
