import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "Properties", "About", "Gallery", "Contact"];

const PROPERTIES = [
  {
    id: 1,
    name: "Great Hornbill Thika",
    location: "Michuki Rd, Golf View Estate",
    bedrooms: 3,
    guests: 6,
    price: 60,
    badge: "Popular",
    beds: ["1 King size bed", "1 Double bed", "1 Double decker bed"],
    checkin: "15:00",
    checkout: "11:00",
    amenities: ["Free WiFi", "Smart TV", "Free Parking", "Full Kitchen", "Hot Shower", "Security", "Balcony", "Workspace"],
    amenityIcons: ["📶", "📺", "🚗", "🍳", "🚿", "🔒", "🌿", "💼"],
    images: [
      "/images/great-hornbill/living-room-1.avif",
      "/images/great-hornbill/master-bedroom-1.avif",
      "/images/great-hornbill/exterior.avif",
      "/images/great-hornbill/lounge-netflix.avif",
      "/images/great-hornbill/living-room-2.avif",
      "/images/great-hornbill/bedroom-2.avif",
    ],
    description: "A spacious 3-bedroom retreat nestled in the serene Golf View Estate. Featuring a stunning king-size four-poster bed, Smart TV with Netflix, modern furnishings, and all the comforts of home."
  },
  {
    id: 2,
    name: "Green Tourmaline Thika",
    location: "Bogoria Rd, Golf View Estate",
    bedrooms: 3,
    guests: 6,
    price: 70,
    badge: "Premium",
    beds: ["1 King size bed", "2 Double beds"],
    checkin: "15:00",
    checkout: "11:00",
    amenities: ["Free WiFi", "Free Parking", "Netflix", "Ensuite Bathrooms", "Kitchen", "Washing Machine", "Security", "Modern Interior"],
    amenityIcons: ["📶", "🚗", "🎬", "🛁", "🍳", "👕", "🔒", "✨"],
    images: [
      "/images/green-tourmaline/living-room-1.jpg",
      "/images/green-tourmaline/lounge-netflix.jpg",
      "/images/green-tourmaline/master-bedroom.jpg",
      "/images/green-tourmaline/kitchen-1.jpg",
      "/images/green-tourmaline/ensuite-shower.jpg",
      "/images/green-tourmaline/balcony.jpg",
    ],
    description: "All-ensuite premium living featuring LED tray ceilings, a Netflix TV lounge wall, fully-fitted kitchen with double-door fridge & oven, marble ensuite bathrooms, and a private rooftop terrace with lush garden views."
  }
];

const GALLERY = [
  { label: "GT · Living Room", url: "/images/green-tourmaline/living-room-1.jpg" },
  { label: "GT · Netflix Lounge", url: "/images/green-tourmaline/lounge-netflix.jpg" },
  { label: "GT · Master Bedroom", url: "/images/green-tourmaline/master-bedroom.jpg" },
  { label: "GT · Second Bedroom", url: "/images/green-tourmaline/bedroom-2.jpg" },
  { label: "GT · Kitchen", url: "/images/green-tourmaline/kitchen-1.jpg" },
  { label: "GT · Dining Area", url: "/images/green-tourmaline/dining.jpg" },
  { label: "GT · Ensuite Bathroom", url: "/images/green-tourmaline/ensuite-shower.jpg" },
  { label: "GT · Rooftop Terrace", url: "/images/green-tourmaline/balcony.jpg" },
  { label: "GH · Living Room", url: "/images/great-hornbill/living-room-1.avif" },
  { label: "GH · Smart TV Lounge", url: "/images/great-hornbill/lounge-netflix.avif" },
  { label: "GH · Master Bedroom", url: "/images/great-hornbill/master-bedroom-1.avif" },
  { label: "GH · Exterior & Gate", url: "/images/great-hornbill/exterior.avif" },
];

const TESTIMONIALS = [
  { name: "James Mwangi", role: "Diaspora Traveller, UK", stars: 5, text: "Coming home to Kenya felt like coming home to luxury. The attention to detail, the warm service, and the beautiful property made our family holiday unforgettable. We'll be back every year!", avatar: "JM" },
  { name: "Sarah & Tom Williams", role: "Tourists, Australia", stars: 5, text: "We stayed for 10 days exploring Thika and Central Kenya. The home was spotless, WiFi was great for work calls, and the Golf View Estate location was so peaceful. Highly recommend!", avatar: "ST" },
  { name: "Dr. Wanjiku Kamau", role: "Business Traveller, Nairobi", stars: 5, text: "The workspace setup was perfect for my extended stay. Professional, clean, secure, and the host communication was excellent. A 5-star experience at an incredible price.", avatar: "WK" },
  { name: "The Okonkwo Family", role: "Family Stay, Nigeria", stars: 5, text: "We needed space for 6 people and found exactly that — and more. The kids loved the double decker bed! Karibu Diaspora Homes truly understands African family hospitality.", avatar: "OF" },
];

