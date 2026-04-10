import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FileText, Search, X } from 'lucide-react';

interface SearchBarProps {
  color: string;
}

export function SearchBar({ color }: SearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const mockResults = [
    { title: 'Weight & Balance Calculation', section: 'Weight & Balance', page: 23 },
    { title: 'Emergency Equipment List', section: 'Technical Data', page: 45 },
    { title: 'Avionics Modification Log', section: 'Modifications', page: 12 },
    { title: 'Annual Inspection Checklist', section: 'Maintenance Records', page: 78 },
  ];

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setShowResults(value.length > 0);
  };

  return (
    <div className="relative">
      <motion.div
        className="flex items-center gap-2"
        animate={{ width: isExpanded ? '320px' : '40px' }}
        transition={{ duration: 0.3 }}
      >
        <motion.button
          onClick={() => {
            setIsExpanded((current) => {
              const next = !current;
              if (!next) {
                setSearchQuery('');
                setShowResults(false);
              }
              return next;
            });
          }}
          className="flex size-10 flex-shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-slate-100"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ backgroundColor: isExpanded ? `${color}10` : 'transparent' }}
        >
          {isExpanded ? (
            <X className="size-5" style={{ color }} />
          ) : (
            <Search className="size-5 text-slate-600" />
          )}
        </motion.button>

        <AnimatePresence>
          {isExpanded ? (
            <motion.input
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(event) => handleSearch(event.target.value)}
              className="flex-1 border-b-2 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-slate-400"
              style={{ borderColor: color }}
              autoFocus
            />
          ) : null}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {showResults ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-12 left-0 z-50 w-96 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl"
          >
            <div className="border-b border-slate-200 bg-slate-50 p-3">
              <div className="text-xs text-slate-600">{mockResults.length} results found</div>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {mockResults.map((result, index) => (
                <motion.button
                  key={`${result.title}-${result.page}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="w-full border-b border-slate-100 p-3 text-left transition-colors last:border-b-0 hover:bg-slate-50"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="mt-1 flex size-8 flex-shrink-0 items-center justify-center rounded"
                      style={{ backgroundColor: `${color}15` }}
                    >
                      <FileText className="size-4" style={{ color }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 text-sm font-medium text-slate-800">{result.title}</div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>{result.section}</span>
                        <span>•</span>
                        <span>Page {result.page}</span>
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
