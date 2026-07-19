import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div>
      <div className="eyebrow">STN.05 · CONTACT</div>
      <h1 className="page-title">Contact</h1>
      <p className="page-sub">Spotted a bug in the instruments, or want a feature added? Send a note.</p>

      <div className="contact-grid">
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
              style={{
                background: "var(--ink-800)",
                border: "1px solid var(--line)",
                borderRadius: "var(--radius-sm)",
                padding: "11px 13px",
                color: "var(--paper)",
                fontFamily: "var(--font-body)",
                fontSize: 14,
                resize: "vertical",
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Send message
          </button>
          {sent && (
            <p className="state-sub" style={{ color: "var(--cyan)" }}>
              Thanks, {form.name.split(" ")[0] || "there"} — this is a demo form, so nothing was
              actually sent, but that's exactly what a real submit would look like.
            </p>
          )}
        </form>

        <div className="hero-panel">
          <div className="eyebrow" style={{ marginBottom: 10 }}>
            STATION DESK
          </div>
          <div className="hero-panel-row">
            <span>Support</span>
            <span className="mono">support@aloft.app</span>
          </div>
          <div className="hero-panel-row">
            <span>Response time</span>
            <span className="mono">~1 business day</span>
          </div>
          <div className="hero-panel-row">
            <span>Status</span>
            <span className="mono">All systems nominal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
