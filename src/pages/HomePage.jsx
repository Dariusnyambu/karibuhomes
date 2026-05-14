import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PROPERTIES, TESTIMONIALS, FEATURES } from "../data/siteData";

const gold = "#c9a227";
const navy = "#0d1f3c";

const HERO_IMAGES = [
  "/images/green-tourmaline/living-room-1.jpg",
  "/images/great-hornbill/exterior.avif",
  "/images/green-tourmaline/lounge-netflix.jpg",
  "/images/great-hornbill/master-bedroom-1.avif",
];

export default function HomePage({ dark }) {
  const navigate = useNavigate();
  const [heroImg, setHeroImg] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [counters, setCounters] = useState({ guests: 0, homes: 0, support: 0, years: 0 });
  const [countersStarted, setCountersStarted] = useState(false);
  const aboutRef = useRef(null);

  const [searchForm, setSearchForm] = useState({ checkin: "", checkout: "", guests: "2", property: "" });
  const [searchError, setSearchError] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const bg = dark ? "#0a0f1e" : "#faf9f6";
  const surface = dark ? "#111827" : "#ffffff";
  const surfaceAlt = dark ? "#1a2438" : "#f8f5ef";
  const text = dark ? "#f0ede6" : "#1a1410";
  const textMuted = dark ? "#9ca3af" : "#6b7280";
  const border = dark ? "#2d3748" : "#e8e3d8";

  useEffect(() => {
    const i = setInterval(() => setHeroImg(n => (n + 1) % HERO_IMAGES.length), 5000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(n => (n + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !countersStarted) {
        setCountersStarted(true);
        const targets = { guests: 500, homes: 2, support: 24, years: 4 };
        let step = 0;
        const interval = setInterval(() => {
          step++;
          const ease = 1 - Math.pow(1 - step / 60, 3);
          setCounters({ guests: Math.floor(ease * targets.guests), homes: Math.floor(ease * targets.homes), support: Math.floor(ease * targets.support), years: Math.floor(ease * targets.years) });
          if (step >= 60) clearInterval(interval);
        }, 30);
      }
    }, { threshold: 0.3 });
    if (aboutRef.current) observer.observe(aboutRef.current);
    return () => observer.disconnect();
  }, [countersStarted]);

  const handleCheckAvailability = () => {
    setSearchError("");
    setSearchResult(null);
    if (!searchForm.checkin || !searchForm.checkout) {
      setSearchError("Please select both check-in and check-out dates.");
      return;
    }
    const cin = new Date(searchForm.checkin);
    const cout = new Date(searchForm.checkout);
    const today = new Date(); today.setHours(0,0,0,0);
    if (cin < today) { setSearchError("Check-in date cannot be in the past."); return; }
    if (cout <= cin) { setSearchError("Check-out must be after check-in."); return; }
    const nights = Math.round((cout - cin) / (1000 * 60 * 60 * 24));
    const matches = searchForm.property
      ? PROPERTIES.filter(p => p.name === searchForm.property && p.guests >= parseInt(searchForm.guests))
      : PROPERTIES.filter(p => p.guests >= parseInt(searchForm.guests));
    setSearchResult({ nights, guests: searchForm.guests, matches, checkin: searchForm.checkin, checkout: searchForm.checkout });
  };

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", background: bg, color: text }}>

      {/* HERO */}
      <section style={{ position: "relative", height: "100vh", minHeight: 600, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {HERO_IMAGES.map((img, i) => (
          <div key={i} style={{ position: "absolute", inset: 0, backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center", opacity: i === heroImg ? 1 : 0, transition: "opacity 1.2s ease" }} />
        ))}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(13,31,60,0.72) 60%, rgba(13,31,60,0.92) 100%)" }} />

        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 1.5rem", maxWidth: 820, margin: "0 auto" }}>
          <div style={{ display: "inline-block", padding: "6px 18px", marginBottom: 20, border: `1px solid ${gold}`, borderRadius: 20, color: gold, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'Nunito Sans', sans-serif" }}>✦ Karibu · Welcome</div>
          <h1 style={{ color: "#fff", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: 16 }}>
            Feel At <span style={{ color: gold }}>Home.</span><br />Stay In <span style={{ color: gold }}>Thika.</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.82)", fontSize: "clamp(1rem, 2.5vw, 1.2rem)", lineHeight: 1.8, marginBottom: 36, fontFamily: "'Nunito Sans', sans-serif", fontWeight: 300 }}>
            Luxury curated stays designed for comfort, convenience, and unforgettable experiences.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
            <button style={{ padding: "14px 32px", borderRadius: 4, border: "none", cursor: "pointer", background: `linear-gradient(135deg, ${gold}, #e8c547)`, color: navy, fontSize: 14, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Nunito Sans', sans-serif" }}
              onClick={() => navigate("/contact")}>Book Your Stay</button>
            <button style={{ padding: "14px 32px", borderRadius: 4, cursor: "pointer", background: "transparent", border: "2px solid rgba(255,255,255,0.6)", color: "#fff", fontSize: 14, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Nunito Sans', sans-serif" }}
              onClick={() => navigate("/properties")}>Explore Homes</button>
          </div>

          {/* SEARCH BAR */}
          <div style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 8, padding: "1.5rem", display: "flex", flexWrap: "wrap", gap: 12, alignItems: "flex-end" }}>
            {[{ label: "Check-in", type: "date", key: "checkin" }, { label: "Check-out", type: "date", key: "checkout" }].map(f => (
              <div key={f.key} style={{ flex: "1 1 130px", minWidth: 110 }}>
                <label style={{ display: "block", color: gold, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4, fontFamily: "'Nunito Sans', sans-serif" }}>{f.label}</label>
                <input type={f.type} style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.4)", color: "#fff", fontSize: 14, padding: "6px 0", outline: "none", fontFamily: "'Nunito Sans', sans-serif" }}
                  value={searchForm[f.key]} onChange={e => setSearchForm({ ...searchForm, [f.key]: e.target.value })} />
              </div>
            ))}
            <div style={{ flex: "1 1 100px", minWidth: 90 }}>
              <label style={{ display: "block", color: gold, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4, fontFamily: "'Nunito Sans', sans-serif" }}>Guests</label>
              <select style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.4)", color: "#fff", fontSize: 14, padding: "6px 0", outline: "none", fontFamily: "'Nunito Sans', sans-serif" }}
                value={searchForm.guests} onChange={e => setSearchForm({ ...searchForm, guests: e.target.value })}>
                {[1,2,3,4,5,6].map(n => <option key={n} value={n} style={{ background: navy }}>{n} Guest{n>1?"s":""}</option>)}
              </select>
            </div>
            <div style={{ flex: "1 1 150px", minWidth: 130 }}>
              <label style={{ display: "block", color: gold, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4, fontFamily: "'Nunito Sans', sans-serif" }}>Property</label>
              <select style={{ width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.4)", color: "#fff", fontSize: 14, padding: "6px 0", outline: "none", fontFamily: "'Nunito Sans', sans-serif" }}
                value={searchForm.property} onChange={e => setSearchForm({ ...searchForm, property: e.target.value })}>
                <option value="" style={{ background: navy }}>Any Property</option>
                {PROPERTIES.map(p => <option key={p.id} value={p.name} style={{ background: navy }}>{p.name}</option>)}
              </select>
            </div>
            <button style={{ padding: "12px 24px", borderRadius: 4, border: "none", cursor: "pointer", background: `linear-gradient(135deg, ${gold}, #e8c547)`, color: navy, fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "'Nunito Sans', sans-serif", whiteSpace: "nowrap" }}
              onClick={handleCheckAvailability}>Check Availability</button>
          </div>

          {/* Search Error */}
          {searchError && (
            <div style={{ marginTop: 12, background: "rgba(220,38,38,0.85)", borderRadius: 6, padding: "10px 16px", color: "#fff", fontSize: 13, fontFamily: "'Nunito Sans', sans-serif", backdropFilter: "blur(8px)" }}>
              ⚠️ {searchError}
            </div>
          )}

          {/* Search Results */}
          {searchResult && (
            <div style={{ marginTop: 16, background: "rgba(255,255,255,0.95)", borderRadius: 8, padding: "1.5rem", textAlign: "left" }}>
              {searchResult.matches.length === 0 ? (
                <div style={{ color: "#dc2626", fontFamily: "'Nunito Sans', sans-serif", fontSize: 14, textAlign: "center" }}>
                  😔 No properties available for {searchResult.guests} guests on those dates. Try adjusting your search or <span style={{ color: navy, fontWeight: 700, cursor: "pointer" }} onClick={() => navigate("/contact")}>contact us directly</span>.
                </div>
              ) : (
                <>
                  <div style={{ color: "#16a34a", fontWeight: 700, fontSize: 14, fontFamily: "'Nunito Sans', sans-serif", marginBottom: 12 }}>
                    ✅ {searchResult.matches.length} propert{searchResult.matches.length > 1 ? "ies" : "y"} available for {searchResult.nights} night{searchResult.nights > 1 ? "s" : ""} ({searchResult.guests} guests)
                  </div>
                  {searchResult.matches.map(p => (
                    <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #e5e7eb", flexWrap: "wrap", gap: 8 }}>
                      <div>
                        <div style={{ fontWeight: 700, color: navy, fontSize: 15, fontFamily: "'Cormorant Garamond', serif" }}>{p.name}</div>
                        <div style={{ color: "#6b7280", fontSize: 12, fontFamily: "'Nunito Sans', sans-serif" }}>📍 {p.location}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ color: gold, fontWeight: 700, fontSize: 18 }}>${p.price * searchResult.nights} <span style={{ fontSize: 12, color: "#6b7280" }}>total</span></div>
                        <div style={{ fontSize: 12, color: "#6b7280", fontFamily: "'Nunito Sans', sans-serif" }}>${p.price}/night × {searchResult.nights} nights</div>
                        <button style={{ marginTop: 6, padding: "7px 16px", background: `linear-gradient(135deg, ${gold}, #e8c547)`, border: "none", borderRadius: 4, color: navy, fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "'Nunito Sans', sans-serif" }}
                          onClick={() => navigate("/contact", { state: { property: p.name, checkin: searchResult.checkin, checkout: searchResult.checkout, guests: searchResult.guests } })}>
                          Reserve Now →
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>

        {/* Hero dots */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 3 }}>
          {HERO_IMAGES.map((_, i) => (
            <div key={i} onClick={() => setHeroImg(i)} style={{ width: i === heroImg ? 28 : 8, height: 8, borderRadius: 4, background: i === heroImg ? gold : "rgba(255,255,255,0.4)", cursor: "pointer", transition: "all 0.3s" }} />
          ))}
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section style={{ background: surfaceAlt }}>
        <div ref={aboutRef} style={{ padding: "5rem 2rem", maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 64, alignItems: "center" }}>
          <div>
            <div style={{ color: gold, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, fontFamily: "'Nunito Sans', sans-serif" }}>✦ Our Story</div>
            <div style={{ width: 60, height: 3, background: `linear-gradient(90deg, ${gold}, transparent)`, marginBottom: 24, borderRadius: 2 }} />
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: text, marginBottom: 16, lineHeight: 1.2 }}>Welcome to<br />Karibu Diaspora <span style={{ color: gold }}>Homes</span></h2>
            <p style={{ color: textMuted, fontSize: 16, lineHeight: 1.8, fontFamily: "'Nunito Sans', sans-serif", marginBottom: 16 }}>
              Karibu Diaspora Homes specializes in connecting travelers with thoughtfully curated Airbnb properties that feel like home. Located in Thika between Nairobi and Central Kenya, our homes offer comfort, accessibility, and style.
            </p>
            <button onClick={() => navigate("/about")} style={{ padding: "12px 28px", borderRadius: 4, border: `2px solid ${gold}`, background: "transparent", color: dark ? gold : navy, fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "'Nunito Sans', sans-serif", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Learn More About Us →
            </button>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 40 }}>
              {[{ num: `${counters.guests}+`, label: "Happy Guests" }, { num: counters.homes, label: "Luxury Homes" }, { num: `${counters.support}/7`, label: "Support" }, { num: `${counters.years}+`, label: "Years Hosting" }].map(s => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, color: gold, lineHeight: 1 }}>{s.num}</div>
                  <div style={{ color: textMuted, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Nunito Sans', sans-serif", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {["/images/green-tourmaline/living-room-1.jpg", "/images/great-hornbill/master-bedroom-1.avif", "/images/green-tourmaline/master-bedroom.jpg", "/images/great-hornbill/exterior.avif"].map((img, i) => (
              <div key={i} style={{ borderRadius: 8, overflow: "hidden", aspectRatio: i === 0 ? "16/9" : "1", ...(i === 0 ? { gridColumn: "1 / -1" } : {}) }}>
                <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                  onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.target.style.transform = "scale(1)"} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section style={{ padding: "5rem 2rem", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ color: gold, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, fontFamily: "'Nunito Sans', sans-serif" }}>✦ Our Properties</div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: dark ? "#f0ede6" : navy, marginBottom: 16 }}>Featured <span style={{ color: gold }}>Homes</span></h2>
          <p style={{ color: textMuted, fontSize: 16, lineHeight: 1.8, fontFamily: "'Nunito Sans', sans-serif", maxWidth: 560, margin: "0 auto" }}>Two beautifully curated residences in Golf View Estate — each one a sanctuary of comfort and style.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 32 }}>
          {PROPERTIES.map(prop => (
            <div key={prop.id} style={{ background: surface, borderRadius: 12, overflow: "hidden", border: `1px solid ${border}`, transition: "transform 0.3s, box-shadow 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.15)" }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none" }}>
              <div style={{ position: "relative", overflow: "hidden" }}>
                <img src={prop.images[0]} alt={prop.name} style={{ width: "100%", height: 260, objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", top: 16, left: 16, background: gold, color: navy, padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif" }}>{prop.badge}</div>
              </div>
              <div style={{ padding: "1.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <h3 style={{ fontSize: "1.4rem", fontWeight: 700, color: text, margin: 0, lineHeight: 1.2 }}>{prop.name}</h3>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "1.6rem", fontWeight: 700, color: gold }}>${prop.price}</span>
                    <span style={{ fontSize: 12, color: textMuted, fontFamily: "'Nunito Sans', sans-serif" }}>/night</span>
                  </div>
                </div>
                <div style={{ color: textMuted, fontSize: 13, marginBottom: 12, fontFamily: "'Nunito Sans', sans-serif" }}>📍 {prop.location}</div>
                <p style={{ color: textMuted, fontSize: 14, lineHeight: 1.7, marginBottom: 20, fontFamily: "'Nunito Sans', sans-serif" }}>{prop.description}</p>
                <div style={{ display: "flex", gap: 10 }}>
                  <button style={{ flex: 1, padding: "11px", borderRadius: 6, border: `1px solid ${gold}`, background: "transparent", color: dark ? gold : navy, fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "'Nunito Sans', sans-serif" }}
                    onClick={() => navigate(`/properties/${prop.slug}`)}>View Details</button>
                  <button style={{ flex: 1, padding: "11px", borderRadius: 6, border: "none", background: `linear-gradient(135deg, ${gold}, #e8c547)`, color: navy, fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "'Nunito Sans', sans-serif" }}
                    onClick={() => navigate("/contact", { state: { property: prop.name } })}>Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <button onClick={() => navigate("/properties")} style={{ padding: "14px 36px", borderRadius: 4, border: `2px solid ${gold}`, background: "transparent", color: dark ? gold : navy, fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "'Nunito Sans', sans-serif", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            View All Properties →
          </button>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section style={{ background: dark ? "#0d1628" : navy, padding: "5rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ color: gold, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, fontFamily: "'Nunito Sans', sans-serif" }}>✦ Why Choose Us</div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#fff", marginBottom: 0 }}>The <span style={{ color: gold }}>Karibu</span> Difference</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {FEATURES.map(f => (
              <div key={f.title} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "2rem 1.5rem", textAlign: "center", transition: "transform 0.3s, border-color 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = gold; e.currentTarget.style.transform = "translateY(-4px)" }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.transform = "none" }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{f.icon}</div>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 8, color: "#fff" }}>{f.title}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, fontFamily: "'Nunito Sans', sans-serif" }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: bg, padding: "5rem 2rem" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
          <div style={{ color: gold, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, fontFamily: "'Nunito Sans', sans-serif" }}>✦ Guest Stories</div>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: dark ? "#f0ede6" : navy, marginBottom: 48 }}>What Our <span style={{ color: gold }}>Guests</span> Say</h2>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={{ display: i === activeTestimonial ? "block" : "none", background: surface, borderRadius: 12, padding: "2.5rem", border: `1px solid ${border}`, maxWidth: 680, margin: "0 auto" }}>
              <div style={{ fontSize: 28, color: gold, marginBottom: 16 }}>{"★".repeat(t.stars)}</div>
              <p style={{ fontSize: "1.2rem", lineHeight: 1.8, color: text, marginBottom: 24, fontStyle: "italic" }}>"{t.text}"</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: `linear-gradient(135deg, ${gold}, #e8c547)`, display: "flex", alignItems: "center", justifyContent: "center", color: navy, fontWeight: 700, fontSize: 14 }}>{t.avatar}</div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: text }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: textMuted, fontFamily: "'Nunito Sans', sans-serif" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 24 }}>
            {TESTIMONIALS.map((_, i) => (
              <div key={i} onClick={() => setActiveTestimonial(i)} style={{ width: i === activeTestimonial ? 28 : 8, height: 8, borderRadius: 4, background: i === activeTestimonial ? gold : border, cursor: "pointer", transition: "all 0.3s" }} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
