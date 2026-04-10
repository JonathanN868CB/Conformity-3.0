import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ChevronDown,
  ChevronUp,
  EllipsisVertical,
  Plus,
  Search,
} from 'lucide-react';

interface BluetailAccordionSectionProps {
  color: string;
}

interface ComplianceItem {
  id: string;
  label: string;
  description: string;
  status: 'Complete' | 'In Progress' | 'Needs Review';
  keyword: string;
  fileName: string;
  pageNumbers: string;
}

interface ComplianceModule {
  id: string;
  title: string;
  itemCount: number;
  statusLabel: string;
  progress: Array<{ color: string; width: number }>;
  items: ComplianceItem[];
}

const modulesSeed: ComplianceModule[] = [
  {
    id: 'mod-1',
    title: 'MOD 1 - Part 135 Documents',
    itemCount: 13,
    statusLabel: 'All Statuses',
    progress: [
      { color: '#2eaf57', width: 76 },
      { color: '#f1c40f', width: 10 },
    ],
    items: [
      {
        id: 'module-1',
        label: 'Module 1',
        description: 'SOP Module 1',
        status: 'Complete',
        keyword: 'Module 1',
        fileName: 'Conformity SOP_MOD 1_Part 135 Docs.pdf',
        pageNumbers: '*',
      },
      {
        id: 'module-1-complete',
        label: 'Module 1',
        description: 'Module 1 Complete',
        status: 'In Progress',
        keyword: 'Module 1',
        fileName: 'Module 1 completion memo.pdf',
        pageNumbers: '2-5',
      },
      {
        id: 'coa',
        label: 'C of A',
        description: 'Upload AW cert photo or PDF',
        status: 'Complete',
        keyword: 'Airworthiness Certificate',
        fileName: 'FAA AW Certificate.pdf',
        pageNumbers: '1',
      },
      {
        id: 'registration',
        label: 'Registration',
        description: 'Upload aircraft registration photo or PDF',
        status: 'Complete',
        keyword: 'Registration',
        fileName: 'Aircraft Registration N563CB.pdf',
        pageNumbers: '1',
      },
    ],
  },
  {
    id: 'mod-2',
    title: 'MOD 2 - Form 337-ICA-AFMS',
    itemCount: 8,
    statusLabel: 'All Statuses',
    progress: [
      { color: '#2eaf57', width: 77 },
      { color: '#f1c40f', width: 10 },
    ],
    items: [
      {
        id: '337-1',
        label: '337',
        description: 'Primary FAA Form 337 package',
        status: 'Complete',
        keyword: 'Form 337',
        fileName: '337 Package.pdf',
        pageNumbers: '1-9',
      },
      {
        id: 'ica',
        label: 'ICA',
        description: 'Instructions for Continued Airworthiness',
        status: 'In Progress',
        keyword: 'ICA',
        fileName: 'ICA Packet.pdf',
        pageNumbers: '10-18',
      },
    ],
  },
  {
    id: 'mod-3',
    title: 'MOD 3 - Equipment List',
    itemCount: 5,
    statusLabel: 'All Statuses',
    progress: [
      { color: '#2eaf57', width: 28 },
      { color: '#d95f02', width: 36 },
    ],
    items: [
      {
        id: 'equip-1',
        label: 'Equipment List',
        description: 'Current aircraft equipment schedule',
        status: 'Needs Review',
        keyword: 'Equipment List',
        fileName: 'Equipment Schedule.xlsx',
        pageNumbers: 'n/a',
      },
    ],
  },
];

function StatusBadge({ status }: { status: ComplianceItem['status'] }) {
  const config = {
    Complete: { bg: '#2eaf57', text: 'white' },
    'In Progress': { bg: '#f4bf16', text: 'white' },
    'Needs Review': { bg: '#d95f02', text: 'white' },
  }[status];

  return (
    <div
      className="inline-flex min-w-[110px] items-center justify-center rounded-sm px-3 py-2 text-sm font-semibold"
      style={{ backgroundColor: config.bg, color: config.text }}
    >
      {status}
    </div>
  );
}

