import type { AircraftProfile } from './types';
import { PublishedStatusBadge } from './PublishedStatusBadge';

interface BinderCoverProps {
  profile: AircraftProfile;
  onOpen: () => void;
}

export function BinderCover({ profile, onOpen }: BinderCoverProps) {
  return (
    <article className="binder binder--closed">
      <div className="binder-spine" />
      <div className="binder-cover-panel">
        <p className="binder-eyebrow">SkyShare · FAA Conformity</p>
        <h1>{profile.eventTitle}</h1>
        <div className="binder-cover-id-grid">
          <div>
            <span>Tail Number</span>
            <strong>{profile.tailNumber}</strong>
          </div>
          <div>
            <span>Serial Number</span>
            <strong>{profile.serialNumber}</strong>
          </div>
        </div>
        <PublishedStatusBadge publishedOn={profile.publishedOn} />
        <button type="button" className="binder-open-button" onClick={onOpen}>
          Open Binder
        </button>
      </div>
      <div className="binder-page-stack" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </article>
  );
}
