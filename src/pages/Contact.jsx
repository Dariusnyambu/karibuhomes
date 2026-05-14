import { useState, useEffect } from "react";
import { GOLD, NAVY, PROPERTIES } from "../data/constants";

export default function Contact({ dark }) {
  const bg = dark ? "#0a0f1e" : "#faf9f6";
  const surface = dark ? "#111827" : "#fff";
  const surfaceAlt = dark ? "#1a2438" : "#f8f5ef";
  const text = dark ? "#f0ede6" : "#1a1410";
  const textMuted = dark ? "#9ca3af" : "#6b7280";
  const border = dark ? "#2d3748" : "#e8e3d8";

  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", property: "", guests: "2", checkin: "", checkout: "", message: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    // Pre-fill from sessionStorage if coming from Check Availability
    try {
      const saved = sessionStorage.getItem("booking");
      if (saved) {
        const data = JSON.parse(saved);
        setForm(f => ({ ...f, checkin: data.checkIn || "", checkout: data.checkOut || "", guests: data.guests || "2", property: data.property || "" }));
        sessionStorage.removeItem("booking");
      }
    } catch (e) {}
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Phone / WhatsApp is required";
    if (!form.checkin) e.checkin = "Check-in date required";
    if (!form.checkout) e.checkout = "Check-out date required";
    if (form.checkin && form.checkout && form.checkout <= form.checkin) e.checkout = "Check-out must be after check-in";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) setDone(true);
  };

  const inputStyle = (key) => ({
    width: "100%", padding: "12px 14px", borderRadius: 6, fontSize: 14,
    border: `1.5px solid ${errors[key] ? "#ef4444" : border}`,
    background: surface, color: text,
    fontFamily: "'Nunito Sans', sans-serif", outline: "none",
    boxSizing: "border-box", transition: "border-color 0.2s",
  });

  const labelStyle = {
    display: "block", fontSize: 11, letterSpacing: "0.1em",
    textTransform: "uppercase", color: textMuted, marginBottom: 6,
    fontFamily: "'Nunito Sans', sans-serif",
  };

  const nights = form.checkin && form.checkout
    ? Math.max(0, Math.round((new Date(form.checkout) - new Date(form.checkin)) / 86400000))
    : 0;
  const selectedProp = PROPERTIES.find(p => p.name === form.property);
  const total = nights && selectedProp ? nights * selectedProp.price : null;

  return (
    <div style={{ background: bg, color: text, fontFamily: "'Cormorant Garamond', Georgia, serif", paddingTop: 68 }}>
      {/* Header */}
      <div style={{ background: dark ? "#0d1628" : NAVY, padding: "4rem 1.5rem 3rem", textAlign: "center" }}>
        <div style={{ color: GOLD, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10, fontFamily: "'Nunito Sans', sans-serif" }}>✦ Reservations</div>
        <h1 style={{ color: "#fff", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, marginBottom: 12 }}>Book Your <span style={{ color: GOLD }}>Stay</span></h1>
        <p style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Nunito Sans', sans-serif", fontSize: 15, maxWidth: 480, margin: "0 auto" }}>Fill in your details and we'll confirm your booking within 2 hours.</p>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "4rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 48, alignItems: "start" }}>

          {/* Left: Contact Info */}
          <div>
            <div style={{ color: GOLD, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10, fontFamily: "'Nunito Sans', sans-serif" }}>✦ Get In Touch</div>
            <div style={{ width: 50, height: 3, background: `linear-gradient(90deg, ${GOLD}, transparent)`, marginBottom: 20, borderRadius: 2 }} />
            <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, color: dark ? "#f0ede6" : NAVY, marginBottom: 14 }}>We're Here to <span style={{ color: GOLD }}>Help</span></h2>
            <p style={{ color: textMuted, fontSize: 14, lineHeight: 1.8, fontFamily: "'Nunito Sans', sans-serif", marginBottom: 28 }}>Reach us on WhatsApp for the fastest response. We typically confirm bookings within 2 hours and are available 24/7 for our guests.</p>

            {/* WhatsApp Cards */}
            {[
              { label: "Kenya", num: "+254 723 329 598", link: "https://wa.me/254723329598", flag: "🇰🇪" },
              { label: "United Kingdom", num: "+44 7424 172 630", link: "https://wa.me/447424172630", flag: "🇬🇧" },
            ].map(w => (
              <a key={w.label} href={w.link} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px", borderRadius: 10, border: `1px solid ${border}`, background: surface, marginBottom: 12, textDecoration: "none", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#25d366"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(37,211,102,0.15)" }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.boxShadow = "none" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#25d366", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>💬</div>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: textMuted, fontFamily: "'Nunito Sans', sans-serif", marginBottom: 2 }}>{w.flag} WhatsApp {w.label}</div>
                  <div style={{ color: dark ? "#4ade80" : "#16a34a", fontWeight: 700, fontSize: 15, fontFamily: "'Nunito Sans', sans-serif" }}>{w.num}</div>
                </div>
              </a>
            ))}

            <div style={{ marginTop: 24, padding: "16px", borderRadius: 10, border: `1px solid ${border}`, background: surface }}>
              <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: textMuted, fontFamily: "'Nunito Sans', sans-serif", marginBottom: 12 }}>Other Contact</div>
              <div style={{ fontSize: 13, color: textMuted, fontFamily: "'Nunito Sans', sans-serif", lineHeight: 2 }}>
                <div>📍 Golf View Estate, Thika, Kenya</div>
                <div>✉️ info@karibudiaspora.co.ke</div>
                <div>⏰ Response within 2 hours</div>
              </div>
            </div>

            {/* Cost estimate */}
            {total !== null && (
              <div style={{ marginTop: 20, padding: "16px", borderRadius: 10, border: `1px solid ${GOLD}`, background: dark ? "#1a2438" : "#fef9ec" }}>
                <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD, fontFamily: "'Nunito Sans', sans-serif", marginBottom: 8 }}>💰 Estimated Cost</div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: textMuted, fontFamily: "'Nunito Sans', sans-serif", marginBottom: 4 }}>
                  <span>{nights} night{nights > 1 ? "s" : ""} × ${selectedProp.price}</span>
                  <span style={{ color: text, fontWeight: 700 }}>${total}</span>
                </div>
                <div style={{ fontSize: 10, color: textMuted, fontFamily: "'Nunito Sans', sans-serif" }}>Final price confirmed on booking</div>
              </div>
            )}
          </div>

          {/* Right: Form */}
          <div style={{ background: surface, borderRadius: 14, padding: "2rem", border: `1px solid ${border}`, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
            {done ? (
              <div style={{ textAlign: "center", padding: "2.5rem 0" }}>
                <div style={{ fontSize: 64, marginBottom: 18 }}>✅</div>
                <h3 style={{ fontSize: "1.6rem", fontWeight: 700, color: text, marginBottom: 10 }}>Request Sent!</h3>
                <p style={{ color: textMuted, fontFamily: "'Nunito Sans', sans-serif", lineHeight: 1.7, marginBottom: 24 }}>Thank you {form.name.split(" ")[0]}! We'll confirm your booking via WhatsApp within 2 hours. <strong style={{ color: GOLD }}>Karibu sana!</strong></p>
                <a href="https://wa.me/254723329598" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "13px 28px", borderRadius: 6, background: "#25d366", color: "#fff", fontWeight: 700, textDecoration: "none", fontFamily: "'Nunito Sans', sans-serif", fontSize: 14, marginBottom: 12 }}>💬 Chat on WhatsApp</a>
                <br />
                <button onClick={() => { setDone(false); setForm({ name: "", email: "", phone: "", property: "", guests: "2", checkin: "", checkout: "", message: "" }); }} style={{ background: "transparent", border: `1px solid ${border}`, borderRadius: 6, padding: "10px 24px", color: textMuted, cursor: "pointer", fontFamily: "'Nunito Sans', sans-serif", fontSize: 13, marginTop: 8 }}>Make Another Booking</button>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: text, marginBottom: 20 }}>Booking Details</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {/* Full Name - full width */}
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={labelStyle}>Full Name *</label>
                    <input type="text" placeholder="Jane Mwangi" style={inputStyle("name")} value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      onFocus={e => e.target.style.borderColor = GOLD}
                      onBlur={e => e.target.style.borderColor = errors.name ? "#ef4444" : border} />
                    {errors.name && <div style={{ color: "#ef4444", fontSize: 11, marginTop: 4, fontFamily: "'Nunito Sans', sans-serif" }}>{errors.name}</div>}
                  </div>

                  <div>
                    <label style={labelStyle}>Email *</label>
                    <input type="email" placeholder="jane@email.com" style={inputStyle("email")} value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      onFocus={e => e.target.style.borderColor = GOLD}
                      onBlur={e => e.target.style.borderColor = errors.email ? "#ef4444" : border} />
                    {errors.email && <div style={{ color: "#ef4444", fontSize: 11, marginTop: 4, fontFamily: "'Nunito Sans', sans-serif" }}>{errors.email}</div>}
                  </div>

                  <div>
                    <label style={labelStyle}>Phone / WhatsApp *</label>
                    <input type="tel" placeholder="+254 7XX XXX XXX" style={inputStyle("phone")} value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      onFocus={e => e.target.style.borderColor = GOLD}
                      onBlur={e => e.target.style.borderColor = errors.phone ? "#ef4444" : border} />
                    {errors.phone && <div style={{ color: "#ef4444", fontSize: 11, marginTop: 4, fontFamily: "'Nunito Sans', sans-serif" }}>{errors.phone}</div>}
                  </div>

                  <div>
                    <label style={labelStyle}>Property</label>
                    <select style={inputStyle("property")} value={form.property} onChange={e => setForm({ ...form, property: e.target.value })}
                      onFocus={e => e.target.style.borderColor = GOLD}
                      onBlur={e => e.target.style.borderColor = border}>
                      <option value="">Any / Surprise me</option>
                      {PROPERTIES.map(p => <option key={p.id} value={p.name}>{p.name} — ${p.price}/night</option>)}
                    </select>
                  </div>

                  <div>
                    <label style={labelStyle}>Guests</label>
                    <select style={inputStyle("guests")} value={form.guests} onChange={e => setForm({ ...form, guests: e.target.value })}
                      onFocus={e => e.target.style.borderColor = GOLD}
                      onBlur={e => e.target.style.borderColor = border}>
                      {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} Guest{n > 1 ? "s" : ""}</option>)}
                    </select>
                  </div>

                  <div>
                    <label style={labelStyle}>Check-in Date *</label>
                    <input type="date" style={inputStyle("checkin")} value={form.checkin}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={e => setForm({ ...form, checkin: e.target.value })}
                      onFocus={e => e.target.style.borderColor = GOLD}
                      onBlur={e => e.target.style.borderColor = errors.checkin ? "#ef4444" : border} />
                    {errors.checkin && <div style={{ color: "#ef4444", fontSize: 11, marginTop: 4, fontFamily: "'Nunito Sans', sans-serif" }}>{errors.checkin}</div>}
                  </div>

                  <div>
                    <label style={labelStyle}>Check-out Date *</label>
                    <input type="date" style={inputStyle("checkout")} value={form.checkout}
                      min={form.checkin || new Date().toISOString().split("T")[0]}
                      onChange={e => setForm({ ...form, checkout: e.target.value })}
                      onFocus={e => e.target.style.borderColor = GOLD}
                      onBlur={e => e.target.style.borderColor = errors.checkout ? "#ef4444" : border} />
                    {errors.checkout && <div style={{ color: "#ef4444", fontSize: 11, marginTop: 4, fontFamily: "'Nunito Sans', sans-serif" }}>{errors.checkout}</div>}
                  </div>

                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={labelStyle}>Message (Optional)</label>
                    <textarea rows={3} placeholder="Special requests, arrival time, questions..." style={{ ...inputStyle("message"), resize: "vertical" }} value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      onFocus={e => e.target.style.borderColor = GOLD}
                      onBlur={e => e.target.style.borderColor = border} />
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
                  <a href={`https://wa.me/254723329598?text=Hello! I'd like to book ${form.property || "a property"} from ${form.checkin || "..."} to ${form.checkout || "..."} for ${form.guests} guest(s). My name is ${form.name || "..."}.`}
                    target="_blank" rel="noopener noreferrer"
                    style={{ flex: 1, minWidth: 130, padding: "13px", borderRadius: 6, border: "2px solid #25d366", background: "transparent", color: "#25d366", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "'Nunito Sans', sans-serif", textAlign: "center", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                    💬 WhatsApp
                  </a>
                  <button onClick={handleSubmit} style={{ flex: 2, minWidth: 160, padding: "13px", borderRadius: 6, border: "none", background: `linear-gradient(135deg, ${GOLD}, #e8c547)`, color: NAVY, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "'Nunito Sans', sans-serif", letterSpacing: "0.04em" }}>
                    Reserve Now →
                  </button>
                </div>
                <p style={{ fontSize: 11, color: textMuted, fontFamily: "'Nunito Sans', sans-serif", marginTop: 12, textAlign: "center" }}>* Required fields · We confirm within 2 hours · No payment taken online</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