export function BluetailAccordionSection({ color }: BluetailAccordionSectionProps) {
  const [openModules, setOpenModules] = useState<string[]>(['mod-1']);
  const [openItems, setOpenItems] = useState<string[]>(['module-1']);

  const toggleModule = (moduleId: string) => {
    setOpenModules((current) =>
      current.includes(moduleId)
        ? current.filter((id) => id !== moduleId)
        : [...current, moduleId],
    );
  };

  const toggleItem = (itemId: string) => {
    setOpenItems((current) =>
      current.includes(itemId) ? current.filter((id) => id !== itemId) : [...current, itemId],
    );
  };

  return (
    <div className="flex h-full w-full flex-col bg-[#f3f4f6]">
      <div className="mb-4 border border-slate-200 bg-white px-4 py-5">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <div className="mb-1 text-[13px] text-slate-500">
              <span className="font-semibold text-slate-900">Compliance</span>
              <span className="mx-1">Dashboard</span>
              <span>&gt; GV SN 511 Conformity</span>
            </div>
            <h2 className="text-[19px] font-bold text-slate-900">GV SN 511 Conformity</h2>
          </div>
          <div className="flex gap-2">
            <button className="rounded border border-[#a9c7ff] bg-white px-4 py-2 text-sm text-[#1565d8]">
              Expand All
            </button>
            <button className="rounded border border-[#a9c7ff] bg-white px-4 py-2 text-sm text-[#1565d8]">
              Edit Sections
            </button>
          </div>
        </div>

        <div className="space-y-5">
          {modulesSeed.map((module) => {
            const isOpen = openModules.includes(module.id);

            return (
              <div key={module.id} className="border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center gap-5 px-4 py-5">
                  <div className="min-w-[220px] text-[16px] font-bold text-slate-900">
                    {module.title}
                  </div>

                  <div className="text-sm text-slate-500">{module.itemCount} Items</div>

                  <div className="flex h-3 w-[170px] overflow-hidden bg-slate-200">
                    {module.progress.map((segment, index) => (
                      <div
                        key={`${module.id}-${index}`}
                        style={{ width: `${segment.width}%`, backgroundColor: segment.color }}
                      />
                    ))}
                  </div>

                  <div className="rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700">
                    {module.statusLabel}
                  </div>

                  <div className="ml-auto flex items-center gap-2">
                    {isOpen ? (
                      <>
                        <button className="rounded border border-[#9cc0ff] bg-white px-4 py-2 text-sm text-[#1565d8]">
                          <span className="inline-flex items-center gap-2">
                            <Plus className="size-4" />
                            Add Items
                          </span>
                        </button>
                        <button className="rounded border border-[#9cc0ff] bg-white px-4 py-2 text-sm text-[#1565d8]">
                          Preview
                        </button>
                      </>
                    ) : null}
                    <button className="rounded p-2 text-slate-500">
                      <EllipsisVertical className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleModule(module.id)}
                      className="rounded p-2 text-slate-700"
                    >
                      {isOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                    </button>
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.24, ease: 'easeOut' }}
                      className="overflow-hidden border-t border-slate-200 bg-white"
                    >
                      <div className="px-4 py-4">
                        <div className="mb-4 flex items-center gap-3 rounded border border-slate-300 bg-white px-4 py-3 text-slate-400">
                          <Search className="size-4" />
                          <span>Search items...</span>
                        </div>

                        <div className="max-h-[420px] space-y-1 overflow-y-auto">
                          {module.items.map((item) => {
                            const itemOpen = openItems.includes(item.id);

                            return (
                              <div key={item.id} className="border border-slate-200 bg-[#f7f7f7]">
                                <div className="flex items-center gap-4 px-4 py-3">
                                  <div className="w-[84px] text-[15px] font-bold text-slate-800">
                                    {item.label}
                                  </div>
                                  <div className="min-w-0 flex-1 text-[15px] text-slate-900">
                                    {item.description}
                                  </div>
                                  <div className="ml-auto flex items-center gap-2">
                                    <button className="rounded border border-[#9cc0ff] bg-white px-3 py-2 text-sm text-[#1565d8]">
                                      Run Search
                                    </button>
                                    <button className="rounded border border-[#9cc0ff] bg-white px-3 py-2 text-sm text-[#1565d8]">
                                      Add External Document
                                    </button>
                                    <button className="rounded border border-[#9cc0ff] bg-white px-3 py-2 text-sm text-[#1565d8]">
                                      Edit
                                    </button>
                                    <StatusBadge status={item.status} />
                                    <button
                                      type="button"
                                      onClick={() => toggleItem(item.id)}
                                      className="rounded p-2 text-slate-700"
                                    >
                                      {itemOpen ? (
                                        <ChevronUp className="size-4" />
                                      ) : (
                                        <ChevronDown className="size-4" />
                                      )}
                                    </button>
                                  </div>
                                </div>

                                <AnimatePresence initial={false}>
                                  {itemOpen ? (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.22, ease: 'easeOut' }}
                                      className="overflow-hidden border-t border-slate-200 bg-[#dfe9f8]"
                                    >
                                      <div className="px-4 py-4">
                                        <div className="mb-5 grid grid-cols-[120px_1fr] gap-x-6 gap-y-2 text-[14px]">
                                          <div className="font-semibold text-[#1565d8]">Name:</div>
                                          <div>{item.label}</div>
                                          <div className="font-semibold text-[#1565d8]">Search Keyword:</div>
                                          <div>{item.keyword}</div>
                                        </div>

                                        <div className="overflow-hidden border border-slate-300 bg-white">
                                          <div className="grid grid-cols-[1.6fr_120px_1fr_80px] gap-4 border-b border-slate-300 px-4 py-4 text-sm font-bold text-slate-800">
                                            <div>Title</div>
                                            <div>Page Numbers</div>
                                            <div>Notes</div>
                                            <div className="text-right">Actions</div>
                                          </div>
                                          <div className="grid grid-cols-[1.6fr_120px_1fr_80px] gap-4 px-4 py-4 text-sm text-slate-800">
                                            <div>{item.fileName}</div>
                                            <div>{item.pageNumbers}</div>
                                            <div />
                                            <div className="flex justify-end text-slate-500">
                                              <EllipsisVertical className="size-4" />
                                            </div>
                                          </div>
                                          <div className="flex items-center justify-end gap-6 border-t border-slate-200 px-4 py-3 text-sm text-slate-500">
                                            <span>Rows per page: 10</span>
                                            <span>1-1 of 1</span>
                                          </div>
                                        </div>
                                      </div>
                                    </motion.div>
                                  ) : null}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-auto rounded border border-dashed border-slate-300 bg-white px-4 py-3 text-sm text-slate-500">
        Accent color token for future data binding: <span style={{ color }} className="font-semibold">{color}</span>
      </div>
    </div>
  );
}
