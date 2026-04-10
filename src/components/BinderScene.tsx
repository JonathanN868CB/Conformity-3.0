import { useMemo, useState } from 'react';
import type { MouseEvent } from 'react';
import { BinderCover } from './BinderCover';
import { BinderOpenView } from './BinderOpenView';
import { aircraftProfile, sections } from './mockData';

export function BinderScene() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeSectionKey, setActiveSectionKey] = useState(sections[0].key);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const activeSection = useMemo(
    () =>
      sections.find((section) => section.key === activeSectionKey) ?? sections[0],
    [activeSectionKey],
  );

  const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    setTilt({ x: y * -7, y: x * 10 });
  };

  const handlePointerLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <main className="binder-scene-shell">
      <div className="ambient-glow ambient-glow--top" />
      <div className="ambient-glow ambient-glow--bottom" />

      <section
        className="binder-stage"
        onMouseMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
      >
        <div
          className="binder-parallax"
          style={{
            transform: `perspective(1800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          }}
        >
          {isOpen ? (
            <BinderOpenView
              profile={aircraftProfile}
              sections={sections}
              activeSection={activeSection}
              onSelectSection={setActiveSectionKey}
              onClose={() => setIsOpen(false)}
            />
          ) : (
            <BinderCover profile={aircraftProfile} onOpen={() => setIsOpen(true)} />
          )}
        </div>
      </section>
    </main>
  );
}
