import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Bookmark, ChevronLeft, ChevronRight, FileText, Share2, X } from 'lucide-react';
import { BinderSection } from '../types/binder';
import { CommentPanel } from './CommentPanel';
import { ConformityComplianceMap } from './ConformityComplianceMap';
import { Ac13544AppendixA } from './Ac13544AppendixA';
import { BluetailAccordionSection } from './BluetailAccordionSection';
import { FeatureTooltip } from './FeatureTooltip';
import { ImageGallery } from './ImageGallery';
import { SearchBar } from './SearchBar';
import { SectionDivider } from './SectionDivider';
import { TableOfContents } from './TableOfContents';

interface BinderOpenViewProps {
  sections: BinderSection[];
  activeSection: string | null;
  onSelectSection: (sectionId: string) => void;
  onClose: () => void;
}

export function BinderOpenView({
  sections,
  activeSection,
  onSelectSection,
  onClose,
}: BinderOpenViewProps) {
  const currentSection = sections.find((section) => section.id === activeSection) ?? sections[0];
  const currentIndex = Math.max(
    0,
    sections.findIndex((section) => section.id === currentSection.id),
  );
  const lastWheelAt = useRef(0);
  const [acPageIndex, setAcPageIndex] = useState(0);
  const acTotalPages = 5;
  const pageLabel = useMemo(() => `Page ${currentIndex + 1} of ${sections.length}`, [currentIndex, sections.length]);

  useEffect(() => {
    if (currentSection.id !== 'ac13544') {
      setAcPageIndex(0);
    }
  }, [currentSection.id]);

  const turnSection = (direction: 'prev' | 'next') => {
    const nextIndex =
      direction === 'next'
        ? Math.min(currentIndex + 1, sections.length - 1)
        : Math.max(currentIndex - 1, 0);

    if (nextIndex !== currentIndex) {
      onSelectSection(sections[nextIndex].id);
    }
  };

  const handleWheelFlip = (event: React.WheelEvent<HTMLDivElement>) => {
    if (currentSection.id === 'ac13544') {
      return;
    }

    event.preventDefault();

    const now = Date.now();
    if (now - lastWheelAt.current < 420) {
      return;
    }
    if (Math.abs(event.deltaY) < 12) {
      return;
    }

    lastWheelAt.current = now;
    turnSection(event.deltaY > 0 ? 'next' : 'prev');
  };

  const header = (
    <>
      <div className="mb-6 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div>
            <div className="mb-2 text-xs uppercase tracking-wider text-slate-500">
              Section {currentIndex + 1} of {sections.length}
            </div>
            <h2 className="text-2xl font-bold text-slate-800">{currentSection.name}</h2>
          </div>
          <FeatureTooltip sectionName={currentSection.name} />
        </div>

        <motion.button
          onClick={onClose}
          className="rounded-lg p-2 transition-colors hover:bg-slate-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="size-5 text-slate-600" />
        </motion.button>
      </div>

      <div className="mb-6 flex items-center gap-2 border-b border-slate-200 pb-4">
        <SearchBar color={currentSection.color} />
        <div className="flex-1" />
        <motion.button
          className="rounded-lg p-2 transition-colors hover:bg-slate-100"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bookmark className="size-5 text-slate-600" />
        </motion.button>
        <motion.button
          className="rounded-lg p-2 transition-colors hover:bg-slate-100"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Share2 className="size-5 text-slate-600" />
        </motion.button>
        <CommentPanel color={currentSection.color} />
      </div>
    </>
  );

  if (currentSection.id === 'ac13544') {
    const turnSectionFromAc = (direction: 'prev' | 'next') => {
      setAcPageIndex((current) => {
        if (direction === 'next') {
          if (current >= acTotalPages - 1) {
            turnSection('next');
            return current;
          }
          return current + 1;
        }

        if (current <= 0) {
          turnSection('prev');
          return current;
        }

        return current - 1;
      });
    };

    const compactHeader = (
      <>
        <div className="mb-2 flex items-start justify-between border-b border-slate-300/70 pb-2">
          <div className="flex items-center gap-2">
            <div>
              <div className="text-[9px] uppercase tracking-wider text-slate-500">
                Section {currentIndex + 1} of {sections.length}
              </div>
              <h2 className="text-lg font-bold text-slate-800">{currentSection.name}</h2>
            </div>
            <FeatureTooltip sectionName={currentSection.name} />
          </div>

          <div className="flex items-center gap-1">
            <div
              className="rounded-lg border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]"
              style={{ borderColor: `${currentSection.color}55`, color: currentSection.color }}
            >
              Page {acPageIndex + 1} of {acTotalPages}
            </div>
            <button
              type="button"
              onClick={() => turnSectionFromAc('prev')}
              className="rounded-lg border border-slate-300 p-1.5 text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
              disabled={currentIndex === 0 && acPageIndex === 0}
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => turnSectionFromAc('next')}
              className="rounded-lg border border-slate-300 p-1.5 text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
              disabled={currentIndex === sections.length - 1 && acPageIndex === acTotalPages - 1}
            >
              <ChevronRight className="size-4" />
            </button>
            <motion.button
              className="rounded-lg p-1 transition-colors hover:bg-slate-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bookmark className="size-4 text-slate-600" />
            </motion.button>
            <motion.button
              className="rounded-lg p-1 transition-colors hover:bg-slate-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 className="size-4 text-slate-600" />
            </motion.button>
            <CommentPanel color={currentSection.color} />
            <motion.button
              onClick={onClose}
              className="rounded-lg p-1 transition-colors hover:bg-slate-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="size-5 text-slate-600" />
            </motion.button>
          </div>
        </div>
      </>
    );

    return (
      <div className="absolute inset-0">
        <div className="absolute inset-0">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="absolute inset-0 bg-slate-50 shadow-md"
              style={{
                transform: `translateY(-${index * 2}px)`,
                opacity: 1 - index * 0.12,
                zIndex: -index,
              }}
            />
          ))}
        </div>

        <motion.div
          key={currentSection.id}
          className="relative h-full overflow-hidden bg-gradient-to-br from-[#f5f1e8] to-[#fdfaf4] shadow-2xl"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-black/4 to-transparent" />
          <div className="relative flex h-full flex-col p-4">
            {compactHeader}

            <div className="min-h-0 flex-1">
              <Ac13544AppendixA
                onBoundaryFlip={turnSectionFromAc}
                pageIndex={acPageIndex}
              />
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  const renderContent = () => {
    switch (currentSection.id) {
      case 'technical':
        return <TableOfContents color={currentSection.color} />;
      case 'bluetail':
        return <BluetailAccordionSection color={currentSection.color} />;
      case 'maintenance':
        return <ImageGallery color={currentSection.color} />;
      case 'modifications':
        return <ConformityComplianceMap color={currentSection.color} />;
      default:
        return (
          <div className="flex-1 space-y-6 overflow-y-auto">
            {Array.from({ length: 8 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 + 0.3 }}
                className="flex items-start gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <div
                  className="flex size-10 flex-shrink-0 items-center justify-center rounded"
                  style={{ backgroundColor: `${currentSection.color}15` }}
                >
                  <FileText className="size-5" style={{ color: currentSection.color }} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 text-sm font-medium text-slate-800">
                    Document {index + 1}: Sample Entry
                  </div>
                  <div className="text-xs text-slate-500">
                    Last updated: {new Date('2026-04-10').toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>{12 + index * 3} pages</span>
                </div>
              </motion.div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="absolute inset-0" onWheel={handleWheelFlip}>
      <div className="absolute inset-0">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="absolute inset-0 bg-slate-50 shadow-md"
            style={{
              transform: `translateY(-${index * 2}px)`,
              opacity: 1 - index * 0.12,
              zIndex: -index,
            }}
          />
        ))}
      </div>

      <motion.div
        key={currentSection.id}
        className="relative h-full overflow-hidden bg-gradient-to-br from-slate-50 to-white shadow-2xl"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.32, ease: 'easeOut' }}
      >
        <div
          className="absolute left-0 top-0 h-full w-2"
          style={{ backgroundColor: currentSection.color }}
        />

        <div className="relative flex h-full flex-col p-10">
          {header}

          <div className="mb-6 shrink-0">
            <SectionDivider section={currentSection} />
          </div>

          <div className="min-h-0 flex-1">{renderContent()}</div>

          <div className="mt-8 border-t border-slate-200 pt-6">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>{pageLabel}</span>
              <span className="font-mono">FAA Conformity Package</span>
            </div>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>
    </div>
  );
}
