interface BinderRingsProps {
  count?: number;
}

export function BinderRings({ count = 6 }: BinderRingsProps) {
  return (
    <div className="binder-rings" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <div className="binder-ring" key={`ring-${index}`}>
          <span className="binder-ring__inner" />
        </div>
      ))}
    </div>
  );
}
