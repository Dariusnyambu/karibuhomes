import { useState, useEffect } from "react";
import { GOLD, NAVY, PROPERTIES } from "../data/constants";
import { supabase } from "../supabaseClient";

export default function Contact({ dark, onNavigate }) {

  const bg = dark ? "#0a0f1e" : "#faf9f6";
  const surface = dark ? "#111827" : "#fff";
  const surfaceAlt = dark ? "#1a2438" : "#f8f5ef";
  const text = dark ? "#f0ede6" : "#1a1410";
  const textMuted = dark ? "#9ca3af" : "#6b7280";
  const border = dark ? "#2d3748" : "#e8e3d8";

  const [done, setDone] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    property: "",
    guests: "2",
    checkin: "",
    checkout: "",
    message: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);

    try {
      const saved = sessionStorage.getItem("booking");

      if (saved) {
        const data = JSON.parse(saved);

        setForm(f => ({
          ...f,
          checkin: data.checkIn || "",
          checkout: data.checkOut || "",
          guests: data.guests || "2",
          property: data.property || ""
        }));

        sessionStorage.removeItem("booking");
      }

    } catch (e) {}
  }, []);

  const validate = () => {

    const e = {};

    if (!form.name.trim())
      e.name = "Name is required";

    if (
      !form.email.trim() ||
      !/\S+@\S+\.\S+/.test(form.email)
    )
      e.email = "Valid email required";

    if (!form.phone.trim())
      e.phone = "Phone / WhatsApp is required";

    if (!form.checkin)
      e.checkin = "Check-in date required";

    if (!form.checkout)
      e.checkout = "Check-out date required";

    if (
      form.checkin &&
      form.checkout &&
      form.checkout <= form.checkin
    )
      e.checkout = "Check-out must be after check-in";

    return e;
  };

  const nights =
    form.checkin && form.checkout
      ? Math.max(
          0,
          Math.round(
            (new Date(form.checkout) - new Date(form.checkin)) /
              86400000
          )
        )
      : 0;

  const selectedProp = PROPERTIES.find(
    p => p.name === form.property
  );

  const total =
    nights && selectedProp
      ? nights * selectedProp.price
      : null;

  async function handleBooking() {

    const e = validate();

    setErrors(e);

    if (Object.keys(e).length > 0) return;

    try {
      // Find property from local PROPERTIES array
      const propertyObj = PROPERTIES.find(p => p.name === form.property);
      
      if (!propertyObj) {
        alert("❌ Selected property not found");
        return;
      }

      console.log("Submitting booking:", {
        property_name: form.property,
        property_id: propertyObj.id,
        guest_name: form.name,
        email: form.email,
        phone: form.phone,
        check_in: form.checkin,
        check_out: form.checkout,
        guests: Number(form.guests),
        total_amount: total || 0
      });

      // INSERT BOOKING to Supabase
      const { data, error } = await supabase
        .from("bookings")
        .insert([
          {
            property_id: propertyObj.id,
            guest_name: form.name,
            email: form.email,
            phone: form.phone,
            check_in: form.checkin,
            check_out: form.checkout,
            guests: Number(form.guests),
            total_amount: total || 0,
            property_name: form.property,
            message: form.message || ""
          }
        ]);

      if (error) {
        console.error("Booking Error:", error);
        alert(`❌ Booking failed: ${error.message}`);
      } else {
        console.log("✅ Booking submitted:", data);
        setDone(true);
        alert("✅ Booking submitted successfully!");
        setTimeout(() => onNavigate("Home"), 2000);
      }
    } catch (err) {
      console.error("Catch Error:", err);
      alert("❌ An error occurred. Please try WhatsApp instead.");
    }
  }

  if (done) {
    return (
      <div style={{ background: bg, color: text, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 68 }}>
        <div style={{ textAlign: "center", padding: "3rem", maxWidth: 500 }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>✅</div>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1rem", color: GOLD }}>Booking Submitted!</h2>
          <p style={{ color: textMuted, fontSize: "1rem", marginBottom: "2rem" }}>Thank you for your booking. We'll contact you shortly to confirm.</p>
          <button onClick={() => onNavigate("Home")} style={{ background: `linear-gradient(135deg, ${GOLD}, #e8c547)`, color: NAVY, border: "none", padding: "12px 24px", borderRadius: 6, fontSize: "1rem", fontWeight: 700, cursor: "pointer" }}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: bg, color: text, fontFamily: "'Cormorant Garamond', Georgia, serif", paddingTop: 68 }}>
      {/* Page Header */}
      <div style={{ background: dark ? "#0d1628" : NAVY, padding: "4rem 1.5rem 3rem", textAlign: "center" }}>
        <div style={{ color: GOLD, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10, fontFamily: "'Nunito Sans', sans-serif" }}>✦ Get In Touch</div>
        <h1 style={{ color: "#fff", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, marginBottom: 12 }}>Book Your <span style={{ color: GOLD }}>Stay</span></h1>
        <p style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Nunito Sans', sans-serif", fontSize: 15, maxWidth: 520, margin: "0 auto" }}>Fill in your details below and we'll confirm your reservation</p>
      </div>

      {/* Contact Form */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "4rem 1.5rem" }}>
        <div style={{ background: surface, borderRadius: 16, padding: "3rem", border: `1px solid ${border}`, boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 24 }}>
            {/* Name */}
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: textMuted, marginBottom: 8, fontFamily: "'Nunito Sans', sans-serif" }}>Full Name *</label>
              <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" style={{ width: "100%", padding: "12px", borderRadius: 6, border: `1px solid ${errors.name ? "#dc2626" : border}`, background: dark ? "#1a2438" : "#f8f5ef", color: text, fontFamily: "'Nunito Sans', sans-serif", fontSize: 14 }} />
              {errors.name && <div style={{ color: "#dc2626", fontSize: 12, marginTop: 4 }}>{errors.name}</div>}
            </div>

            {/* Email */}
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: textMuted, marginBottom: 8, fontFamily: "'Nunito Sans', sans-serif" }}>Email *</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" style={{ width: "100%", padding: "12px", borderRadius: 6, border: `1px solid ${errors.email ? "#dc2626" : border}`, background: dark ? "#1a2438" : "#f8f5ef", color: text, fontFamily: "'Nunito Sans', sans-serif", fontSize: 14 }} />
              {errors.email && <div style={{ color: "#dc2626", fontSize: 12, marginTop: 4 }}>{errors.email}</div>}
            </div>

            {/* Phone */}
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: textMuted, marginBottom: 8, fontFamily: "'Nunito Sans', sans-serif" }}>Phone / WhatsApp *</label>
              <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+254 7XX XXX XXX" style={{ width: "100%", padding: "12px", borderRadius: 6, border: `1px solid ${errors.phone ? "#dc2626" : border}`, background: dark ? "#1a2438" : "#f8f5ef", color: text, fontFamily: "'Nunito Sans', sans-serif", fontSize: 14 }} />
              {errors.phone && <div style={{ color: "#dc2626", fontSize: 12, marginTop: 4 }}>{errors.phone}</div>}
            </div>
          </div>

          {/* Property Selection */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: textMuted, marginBottom: 8, fontFamily: "'Nunito Sans', sans-serif" }}>Select Property</label>
            <select value={form.property} onChange={e => setForm({ ...form, property: e.target.value })} style={{ width: "100%", padding: "12px", borderRadius: 6, border: `1px solid ${border}`, background: dark ? "#1a2438" : "#f8f5ef", color: text, fontFamily: "'Nunito Sans', sans-serif", fontSize: 14, cursor: "pointer" }}>
              <option value="">-- Choose a property --</option>
              {PROPERTIES.map(p => <option key={p.id} value={p.name}>{p.name} (${p.price}/night)</option>)}
            </select>
          </div>

          {/* Dates */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24, marginBottom: 24 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: textMuted, marginBottom: 8, fontFamily: "'Nunito Sans', sans-serif" }}>Check-in Date *</label>
              <input type="date" value={form.checkin} onChange={e => setForm({ ...form, checkin: e.target.value })} style={{ width: "100%", padding: "12px", borderRadius: 6, border: `1px solid ${errors.checkin ? "#dc2626" : border}`, background: dark ? "#1a2438" : "#f8f5ef", color: text, fontFamily: "'Nunito Sans', sans-serif", fontSize: 14 }} />
              {errors.checkin && <div style={{ color: "#dc2626", fontSize: 12, marginTop: 4 }}>{errors.checkin}</div>}
            </div>

            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: textMuted, marginBottom: 8, fontFamily: "'Nunito Sans', sans-serif" }}>Check-out Date *</label>
              <input type="date" value={form.checkout} onChange={e => setForm({ ...form, checkout: e.target.value })} style={{ width: "100%", padding: "12px", borderRadius: 6, border: `1px solid ${errors.checkout ? "#dc2626" : border}`, background: dark ? "#1a2438" : "#f8f5ef", color: text, fontFamily: "'Nunito Sans', sans-serif", fontSize: 14 }} />
              {errors.checkout && <div style={{ color: "#dc2626", fontSize: 12, marginTop: 4 }}>{errors.checkout}</div>}
            </div>

            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: textMuted, marginBottom: 8, fontFamily: "'Nunito Sans', sans-serif" }}>Guests</label>
              <select value={form.guests} onChange={e => setForm({ ...form, guests: e.target.value })} style={{ width: "100%", padding: "12px", borderRadius: 6, border: `1px solid ${border}`, background: dark ? "#1a2438" : "#f8f5ef", color: text, fontFamily: "'Nunito Sans', sans-serif", fontSize: 14, cursor: "pointer" }}>
                {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n} Guest{n !== 1 ? "s" : ""}</option>)}
              </select>
            </div>
          </div>

          {/* Message */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: textMuted, marginBottom: 8, fontFamily: "'Nunito Sans', sans-serif" }}>Special Requests</label>
            <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Any special requests or notes..." style={{ width: "100%", padding: "12px", borderRadius: 6, border: `1px solid ${border}`, background: dark ? "#1a2438" : "#f8f5ef", color: text, fontFamily: "'Nunito Sans', sans-serif", fontSize: 14, minHeight: 100, resize: "vertical" }} />
          </div>

          {/* Quote */}
          {nights > 0 && selectedProp && (
            <div style={{ background: dark ? "rgba(201,162,39,0.1)" : "rgba(201,162,39,0.05)", border: `1px solid ${GOLD}30`, borderRadius: 8, padding: 16, marginBottom: 24 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, textAlign: "center" }}>
                <div>
                  <div style={{ fontSize: 12, color: textMuted, fontFamily: "'Nunito Sans', sans-serif" }}>Nights</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700, color: GOLD }}>{nights}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: textMuted, fontFamily: "'Nunito Sans', sans-serif" }}>Price/Night</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700, color: GOLD }}>${selectedProp.price}</div>
                </div>
                <div style={{ gridColumn: "1 / -1", borderTop: `1px solid ${GOLD}30`, paddingTop: 12 }}>
                  <div style={{ fontSize: 12, color: textMuted, fontFamily: "'Nunito Sans', sans-serif" }}>Total Amount</div>
                  <div style={{ fontSize: "2rem", fontWeight: 700, color: GOLD }}>${total}</div>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button onClick={handleBooking} style={{ width: "100%", background: `linear-gradient(135deg, ${GOLD}, #e8c547)`, color: NAVY, border: "none", padding: "16px 24px", borderRadius: 6, fontSize: "1rem", fontWeight: 700, cursor: "pointer", fontFamily: "'Nunito Sans', sans-serif", letterSpacing: "0.06em", textTransform: "uppercase", transition: "transform 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "none"}
          >
            📅 Complete Booking
          </button>
        </div>

        {/* WhatsApp Alternative */}
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <p style={{ color: textMuted, fontFamily: "'Nunito Sans', sans-serif", marginBottom: 12 }}>Or book directly via WhatsApp</p>
          <a href="https://wa.me/254723329598?text=Hello!%20I'd%20like%20to%20book%20a%20stay%20at%20Karibu%20Diaspora%20Homes." target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#25d366", color: "#fff", padding: "12px 24px", borderRadius: 6, fontWeight: 700, textDecoration: "none", fontFamily: "'Nunito Sans', sans-serif", fontSize: 14, transition: "transform 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            💬 Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}