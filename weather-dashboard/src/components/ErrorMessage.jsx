export default function ErrorMessage({ title = "Station offline", message, onRetry }) {
  return (
    <div className="state-block error-block">
      <div style={{ fontSize: 26 }}>⚠</div>
      <div className="state-title">{title}</div>
      <div className="state-sub">{message}</div>
      {onRetry && (
        <button className="btn btn-outline" style={{ marginTop: 16 }} onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

export function EmptyState({ title, message, action }) {
  return (
    <div className="state-block">
      <div style={{ fontSize: 26 }}>◌</div>
      <div className="state-title">{title}</div>
      <div className="state-sub">{message}</div>
      {action}
    </div>
  );
}
