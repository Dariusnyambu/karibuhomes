import { useEffect } from "react";
import { GOLD, NAVY, FEATURES } from "../data/constants";

export default function About({ onNavigate, dark }) {
  const bg = dark ? "#0a0f1e" : "#faf9f6";
  const surface = dark ? "#111827" : "#fff";
  const surfaceAlt = dark ? "#1a2438" : "#f8f5ef";
  const text = dark ? "#f0ede6" : "#1a1410";
  const textMuted = dark ? "#9ca3af" : "#6b7280";
  const border = dark ? "#2d3748" : "#e8e3d8";

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ background: bg, color: text, fontFamily: "'Cormorant Garamond', Georgia, serif", paddingTop: 68 }}>
      {/* Header */}
      <div style={{ background: dark ? "#0d1628" : NAVY, padding: "4rem 1.5rem 3rem", textAlign: "center" }}>
        <div style={{ color: GOLD, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10, fontFamily: "'Nunito Sans', sans-serif" }}>✦ Our Story</div>
        <h1 style={{ color: "#fff", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, marginBottom: 12 }}>About <span style={{ color: GOLD }}>Karibu Diaspora Homes</span></h1>
        <p style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Nunito Sans', sans-serif", fontSize: 15, maxWidth: 560, margin: "0 auto" }}>Connecting travellers with thoughtfully curated homes that feel like home, wherever your journey takes you.</p>
      </div>

      {/* Story Section */}
      <section style={{ padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 52, alignItems: "center" }}>
          <div>
            <div style={{ color: GOLD, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10, fontFamily: "'Nunito Sans', sans-serif" }}>✦ Who We Are</div>
            <div style={{ width: 50, height: 3, background: `linear-gradient(90deg, ${GOLD}, transparent)`, marginBottom: 20, borderRadius: 2 }} />
            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", fontWeight: 700, color: dark ? "#f0ede6" : NAVY, marginBottom: 16, lineHeight: 1.2 }}>Welcome to <span style={{ color: GOLD }}>Karibu</span></h2>
            <p style={{ color: textMuted, fontSize: 15, lineHeight: 1.9, marginBottom: 16, fontFamily: "'Nunito Sans', sans-serif" }}>Karibu Diaspora Homes specializes in connecting travelers with thoughtfully curated Airbnb properties that feel like home, wherever your journey takes you. Located in Thika — perfectly positioned between Nairobi and Central Kenya — our homes offer comfort, accessibility, style, and convenience for short and extended stays.</p>
            <p style={{ color: textMuted, fontSize: 15, lineHeight: 1.9, marginBottom: 16, fontFamily: "'Nunito Sans', sans-serif" }}>Whether you're a Kenyan returning from the diaspora, a business traveller on assignment, a tourist exploring Kenya's hidden gems, or a family seeking a home away from home — we understand what matters most: feeling truly, genuinely welcome.</p>
            <p style={{ color: textMuted, fontSize: 15, lineHeight: 1.9, fontFamily: "'Nunito Sans', sans-serif" }}>Our properties in Golf View Estate, Thika are meticulously maintained, professionally photographed, and personally hosted to ensure every guest experience exceeds expectations.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              "/images/green-tourmaline/living-room-1.jpg",
              "/images/great-hornbill/master-bedroom-1.avif",
              "/images/green-tourmaline/master-bedroom.jpg",
              "/images/great-hornbill/exterior.avif",
            ].map((img, i) => (
              <div key={i} style={{ borderRadius: 8, overflow: "hidden", aspectRatio: i === 0 ? "16/9" : "1", ...(i === 0 ? { gridColumn: "1 / -1" } : {}) }}>
                <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                  onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.target.style.transform = "scale(1)"} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: dark ? "#0d1628" : NAVY, padding: "3.5rem 1.5rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 20, textAlign: "center" }}>
          {[{ num: "500+", label: "Happy Guests" }, { num: "2", label: "Luxury Homes" }, { num: "24/7", label: "Support" }, { num: "4+", label: "Years Hosting" }].map(s => (
            <div key={s.label}>
              <div style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)", fontWeight: 700, color: GOLD, lineHeight: 1 }}>{s.num}</div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'Nunito Sans', sans-serif", marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section style={{ background: surfaceAlt, padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{ color: GOLD, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10, fontFamily: "'Nunito Sans', sans-serif" }}>✦ What We Stand For</div>
            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, color: dark ? "#f0ede6" : NAVY }}>The <span style={{ color: GOLD }}>Karibu</span> Promise</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {FEATURES.map(f => (
              <div key={f.title} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 10, padding: "1.8rem 1.4rem", textAlign: "center", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.transform = "translateY(-4px)" }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.transform = "none" }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{f.icon}</div>
                <div style={{ fontSize: "1rem", fontWeight: 700, color: text, marginBottom: 8 }}>{f.title}</div>
                <div style={{ fontSize: 12, color: textMuted, lineHeight: 1.7, fontFamily: "'Nunito Sans', sans-serif" }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #1a3660 100%)`, padding: "4rem 1.5rem", textAlign: "center" }}>
        <h2 style={{ color: "#fff", fontSize: "clamp(1.5rem, 4vw, 2.2rem)", fontWeight: 700, marginBottom: 10 }}>Ready to <span style={{ color: GOLD }}>Experience Karibu?</span></h2>
        <p style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Nunito Sans', sans-serif", fontSize: 15, marginBottom: 28, maxWidth: 440, margin: "0 auto 28px" }}>Browse our properties or get in touch — we'd love to host you.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => onNavigate("Properties")} style={{ padding: "13px 28px", borderRadius: 4, border: "none", background: `linear-gradient(135deg, ${GOLD}, #e8c547)`, color: NAVY, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Nunito Sans', sans-serif", letterSpacing: "0.07em", textTransform: "uppercase" }}>View Properties</button>
          <button onClick={() => onNavigate("Contact")} style={{ padding: "13px 28px", borderRadius: 4, border: "2px solid rgba(255,255,255,0.5)", background: "transparent", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Nunito Sans', sans-serif", letterSpacing: "0.07em", textTransform: "uppercase" }}>Contact Us</button>
        </div>
      </section>
    </div>
  );
}
