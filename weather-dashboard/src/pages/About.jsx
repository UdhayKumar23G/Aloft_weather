export default function About() {
  return (
    <div>
      <div className="eyebrow">STN.04 · ABOUT</div>
      <h1 className="page-title">About Aloft</h1>
      <p className="page-sub">
        Aloft is a front-end weather dashboard built to demonstrate a full React application:
        routing, shared state, forms, and persisted data — no backend required.
      </p>

      <div className="about-grid">
        <div className="about-card">
          <div className="num">01</div>
          <h3 style={{ marginTop: 8, fontSize: 15 }}>Search</h3>
          <p style={{ marginTop: 6, fontSize: 13.5 }}>
            Look up any city and get a deterministic, believable mock reading — same city, same
            numbers, every time.
          </p>
        </div>
        <div className="about-card">
          <div className="num">02</div>
          <h3 style={{ marginTop: 8, fontSize: 15 }}>Forecast</h3>
          <p style={{ marginTop: 6, fontSize: 13.5 }}>
            A 5-day outlook and next-24-hour breakdown, generated from the same seed as the
            current reading.
          </p>
        </div>
        <div className="about-card">
          <div className="num">03</div>
          <h3 style={{ marginTop: 8, fontSize: 15 }}>Accounts</h3>
          <p style={{ marginTop: 6, fontSize: 13.5 }}>
            Sign up and log in locally — saved cities are tied to your session and kept in your
            browser.
          </p>
        </div>
        <div className="about-card">
          <div className="num">04</div>
          <h3 style={{ marginTop: 8, fontSize: 15 }}>Swappable data</h3>
          <p style={{ marginTop: 6, fontSize: 13.5 }}>
            <code>services/weatherApi.js</code> is written to mirror a real REST call, so plugging
            in a live provider later is a small change.
          </p>
        </div>
      </div>
    </div>
  );
}
