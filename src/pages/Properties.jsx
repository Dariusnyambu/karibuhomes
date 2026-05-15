import { useState, useEffect } from "react";
import { GOLD, NAVY } from "../data/constants";
import { PROPERTIES as LOCAL_PROPERTIES } from "../data/properties";
import { supabase } from "../supabaseClient";

export default function Properties({ onNavigate, dark }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const bg = dark ? "#0a0f1e" : "#faf9f6";
  const surface = dark ? "#111827" : "#fff";
  const surfaceAlt = dark ? "#1a2438" : "#f8f5ef";
  const text = dark ? "#f0ede6" : "#1a1410";
  const textMuted = dark ? "#9ca3af" : "#6b7280";
  const border = dark ? "#2d3748" : "#e8e3d8";

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProperties();
  }, []);

  async function fetchProperties() {
    try {
      setLoading(true);
      console.log("Fetching properties from Supabase...");
      
      const { data, error } = await supabase
        .from("properties")
        .select("*");

      console.log("Supabase Response - Data:", data);
      console.log("Supabase Response - Error:", error);

      if (error) {
        console.warn("Supabase Error:", error);
        console.log("Using local properties data as fallback");
        setProperties(LOCAL_PROPERTIES);
      } else if (data && data.length > 0) {
        console.log("Properties loaded from Supabase:", data.length);
        setProperties(data);
      } else {
        console.warn("No properties found in Supabase. Using local data as fallback.");
        setProperties(LOCAL_PROPERTIES);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      console.log("Using local properties data as fallback");
      setProperties(LOCAL_PROPERTIES);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ background: bg, color: text, fontFamily: "'Cormorant Garamond', Georgia, serif", paddingTop: 68 }}>
      {/* Page Header */}
      <div style={{ background: dark ? "#0d1628" : NAVY, padding: "4rem 1.5rem 3rem", textAlign: "center" }}>
        <div style={{ color: GOLD, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10, fontFamily: "'Nunito Sans', sans-serif" }}>✦ Golf View Estate, Thika</div>
        <h1 style={{ color: "#fff", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, marginBottom: 12 }}>Our <span style={{ color: GOLD }}>Properties</span></h1>
        <p style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Nunito Sans', sans-serif", fontSize: 15, maxWidth: 520, margin: "0 auto" }}>Two beautifully curated luxury homes — each a sanctuary of comfort, style and convenience.</p>
      </div>

      {/* Properties */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "4rem 1.5rem" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "3rem", color: textMuted }}>
            <p>⏳ Loading properties...</p>
            <p style={{ fontSize: 12, marginTop: "0.5rem" }}>Check browser console for details</p>
          </div>
        ) : properties && properties.length > 0 ? (
          properties.map((property, pi) => {
            const prop = {
              id: property.id || pi,
              name: property.name || property.title || "Property",
              price: property.price || property.price_per_night || 0,
              longDescription: property.description || "A beautiful luxury home.",
              location: property.location || "Golf View Estate, Thika",
              bedrooms: property.bedrooms || 2,
              guests: property.guests || 4,
              images: property.images && property.images.length > 0 ? property.images : [
                "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
                "https://images.unsplash.com/photo-1494526585095-c41746248156"
              ],
              badge: property.badge || "Luxury Stay",
              beds: property.beds || ["1 King Bed", "1 Queen Bed"],
              amenities: property.amenities || ["WiFi", "Kitchen", "Parking"],
              amenityIcons: property.amenityIcons || ["📶", "🍳", "🚗"],
              checkin: property.checkin || "2 PM",
              checkout: property.checkout || "11 AM"
            };

            return (
              <PropertyDetail
                key={pi}
                prop={prop}
                pi={pi}
                onNavigate={onNavigate}
                dark={dark}
                surface={surface}
                surfaceAlt={surfaceAlt}
                text={text}
                textMuted={textMuted}
                border={border}
              />
            );
          })
        ) : (
          <div style={{ textAlign: "center", padding: "3rem", background: surface, borderRadius: 12, border: `1px solid ${border}`, color: textMuted }}>
            <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>❌ No properties found</p>
            <p style={{ fontSize: 14 }}>The database table may not exist or is empty.</p>
          </div>
        )}
      </div>

      {/* Location Section */}
      <div style={{ background: surfaceAlt, padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ color: GOLD, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10, fontFamily: "'Nunito Sans', sans-serif" }}>✦ Location</div>
            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", fontWeight: 700, color: dark ? "#f0ede6" : NAVY, marginBottom: 10 }}>Find Us in <span style={{ color: GOLD }}>Thika</span></h2>
            <p style={{ color: textMuted, fontFamily: "'Nunito Sans', sans-serif", fontSize: 14 }}>Golf View Estate · 45 minutes from Nairobi via Thika Superhighway</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28 }}>
            <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${border}` }}>
              <iframe title="Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63805.22!2d37.07!3d-1.04!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f4f9b8b8b8b8b%3A0x0!2sGolf+View+Estate%2C+Thika!5e0!3m2!1sen!2ske" width="100%" height="340" style={{ border: 0, display: "block" }} allowFullScreen loading="lazy" />
            </div>
            <div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: text, marginBottom: 16 }}>Nearby</h3>
              {[
                { icon: "🛣️", title: "Nairobi CBD", dist: "~45 min via Thika Superhighway" },
                { icon: "🌊", title: "Fourteen Falls", dist: "30 minutes" },
                { icon: "🦁", title: "Ol Donyo Sabuk Park", dist: "25 minutes" },
                { icon: "🛒", title: "Thika Greens Mall", dist: "15 minutes" },
                { icon: "🏨", title: "Blue Posts Hotel", dist: "10 minutes" },
                { icon: "✈️", title: "JKIA Airport", dist: "~1 hour" },
              ].map(item => (
                <div key={item.title} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${border}` }}>
                  <span style={{ fontSize: 20, minWidth: 28, textAlign: "center" }}>{item.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13, color: text }}>{item.title}</div>
                    <div style={{ fontSize: 11, color: textMuted, fontFamily: "'Nunito Sans', sans-serif" }}>{item.dist}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PropertyDetail({ prop, pi, onNavigate, dark, surface, surfaceAlt, text, textMuted, border }) {
  const [imgIdx, setImgIdx] = useState(0);
  
  // Ensure images is an array
  const images = Array.isArray(prop.images) && prop.images.length > 0 
    ? prop.images 
    : ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"];

  return (
    <div style={{ marginBottom: 64, background: surface, borderRadius: 16, overflow: "hidden", border: `1px solid ${border}`, boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
      {/* Image Gallery Strip */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img src={images[imgIdx]} alt={prop.name || "Property"} style={{ width: "100%", height: "clamp(240px, 45vw, 480px)", objectFit: "cover", display: "block", transition: "transform 0.5s" }} />
        <div style={{ position: "absolute", top: 16, left: 16, background: GOLD, color: NAVY, padding: "5px 14px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", fontFamily: "'Nunito Sans', sans-serif" }}>{prop.badge || "Luxury"}</div>
        <div style={{ position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 7 }}>
          {images.map((_, ii) => (
            <div key={ii} onClick={() => setImgIdx(ii)} style={{ width: ii === imgIdx ? 24 : 8, height: 8, borderRadius: 4, background: ii === imgIdx ? GOLD : "rgba(255,255,255,0.55)", cursor: "pointer", transition: "all 0.25s" }} />
          ))}
        </div>
        <div onClick={() => setImgIdx((imgIdx - 1 + images.length) % images.length)} style={{ position: "absolute", top: "50%", left: 12, transform: "translateY(-50%)", background: "rgba(0,0,0,0.45)", color: "#fff", width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 18, userSelect: "none" }}>‹</div>
        <div onClick={() => setImgIdx((imgIdx + 1) % images.length)} style={{ position: "absolute", top: "50%", right: 12, transform: "translateY(-50%)", background: "rgba(0,0,0,0.45)", color: "#fff", width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 18, userSelect: "none" }}>›</div>
      </div>

      {/* Thumbnail Strip */}
      <div style={{ display: "flex", gap: 8, padding: "10px 14px", background: dark ? "#0d1628" : "#f0ede6", overflowX: "auto" }}>
        {images.map((img, ii) => (
          <img key={ii} src={img} alt="" onClick={() => setImgIdx(ii)} style={{ width: 72, height: 52, objectFit: "cover", borderRadius: 6, cursor: "pointer", flexShrink: 0, border: ii === imgIdx ? `2px solid ${GOLD}` : "2px solid transparent", transition: "border-color 0.2s", opacity: ii === imgIdx ? 1 : 0.65 }} />
        ))}
      </div>

      {/* Info */}
      <div style={{ padding: "2rem 1.8rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 32 }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
              <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 700, color: text, margin: 0, lineHeight: 1.2 }}>{prop.name || "Property"}</h2>
              <div><span style={{ fontSize: "2rem", fontWeight: 700, color: GOLD }}>${prop.price || "0"}</span><span style={{ fontSize: 12, color: textMuted, fontFamily: "'Nunito Sans', sans-serif" }}>/night</span></div>
            </div>
            <div style={{ color: textMuted, fontSize: 13, marginBottom: 14, fontFamily: "'Nunito Sans', sans-serif" }}>📍 {prop.location || "Golf View Estate, Thika"}</div>
            <p style={{ color: textMuted, fontSize: 15, lineHeight: 1.8, marginBottom: 18, fontFamily: "'Nunito Sans', sans-serif" }}>{prop.longDescription || "A beautiful luxury home."}</p>
            <div style={{ display: "flex", gap: 20, marginBottom: 18, flexWrap: "wrap" }}>
              {[`🛏 ${prop.bedrooms || 2} Bedrooms`, `👥 Sleeps ${prop.guests || 4}`, `⏰ Check-in ${prop.checkin || "2 PM"}`, `🚪 Out ${prop.checkout || "11 AM"}`].map(t => (
                <span key={t} style={{ fontSize: 13, color: textMuted, fontFamily: "'Nunito Sans', sans-serif" }}>{t}</span>
              ))}
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: textMuted, fontFamily: "'Nunito Sans', sans-serif", marginBottom: 8 }}>Bed Configuration</div>
              {Array.isArray(prop.beds) && prop.beds.length > 0 ? (
                prop.beds.map(b => <div key={b} style={{ fontSize: 14, color: text, fontFamily: "'Nunito Sans', sans-serif", marginBottom: 4 }}>· {b}</div>)
              ) : (
                <div style={{ fontSize: 14, color: text, fontFamily: "'Nunito Sans', sans-serif", marginBottom: 4 }}>· 1 King Bed</div>
              )}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: textMuted, fontFamily: "'Nunito Sans', sans-serif", marginBottom: 12 }}>Amenities</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {Array.isArray(prop.amenities) && prop.amenities.length > 0 ? (
                prop.amenities.map((a, i) => (
                  <div key={a} style={{ display: "flex", alignItems: "center", gap: 8, background: dark ? "#1a2438" : "#f8f5ef", borderRadius: 8, padding: "10px 12px", border: `1px solid ${dark ? "#2d3748" : "#e8e3d8"}` }}>
                    <span style={{ fontSize: 18 }}>{Array.isArray(prop.amenityIcons) && prop.amenityIcons[i] ? prop.amenityIcons[i] : "✓"}</span>
                    <span style={{ fontSize: 12, color: text, fontFamily: "'Nunito Sans', sans-serif" }}>{a}</span>
                  </div>
                ))
              ) : (
                <div style={{ gridColumn: "1 / -1", color: textMuted }}>No amenities listed</div>
              )}
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              <button onClick={() => onNavigate("Gallery")} style={{ flex: 1, padding: "12px", borderRadius: 6, border: `1px solid ${GOLD}`, background: "transparent", color: dark ? GOLD : NAVY, fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "'Nunito Sans', sans-serif" }}>View Gallery</button>
              <button onClick={() => { sessionStorage.setItem("booking", JSON.stringify({ property: prop.name })); onNavigate("Contact"); }} style={{ flex: 1, padding: "12px", borderRadius: 6, border: "none", background: `linear-gradient(135deg, ${GOLD}, #e8c547)`, color: NAVY, fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "'Nunito Sans', sans-serif" }}>Book Now →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
