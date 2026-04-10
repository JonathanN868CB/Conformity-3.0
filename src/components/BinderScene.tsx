import { useState } from 'react';
import { motion } from 'motion/react';
import { BinderData } from '../types/binder';
import { BinderCover } from './BinderCover';
import { BinderOpenView } from './BinderOpenView';
import { BinderRings } from './BinderRings';
import { BinderTabs } from './BinderTabs';

interface BinderSceneProps {
  data: BinderData;
}

export function BinderScene({ data }: BinderSceneProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const spineWidth = 120;

  const handleOpen = () => {
    setIsOpen(true);
    if (!activeSection) {
      setActiveSection(data.sections[0]?.id ?? null);
    }
  };

  const handleSectionSelect = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsOpen(true);
  };

  return (
    <div className="flex h-full w-full items-center justify-center p-4 md:p-8">
      <motion.div
        className="relative"
        style={{
          width: isOpen ? 'min(1400px, 95vw)' : 'min(720px, 92vw)',
          height: isOpen ? 'min(900px, 88vh)' : 'min(800px, 84vh)',
        }}
        animate={{
          width: isOpen ? 'min(1400px, 95vw)' : 'min(720px, 92vw)',
          height: isOpen ? 'min(900px, 88vh)' : 'min(800px, 84vh)',
        }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <div className="relative h-full w-full">
          <div
            className="absolute bottom-0 left-0 top-0 z-10 overflow-hidden rounded-l-xl"
            style={{
              width: `${spineWidth}px`,
              background:
                'linear-gradient(90deg, #07111d 0%, #0e1726 12%, #132036 26%, #172640 48%, #102036 72%, #09131f 100%)',
              boxShadow: `
                inset 10px 0 20px rgba(255,255,255,0.03),
                inset -14px 0 20px rgba(0,0,0,0.36),
                inset 0 0 0 1px rgba(148,163,184,0.08),
                -10px 0 28px rgba(0,0,0,0.48)
              `,
            }}
          >
            <div
              className="absolute inset-y-0 left-[16px] w-[1px]"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.18) 100%)',
              }}
            />
            <div
              className="absolute inset-y-0 left-[70px] w-[1px]"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.1) 100%)',
              }}
            />
            <div
              className="absolute inset-y-[42px] left-[26px] w-[30px] rounded-[18px]"
              style={{
                background: 'linear-gradient(180deg, rgba(9,15,24,0.92) 0%, rgba(15,24,38,0.78) 50%, rgba(9,15,24,0.92) 100%)',
                boxShadow: `
                  inset 0 0 0 1px rgba(148,163,184,0.08),
                  inset 8px 0 12px rgba(255,255,255,0.02),
                  inset -8px 0 12px rgba(0,0,0,0.2)
                `,
              }}
            />
            <div
              className="absolute inset-y-[54px] left-[32px] w-[2px] rounded-full"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.14) 100%)',
              }}
            />
            <div
              className="absolute inset-y-[54px] left-[49px] w-[2px] rounded-full"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.08) 100%)',
              }}
            />
            <div
              className="absolute left-[22px] top-[178px] flex h-[420px] w-[36px] items-center justify-center rounded-[18px]"
              style={{
                background: 'linear-gradient(180deg, rgba(6,11,18,0.56) 0%, rgba(13,20,31,0.3) 50%, rgba(6,11,18,0.56) 100%)',
                boxShadow: 'inset 0 0 0 1px rgba(148,163,184,0.06)',
              }}
            >
              <div
                className="rotate-180 text-center [writing-mode:vertical-rl]"
                style={{
                  color: 'rgba(223,231,239,0.78)',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.36em',
                  textTransform: 'uppercase',
                  textShadow: '0 1px 2px rgba(0,0,0,0.35)',
                }}
              >
                {data.aircraft.registration}
                <span className="my-3 block opacity-45">/</span>
                Serial {data.aircraft.serialNumber}
                <span className="my-3 block opacity-45">/</span>
                Conformity
              </div>
            </div>
            <div className="absolute inset-y-0 left-0 w-[14px] rounded-l-xl bg-gradient-to-r from-black/28 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-[14px] bg-gradient-to-r from-white/8 to-black/22" />
            <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white/4 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/22 to-transparent" />
          </div>

          <BinderRings isOpen={isOpen} />

          <div
            className="absolute bottom-0 top-0 bg-slate-100 shadow-2xl"
            style={{
              left: `${spineWidth}px`,
              right: '0',
              borderTopRightRadius: '8px',
              borderBottomRightRadius: '8px',
            }}
          >
            <div className="relative h-full w-full overflow-hidden rounded-r-lg">
              {isOpen ? (
                <BinderOpenView
                  sections={data.sections}
                  activeSection={activeSection}
                  onSelectSection={handleSectionSelect}
                  onClose={() => setIsOpen(false)}
                />
              ) : (
                <BinderCover data={data} onClick={handleOpen} />
              )}
            </div>

            <BinderTabs
              sections={data.sections}
              activeSection={activeSection}
              onSelectSection={handleSectionSelect}
              isOpen={isOpen}
            />
          </div>

          <div
            className="absolute pointer-events-none"
            style={{
              bottom: '-80px',
              left: '10%',
              right: '10%',
              height: '40px',
              background: 'radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, transparent 70%)',
              filter: 'blur(20px)',
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
