import { motion } from 'motion/react';
import { CheckCircle2, ChevronRight } from 'lucide-react';

interface TOCItem {
  id: string;
  title: string;
  page: number;
  completed: boolean;
  subsections?: TOCItem[];
}

interface TableOfContentsProps {
  color: string;
}

export function TableOfContents({ color }: TableOfContentsProps) {
  const tocItems: TOCItem[] = [
    {
      id: '1',
      title: 'Aircraft Specifications',
      page: 1,
      completed: true,
      subsections: [
        { id: '1.1', title: 'General Information', page: 2, completed: true },
        { id: '1.2', title: 'Dimensions & Weights', page: 5, completed: true },
        { id: '1.3', title: 'Performance Data', page: 8, completed: true },
      ],
    },
    {
      id: '2',
      title: 'Technical Documentation',
      page: 12,
      completed: true,
      subsections: [
        { id: '2.1', title: 'Type Certificate Data Sheet', page: 13, completed: true },
        { id: '2.2', title: 'Airworthiness Directives', page: 18, completed: true },
        { id: '2.3', title: 'Service Bulletins', page: 24, completed: false },
      ],
    },
  ];

  const renderItem = (item: TOCItem, level = 0) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: Number.parseInt(item.id, 10) * 0.1 }}
      className="mb-2"
    >
      <motion.button
        className="group flex w-full items-center justify-between rounded-lg p-3 transition-colors hover:bg-slate-50"
        style={{ paddingLeft: `${level * 24 + 12}px` }}
        whileHover={{ x: 4 }}
      >
        <div className="flex flex-1 items-center gap-3">
          <div
            className="flex size-6 flex-shrink-0 items-center justify-center rounded"
            style={{ backgroundColor: item.completed ? `${color}20` : '#f1f5f9' }}
          >
            {item.completed ? (
              <CheckCircle2 className="size-4" style={{ color }} />
            ) : (
              <div className="size-2 rounded-full bg-slate-300" />
            )}
          </div>
          <div className="flex-1 text-left">
            <div className="text-sm font-medium text-slate-800 group-hover:text-slate-900">
              {item.title}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-500">p. {item.page}</span>
          <ChevronRight className="size-4 text-slate-400 transition-colors group-hover:text-slate-600" />
        </div>
      </motion.button>

      {item.subsections ? <div className="mt-1">{item.subsections.map((sub) => renderItem(sub, level + 1))}</div> : null}
    </motion.div>
  );

  return (
    <div className="flex h-full w-full flex-col">
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-slate-800">Table of Contents</h2>
        <p className="text-sm text-slate-600">Click any section to navigate directly to that page</p>
      </div>
      <div className="mb-6 rounded-lg p-4" style={{ backgroundColor: `${color}10` }}>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">Completion Status</span>
          <span className="text-sm font-bold" style={{ color }}>
            75%
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '75%' }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">{tocItems.map((item) => renderItem(item))}</div>
    </div>
  );
}
