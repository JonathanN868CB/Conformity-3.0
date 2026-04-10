interface SectionDividerProps {
  title: string;
  subtitle: string;
  accent: string;
}

export function SectionDivider({ title, subtitle, accent }: SectionDividerProps) {
  return (
    <section className="section-divider">
      <div className="section-divider__accent" style={{ background: accent }} />
      <div className="section-divider__content">
        <p className="section-divider__label">Section</p>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
    </section>
  );
}
