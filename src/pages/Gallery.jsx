import { useState, useEffect } from "react";
import { GOLD, NAVY, GALLERY_ITEMS } from "../data/constants";

const FILTERS = ["All", "Green Tourmaline", "Great Hornbill"];

export default function Gallery({ dark }) {
  const bg = dark ? "#0a0f1e" : "#faf9f6";
  const text = dark ? "#f0ede6" : "#1a1410";
  const textMuted = dark ? "#9ca3af" : "#6b7280";
  const border = dark ? "#2d3748" : "#e8e3d8";

  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const filtered = filter === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter(g => g.property === filter);

  useEffect(() => {
    const handleKey = (e) => {
      if (lightbox === null) return;
      if (e.key === "ArrowRight") setLightbox(i => (i + 1) % filtered.length);
      if (e.key === "ArrowLeft") setLightbox(i => (i - 1 + filtered.length) % filtered.length);
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox, filtered.length]);

  return (
    <div style={{ background: bg, color: text, fontFamily: "'Cormorant Garamond', Georgia, serif", paddingTop: 68, minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: dark ? "#0d1628" : NAVY, padding: "4rem 1.5rem 3rem", textAlign: "center" }}>
        <div style={{ color: GOLD, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10, fontFamily: "'Nunito Sans', sans-serif" }}>✦ Photo Gallery</div>
        <h1 style={{ color: "#fff", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, marginBottom: 12 }}>Explore Our <span style={{ color: GOLD }}>Spaces</span></h1>
        <p style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Nunito Sans', sans-serif", fontSize: 15, maxWidth: 480, margin: "0 auto" }}>Browse photos from both properties and imagine yourself at home.</p>
      </div>

      {/* Filter Tabs */}
      <div style={{ padding: "2rem 1.5rem 0", display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: "9px 22px", borderRadius: 24, border: `1px solid ${filter === f ? GOLD : border}`,
            background: filter === f ? GOLD : "transparent",
            color: filter === f ? NAVY : textMuted,
            fontSize: 13, fontWeight: filter === f ? 700 : 400,
            cursor: "pointer", fontFamily: "'Nunito Sans', sans-serif",
            transition: "all 0.2s", letterSpacing: "0.04em",
          }}>{f}</button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1.5rem 4rem" }}>
        <div style={{ columns: "clamp(200px, 30vw, 320px)", columnGap: 14 }}>
          {filtered.map((item, i) => (
            <div key={i} onClick={() => setLightbox(i)} style={{ breakInside: "avoid", marginBottom: 14, borderRadius: 10, overflow: "hidden", cursor: "pointer", position: "relative", display: "block" }}
              onMouseEnter={e => { e.currentTarget.querySelector("img").style.transform = "scale(1.05)"; e.currentTarget.querySelector(".lbl").style.opacity = "1"; }}
              onMouseLeave={e => { e.currentTarget.querySelector("img").style.transform = "scale(1)"; e.currentTarget.querySelector(".lbl").style.opacity = "0"; }}>
              <img src={item.url} alt={item.label} style={{ width: "100%", display: "block", transition: "transform 0.4s", borderRadius: 10 }} loading="lazy" />
              <div className="lbl" style={{ position: "absolute", inset: 0, background: "rgba(13,31,60,0.55)", opacity: 0, transition: "opacity 0.3s", display: "flex", alignItems: "flex-end", padding: "12px 14px", borderRadius: 10 }}>
                <div>
                  <div style={{ color: "#fff", fontSize: 13, fontWeight: 600, fontFamily: "'Nunito Sans', sans-serif" }}>{item.label.split("· ")[1]}</div>
                  <div style={{ color: GOLD, fontSize: 10, letterSpacing: "0.1em", fontFamily: "'Nunito Sans', sans-serif" }}>{item.property}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.94)", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setLightbox(null)}>
          <button style={{ position: "absolute", top: 18, right: 20, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", width: 40, height: 40, borderRadius: "50%", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setLightbox(null)}>✕</button>
          <button style={{ position: "absolute", left: 14, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", width: 44, height: 44, borderRadius: "50%", fontSize: 22, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            onClick={e => { e.stopPropagation(); setLightbox((lightbox - 1 + filtered.length) % filtered.length); }}>‹</button>
          <div onClick={e => e.stopPropagation()} style={{ textAlign: "center", padding: "0 64px", width: "100%" }}>
            <img src={filtered[lightbox].url} alt="" style={{ maxWidth: "90vw", maxHeight: "80vh", borderRadius: 10, objectFit: "contain", display: "block", margin: "0 auto" }} />
            <div style={{ marginTop: 14 }}>
              <div style={{ color: "#fff", fontSize: 15, fontFamily: "'Nunito Sans', sans-serif", fontWeight: 600 }}>{filtered[lightbox].label.split("· ")[1]}</div>
              <div style={{ color: GOLD, fontSize: 11, letterSpacing: "0.1em", fontFamily: "'Nunito Sans', sans-serif", marginTop: 4 }}>{filtered[lightbox].property}</div>
            </div>
          </div>
          <button style={{ position: "absolute", right: 14, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", width: 44, height: 44, borderRadius: "50%", fontSize: 22, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            onClick={e => { e.stopPropagation(); setLightbox((lightbox + 1) % filtered.length); }}>›</button>
          <div style={{ position: "absolute", bottom: 18, color: "rgba(255,255,255,0.4)", fontSize: 12, fontFamily: "'Nunito Sans', sans-serif" }}>{lightbox + 1} / {filtered.length} · Use arrow keys to navigate</div>
        </div>
      )}
    </div>
  );
}
