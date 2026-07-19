export default function Loader({ label = "Reading the instruments…" }) {
  return (
    <div className="state-block">
      <div className="loader-dial" role="status" aria-live="polite" />
      <div className="state-title">{label}</div>
      <div className="state-sub">This usually takes a second.</div>
    </div>
  );
}
