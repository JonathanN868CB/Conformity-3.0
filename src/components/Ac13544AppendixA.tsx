import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Link2 } from 'lucide-react';

interface Ac13544AppendixAProps {
  onBoundaryFlip: (direction: 'prev' | 'next') => void;
  pageIndex: number;
}

interface LinkableValue {
  value: string;
  link: string;
}

interface MaintenanceRow {
  item: string;
  makeModel: LinkableValue;
  maintenanceDoc: LinkableValue;
  intervalDoc: LinkableValue;
  interval: string;
}

interface EmergencyRow {
  item: string;
  partNumber: LinkableValue;
  description: LinkableValue;
  maintenanceDoc: LinkableValue;
  interval: string;
}

interface AlterationRow {
  date: string;
  form337: string;
  ica: string;
  scheduledInspection: boolean;
  onCondition: boolean;
  stcOrFieldApproval: string;
  flightManualSupplement: boolean;
  pilotChecklistImpact: boolean;
  description: string;
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
      {children}
    </span>
  );
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <FieldLabel>{label}</FieldLabel>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-sm border border-slate-300 bg-white px-2.5 py-2 text-[13px] text-slate-800 outline-none transition focus:border-slate-500"
      />
    </label>
  );
}

function LinkableField({
  label,
  field,
  onChange,
}: {
  label: string;
  field: LinkableValue;
  onChange: (field: LinkableValue) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <FieldLabel>{label}</FieldLabel>
      <input
        value={field.value}
        onChange={(event) => onChange({ ...field, value: event.target.value })}
        className="rounded-sm border border-slate-300 bg-white px-2.5 py-2 text-[13px] text-slate-800 outline-none transition focus:border-slate-500"
      />
      <div className="relative">
        <input
          value={field.link}
          placeholder="Add source link or document reference"
          onChange={(event) => onChange({ ...field, link: event.target.value })}
          className="w-full rounded-sm border border-slate-200 bg-slate-50 px-2.5 py-2 pr-8 text-[12px] text-slate-700 outline-none transition focus:border-slate-400"
        />
        <Link2 className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
      </div>
    </div>
  );
}

function CheckField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-2 text-[13px] text-slate-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-0.5 size-4 rounded border-slate-300 text-slate-800"
      />
      <span>{label}</span>
    </label>
  );
}

