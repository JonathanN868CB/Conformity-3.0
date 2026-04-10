import type { AircraftProfile, BinderSection } from './types';
import { BinderRings } from './BinderRings';
import { BinderTabs } from './BinderTabs';
import { PublishedStatusBadge } from './PublishedStatusBadge';
import { SectionDivider } from './SectionDivider';

interface BinderOpenViewProps {
  profile: AircraftProfile;
  sections: BinderSection[];
  activeSection: BinderSection;
  onSelectSection: (key: string) => void;
  onClose: () => void;
}

export function BinderOpenView({
  profile,
  sections,
  activeSection,
  onSelectSection,
  onClose,
}: BinderOpenViewProps) {
  return (
    <article className="binder binder--open">
      <div className="binder-spine" />
      <BinderRings />

      <div className="binder-sheet binder-sheet--left">
        <p className="binder-eyebrow">Aircraft Identity</p>
        <h1>{profile.tailNumber}</h1>
        <p className="binder-serial">Serial · {profile.serialNumber}</p>
        <p className="binder-event">{profile.eventTitle}</p>
        <PublishedStatusBadge publishedOn={profile.publishedOn} />
        <button type="button" className="binder-close-button" onClick={onClose}>
          Close Binder
        </button>
      </div>

      <div className="binder-sheet binder-sheet--right">
        <SectionDivider
          title={activeSection.label}
          subtitle={activeSection.summary}
          accent={activeSection.accent}
        />
      </div>

      <BinderTabs
        sections={sections}
        activeKey={activeSection.key}
        onSelect={onSelectSection}
      />
    </article>
  );
}
