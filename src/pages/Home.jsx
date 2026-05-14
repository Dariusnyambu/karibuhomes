import { useState, useEffect, useRef } from "react";
import { GOLD, NAVY, PROPERTIES, TESTIMONIALS, FEATURES } from "../data/constants";

const PUBLIC_URL = process.env.PUBLIC_URL || "";

const HERO_IMAGES = [
  `${PUBLIC_URL}/images/green-tourmaline/living-room-1.jpg`,
  `${PUBLIC_URL}/images/great-hornbill/exterior.avif`,
  `${PUBLIC_URL}/images/green-tourmaline/lounge-netflix.jpg`,
  `${PUBLIC_URL}/images/great-hornbill/living-room-1.avif`,
];

export default function Home({ onNavigate, dark }) {
  const bg = dark ? "#0a0f1e" : "#faf9f6";
  const surface = dark ? "#111827" : "#fff";
  const surfaceAlt = dark ? "#1a2438" : "#f8f5ef";
  const text = dark ? "#f0ede6" : "#1a1410";
  const textMuted = dark ? "#9ca3af" : "#6b7280";
  const border = dark ? "#2d3748" : "#e8e3d8";

  const [heroImg, setHeroImg] = useState(0);
  const [activeTest, setActiveTest] = useState(0);
  const [counters, setCounters] = useState({ guests: 0, homes: 0, support: 0, years: 0 });
  const [countersStarted, setCountersStarted] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [property, setProperty] = useState("");
  const aboutRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const iv = setInterval(() => setHeroImg(i => (i + 1) % HERO_IMAGES.length), 5000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveTest(i => (i + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !countersStarted) {
        setCountersStarted(true);
        const targets = { guests: 500, homes: 2, support: 24, years: 4 };
        let step = 0;
        const iv = setInterval(() => {
          step++;
          const ease = 1 - Math.pow(1 - step / 60, 3);
          setCounters({ guests: Math.floor(ease * targets.guests), homes: Math.floor(ease * targets.homes), support: Math.floor(ease * targets.support), years: Math.floor(ease * targets.years) });
          if (step >= 60) clearInterval(iv);
        }, 30);
      }
    }, { threshold: 0.3 });
    if (aboutRef.current) observer.observe(aboutRef.current);
    return () => observer.disconnect();
  }, [countersStarted]);

  const handleCheckAvailability = () => {
    // Pass search params to contact page via sessionStorage
    sessionStorage.setItem("booking", JSON.stringify({ checkIn, checkOut, guests, property }));
    onNavigate("Contact");
  };

  return (
    <div style={{ background: bg, color: text, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>

      {/* ── HERO ── */}
      <section style={{ position: "relative", height: "100vh", minHeight: 560, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {HERO_IMAGES.map((img, i) => (
          <div key={i} style={{ position: "absolute", inset: 0, backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center", opacity: i === heroImg ? 1 : 0, transition: "opacity 1.2s ease" }} />
        ))}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(13,31,60,0.65) 55%, rgba(13,31,60,0.92) 100%)" }} />

        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 1.2rem", maxWidth: 780, margin: "0 auto", width: "100%" }}>
          <div style={{ display: "inline-block", padding: "5px 16px", marginBottom: 18, border: `1px solid ${GOLD}`, borderRadius: 20, color: GOLD, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'Nunito Sans', sans-serif" }}>✦ Karibu · Welcome</div>
          <h1 style={{ color: "#fff", fontSize: "clamp(2.2rem, 7vw, 4.5rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: 14 }}>
            Feel At <span style={{ color: GOLD }}>Home.</span><br />Stay In <span style={{ color: GOLD }}>Thika.</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.82)", fontSize: "clamp(0.95rem, 2.5vw, 1.2rem)", lineHeight: 1.7, marginBottom: 28, fontFamily: "'Nunito Sans', sans-serif", fontWeight: 300 }}>
            Luxury curated stays designed for comfort, convenience,<br className="hide-sm" /> and unforgettable experiences in the heart of Kenya.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}>
            <button onClick={() => onNavigate("Contact")} style={{ padding: "13px 28px", borderRadius: 4, border: "none", background: `linear-gradient(135deg, ${GOLD}, #e8c547)`, color: NAVY, fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Nunito Sans', sans-serif", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = `0 8px 24px ${GOLD}55` }}
              onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "none" }}>
              Book Your Stay
            </button>
            <button onClick={() => onNavigate("Properties")} style={{ padding: "13px 28px", borderRadius: 4, background: "transparent", border: "2px solid rgba(255,255,255,0.6)", color: "#fff", fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Nunito Sans', sans-serif", cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.15)"}
              onMouseLeave={e => e.target.style.background = "transparent"}>
              Explore Homes
            </button>
          </div>

          {/* Search Bar */}
          <div style={{ background: "rgba(255,255,255,0.11)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.22)", borderRadius: 8, padding: "1.2rem", display: "flex", flexWrap: "wrap", gap: 10, alignItems: "flex-end" }}>
            {[
              { label: "Check-in", type: "date", val: checkIn, set: setCheckIn },
              { label: "Check-out", type: "date", val: checkOut, set: setCheckOut },
            ].map(f => (
              <div key={f.label} style={{ flex: "1 1 130px", minWidth: 120 }}>
                <label style={{ display: "block", color: GOLD, fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 4, fontFamily: "'Nunito Sans', sans-serif" }}>{f.label}</label>
                <input type={f.type} value={f.val} onChange={e => f.set(e.target.value)} style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.4)", color: "#fff", fontSize: 13, padding: "5px 0", outline: "none", fontFamily: "'Nunito Sans', sans-serif", colorScheme: "dark" }} />
              </div>
            ))}
            <div style={{ flex: "1 1 110px", minWidth: 100 }}>
              <label style={{ display: "block", color: GOLD, fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 4, fontFamily: "'Nunito Sans', sans-serif" }}>Guests</label>
              <select value={guests} onChange={e => setGuests(e.target.value)} style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.4)", color: "#fff", fontSize: 13, padding: "5px 0", outline: "none", fontFamily: "'Nunito Sans', sans-serif" }}>
                {[1,2,3,4,5,6].map(n => <option key={n} value={n} style={{ background: NAVY }}>{n} Guest{n>1?"s":""}</option>)}
              </select>
            </div>
            <div style={{ flex: "1 1 140px", minWidth: 130 }}>
              <label style={{ display: "block", color: GOLD, fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 4, fontFamily: "'Nunito Sans', sans-serif" }}>Property</label>
              <select value={property} onChange={e => setProperty(e.target.value)} style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.4)", color: "#fff", fontSize: 13, padding: "5px 0", outline: "none", fontFamily: "'Nunito Sans', sans-serif" }}>
                <option value="" style={{ background: NAVY }}>Any Property</option>
                {PROPERTIES.map(p => <option key={p.id} value={p.name} style={{ background: NAVY }}>{p.name}</option>)}
              </select>
            </div>
            <button onClick={handleCheckAvailability} style={{ padding: "11px 20px", borderRadius: 4, border: "none", background: `linear-gradient(135deg, ${GOLD}, #e8c547)`, color: NAVY, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'Nunito Sans', sans-serif", letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap", flexShrink: 0 }}>
              Check Availability
            </button>
          </div>
        </div>

        {/* Dot nav */}
        <div style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 7, zIndex: 3 }}>
          {HERO_IMAGES.map((_, i) => (
            <div key={i} onClick={() => setHeroImg(i)} style={{ width: i === heroImg ? 26 : 7, height: 7, borderRadius: 4, background: i === heroImg ? GOLD : "rgba(255,255,255,0.4)", cursor: "pointer", transition: "all 0.3s" }} />
          ))}
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <div ref={aboutRef} style={{ background: dark ? "#0d1628" : NAVY, padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16, textAlign: "center" }}>
          {[{ num: `${counters.guests}+`, label: "Happy Guests" }, { num: counters.homes, label: "Luxury Homes" }, { num: `${counters.support}/7`, label: "Support" }, { num: `${counters.years}+`, label: "Years Hosting" }].map(s => (
            <div key={s.label}>
              <div style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, color: GOLD, lineHeight: 1 }}>{s.num}</div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'Nunito Sans', sans-serif", marginTop: 5 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURED PROPERTIES ── */}
      <section style={{ padding: "5rem 1.5rem", background: bg }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ color: GOLD, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10, fontFamily: "'Nunito Sans', sans-serif" }}>✦ Our Properties</div>
            <div style={{ width: 50, height: 3, background: `linear-gradient(90deg, ${GOLD}, transparent)`, margin: "0 auto 18px", borderRadius: 2 }} />
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, color: dark ? "#f0ede6" : NAVY, marginBottom: 12 }}>Featured <span style={{ color: GOLD }}>Homes</span></h2>
            <p style={{ color: textMuted, fontSize: 15, fontFamily: "'Nunito Sans', sans-serif", maxWidth: 500, margin: "0 auto" }}>Two beautifully curated residences in Golf View Estate.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28 }}>
            {PROPERTIES.map(prop => (
              <PropertyCard key={prop.id} prop={prop} onNavigate={onNavigate} dark={dark} surface={surface} surfaceAlt={surfaceAlt} text={text} textMuted={textMuted} border={border} />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <button onClick={() => onNavigate("Properties")} style={{ padding: "13px 32px", borderRadius: 4, border: `2px solid ${GOLD}`, background: "transparent", color: dark ? GOLD : NAVY, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Nunito Sans', sans-serif", letterSpacing: "0.06em", textTransform: "uppercase", transition: "all 0.2s" }}
              onMouseEnter={e => { e.target.style.background = GOLD; e.target.style.color = NAVY }}
              onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = dark ? GOLD : NAVY }}>
              View All Properties →
            </button>
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section style={{ background: dark ? "#0d1628" : NAVY, padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ color: GOLD, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10, fontFamily: "'Nunito Sans', sans-serif" }}>✦ Why Choose Us</div>
            <div style={{ width: 50, height: 3, background: `linear-gradient(90deg, ${GOLD}, transparent)`, margin: "0 auto 18px", borderRadius: 2 }} />
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, color: "#fff" }}>The <span style={{ color: GOLD }}>Karibu</span> Difference</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {FEATURES.map(f => (
              <div key={f.title} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "1.8rem 1.4rem", textAlign: "center", transition: "all 0.3s", cursor: "default" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.transform = "translateY(-4px)" }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = "none" }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{f.icon}</div>
                <div style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: 7 }}>{f.title}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, fontFamily: "'Nunito Sans', sans-serif" }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ background: bg, padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <div style={{ color: GOLD, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10, fontFamily: "'Nunito Sans', sans-serif" }}>✦ Guest Stories</div>
          <div style={{ width: 50, height: 3, background: `linear-gradient(90deg, ${GOLD}, transparent)`, margin: "0 auto 18px", borderRadius: 2 }} />
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, color: dark ? "#f0ede6" : NAVY, marginBottom: 40 }}>What Our <span style={{ color: GOLD }}>Guests</span> Say</h2>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={{ display: i === activeTest ? "block" : "none", background: surface, borderRadius: 12, padding: "2rem 1.8rem", border: `1px solid ${border}` }}>
              <div style={{ fontSize: 24, color: GOLD, marginBottom: 14 }}>{"★".repeat(t.stars)}</div>
              <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: text, fontStyle: "italic", marginBottom: 20 }}>"{t.text}"</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg, ${GOLD}, #e8c547)`, display: "flex", alignItems: "center", justifyContent: "center", color: NAVY, fontWeight: 700, fontSize: 13 }}>{t.avatar}</div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: text }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: textMuted, fontFamily: "'Nunito Sans', sans-serif" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
          <div style={{ display: "flex", gap: 7, justifyContent: "center", marginTop: 20 }}>
            {TESTIMONIALS.map((_, i) => (
              <div key={i} onClick={() => setActiveTest(i)} style={{ width: i === activeTest ? 26 : 7, height: 7, borderRadius: 4, background: i === activeTest ? GOLD : border, cursor: "pointer", transition: "all 0.3s" }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #1a3660 100%)`, padding: "4rem 1.5rem", textAlign: "center" }}>
        <h2 style={{ color: "#fff", fontSize: "clamp(1.6rem, 4vw, 2.5rem)", fontWeight: 700, marginBottom: 12 }}>Ready to <span style={{ color: GOLD }}>Book Your Stay?</span></h2>
        <p style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Nunito Sans', sans-serif", fontSize: 15, marginBottom: 28, maxWidth: 480, margin: "0 auto 28px" }}>Reach out via WhatsApp or our booking form — we confirm within 2 hours.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => onNavigate("Contact")} style={{ padding: "13px 28px", borderRadius: 4, border: "none", background: `linear-gradient(135deg, ${GOLD}, #e8c547)`, color: NAVY, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Nunito Sans', sans-serif", letterSpacing: "0.07em", textTransform: "uppercase" }}>Book Now</button>
          <a href="https://wa.me/254723329598" target="_blank" rel="noopener noreferrer" style={{ padding: "13px 28px", borderRadius: 4, border: "2px solid #25d366", background: "transparent", color: "#25d366", fontSize: 13, fontWeight: 700, textDecoration: "none", fontFamily: "'Nunito Sans', sans-serif", letterSpacing: "0.07em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 6 }}>💬 WhatsApp Us</a>
        </div>
      </section>
    </div>
  );
}

function PropertyCard({ prop, onNavigate, dark, surface, surfaceAlt, text, textMuted, border }) {
  const [imgIdx, setImgIdx] = useState(0);
  return (
    <div style={{ background: surface, borderRadius: 12, overflow: "hidden", border: `1px solid ${border}`, transition: "transform 0.3s, box-shadow 0.3s" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.14)" }}
      onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none" }}>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img src={prop.images[imgIdx]} alt={prop.name} style={{ width: "100%", height: 230, objectFit: "cover", display: "block", transition: "transform 0.5s" }} />
        <div style={{ position: "absolute", top: 14, left: 14, background: GOLD, color: NAVY, padding: "3px 11px", borderRadius: 20, fontSize: 10, fontWeight: 700, letterSpacing: "0.07em", fontFamily: "'Nunito Sans', sans-serif" }}>{prop.badge}</div>
        <div style={{ position: "absolute", bottom: 10, right: 10, display: "flex", gap: 5 }}>
          {prop.images.slice(0, 4).map((_, ii) => (
            <div key={ii} onClick={() => setImgIdx(ii)} style={{ width: ii === imgIdx ? 18 : 6, height: 6, borderRadius: 3, background: ii === imgIdx ? GOLD : "rgba(255,255,255,0.6)", cursor: "pointer", transition: "all 0.25s" }} />
          ))}
        </div>
        <div onClick={() => setImgIdx((imgIdx - 1 + prop.images.length) % prop.images.length)} style={{ position: "absolute", top: "50%", left: 8, transform: "translateY(-50%)", background: "rgba(0,0,0,0.4)", color: "#fff", width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 14 }}>‹</div>
        <div onClick={() => setImgIdx((imgIdx + 1) % prop.images.length)} style={{ position: "absolute", top: "50%", right: 8, transform: "translateY(-50%)", background: "rgba(0,0,0,0.4)", color: "#fff", width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 14 }}>›</div>
      </div>
      <div style={{ padding: "1.4rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: text, margin: 0, lineHeight: 1.2 }}>{prop.name}</h3>
          <div><span style={{ fontSize: "1.4rem", fontWeight: 700, color: GOLD }}>${prop.price}</span><span style={{ fontSize: 11, color: textMuted, fontFamily: "'Nunito Sans', sans-serif" }}>/night</span></div>
        </div>
        <div style={{ color: textMuted, fontSize: 12, marginBottom: 10, fontFamily: "'Nunito Sans', sans-serif" }}>📍 {prop.location}</div>
        <p style={{ color: textMuted, fontSize: 13, lineHeight: 1.7, marginBottom: 14, fontFamily: "'Nunito Sans', sans-serif" }}>{prop.description}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
          {prop.amenities.slice(0, 4).map((a, i) => (
            <span key={a} style={{ background: dark ? "#1a2438" : "#f0ede6", border: `1px solid ${dark ? "#2d3748" : "#e8e3d8"}`, borderRadius: 20, padding: "3px 10px", fontSize: 11, color: textMuted, fontFamily: "'Nunito Sans', sans-serif" }}>{prop.amenityIcons[i]} {a}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => onNavigate("Properties")} style={{ flex: 1, padding: "10px", borderRadius: 6, border: `1px solid ${GOLD}`, background: "transparent", color: dark ? GOLD : NAVY, fontWeight: 600, fontSize: 12, cursor: "pointer", fontFamily: "'Nunito Sans', sans-serif" }}>View Details</button>
          <button onClick={() => { sessionStorage.setItem("booking", JSON.stringify({ property: prop.name })); onNavigate("Contact"); }} style={{ flex: 1, padding: "10px", borderRadius: 6, border: "none", background: `linear-gradient(135deg, ${GOLD}, #e8c547)`, color: NAVY, fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "'Nunito Sans', sans-serif" }}>Book Now</button>
        </div>
      </div>
    </div>
  );
}
