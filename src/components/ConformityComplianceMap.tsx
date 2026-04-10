import { useState } from 'react';
import { motion } from 'motion/react';
import {
  AlertTriangle,
  CheckCircle2,
  Circle,
  FileCheck,
  Shield,
  Users,
} from 'lucide-react';

interface ConformityComplianceMapProps {
  color: string;
}

export function ConformityComplianceMap({ color }: ConformityComplianceMapProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const certificationGateItems = [
    {
      id: 'gate-1',
      requirement: 'Type Design Evaluation Complete',
      description:
        'Aircraft evaluated against Type Certificate Data Sheet and applicable STCs, confirmed to conform to approved design',
      status: 'complete' as const,
      reference: 'GOM 11.23.3(a)',
      owner: 'Director of Maintenance',
      completedDate: '2026-04-08',
    },
    {
      id: 'gate-2',
      requirement: 'Records & Configuration Validated',
      description:
        'Aircraft records, configuration, installed equipment, and required operational approval data reviewed and validated for intended use',
      status: 'complete' as const,
      reference: 'GOM 11.23.3(b)',
      owner: 'Quality Control Manager',
      completedDate: '2026-04-09',
    },
    {
      id: 'gate-3',
      requirement: 'Discrepancies Resolved',
      description:
        'All conformity discrepancies documented and resolved, or dispositioned per company procedures',
      status: 'in-progress' as const,
      reference: 'GOM 11.23.3(c)',
      owner: 'Quality Control Manager',
      completedDate: null,
    },
  ];

  const responsibilities = [
    {
      role: 'Director of Maintenance (DOM)',
      icon: Shield,
      color: '#1e40af',
      responsibilities: [
        'Accountable owner of Conformity Program',
        'Determine aircraft technical conformity',
        'Ensure completion of required conformity evidence package',
      ],
      accountability: 'Ultimate accountability (non-delegable)',
    },
    {
      role: 'Quality Control Manager (QCM)',
      icon: FileCheck,
      color: '#7c3aed',
      responsibilities: [
        'Coordinate conformity activities',
        'Organize required modules and records',
        'Document discrepancies',
      ],
      accountability: 'Task execution and coordination',
    },
    {
      role: 'Director of Operations',
      icon: Users,
      color: '#dc2626',
      responsibilities: [
        'Hold aircraft from Part 135 release until conformity is complete',
        'Verify aircraft appears on applicable Ops Specs',
      ],
      accountability: 'Operational release authority',
    },
  ];

  const statusConfig = {
    complete: {
      icon: CheckCircle2,
      label: 'Complete',
      color: '#10b981',
      bgColor: '#d1fae5',
      textColor: '#065f46',
    },
    'in-progress': {
      icon: AlertTriangle,
      label: 'In Progress',
      color: '#f59e0b',
      bgColor: '#fef3c7',
      textColor: '#92400e',
    },
    pending: {
      icon: Circle,
      label: 'Pending',
      color: '#6b7280',
      bgColor: '#f3f4f6',
      textColor: '#374151',
    },
  };

  const completionRate = Math.round(
    (certificationGateItems.filter((item) => item.status === 'complete').length /
      certificationGateItems.length) *
      100,
  );

  return (
    <div className="flex h-full w-full flex-col">
      <div className="mb-8">
        <div className="mb-3 flex items-center gap-3">
          <div
            className="flex size-12 items-center justify-center rounded-xl shadow-lg"
            style={{ backgroundColor: color }}
          >
            <Shield className="size-7 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-800">Conformity Program</h2>
            <p className="text-sm text-slate-600">GOM Chapter 11.23 - Compliance Status</p>
          </div>
        </div>
      </div>

      <div className="mb-8 rounded-xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="mb-1 text-lg font-bold text-slate-800">Certification Gate Status</h3>
            <p className="text-xs text-slate-600">
              GOM 11.23.3 - Required checkpoint before Part 135 use
            </p>
          </div>
          <div className="text-right">
            <div className="mb-1 text-4xl font-bold" style={{ color }}>
              {completionRate}%
            </div>
            <div className="text-xs font-medium text-slate-600">Complete</div>
          </div>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-slate-200 shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionRate}%` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="h-full rounded-full shadow-lg"
            style={{ background: `linear-gradient(90deg, ${color} 0%, ${color}dd 100%)` }}
          />
        </div>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto pr-2">
        <div>
          <h3 className="mb-4 text-lg font-bold text-slate-800">Certification Gate Checklist</h3>
          <div className="space-y-3">
            {certificationGateItems.map((item, index) => {
              const config = statusConfig[item.status];
              const Icon = config.icon;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div
                    className={`cursor-pointer rounded-xl border-2 bg-white p-5 transition-all duration-300 ${
                      activeSection === item.id
                        ? 'scale-[1.02] border-slate-300 shadow-xl'
                        : 'border-slate-200 shadow-md hover:shadow-lg'
                    }`}
                    onClick={() => setActiveSection(activeSection === item.id ? null : item.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="flex size-12 flex-shrink-0 items-center justify-center rounded-xl shadow-sm"
                        style={{ backgroundColor: config.bgColor }}
                      >
                        <Icon className="size-6" style={{ color: config.color }} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="mb-1 text-sm font-bold text-slate-800">
                              {item.requirement}
                            </h4>
                            <p className="text-xs leading-relaxed text-slate-600">
                              {item.description}
                            </p>
                          </div>
                          <div
                            className="ml-4 flex-shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold shadow-sm"
                            style={{ backgroundColor: config.bgColor, color: config.textColor }}
                          >
                            {config.label}
                          </div>
                        </div>

                        {activeSection === item.id ? (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-4 grid grid-cols-3 gap-4 border-t border-slate-200 pt-4"
                          >
                            <div>
                              <div className="mb-1 text-[10px] font-medium uppercase tracking-wider text-slate-500">
                                Reference
                              </div>
                              <div className="text-xs font-mono text-slate-700">{item.reference}</div>
                            </div>
                            <div>
                              <div className="mb-1 text-[10px] font-medium uppercase tracking-wider text-slate-500">
                                Owner
                              </div>
                              <div className="text-xs text-slate-700">{item.owner}</div>
                            </div>
                            <div>
                              <div className="mb-1 text-[10px] font-medium uppercase tracking-wider text-slate-500">
                                Completed
                              </div>
                              <div className="text-xs text-slate-700">{item.completedDate ?? 'Pending'}</div>
                            </div>
                          </motion.div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-bold text-slate-800">Authority & Responsibility</h3>
          <div className="grid grid-cols-1 gap-4">
            {responsibilities.map((responsibility, index) => {
              const Icon = responsibility.icon;
              return (
                <motion.div
                  key={responsibility.role}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="rounded-xl border-2 border-slate-200 bg-white p-5 shadow-md transition-all duration-300 hover:shadow-xl"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex size-12 flex-shrink-0 items-center justify-center rounded-xl shadow-lg"
                      style={{ backgroundColor: responsibility.color }}
                    >
                      <Icon className="size-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-2 text-sm font-bold text-slate-800">
                        {responsibility.role}
                      </h4>
                      <ul className="mb-3 space-y-1.5">
                        {responsibility.responsibilities.map((item) => (
                          <li key={`${responsibility.role}-${item}`} className="flex items-start gap-2 text-xs text-slate-600">
                            <div
                              className="mt-1.5 size-1.5 flex-shrink-0 rounded-full"
                              style={{ backgroundColor: responsibility.color }}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="text-[10px] italic text-slate-500">
                        {responsibility.accountability}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