const FEATURES = [
  { icon: "📍", title: "Prime Thika Location", desc: "Situated in Golf View Estate, perfectly positioned between Nairobi and Central Kenya." },
  { icon: "💎", title: "Affordable Luxury", desc: "Premium furnishings and amenities at prices that won't break the bank." },
  { icon: "⚡", title: "Fast WiFi", desc: "High-speed fibre internet perfect for remote work and streaming." },
  { icon: "👨‍👩‍👧‍👦", title: "Family Friendly", desc: "Spacious layouts, safe neighbourhoods, and beds for every family member." },
  { icon: "🔒", title: "Secure Environment", desc: "24/7 security in a gated estate for total peace of mind." },
  { icon: "🗓️", title: "Flexible Stays", desc: "Short stays, extended visits, or monthly rentals — we accommodate all." },
  { icon: "📱", title: "Easy Booking", desc: "Book instantly via WhatsApp or our simple online form." },
  { icon: "🌍", title: "Diaspora-Friendly", desc: "We understand the needs of Kenyans returning home and international guests alike." },
];

const HERO_IMAGES = [
  "/images/green-tourmaline/living-room-1.jpg",
  "/images/great-hornbill/exterior.avif",
  "/images/green-tourmaline/lounge-netflix.jpg",
  "/images/great-hornbill/living-room-1.avif",
];

