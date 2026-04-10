interface PublishedStatusBadgeProps {
  publishedOn: string;
}

export function PublishedStatusBadge({ publishedOn }: PublishedStatusBadgeProps) {
  return (
    <div className="published-status-badge" aria-label={`Published ${publishedOn}`}>
      <span className="status-dot" />
      Published · {publishedOn}
    </div>
  );
}
