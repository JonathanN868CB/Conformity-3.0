import { motion } from 'motion/react';
import { Shield } from 'lucide-react';
import { BinderSection } from '../types/binder';

interface SectionDividerProps {
  section: BinderSection;
}

export function SectionDivider({ section }: SectionDividerProps) {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #fefefe 0%, #f8f9fa 50%, #ffffff 100%)' }}
    >
      <div className="absolute top-0 right-0 h-full w-3">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${section.color}dd 0%, ${section.color} 50%, ${section.color}dd 100%)`,
            boxShadow: `inset 2px 0 8px ${section.color}88, -2px 0 10px ${section.color}44`,
          }}
        />
      </div>

      <div className="relative flex h-full flex-col items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.08, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex items-center justify-center text-[32rem] font-black"
          style={{ color: section.color }}
        >
          {section.id.charAt(0).toUpperCase()}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative mb-8"
        >
          <div
            className="relative flex size-28 items-center justify-center rounded-full border-4 border-white shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${section.color} 0%, ${section.color}dd 100%)`,
              boxShadow: `0 10px 40px ${section.color}66, inset 0 2px 10px rgba(255,255,255,0.3), inset 0 -2px 10px rgba(0,0,0,0.2)`,
            }}
          >
            <Shield className="size-14 text-white drop-shadow-lg" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-transparent to-black/20" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 text-center"
        >
          <h2
            className="mb-3 text-5xl font-black tracking-tight"
            style={{ color: section.color, textShadow: `0 2px 20px ${section.color}40` }}
          >
            {section.name}
          </h2>
          <div className="mt-6 flex items-center justify-center gap-4">
            <div
              className="h-1 w-20 rounded-full"
              style={{ background: `linear-gradient(90deg, transparent, ${section.color}, transparent)` }}
            />
            <div className="size-3 rounded-full shadow-lg" style={{ backgroundColor: section.color }} />
            <div
              className="h-1 w-20 rounded-full"
              style={{ background: `linear-gradient(90deg, transparent, ${section.color}, transparent)` }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="rounded-full border-2 px-6 py-3 shadow-lg"
          style={{ backgroundColor: `${section.color}15`, borderColor: `${section.color}40` }}
        >
          <p className="text-sm font-bold tracking-wide" style={{ color: section.color }}>
            {section.pageCount} {section.pageCount === 1 ? 'PAGE' : 'PAGES'}
          </p>
        </motion.div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-slate-900/5" />
    </div>
  );
}