export default function KaribuDiasporaHomes() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroImg, setHeroImg] = useState(0);
  const [propImg, setPropImg] = useState({ 0: 0, 1: 0 });
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", property: "", guests: "2", checkin: "", checkout: "", message: "" });
  const [counters, setCounters] = useState({ guests: 0, homes: 0, support: 0, years: 0 });
  const [countersStarted, setCountersStarted] = useState(false);
  const aboutRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [bookingDone, setBookingDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setHeroImg(i => (i + 1) % HERO_IMAGES.length), 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(i => (i + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !countersStarted) {
        setCountersStarted(true);
        const targets = { guests: 500, homes: 2, support: 24, years: 4 };
        const duration = 1800;
        const steps = 60;
        let step = 0;
        const interval = setInterval(() => {
          step++;
          const progress = step / steps;
          const ease = 1 - Math.pow(1 - progress, 3);
          setCounters({
            guests: Math.floor(ease * targets.guests),
            homes: Math.floor(ease * targets.homes),
            support: Math.floor(ease * targets.support),
            years: Math.floor(ease * targets.years),
          });
          if (step >= steps) clearInterval(interval);
        }, duration / steps);
      }
    }, { threshold: 0.3 });
    if (aboutRef.current) observer.observe(aboutRef.current);
    return () => observer.disconnect();
  }, [countersStarted]);

  const scroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navy = dark ? "#0a1628" : "#0d1f3c";
  const gold = "#c9a227";
  const bg = dark ? "#0a0f1e" : "#faf9f6";
  const surface = dark ? "#111827" : "#ffffff";
  const surfaceAlt = dark ? "#1a2438" : "#f8f5ef";
  const text = dark ? "#f0ede6" : "#1a1410";
  const textMuted = dark ? "#9ca3af" : "#6b7280";
  const border = dark ? "#2d3748" : "#e8e3d8";

  const styles = {
    root: { fontFamily: "'Cormorant Garamond', 'Georgia', serif", background: bg, color: text, minHeight: "100vh", transition: "all 0.3s ease" },
    nav: {
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? (dark ? "rgba(10,15,30,0.97)" : "rgba(13,31,60,0.97)") : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? `1px solid ${gold}33` : "none",
      transition: "all 0.4s ease", padding: "0 2rem",
      display: "flex", alignItems: "center", justifyContent: "space-between", height: 72,
    },
    logo: { display: "flex", alignItems: "center", gap: 10, cursor: "pointer" },
    logoMark: { width: 42, height: 42, borderRadius: "50%", background: `linear-gradient(135deg, ${gold}, #e8c547)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: navy, letterSpacing: "-0.5px" },
    logoText: { color: "#fff", fontSize: 17, fontWeight: 600, letterSpacing: "0.03em", lineHeight: 1.2 },
    logoSub: { color: gold, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase" },
    navLinks: { display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0 },
    navLink: { color: "rgba(255,255,255,0.85)", fontSize: 14, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", transition: "color 0.2s", fontFamily: "'Nunito Sans', sans-serif" },
    hero: { position: "relative", height: "100vh", minHeight: 600, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" },
    heroBg: { position: "absolute", inset: 0, backgroundSize: "cover", backgroundPosition: "center", transition: "opacity 1.2s ease" },
    heroOverlay: { position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(13,31,60,0.7) 60%, rgba(13,31,60,0.9) 100%)" },
    heroContent: { position: "relative", zIndex: 2, textAlign: "center", padding: "0 1.5rem", maxWidth: 800, margin: "0 auto" },
    badge: { display: "inline-block", padding: "6px 18px", marginBottom: 20, border: `1px solid ${gold}`, borderRadius: 20, color: gold, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'Nunito Sans', sans-serif" },
    h1: { color: "#fff", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: 16, letterSpacing: "-0.01em" },
    goldAccent: { color: gold },
    heroSub: { color: "rgba(255,255,255,0.82)", fontSize: "clamp(1rem, 2.5vw, 1.25rem)", lineHeight: 1.7, marginBottom: 36, fontFamily: "'Nunito Sans', sans-serif", fontWeight: 300 },
    btnRow: { display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" },
    btnPrimary: { padding: "14px 32px", borderRadius: 4, border: "none", cursor: "pointer", background: `linear-gradient(135deg, ${gold}, #e8c547)`, color: navy, fontSize: 14, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Nunito Sans', sans-serif", transition: "transform 0.2s, box-shadow 0.2s" },
    btnOutline: { padding: "14px 32px", borderRadius: 4, cursor: "pointer", background: "transparent", border: "2px solid rgba(255,255,255,0.6)", color: "#fff", fontSize: 14, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Nunito Sans', sans-serif", transition: "all 0.2s" },
    searchBar: { marginTop: 48, background: "rgba(255,255,255,0.12)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 8, padding: "1.5rem", display: "flex", flexWrap: "wrap", gap: 12 },
    searchField: { flex: "1 1 140px", minWidth: 120 },
    searchLabel: { display: "block", color: gold, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4, fontFamily: "'Nunito Sans', sans-serif" },
    searchInput: { width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.4)", color: "#fff", fontSize: 14, padding: "6px 0", outline: "none", fontFamily: "'Nunito Sans', sans-serif" },
    section: { padding: "6rem 2rem", maxWidth: 1200, margin: "0 auto" },
    sectionNarrow: { padding: "6rem 2rem", maxWidth: 960, margin: "0 auto" },
    eyebrow: { color: gold, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, fontFamily: "'Nunito Sans', sans-serif" },
    h2: { fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: text, marginBottom: 16, lineHeight: 1.2 },
    h2Light: { fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: dark ? "#f0ede6" : navy, marginBottom: 16, lineHeight: 1.2 },
    prose: { color: textMuted, fontSize: 16, lineHeight: 1.8, fontFamily: "'Nunito Sans', sans-serif", maxWidth: 580 },
    divider: { width: 60, height: 3, background: `linear-gradient(90deg, ${gold}, transparent)`, marginBottom: 24, borderRadius: 2 },
    card: { background: surface, borderRadius: 12, overflow: "hidden", border: `1px solid ${border}`, transition: "transform 0.3s, box-shadow 0.3s" },
    cardImg: { width: "100%", height: 260, objectFit: "cover", display: "block", transition: "transform 0.5s" },
    propGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 32 },
    featureGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 },
    featureCard: { background: surface, borderRadius: 10, padding: "2rem 1.5rem", border: `1px solid ${border}`, textAlign: "center", transition: "transform 0.3s, border-color 0.3s" },
    statRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 24, marginTop: 48 },
    statBox: { textAlign: "center" },
    statNum: { fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 700, color: gold, lineHeight: 1 },
    statLabel: { color: textMuted, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Nunito Sans', sans-serif", marginTop: 6 },
    testimonialCard: { background: surface, borderRadius: 12, padding: "2.5rem", border: `1px solid ${border}`, maxWidth: 680, margin: "0 auto", transition: "all 0.4s" },
    formGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 },
    input: { width: "100%", padding: "12px 16px", borderRadius: 6, fontSize: 14, border: `1px solid ${border}`, background: surface, color: text, fontFamily: "'Nunito Sans', sans-serif", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" },
    label: { display: "block", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: textMuted, marginBottom: 6, fontFamily: "'Nunito Sans', sans-serif" },
    whatsapp: { position: "fixed", bottom: 28, right: 28, zIndex: 200, background: "#25d366", borderRadius: 50, width: 58, height: 58, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(37,211,102,0.4)", cursor: "pointer", fontSize: 28, transition: "transform 0.2s", textDecoration: "none" },
    galleryGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 },
    galleryItem: { borderRadius: 8, overflow: "hidden", cursor: "pointer", position: "relative", paddingBottom: "75%", background: "#111" },
    galleryImg: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" },
    footer: { background: dark ? "#050b18" : navy, color: "rgba(255,255,255,0.75)", padding: "4rem 2rem 2rem" },
    footerGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, maxWidth: 1200, margin: "0 auto", paddingBottom: "3rem", borderBottom: "1px solid rgba(255,255,255,0.1)" },
  };

  return (
    <div style={styles.root}>
      {/* NAV */}
      <nav style={styles.nav}>
        <div style={styles.logo} onClick={() => scroll("home")}>
          <div style={styles.logoMark}>K</div>
          <div>
            <div style={styles.logoText}>Karibu Diaspora</div>
            <div style={styles.logoSub}>Homes · Thika, Kenya</div>
          </div>
        </div>
        <ul style={{ ...styles.navLinks }} className="nav-desktop">
          {NAV_LINKS.map(l => (
            <li key={l}>
              <span style={styles.navLink} onClick={() => scroll(l.toLowerCase())}
                onMouseEnter={e => e.target.style.color = gold}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.85)"}>
                {l}
              </span>
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button onClick={() => setDark(!dark)} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 20, padding: "6px 14px", color: "#fff", cursor: "pointer", fontSize: 13, fontFamily: "'Nunito Sans', sans-serif" }}>
            {dark ? "☀ Light" : "🌙 Dark"}
          </button>
          <button onClick={() => scroll("contact")} style={{ ...styles.btnPrimary, padding: "9px 22px", fontSize: 12 }}>Book Now</button>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 4, color: "#fff", padding: "6px 10px", cursor: "pointer" }} className="hamburger">☰</button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 99, background: dark ? "rgba(5,11,24,0.98)" : "rgba(13,31,60,0.98)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}>
          <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: 24, right: 24, background: "transparent", border: "none", color: "#fff", fontSize: 36, cursor: "pointer" }}>✕</button>
          {NAV_LINKS.map(l => (
            <span key={l} onClick={() => scroll(l.toLowerCase())} style={{ color: "#fff", fontSize: "1.8rem", cursor: "pointer", fontWeight: 600 }}>{l}</span>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="home" style={styles.hero}>
        {HERO_IMAGES.map((img, i) => (
          <div key={i} style={{ ...styles.heroBg, backgroundImage: `url(${img})`, opacity: i === heroImg ? 1 : 0 }} />
        ))}
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <div style={styles.badge}>✦ Karibu · Welcome</div>
          <h1 style={styles.h1}>
            Feel At <span style={styles.goldAccent}>Home.</span><br />
            Stay In <span style={styles.goldAccent}>Thika.</span>
          </h1>
          <p style={styles.heroSub}>
            Luxury curated stays designed for comfort, convenience,<br />
            and unforgettable experiences in the heart of Kenya.
          </p>
          <div style={styles.btnRow}>
            <button style={styles.btnPrimary} onClick={() => scroll("contact")}
              onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = `0 8px 24px ${gold}44` }}
              onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "none" }}>
              Book Your Stay
            </button>
            <button style={styles.btnOutline} onClick={() => scroll("properties")}
              onMouseEnter={e => { e.target.style.background = "rgba(255,255,255,0.15)" }}
              onMouseLeave={e => { e.target.style.background = "transparent" }}>
              Explore Homes
            </button>
          </div>
          <div style={styles.searchBar}>
            {[{ label: "Check-in", type: "date", key: "checkin" }, { label: "Check-out", type: "date", key: "checkout" }].map(f => (
              <div key={f.key} style={styles.searchField}>
                <label style={styles.searchLabel}>{f.label}</label>
                <input type={f.type} style={styles.searchInput} value={formData[f.key]} onChange={e => setFormData({ ...formData, [f.key]: e.target.value })} />
              </div>
            ))}
            <div style={styles.searchField}>
              <label style={styles.searchLabel}>Guests</label>
              <select style={{ ...styles.searchInput, background: "transparent" }} value={formData.guests} onChange={e => setFormData({ ...formData, guests: e.target.value })}>
                {[1,2,3,4,5,6].map(n => <option key={n} value={n} style={{ background: navy }}>{n} Guest{n>1?"s":""}</option>)}
              </select>
            </div>
            <div style={styles.searchField}>
              <label style={styles.searchLabel}>Property</label>
              <select style={{ ...styles.searchInput, background: "transparent" }} value={formData.property} onChange={e => setFormData({ ...formData, property: e.target.value })}>
                <option value="" style={{ background: navy }}>Any Property</option>
                {PROPERTIES.map(p => <option key={p.id} value={p.name} style={{ background: navy }}>{p.name}</option>)}
              </select>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <button style={{ ...styles.btnPrimary, whiteSpace: "nowrap" }} onClick={() => scroll("contact")}>Check Availability</button>
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 3 }}>
          {HERO_IMAGES.map((_, i) => (
            <div key={i} onClick={() => setHeroImg(i)} style={{ width: i === heroImg ? 28 : 8, height: 8, borderRadius: 4, background: i === heroImg ? gold : "rgba(255,255,255,0.4)", cursor: "pointer", transition: "all 0.3s" }} />
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ background: surfaceAlt }}>
        <div style={{ ...styles.section, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 64, alignItems: "center" }}>
          <div ref={aboutRef}>
            <div style={styles.eyebrow}>✦ Our Story</div>
            <div style={styles.divider} />
            <h2 style={styles.h2}>Welcome to<br />Karibu Diaspora <span style={{ color: gold }}>Homes</span></h2>
            <p style={styles.prose}>Karibu Diaspora Homes specializes in connecting travelers with thoughtfully curated Airbnb properties that feel like home, wherever your journey takes you. Located in Thika — between Nairobi and Central Kenya — our homes offer comfort, accessibility, style, and convenience for short and extended stays.</p>
            <p style={{ ...styles.prose, marginTop: 16 }}>Whether you're a Kenyan returning from the diaspora, a business traveller, or a family on holiday, we understand what matters most: feeling truly welcome.</p>
            <div style={styles.statRow}>
              {[{ num: `${counters.guests}+`, label: "Happy Guests" }, { num: counters.homes, label: "Luxury Homes" }, { num: `${counters.support}/7`, label: "Support Hours" }, { num: `${counters.years}+`, label: "Years Hosting" }].map(s => (
                <div key={s.label} style={styles.statBox}>
                  <div style={styles.statNum}>{s.num}</div>
                  <div style={styles.statLabel}>{s.label}</div>
                </div>
              ))}
            </div>
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

      {/* PROPERTIES */}
      <section id="properties">
        <div style={styles.section}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={styles.eyebrow}>✦ Our Properties</div>
            <div style={{ ...styles.divider, margin: "0 auto 24px" }} />
            <h2 style={styles.h2Light}>Featured <span style={{ color: gold }}>Homes</span></h2>
            <p style={{ ...styles.prose, margin: "0 auto", textAlign: "center" }}>Two beautifully curated residences in Golf View Estate — each one a sanctuary of comfort and style.</p>
          </div>
          <div style={styles.propGrid}>
            {PROPERTIES.map((prop, pi) => {
              const imgIdx = propImg[pi] || 0;
              return (
                <div key={prop.id} style={styles.card}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.15)" }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none" }}>
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    <img src={prop.images[imgIdx]} alt={prop.name} style={styles.cardImg} />
                    <div style={{ position: "absolute", top: 16, left: 16, background: gold, color: navy, padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", fontFamily: "'Nunito Sans', sans-serif" }}>{prop.badge}</div>
                    <div style={{ position: "absolute", bottom: 12, right: 12, display: "flex", gap: 6 }}>
                      {prop.images.map((_, ii) => (
                        <div key={ii} onClick={() => setPropImg({ ...propImg, [pi]: ii })} style={{ width: ii === imgIdx ? 20 : 7, height: 7, borderRadius: 4, background: ii === imgIdx ? gold : "rgba(255,255,255,0.6)", cursor: "pointer", transition: "all 0.25s" }} />
                      ))}
                    </div>
                    <div style={{ position: "absolute", top: "50%", left: 10, transform: "translateY(-50%)", background: "rgba(0,0,0,0.4)", border: "none", color: "#fff", width: 32, height: 32, borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}
                      onClick={() => setPropImg({ ...propImg, [pi]: (imgIdx - 1 + prop.images.length) % prop.images.length })}>‹</div>
                    <div style={{ position: "absolute", top: "50%", right: 10, transform: "translateY(-50%)", background: "rgba(0,0,0,0.4)", border: "none", color: "#fff", width: 32, height: 32, borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}
                      onClick={() => setPropImg({ ...propImg, [pi]: (imgIdx + 1) % prop.images.length })}>›</div>
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
                    <p style={{ ...styles.prose, fontSize: 14, marginBottom: 16, maxWidth: "none" }}>{prop.description}</p>
                    <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
                      {[`🛏 ${prop.bedrooms} Bedrooms`, `👥 ${prop.guests} Guests`].map(t => (
                        <span key={t} style={{ fontSize: 13, color: textMuted, fontFamily: "'Nunito Sans', sans-serif" }}>{t}</span>
                      ))}
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: textMuted, fontFamily: "'Nunito Sans', sans-serif", marginBottom: 6 }}>Beds</div>
                      {prop.beds.map(b => <div key={b} style={{ fontSize: 13, color: text, fontFamily: "'Nunito Sans', sans-serif", marginBottom: 2 }}>· {b}</div>)}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                      {prop.amenities.map((a, i) => (
                        <span key={a} style={{ background: surfaceAlt, border: `1px solid ${border}`, borderRadius: 20, padding: "4px 10px", fontSize: 12, color: textMuted, fontFamily: "'Nunito Sans', sans-serif" }}>{prop.amenityIcons[i]} {a}</span>
                      ))}
                    </div>
                    <div style={{ fontSize: 12, color: textMuted, fontFamily: "'Nunito Sans', sans-serif", borderTop: `1px solid ${border}`, paddingTop: 16, marginBottom: 14 }}>
                      ⏰ Check-in {prop.checkin} · Check-out {prop.checkout}
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <button style={{ flex: 1, padding: "11px", borderRadius: 6, border: `1px solid ${gold}`, background: "transparent", color: dark ? gold : navy, fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "'Nunito Sans', sans-serif" }}
                        onClick={() => scroll("gallery")}>View Details</button>
                      <button style={{ flex: 1, padding: "11px", borderRadius: 6, border: "none", background: `linear-gradient(135deg, ${gold}, #e8c547)`, color: navy, fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "'Nunito Sans', sans-serif" }}
                        onClick={() => { setFormData({ ...formData, property: prop.name }); scroll("contact"); }}>Book Now</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section style={{ background: dark ? "#0d1628" : navy }}>
        <div style={styles.section}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ ...styles.eyebrow, color: gold }}>✦ Why Choose Us</div>
            <div style={{ ...styles.divider, margin: "0 auto 24px" }} />
            <h2 style={{ ...styles.h2, color: "#fff" }}>The <span style={{ color: gold }}>Karibu</span> Difference</h2>
          </div>
          <div style={styles.featureGrid}>
            {FEATURES.map(f => (
              <div key={f.title} style={{ ...styles.featureCard, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = gold; e.currentTarget.style.transform = "translateY(-4px)" }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.transform = "none" }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{f.icon}</div>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 8 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, fontFamily: "'Nunito Sans', sans-serif" }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" style={{ background: surfaceAlt }}>
        <div style={styles.section}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={styles.eyebrow}>✦ Photo Gallery</div>
            <div style={{ ...styles.divider, margin: "0 auto 24px" }} />
            <h2 style={styles.h2Light}>Explore Our <span style={{ color: gold }}>Spaces</span></h2>
          </div>
          <div style={styles.galleryGrid}>
            {GALLERY.map((item, i) => (
              <div key={i} style={styles.galleryItem} onClick={() => setGalleryOpen(i)}
                onMouseEnter={e => { e.currentTarget.querySelector("img").style.transform = "scale(1.08)"; e.currentTarget.querySelector(".g-overlay").style.opacity = "1" }}
                onMouseLeave={e => { e.currentTarget.querySelector("img").style.transform = "scale(1)"; e.currentTarget.querySelector(".g-overlay").style.opacity = "0" }}>
                <img src={item.url} alt={item.label} style={styles.galleryImg} loading="lazy" />
                <div className="g-overlay" style={{ position: "absolute", inset: 0, background: "rgba(13,31,60,0.6)", opacity: 0, transition: "opacity 0.3s", display: "flex", alignItems: "flex-end", padding: 12 }}>
                  <span style={{ color: "#fff", fontSize: 13, fontFamily: "'Nunito Sans', sans-serif", fontWeight: 600 }}>{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {galleryOpen !== null && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.92)", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setGalleryOpen(null)}>
          <button style={{ position: "absolute", top: 20, right: 24, background: "transparent", border: "none", color: "#fff", fontSize: 36, cursor: "pointer" }}>✕</button>
          <button style={{ position: "absolute", left: 20, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", borderRadius: "50%", width: 48, height: 48, fontSize: 24, cursor: "pointer" }}
            onClick={e => { e.stopPropagation(); setGalleryOpen((galleryOpen - 1 + GALLERY.length) % GALLERY.length) }}>‹</button>
          <img src={GALLERY[galleryOpen].url} alt="" style={{ maxWidth: "85vw", maxHeight: "85vh", borderRadius: 8, objectFit: "contain" }} onClick={e => e.stopPropagation()} />
          <button style={{ position: "absolute", right: 20, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", borderRadius: "50%", width: 48, height: 48, fontSize: 24, cursor: "pointer" }}
            onClick={e => { e.stopPropagation(); setGalleryOpen((galleryOpen + 1) % GALLERY.length) }}>›</button>
          <div style={{ position: "absolute", bottom: 24, color: "rgba(255,255,255,0.7)", fontFamily: "'Nunito Sans', sans-serif", fontSize: 14 }}>{GALLERY[galleryOpen].label}</div>
        </div>
      )}

      {/* TESTIMONIALS */}
      <section style={{ background: bg }}>
        <div style={{ ...styles.sectionNarrow, textAlign: "center" }}>
          <div style={styles.eyebrow}>✦ Guest Stories</div>
          <div style={{ ...styles.divider, margin: "0 auto 24px" }} />
          <h2 style={styles.h2Light}>What Our <span style={{ color: gold }}>Guests</span> Say</h2>
          <div style={{ marginTop: 48 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ ...styles.testimonialCard, display: i === activeTestimonial ? "block" : "none" }}>
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
        </div>
      </section>

      {/* BOOKING */}
      <section id="contact" style={{ background: surfaceAlt }}>
        <div style={styles.section}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 64, alignItems: "start" }}>
            <div>
              <div style={styles.eyebrow}>✦ Reservations</div>
              <div style={styles.divider} />
              <h2 style={styles.h2}>Book Your <span style={{ color: gold }}>Stay</span></h2>
              <p style={styles.prose}>Ready to experience Karibu Diaspora Homes? Fill in your details and we'll confirm your booking within 2 hours.</p>
              <div style={{ marginTop: 32 }}>
                {[{ label: "WhatsApp Kenya", num: "+254 723 329 598", link: "https://wa.me/254723329598" }, { label: "WhatsApp UK", num: "+44 7424 172 630", link: "https://wa.me/447424172630" }].map(w => (
                  <div key={w.label} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#25d366", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>📱</div>
                    <div>
                      <div style={{ fontSize: 12, color: textMuted, fontFamily: "'Nunito Sans', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>{w.label}</div>
                      <a href={w.link} target="_blank" rel="noopener noreferrer" style={{ color: dark ? "#4ade80" : "#16a34a", fontWeight: 600, textDecoration: "none", fontFamily: "'Nunito Sans', sans-serif" }}>{w.num}</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: surface, borderRadius: 12, padding: "2.5rem", border: `1px solid ${border}` }}>
              {bookingDone ? (
                <div style={{ textAlign: "center", padding: "2rem 0" }}>
                  <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: text, marginBottom: 8 }}>Request Sent!</h3>
                  <p style={{ color: textMuted, fontFamily: "'Nunito Sans', sans-serif" }}>We'll confirm your booking via WhatsApp within 2 hours. Karibu sana!</p>
                  <button style={{ ...styles.btnPrimary, marginTop: 20 }} onClick={() => setBookingDone(false)}>Make Another Booking</button>
                </div>
              ) : (
                <>
                  <div style={styles.formGrid}>
                    {[{ label: "Full Name", key: "name", type: "text", placeholder: "e.g. Jane Mwangi", full: true }, { label: "Email Address", key: "email", type: "email", placeholder: "jane@email.com" }, { label: "Phone / WhatsApp", key: "phone", type: "tel", placeholder: "+254 7XX XXX XXX" }].map(f => (
                      <div key={f.key} style={f.full ? { gridColumn: "1 / -1" } : {}}>
                        <label style={styles.label}>{f.label}</label>
                        <input type={f.type} placeholder={f.placeholder} style={styles.input} value={formData[f.key]}
                          onChange={e => setFormData({ ...formData, [f.key]: e.target.value })}
                          onFocus={e => e.target.style.borderColor = gold}
                          onBlur={e => e.target.style.borderColor = border} />
                      </div>
                    ))}
                    <div>
                      <label style={styles.label}>Property</label>
                      <select style={styles.input} value={formData.property} onChange={e => setFormData({ ...formData, property: e.target.value })}>
                        <option value="">Select Property</option>
                        {PROPERTIES.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={styles.label}>Number of Guests</label>
                      <select style={styles.input} value={formData.guests} onChange={e => setFormData({ ...formData, guests: e.target.value })}>
                        {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} Guest{n>1?"s":""}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={styles.label}>Check-in Date</label>
                      <input type="date" style={styles.input} value={formData.checkin} onChange={e => setFormData({ ...formData, checkin: e.target.value })}
                        onFocus={e => e.target.style.borderColor = gold} onBlur={e => e.target.style.borderColor = border} />
                    </div>
                    <div>
                      <label style={styles.label}>Check-out Date</label>
                      <input type="date" style={styles.input} value={formData.checkout} onChange={e => setFormData({ ...formData, checkout: e.target.value })}
                        onFocus={e => e.target.style.borderColor = gold} onBlur={e => e.target.style.borderColor = border} />
                    </div>
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <label style={styles.label}>Message (Optional)</label>
                    <textarea rows={3} placeholder="Tell us about your stay requirements..." style={{ ...styles.input, resize: "vertical" }} value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      onFocus={e => e.target.style.borderColor = gold} onBlur={e => e.target.style.borderColor = border} />
                  </div>
                  <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                    <button style={{ flex: 1, padding: "13px", borderRadius: 6, border: `1px solid ${gold}`, background: "transparent", color: dark ? gold : navy, fontWeight: 600, cursor: "pointer", fontFamily: "'Nunito Sans', sans-serif", fontSize: 14 }}
                      onClick={() => scroll("properties")}>Check Availability</button>
                    <button style={{ flex: 1.5, padding: "13px", borderRadius: 6, border: "none", background: `linear-gradient(135deg, ${gold}, #e8c547)`, color: navy, fontWeight: 700, cursor: "pointer", fontFamily: "'Nunito Sans', sans-serif", fontSize: 14 }}
                      onClick={() => { if (formData.name && formData.email) setBookingDone(true) }}>Reserve Now →</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section id="location" style={{ background: bg }}>
        <div style={styles.section}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={styles.eyebrow}>✦ Location</div>
            <div style={{ ...styles.divider, margin: "0 auto 24px" }} />
            <h2 style={styles.h2Light}>Find Us in <span style={{ color: gold }}>Thika</span></h2>
            <p style={{ ...styles.prose, margin: "0 auto", textAlign: "center" }}>Golf View Estate, Thika — 45 minutes from Nairobi CBD via Thika Superhighway</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
            <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${border}` }}>
              <iframe title="Karibu Diaspora Homes Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63805.22!2d37.07!3d-1.04!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f4f9b8b8b8b8b%3A0x0!2sGolf+View+Estate%2C+Thika!5e0!3m2!1sen!2ske!4v1234567890"
                width="100%" height="380" style={{ border: 0, display: "block" }} allowFullScreen loading="lazy" />
            </div>
            <div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: text, marginBottom: 20 }}>Nearby Attractions</h3>
              {[
                { icon: "🛣️", title: "Nairobi CBD", dist: "~45 min via Thika Superhighway" },
                { icon: "🏬", title: "Thika Town Centre", dist: "5–10 minutes" },
                { icon: "🌊", title: "Fourteen Falls", dist: "30 minutes" },
                { icon: "🦁", title: "Ol Donyo Sabuk National Park", dist: "25 minutes" },
                { icon: "🏨", title: "Blue Posts Hotel", dist: "10 minutes" },
                { icon: "🛒", title: "Thika Greens Mall", dist: "15 minutes" },
                { icon: "🏥", title: "Thika Level 5 Hospital", dist: "10 minutes" },
                { icon: "✈️", title: "JKIA Airport", dist: "~1 hour" },
              ].map(item => (
                <div key={item.title} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: `1px solid ${border}` }}>
                  <span style={{ fontSize: 22, minWidth: 32, textAlign: "center" }}>{item.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: text }}>{item.title}</div>
                    <div style={{ fontSize: 12, color: textMuted, fontFamily: "'Nunito Sans', sans-serif" }}>{item.dist}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerGrid}>
          <div>
            <div style={{ ...styles.logo, marginBottom: 16 }}>
              <div style={styles.logoMark}>K</div>
              <div>
                <div style={{ ...styles.logoText, fontSize: 15 }}>Karibu Diaspora Homes</div>
                <div style={styles.logoSub}>Thika, Kenya</div>
              </div>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.8, color: "rgba(255,255,255,0.55)", fontFamily: "'Nunito Sans', sans-serif", maxWidth: 240 }}>
              Thoughtfully curated luxury short stays in Golf View Estate, Thika. Where every guest feels at home.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
              {["📘", "📸", "🎵"].map((icon, i) => (
                <div key={i} style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16, transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = gold}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}>{icon}</div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ color: gold, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16, fontFamily: "'Nunito Sans', sans-serif" }}>Quick Links</div>
            {["Home", "Properties", "About", "Gallery", "Book Now"].map(l => (
              <div key={l} style={{ marginBottom: 10 }}>
                <span onClick={() => scroll(l.toLowerCase().replace(" ", ""))} style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, cursor: "pointer", fontFamily: "'Nunito Sans', sans-serif" }}
                  onMouseEnter={e => e.target.style.color = gold}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}>{l}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ color: gold, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16, fontFamily: "'Nunito Sans', sans-serif" }}>Contact</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontFamily: "'Nunito Sans', sans-serif", lineHeight: 2.2 }}>
              <div>📍 Golf View Estate, Thika, Kenya</div>
              <div><a href="https://wa.me/254723329598" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>📱 +254 723 329 598</a></div>
              <div><a href="https://wa.me/447424172630" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>📱 +44 7424 172 630</a></div>
              <div>✉️ karibudiasporahomes@gmail.com</div>
            </div>
          </div>
          <div>
            <div style={{ color: gold, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16, fontFamily: "'Nunito Sans', sans-serif" }}>Newsletter</div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", fontFamily: "'Nunito Sans', sans-serif", marginBottom: 14, lineHeight: 1.7 }}>Stay updated on availability, new properties, and exclusive offers.</p>
            <div style={{ display: "flex", gap: 8 }}>
              <input type="email" placeholder="Your email address" style={{ flex: 1, padding: "10px 12px", borderRadius: 4, border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: 13, fontFamily: "'Nunito Sans', sans-serif", outline: "none" }} />
              <button style={{ padding: "10px 16px", background: gold, border: "none", borderRadius: 4, color: navy, fontWeight: 700, cursor: "pointer", fontSize: 13, fontFamily: "'Nunito Sans', sans-serif", whiteSpace: "nowrap" }}>Subscribe</button>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center", paddingTop: "2rem", color: "rgba(255,255,255,0.35)", fontSize: 12, fontFamily: "'Nunito Sans', sans-serif", maxWidth: 1200, margin: "0 auto" }}>
          © {new Date().getFullYear()} Karibu Diaspora Homes. All rights reserved. | Golf View Estate, Thika, Kenya
        </div>
      </footer>

      {/* WhatsApp Float */}
      <a href="https://wa.me/254723329598?text=Hello,%20I'd%20like%20to%20book%20a%20stay%20at%20Karibu%20Diaspora%20Homes" target="_blank" rel="noopener noreferrer" style={styles.whatsapp}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
        💬
      </a>
    </div>
  );
}
