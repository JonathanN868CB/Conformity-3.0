import { motion } from 'motion/react';
import { BinderSection } from '../types/binder';

interface BinderTabsProps {
  sections: BinderSection[];
  activeSection: string | null;
  onSelectSection: (sectionId: string) => void;
  isOpen: boolean;
}

export function BinderTabs({
  sections,
  activeSection,
  onSelectSection,
  isOpen,
}: BinderTabsProps) {
  const tabHeight = 58;
  const tabWidth = 115;

  return (
    <div
      className="absolute top-0 bottom-0 z-30 flex flex-col justify-center gap-2 pr-1.5"
      style={{ right: `${-tabWidth}px`, width: `${tabWidth}px` }}
    >
      {sections.map((section, index) => {
        const isActive = activeSection === section.id;

        return (
          <motion.button
            key={section.id}
            onClick={() => onSelectSection(section.id)}
            className="group relative flex-shrink-0"
            style={{ height: `${tabHeight}px` }}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: isOpen ? 0.6 + index * 0.08 : 0,
              type: 'spring',
              damping: 20,
            }}
            whileHover={{ x: isActive ? 0 : -10 }}
            whileTap={{ scale: 0.96 }}
          >
            <div
              className="absolute inset-0 rounded-r-lg blur-sm"
              style={{
                backgroundColor: section.color,
                transform: 'translateX(-2px)',
                opacity: 0.3,
              }}
            />

            <div
              className="absolute inset-0 overflow-hidden rounded-r-lg border-r-[3px] transition-all duration-300"
              style={{
                backgroundColor: isActive ? section.color : `${section.color}ee`,
                borderColor: isActive ? '#ffffff88' : `${section.color}66`,
                boxShadow: isActive
                  ? `0 0 20px ${section.color}aa, inset 0 1px 4px rgba(255,255,255,0.4), inset 0 -1px 4px rgba(0,0,0,0.3)`
                  : `0 2px 12px ${section.color}66, inset 0 1px 2px rgba(255,255,255,0.3)`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/15" />

              {isActive ? (
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${section.color}66 0%, transparent 70%)`,
                  }}
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              ) : null}

              <div className="absolute inset-0 flex items-center justify-center px-4">
                <div
                  className="max-w-[74px] text-center text-[10px] font-black uppercase leading-[1.05] tracking-[0.14em] text-white"
                  style={{
                    textShadow: '0 1px 3px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.4)',
                    fontWeight: isActive ? 900 : 800,
                    overflowWrap: 'break-word',
                  }}
                >
                  {section.name}
                </div>
              </div>

              <div className="absolute top-1 bottom-1 right-0 w-0.5 rounded-full bg-white/50" />
              <div className="absolute left-0 right-0 top-0 h-4 rounded-tr-lg bg-gradient-to-b from-white/20 to-transparent" />
            </div>

            <div className="pointer-events-none absolute top-1/2 right-full mr-3 -translate-y-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <div className="whitespace-nowrap rounded border border-white/10 bg-slate-900/95 px-3 py-1.5 text-xs font-semibold text-white shadow-2xl backdrop-blur-sm">
                {section.name}
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
