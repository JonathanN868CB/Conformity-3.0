interface PublishedStatusBadgeProps {
  status?: 'published' | 'draft' | 'archived';
  version: string;
  date?: string;
}

export function PublishedStatusBadge({
  status = 'published',
  version,
  date,
}: PublishedStatusBadgeProps) {
  const statusConfig = {
    published: {
      label: 'Published',
      bgColor: 'bg-emerald-900/30',
      borderColor: 'border-emerald-700/50',
      textColor: 'text-emerald-300',
      dotColor: 'bg-emerald-400',
    },
    draft: {
      label: 'Draft',
      bgColor: 'bg-amber-900/30',
      borderColor: 'border-amber-700/50',
      textColor: 'text-amber-300',
      dotColor: 'bg-amber-400',
    },
    archived: {
      label: 'Archived',
      bgColor: 'bg-slate-800/30',
      borderColor: 'border-slate-600/50',
      textColor: 'text-slate-400',
      dotColor: 'bg-slate-500',
    },
  };

  const config = statusConfig[status];

  return (
    <div
      className={`inline-flex items-center gap-3 border px-4 py-2 backdrop-blur-sm ${config.bgColor} ${config.borderColor}`}
    >
      <div className="flex items-center gap-2">
        <div className={`size-2 rounded-full shadow-sm ${config.dotColor}`} />
        <span className={`text-sm font-medium tracking-wide ${config.textColor}`}>
          {config.label}
        </span>
      </div>
      <div className="h-4 w-px bg-white/10" />
      <span className="text-xs font-mono text-slate-400">v{version}</span>
      {date ? (
        <>
          <div className="h-4 w-px bg-white/10" />
          <span className="text-xs text-slate-500">{date}</span>
        </>
      ) : null}
    </div>
  );
}
