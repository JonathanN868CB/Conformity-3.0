import type { CSSProperties } from 'react';
import type { BinderSection } from './types';

interface BinderTabsProps {
  sections: BinderSection[];
  activeKey: string;
  onSelect: (key: string) => void;
}

export function BinderTabs({ sections, activeKey, onSelect }: BinderTabsProps) {
  return (
    <nav className="binder-tabs" aria-label="Conformity sections">
      {sections.map((section) => {
        const isActive = section.key === activeKey;

        return (
          <button
            key={section.key}
            className={`binder-tab ${isActive ? 'is-active' : ''}`}
            onClick={() => onSelect(section.key)}
            style={{ '--tab-accent': section.accent } as CSSProperties}
            type="button"
          >
            {section.label}
          </button>
        );
      })}
    </nav>
  );
}
