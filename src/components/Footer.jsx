import { GOLD, NAVY } from "../data/constants";

export default function Footer({ onNavigate, dark }) {
  const bg = dark ? "#050b18" : NAVY;
  return (
    <footer style={{ background: bg, color: "rgba(255,255,255,0.75)", padding: "3rem 1.5rem 1.5rem", fontFamily: "'Nunito Sans', sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32, paddingBottom: "2.5rem", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, cursor: "pointer" }} onClick={() => onNavigate("Home")}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: `linear-gradient(135deg, ${GOLD}, #e8c547)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: NAVY }}>K</div>
              <div>
                <div style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>Karibu Diaspora Homes</div>
                <div style={{ color: GOLD, fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase" }}>Thika, Kenya</div>
              </div>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.8, color: "rgba(255,255,255,0.5)", maxWidth: 220 }}>Thoughtfully curated luxury short stays in Golf View Estate, Thika.</p>
            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              {["📘", "📸", "▶"].map((icon, i) => (
                <div key={i} style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 14, transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = GOLD}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}>{icon}</div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div style={{ color: GOLD, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 14 }}>Quick Links</div>
            {["Home", "Properties", "Gallery", "About", "Contact"].map(l => (
              <div key={l} style={{ marginBottom: 10 }}>
                <span onClick={() => onNavigate(l)} style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, cursor: "pointer", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = GOLD}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}>{l}</span>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ color: GOLD, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 14 }}>Contact Us</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 2.3 }}>
              <div>📍 Golf View Estate, Thika</div>
              <div><a href="https://wa.me/254723329598" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>📱 +254 723 329 598</a></div>
              <div><a href="https://wa.me/447424172630" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>📱 +44 7424 172 630</a></div>
              <div>✉️ info@karibudiaspora.co.ke</div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <div style={{ color: GOLD, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 14 }}>Newsletter</div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 14, lineHeight: 1.7 }}>Get updates on availability and exclusive offers.</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <input type="email" placeholder="Your email" style={{ flex: 1, minWidth: 120, padding: "10px 12px", borderRadius: 4, border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.07)", color: "#fff", fontSize: 13, outline: "none" }} />
              <button style={{ padding: "10px 14px", background: GOLD, border: "none", borderRadius: 4, color: NAVY, fontWeight: 700, cursor: "pointer", fontSize: 13 }}>→</button>
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center", paddingTop: "1.5rem", color: "rgba(255,255,255,0.3)", fontSize: 12 }}>
          © {new Date().getFullYear()} Karibu Diaspora Homes · Golf View Estate, Thika, Kenya · All rights reserved.
        </div>
      </div>
    </footer>
  );
}
