import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckSquare, HelpCircle, Image, List, MessageSquare, Search } from 'lucide-react';

interface FeatureTooltipProps {
  sectionName: string;
}

export function FeatureTooltip({ sectionName }: FeatureTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  const featuresBySectionName = {
    'Technical Data': [
      { icon: List, label: 'Interactive Table of Contents' },
      { icon: Search, label: 'Full-text Search' },
      { icon: MessageSquare, label: 'Collaborative Comments' },
    ],
    'AC 135-44 Appendix A': [
      { icon: List, label: 'Digitized Appendix A Schedule' },
      { icon: Search, label: 'Structured Equipment Entries' },
      { icon: MessageSquare, label: 'Future Evidence Link Capture' },
    ],
    'Bluetail Accordion': [
      { icon: List, label: 'Accordion Record Groups' },
      { icon: Search, label: 'Structured Placeholder Data' },
      { icon: MessageSquare, label: 'Ready For Your Own Links' },
    ],
    'Maintenance Records': [
      { icon: Image, label: 'High-res Image Gallery' },
      { icon: Search, label: 'Document Search' },
      { icon: MessageSquare, label: 'Review Comments' },
    ],
    Modifications: [
      { icon: CheckSquare, label: 'Compliance Mapping' },
      { icon: Search, label: 'Regulation Lookup' },
      { icon: MessageSquare, label: 'Inspector Notes' },
    ],
  };

  const features = featuresBySectionName[sectionName as keyof typeof featuresBySectionName] ?? [];

  if (features.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <motion.button
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="rounded-full p-1 transition-colors hover:bg-slate-200"
        whileHover={{ scale: 1.1 }}
      >
        <HelpCircle className="size-4 text-slate-400" />
      </motion.button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute left-0 top-8 z-50 w-64 rounded-lg bg-slate-900 p-4 text-white shadow-2xl"
          >
            <div className="absolute -top-2 left-4 size-4 rotate-45 transform bg-slate-900" />
            <div className="relative">
              <div className="mb-3 text-xs font-medium text-slate-300">Features in this section:</div>
              <div className="space-y-2">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={feature.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <Icon className="size-3 flex-shrink-0 text-blue-400" />
                      <span className="text-xs text-slate-200">{feature.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
