import { motion } from 'motion/react';
import { Plane } from 'lucide-react';
import { BinderData } from '../types/binder';
import { PublishedStatusBadge } from './PublishedStatusBadge';

interface BinderCoverProps {
  data: BinderData;
  onClick: () => void;
}

export function BinderCover({ data, onClick }: BinderCoverProps) {
  return (
    <motion.div
      onClick={onClick}
      className="relative h-full w-full cursor-pointer group"
      whileHover={{ scale: 1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', damping: 20 }}
    >
      <div className="absolute inset-0 translate-x-3 translate-y-4 rounded-r-xl bg-slate-950/10 blur-sm" />

      <div
        className="relative h-full w-full overflow-hidden rounded-r-xl border-b-2 border-r-8 border-t-2"
        style={{
          borderColor: '#9ca3af',
          background: 'linear-gradient(180deg, #182537 0%, #0f1724 100%)',
          boxShadow: `
            0 14px 28px rgba(0,0,0,0.28),
            0 6px 14px rgba(0,0,0,0.18),
            inset 0 1px 2px rgba(255,255,255,0.05),
            inset 0 -1px 3px rgba(0,0,0,0.18),
            inset 1px 0 6px rgba(0,0,0,0.12)
          `,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/12 via-transparent to-transparent" />

        <div className="relative flex h-full flex-col p-16">
          <div className="mb-auto">
            <motion.div
              className="mb-8 inline-flex items-center gap-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div
                className="flex size-16 items-center justify-center rounded-full border-2 border-amber-300 bg-gradient-to-br from-amber-400 via-yellow-600 to-amber-700 shadow-2xl"
                style={{
                  boxShadow:
                    '0 6px 14px rgba(217, 119, 6, 0.24), inset 0 1px 2px rgba(255,255,255,0.24), inset 0 -1px 2px rgba(0,0,0,0.24)',
                }}
              >
                <Plane className="size-8 text-amber-950" />
              </div>
              <div>
                <h1
                  className="mb-2 text-5xl font-bold tracking-tight"
                  style={{
                    color: '#e9b949',
                  }}
                >
                  SkyShare
                </h1>
                <div className="text-sm font-medium uppercase tracking-[0.28em] text-amber-400/80">
                  Digital Conformity Binder
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="flex flex-1 flex-col justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="space-y-8">
              <div
                className="rounded-xl border-2 p-8"
                style={{
                  background: 'rgba(15, 23, 42, 0.94)',
                  borderColor: 'rgba(251, 191, 36, 0.3)',
                  boxShadow:
                    '0 8px 18px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.04)',
                }}
              >
                <div className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-amber-400/60">
                  Aircraft Registration
                </div>
                <div
                  className="mb-2 text-6xl font-black tracking-wider"
                  style={{
                    color: '#f4f7fb',
                  }}
                >
                  {data.aircraft.registration}
                </div>
                <div className="my-4 h-px bg-gradient-to-r from-transparent via-amber-600/50 to-transparent" />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="mb-1 text-xs text-slate-400">Make & Model</div>
                    <div className="font-medium text-slate-200">{data.aircraft.type}</div>
                  </div>
                  <div>
                    <div className="mb-1 text-xs text-slate-400">Serial Number</div>
                    <div className="font-mono font-medium text-slate-200">{data.aircraft.serial}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between px-8">
                <div className="text-sm text-slate-400">
                  <span className="text-2xl font-bold text-amber-400">{data.sections.length}</span>
                  <span className="ml-2">Conformity Sections</span>
                </div>
                <PublishedStatusBadge version={data.publishedVersion} date={data.publishedDate} />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mt-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono text-slate-500">Doc No. {data.aircraft.serial}</div>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onClick();
                }}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 transition-colors hover:bg-white/10"
              >
                <div className="text-xs font-medium text-amber-400">Click to open binder</div>
              </button>
            </div>
          </motion.div>
        </div>

        <div
          className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-b from-slate-600 via-slate-400 to-slate-600"
          style={{ boxShadow: 'inset 1px 0 2px rgba(255,255,255,0.5), inset -1px 0 2px rgba(0,0,0,0.5)' }}
        />
      </div>
    </motion.div>
  );
}