function PdfPage({
  pageNumber,
  title,
  children,
}: {
  pageNumber: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-sm border border-slate-300 bg-[#fffdf8] shadow-[0_18px_40px_rgba(15,23,42,0.10)]">
      <div className="border-b border-slate-300 px-6 py-4">
        <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">
          AC 135-44 Appendix A
        </div>
        <div className="flex items-end justify-between gap-4">
          <h3 className="text-[15px] font-bold uppercase tracking-[0.08em] text-slate-800">
            {title}
          </h3>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            {pageNumber}
          </span>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden px-6 py-5">{children}</div>
    </div>
  );
}

export function Ac13544AppendixA({
  onBoundaryFlip,
  pageIndex,
}: Ac13544AppendixAProps) {
  const [manualInfo, setManualInfo] = useState({
    aircraftMaintenanceManual: { value: 'GV AMM', link: '' },
    revisionLevel: '60',
    revisionDate: '1/31/2026',
  });
  const [maintenanceRows, setMaintenanceRows] = useState<MaintenanceRow[]>([
    {
      item: 'Engine (Left or Single Engine)',
      makeModel: { value: 'RR BR700-710A1-10', link: '' },
      maintenanceDoc: { value: 'GV AMM (MSG-3)', link: '' },
      intervalDoc: { value: 'RR EMP BR710-005', link: '' },
      interval: 'O/C',
    },
    {
      item: 'Engine (Right if applicable)',
      makeModel: { value: 'RR BR700-710A1-10', link: '' },
      maintenanceDoc: { value: 'GV AMM (MSG-3)', link: '' },
      intervalDoc: { value: 'RR EMP BR710-005', link: '' },
      interval: 'O/C',
    },
    {
      item: 'Propeller/Rotor (Left or Single Engine)',
      makeModel: { value: 'N/A', link: '' },
      maintenanceDoc: { value: 'N/A', link: '' },
      intervalDoc: { value: 'N/A', link: '' },
      interval: 'N/A',
    },
    {
      item: 'Propeller/Rotor (Right if applicable)',
      makeModel: { value: 'N/A', link: '' },
      maintenanceDoc: { value: 'N/A', link: '' },
      intervalDoc: { value: 'N/A', link: '' },
      interval: 'N/A',
    },
    {
      item: 'Propeller Governor (Left or Single Engine)',
      makeModel: { value: 'N/A', link: '' },
      maintenanceDoc: { value: 'N/A', link: '' },
      intervalDoc: { value: 'N/A', link: '' },
      interval: 'N/A',
    },
    {
      item: 'Propeller Governor (Right if applicable)',
      makeModel: { value: 'N/A', link: '' },
      maintenanceDoc: { value: 'N/A', link: '' },
      intervalDoc: { value: 'N/A', link: '' },
      interval: 'N/A',
    },
    {
      item: 'Primary Governor',
      makeModel: { value: 'N/A', link: '' },
      maintenanceDoc: { value: 'N/A', link: '' },
      intervalDoc: { value: 'N/A', link: '' },
      interval: 'N/A',
    },
    {
      item: 'Overspeed Governor',
      makeModel: { value: 'N/A', link: '' },
      maintenanceDoc: { value: 'N/A', link: '' },
      intervalDoc: { value: 'N/A', link: '' },
      interval: 'N/A',
    },
  ]);
  const [historyChecks, setHistoryChecks] = useState({
    annual: false,
    progressive: false,
    hundredHour: false,
    lastAltimeterPitot: false,
    camp: false,
    aaip: false,
    manufacturerProgram: true,
    otherApproved: false,
  });
  const [programChecks, setProgramChecks] = useState({
    ruleA1: false,
    annualAndHundred: false,
    progressive: false,
    aaip: false,
    manufacturerProgram: false,
    ruleA2: false,
    camp: true,
  });
  const [aircraftUse, setAircraftUse] = useState({
    takeoffsPerMonth: '30',
    hoursPerMonth: '50',
    makeModel: 'Gulfstream GV',
    registration: 'N563CB',
  });
  const [emergencyRows, setEmergencyRows] = useState<EmergencyRow[]>([
    {
      item: 'Portable Breathing Equip (PBE)',
      partNumber: { value: 'E28180-20-000', link: '' },
      description: { value: 'BE Aero PBE', link: '' },
      maintenanceDoc: { value: 'GV AMM', link: '' },
      interval: '120 Month Discard',
    },
    {
      item: 'Smoke-Masks / Goggles / Hoods',
      partNumber: { value: 'E28180', link: '' },
      description: { value: 'BE Aero Smoke Hood', link: '' },
      maintenanceDoc: { value: 'GV AMM', link: '' },
      interval: 'Date on Smoke Hood',
    },
    {
      item: 'Eng Fire Ext',
      partNumber: { value: '33600058-4', link: '' },
      description: { value: 'Medditt Fire BTL', link: '' },
      maintenanceDoc: { value: 'GV AMM', link: '' },
      interval: '60 Month Weight Chk',
    },
    {
      item: 'Eng Fire Ext Squibs',
      partNumber: { value: 'M30903828', link: '' },
      description: { value: 'Ametek Squib', link: '' },
      maintenanceDoc: { value: 'GV AMM', link: '' },
      interval: '120 Month Discard',
    },
    {
      item: 'N2 Blow-Down Bottles',
      partNumber: { value: '1159SCH233-21', link: '' },
      description: { value: 'Pacific Scientific N2 BTL', link: '' },
      maintenanceDoc: { value: 'GV AMM', link: '' },
      interval: '180 Month Discard',
    },
    {
      item: 'Portable O2 Equipment',
      partNumber: { value: '5600-9M6A-F30AN', link: '' },
      description: { value: 'Zodiac Portable O2 Bottle', link: '' },
      maintenanceDoc: { value: 'GV AMM', link: '' },
      interval: '12 Month Insp',
    },
    {
      item: 'Crew O2 Masks',
      partNumber: { value: 'MC10-15-158', link: '' },
      description: { value: 'Zodiac O2 Mask', link: '' },
      maintenanceDoc: { value: 'GV AMM', link: '' },
      interval: '72 Month Restore',
    },
    {
      item: 'Pax O2 Masks',
      partNumber: { value: '833-610', link: '' },
      description: { value: 'Zodiac O2 Mask Assy', link: '' },
      maintenanceDoc: { value: 'GV AMM', link: '' },
      interval: '36 Month Insp',
    },
  ]);
  const [alterations, setAlterations] = useState<AlterationRow[]>([
    {
      date: '',
      form337: '',
      ica: '',
      scheduledInspection: false,
      onCondition: false,
      stcOrFieldApproval: '',
      flightManualSupplement: false,
      pilotChecklistImpact: false,
      description: '',
    },
    {
      date: '',
      form337: '',
      ica: '',
      scheduledInspection: false,
      onCondition: false,
      stcOrFieldApproval: '',
      flightManualSupplement: false,
      pilotChecklistImpact: false,
      description: '',
    },
  ]);
  const [requiredData, setRequiredData] = useState({
    airframeTime: '',
    leftEngineTime: '',
    rightEngineTime: '',
    propellerTime: '',
    rotorTime: '',
    lifeLimitedPartsLink: '',
    overhaulStatusLink: '',
    inspectionStatusLink: '',
    adListingLink: '',
  });
  const lastWheelAt = useRef(0);
  const wheelRemainder = useRef(0);
  const maintenancePageOne = maintenanceRows.slice(0, 4);
  const maintenancePageTwo = maintenanceRows.slice(4);
  const emergencyPageOne = emergencyRows.slice(0, 4);
  const emergencyPageTwo = emergencyRows.slice(4);

  const setMaintenanceRow = (
    rowIndex: number,
    key: keyof MaintenanceRow,
    value: MaintenanceRow[keyof MaintenanceRow],
  ) => {
    setMaintenanceRows((rows) =>
      rows.map((row, index) => (index === rowIndex ? { ...row, [key]: value } : row)),
    );
  };

  const setEmergencyRow = (
    rowIndex: number,
    key: keyof EmergencyRow,
    value: EmergencyRow[keyof EmergencyRow],
  ) => {
    setEmergencyRows((rows) =>
      rows.map((row, index) => (index === rowIndex ? { ...row, [key]: value } : row)),
    );
  };

  const setAlterationRow = (
    rowIndex: number,
    key: keyof AlterationRow,
    value: AlterationRow[keyof AlterationRow],
  ) => {
    setAlterations((rows) =>
      rows.map((row, index) => (index === rowIndex ? { ...row, [key]: value } : row)),
    );
  };

  const pages = [
    {
      pageNumber: 'A-2',
      title: 'Section 2 Airworthiness Limitations',
      content: (
        <div className="space-y-6">
          <section className="space-y-3">
            <div>
              <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                2.1 Additional Required Aircraft Information
              </div>
              <p className="text-[13px] text-slate-600">
                For operations under 135.411(a)(1). Part numbers and document numbers must be complete and accurate.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 rounded-sm border border-slate-300 bg-slate-50 p-3">
              <LinkableField
                label="Aircraft Maintenance Manual"
                field={manualInfo.aircraftMaintenanceManual}
                onChange={(field) => setManualInfo((current) => ({ ...current, aircraftMaintenanceManual: field }))}
              />
              <TextField
                label="Revision Level"
                value={manualInfo.revisionLevel}
                onChange={(value) => setManualInfo((current) => ({ ...current, revisionLevel: value }))}
              />
              <TextField
                label="Date"
                value={manualInfo.revisionDate}
                onChange={(value) => setManualInfo((current) => ({ ...current, revisionDate: value }))}
              />
            </div>

            <div className="space-y-3">
              {maintenancePageOne.map((row, localIndex) => {
                const index = localIndex;
                return (
                <div key={row.item} className="rounded-sm border border-slate-300 bg-white p-3">
                  <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-700">
                    {row.item}
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <LinkableField
                      label="Make & Model"
                      field={row.makeModel}
                      onChange={(field) => setMaintenanceRow(index, 'makeModel', field)}
                    />
                    <LinkableField
                      label="Maintenance / Overhaul Document ID"
                      field={row.maintenanceDoc}
                      onChange={(field) => setMaintenanceRow(index, 'maintenanceDoc', field)}
                    />
                    <LinkableField
                      label="Time-In-Service Document ID"
                      field={row.intervalDoc}
                      onChange={(field) => setMaintenanceRow(index, 'intervalDoc', field)}
                    />
                    <TextField
                      label="Time-In-Service Interval"
                      value={row.interval}
                      onChange={(value) => setMaintenanceRow(index, 'interval', value)}
                    />
                  </div>
                </div>
              )})}
            </div>
          </section>
        </div>
      ),
    },
    {
      pageNumber: 'A-2A',
      title: 'Section 2 Airworthiness Limitations Continued',
      content: (
        <div className="space-y-6">
          <section className="space-y-3">
            <div>
              <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                2.1 Additional Required Aircraft Information
              </div>
              <p className="text-[13px] text-slate-600">
                Continuation of the maintenance and overhaul listing for Section 2.1.
              </p>
            </div>

            <div className="space-y-3">
              {maintenancePageTwo.map((row, localIndex) => {
                const index = localIndex + maintenancePageOne.length;
                return (
                <div key={row.item} className="rounded-sm border border-slate-300 bg-white p-3">
                  <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-700">
                    {row.item}
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <LinkableField
                      label="Make & Model"
                      field={row.makeModel}
                      onChange={(field) => setMaintenanceRow(index, 'makeModel', field)}
                    />
                    <LinkableField
                      label="Maintenance / Overhaul Document ID"
                      field={row.maintenanceDoc}
                      onChange={(field) => setMaintenanceRow(index, 'maintenanceDoc', field)}
                    />
                    <LinkableField
                      label="Time-In-Service Document ID"
                      field={row.intervalDoc}
                      onChange={(field) => setMaintenanceRow(index, 'intervalDoc', field)}
                    />
                    <TextField
                      label="Time-In-Service Interval"
                      value={row.interval}
                      onChange={(value) => setMaintenanceRow(index, 'interval', value)}
                    />
                  </div>
                </div>
              )})}
            </div>
          </section>

          <section className="space-y-3">
            <div>
              <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                2.2 Maintenance & Inspection History
              </div>
              <p className="text-[13px] text-slate-600">
                Parts 43 & 91. Check the programs that applied before this application.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 rounded-sm border border-slate-300 bg-white p-3">
              <CheckField
                label="Annual Inspections, 91.409(a)"
                checked={historyChecks.annual}
                onChange={(checked) => setHistoryChecks((current) => ({ ...current, annual: checked }))}
              />
              <CheckField
                label="100-Hour Inspections, 91.409(b)"
                checked={historyChecks.hundredHour}
                onChange={(checked) => setHistoryChecks((current) => ({ ...current, hundredHour: checked }))}
              />
              <CheckField
                label="Progressive Inspections, 91.409(d)"
                checked={historyChecks.progressive}
                onChange={(checked) => setHistoryChecks((current) => ({ ...current, progressive: checked }))}
              />
              <CheckField
                label="Last 91.411 and 91.413 Inspection"
                checked={historyChecks.lastAltimeterPitot}
                onChange={(checked) =>
                  setHistoryChecks((current) => ({ ...current, lastAltimeterPitot: checked }))
                }
              />
              <CheckField
                label="CAMP / CAIP, 91.409(f)(1)"
                checked={historyChecks.camp}
                onChange={(checked) => setHistoryChecks((current) => ({ ...current, camp: checked }))}
              />
              <CheckField
                label="AAIP under 135.419 and 91.409(c)(2) or (f)(2)"
                checked={historyChecks.aaip}
                onChange={(checked) => setHistoryChecks((current) => ({ ...current, aaip: checked }))}
              />
              <CheckField
                label="Manufacturer's Program, 91.409(f)(3)"
                checked={historyChecks.manufacturerProgram}
                onChange={(checked) =>
                  setHistoryChecks((current) => ({ ...current, manufacturerProgram: checked }))
                }
              />
              <CheckField
                label="Other Approved Program, 91.409(f)(4)"
                checked={historyChecks.otherApproved}
                onChange={(checked) =>
                  setHistoryChecks((current) => ({ ...current, otherApproved: checked }))
                }
              />
            </div>
          </section>
        </div>
      ),
    },
    {
      pageNumber: 'A-3',
      title: 'Section 2 Program And Emergency Equipment',
      content: (
        <div className="space-y-6">
          <section className="space-y-3">
            <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
              2.3 Intended (New) Maintenance & Inspection Program Under Part 135
            </div>
            <div className="grid grid-cols-1 gap-2.5 rounded-sm border border-slate-300 bg-white p-3">
              <CheckField
                label="135.411(a)(1) Maintained according to parts 43 and 91"
                checked={programChecks.ruleA1}
                onChange={(checked) => setProgramChecks((current) => ({ ...current, ruleA1: checked }))}
              />
              <CheckField
                label="Annual inspections and 100-hour inspections under 91.409(a) and (b)"
                checked={programChecks.annualAndHundred}
                onChange={(checked) =>
                  setProgramChecks((current) => ({ ...current, annualAndHundred: checked }))
                }
              />
              <CheckField
                label="Progressive inspections under 91.409(d)"
                checked={programChecks.progressive}
                onChange={(checked) => setProgramChecks((current) => ({ ...current, progressive: checked }))}
              />
              <CheckField
                label="Approved Aircraft Inspection Program (AAIP)"
                checked={programChecks.aaip}
                onChange={(checked) => setProgramChecks((current) => ({ ...current, aaip: checked }))}
              />
              <CheckField
                label="Current inspection program recommended by the manufacturer"
                checked={programChecks.manufacturerProgram}
                onChange={(checked) =>
                  setProgramChecks((current) => ({ ...current, manufacturerProgram: checked }))
                }
              />
              <CheckField
                label="135.411(a)(2)"
                checked={programChecks.ruleA2}
                onChange={(checked) => setProgramChecks((current) => ({ ...current, ruleA2: checked }))}
              />
              <CheckField
                label="Inspected and maintained according to a Continuous Airworthiness Maintenance Program (CAMP)"
                checked={programChecks.camp}
                onChange={(checked) => setProgramChecks((current) => ({ ...current, camp: checked }))}
              />
            </div>
          </section>

          <section className="grid grid-cols-4 gap-3">
            <TextField
              label="Takeoffs Per Month"
              value={aircraftUse.takeoffsPerMonth}
              onChange={(value) => setAircraftUse((current) => ({ ...current, takeoffsPerMonth: value }))}
            />
            <TextField
              label="Flight Hours Per Month"
              value={aircraftUse.hoursPerMonth}
              onChange={(value) => setAircraftUse((current) => ({ ...current, hoursPerMonth: value }))}
            />
            <TextField
              label="A/C Make / Model"
              value={aircraftUse.makeModel}
              onChange={(value) => setAircraftUse((current) => ({ ...current, makeModel: value }))}
            />
            <TextField
              label="Registration Number"
              value={aircraftUse.registration}
              onChange={(value) => setAircraftUse((current) => ({ ...current, registration: value }))}
            />
          </section>

          <section className="space-y-3">
            <div>
              <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                2.5 Emergency Equipment [135.421]
              </div>
              <p className="text-[13px] text-slate-600">
                Link each item to the supporting maintenance document or source package as we digitize the binder.
              </p>
            </div>

            <div className="space-y-3">
              {emergencyPageOne.map((row, localIndex) => {
                const index = localIndex;
                return (
                <div key={row.item} className="rounded-sm border border-slate-300 bg-white p-3">
                  <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-700">
                    {row.item}
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <LinkableField
                      label="Part Number"
                      field={row.partNumber}
                      onChange={(field) => setEmergencyRow(index, 'partNumber', field)}
                    />
                    <LinkableField
                      label="Description or Part Name"
                      field={row.description}
                      onChange={(field) => setEmergencyRow(index, 'description', field)}
                    />
                    <LinkableField
                      label="Manufacturer's Maintenance Document"
                      field={row.maintenanceDoc}
                      onChange={(field) => setEmergencyRow(index, 'maintenanceDoc', field)}
                    />
                    <TextField
                      label="Life Limits or Inspection Intervals"
                      value={row.interval}
                      onChange={(value) => setEmergencyRow(index, 'interval', value)}
                    />
                  </div>
                </div>
              )})}
            </div>
          </section>
        </div>
      ),
    },
    {
      pageNumber: 'A-3A',
      title: 'Section 2 Emergency Equipment Continued',
      content: (
        <div className="space-y-6">
          <section className="space-y-3">
            <div>
              <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                2.5 Emergency Equipment [135.421]
              </div>
              <p className="text-[13px] text-slate-600">
                Continuation of the emergency equipment schedule with document-linkable fields.
              </p>
            </div>

            <div className="space-y-3">
              {emergencyPageTwo.map((row, localIndex) => {
                const index = localIndex + emergencyPageOne.length;
                return (
                <div key={row.item} className="rounded-sm border border-slate-300 bg-white p-3">
                  <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-700">
                    {row.item}
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <LinkableField
                      label="Part Number"
                      field={row.partNumber}
                      onChange={(field) => setEmergencyRow(index, 'partNumber', field)}
                    />
                    <LinkableField
                      label="Description or Part Name"
                      field={row.description}
                      onChange={(field) => setEmergencyRow(index, 'description', field)}
                    />
                    <LinkableField
                      label="Manufacturer's Maintenance Document"
                      field={row.maintenanceDoc}
                      onChange={(field) => setEmergencyRow(index, 'maintenanceDoc', field)}
                    />
                    <TextField
                      label="Life Limits or Inspection Intervals"
                      value={row.interval}
                      onChange={(value) => setEmergencyRow(index, 'interval', value)}
                    />
                  </div>
                </div>
              )})}
            </div>
          </section>
        </div>
      ),
    },
    {
      pageNumber: 'A-4',
      title: 'Section 2 Major Alterations And Required Data',
      content: (
        <div className="space-y-6">
          <section className="space-y-3">
            <div>
              <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                2.6 Major Alterations
              </div>
              <p className="text-[13px] text-slate-600">
                Track major alterations, ICA, and pilot-checklist impacts. Add links to the related ICA, STC, or Form 337 package.
              </p>
            </div>

            <div className="space-y-3">
              {alterations.map((row, index) => (
                <div key={index} className="rounded-sm border border-slate-300 bg-white p-3">
                  <div className="grid grid-cols-3 gap-2.5">
                    <TextField
                      label="Date"
                      value={row.date}
                      onChange={(value) => setAlterationRow(index, 'date', value)}
                    />
                    <TextField
                      label="337 Block 7"
                      value={row.form337}
                      onChange={(value) => setAlterationRow(index, 'form337', value)}
                    />
                    <TextField
                      label="ICA"
                      value={row.ica}
                      onChange={(value) => setAlterationRow(index, 'ica', value)}
                    />
                    <TextField
                      label="STC or Field Approval"
                      value={row.stcOrFieldApproval}
                      onChange={(value) => setAlterationRow(index, 'stcOrFieldApproval', value)}
                    />
                    <TextField
                      label="Brief Description"
                      value={row.description}
                      onChange={(value) => setAlterationRow(index, 'description', value)}
                    />
                    <div className="grid grid-cols-2 gap-2 rounded-sm border border-slate-200 bg-slate-50 p-2.5">
                      <CheckField
                        label="Scheduled Inspection"
                        checked={row.scheduledInspection}
                        onChange={(checked) => setAlterationRow(index, 'scheduledInspection', checked)}
                      />
                      <CheckField
                        label="On Condition"
                        checked={row.onCondition}
                        onChange={(checked) => setAlterationRow(index, 'onCondition', checked)}
                      />
                      <CheckField
                        label="Flight Manual Supplement"
                        checked={row.flightManualSupplement}
                        onChange={(checked) => setAlterationRow(index, 'flightManualSupplement', checked)}
                      />
                      <CheckField
                        label="Impact To Pilot's Checklist"
                        checked={row.pilotChecklistImpact}
                        onChange={(checked) => setAlterationRow(index, 'pilotChecklistImpact', checked)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <div>
              <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                2.7 Required Maintenance & Inspection Data
              </div>
              <p className="text-[13px] text-slate-600">
                These are attachment-driven requirements in the PDF. Each entry below is intentionally linkable so we can bind it to records later.
              </p>
            </div>

            <div className="grid grid-cols-5 gap-2.5 rounded-sm border border-slate-300 bg-white p-3">
              <TextField
                label="Airframe Time"
                value={requiredData.airframeTime}
                onChange={(value) => setRequiredData((current) => ({ ...current, airframeTime: value }))}
              />
              <TextField
                label="L Engine"
                value={requiredData.leftEngineTime}
                onChange={(value) => setRequiredData((current) => ({ ...current, leftEngineTime: value }))}
              />
              <TextField
                label="R Engine"
                value={requiredData.rightEngineTime}
                onChange={(value) => setRequiredData((current) => ({ ...current, rightEngineTime: value }))}
              />
              <TextField
                label="Each Propeller"
                value={requiredData.propellerTime}
                onChange={(value) => setRequiredData((current) => ({ ...current, propellerTime: value }))}
              />
              <TextField
                label="Each Rotor"
                value={requiredData.rotorTime}
                onChange={(value) => setRequiredData((current) => ({ ...current, rotorTime: value }))}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <TextField
                label="Life-Limited Parts Attachment Link"
                value={requiredData.lifeLimitedPartsLink}
                onChange={(value) =>
                  setRequiredData((current) => ({ ...current, lifeLimitedPartsLink: value }))
                }
              />
              <TextField
                label="Overhaul Status Attachment Link"
                value={requiredData.overhaulStatusLink}
                onChange={(value) =>
                  setRequiredData((current) => ({ ...current, overhaulStatusLink: value }))
                }
              />
              <TextField
                label="Inspection Status Attachment Link"
                value={requiredData.inspectionStatusLink}
                onChange={(value) =>
                  setRequiredData((current) => ({ ...current, inspectionStatusLink: value }))
                }
              />
              <TextField
                label="AD Listing Attachment Link"
                value={requiredData.adListingLink}
                onChange={(value) => setRequiredData((current) => ({ ...current, adListingLink: value }))}
              />
            </div>
          </section>
        </div>
      ),
    },
  ];

  const currentPage = pages[pageIndex] ?? pages[0];

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const now = Date.now();
    if (now - lastWheelAt.current < 120) {
      return;
    }
    if (Math.abs(event.deltaY) < 2) {
      return;
    }

    wheelRemainder.current += event.deltaY;
    if (Math.abs(wheelRemainder.current) < 28) {
      return;
    }

    lastWheelAt.current = now;
    const direction = wheelRemainder.current > 0 ? 'next' : 'prev';
    wheelRemainder.current = 0;

    if (direction === 'next' && pageIndex >= pages.length - 1) {
      onBoundaryFlip('next');
      return;
    }

    if (direction === 'prev' && pageIndex <= 0) {
      onBoundaryFlip('prev');
      return;
    }
    onBoundaryFlip(direction);
  };

  return (
    <div className="flex h-full w-full flex-col" onWheel={handleWheel}>
      <div className="min-h-0 flex-1 overflow-hidden">
        <motion.div
          key={currentPage.pageNumber}
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="h-full"
        >
          <PdfPage pageNumber={currentPage.pageNumber} title={currentPage.title}>
            {currentPage.content}
          </PdfPage>
        </motion.div>
      </div>
    </div>
  );
}
