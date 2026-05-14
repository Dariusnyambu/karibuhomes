import { useState, useEffect } from "react";
import { GOLD, NAVY } from "../data/constants";

const PAGES = ["Home", "Properties", "Gallery", "About", "Contact"];

export default function Navbar({ currentPage, onNavigate, dark, setDark }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on page change
  useEffect(() => { setMenuOpen(false); }, [currentPage]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("menu-open");
    } else {
      document.body.style.overflow = "unset";
      document.body.classList.remove("menu-open");
    }
    return () => { 
      document.body.style.overflow = "unset";
      document.body.classList.remove("menu-open");
    };
  }, [menuOpen]);

  const navBg = scrolled || menuOpen
    ? (dark ? "rgba(5,11,24,0.98)" : "rgba(13,31,60,0.98)")
    : "transparent";

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: navBg,
        backdropFilter: scrolled || menuOpen ? "blur(14px)" : "none",
        borderBottom: scrolled || menuOpen ? `1px solid ${GOLD}33` : "none",
        transition: "all 0.4s ease",
        padding: "0 1.5rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 68,
      }}>
        {/* Logo */}
        <div onClick={() => onNavigate("Home")} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", flexShrink: 0 }}>
          <div style={{
            width: 40, height: 40, borderRadius: "50%",
            background: `linear-gradient(135deg, ${GOLD}, #e8c547)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 17, fontWeight: 700, color: NAVY,
          }}>K</div>
          <div style={{ lineHeight: 1.2, display: "flex", flexDirection: "column", gap: 0 }}>
            <div style={{ color: "#fff", fontSize: 15, fontWeight: 600, letterSpacing: "0.02em" }}>Karibu Diaspora</div>
            <div style={{ color: GOLD, fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "'Nunito Sans', sans-serif" }}>Homes · Thika, Kenya</div>
          </div>
        </div>

        {/* Desktop Links */}
        <ul style={{ display: "flex", gap: "1.8rem", listStyle: "none", margin: 0, padding: 0 }} className="nav-desktop">
          {PAGES.map(p => (
            <li key={p}>
              <span onClick={() => onNavigate(p)} style={{
                color: currentPage === p ? GOLD : "rgba(255,255,255,0.85)",
                fontSize: 13, letterSpacing: "0.07em", textTransform: "uppercase",
                cursor: "pointer", fontFamily: "'Nunito Sans', sans-serif",
                fontWeight: currentPage === p ? 700 : 400,
                borderBottom: currentPage === p ? `2px solid ${GOLD}` : "2px solid transparent",
                paddingBottom: 2, transition: "all 0.2s",
              }}
                onMouseEnter={e => e.target.style.color = GOLD}
                onMouseLeave={e => e.target.style.color = currentPage === p ? GOLD : "rgba(255,255,255,0.85)"}
              >{p}</span>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexShrink: 0 }}>
          <button onClick={() => setDark(!dark)} style={{
            background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 20, padding: "6px 12px", color: "#fff", cursor: "pointer",
            fontSize: 12, fontFamily: "'Nunito Sans', sans-serif", whiteSpace: "nowrap",
            transition: "all 0.2s", minHeight: "44px", display: "flex", alignItems: "center", justifyContent: "center",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
          >{dark ? "☀ Light" : "🌙 Dark"}</button>

          <button onClick={() => onNavigate("Contact")} style={{
            background: `linear-gradient(135deg, ${GOLD}, #e8c547)`,
            border: "none", borderRadius: 4, padding: "9px 18px",
            color: NAVY, fontSize: 12, fontWeight: 700, cursor: "pointer",
            fontFamily: "'Nunito Sans', sans-serif", letterSpacing: "0.06em",
            textTransform: "uppercase", whiteSpace: "nowrap", minHeight: "44px", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "transform 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "none"}
          >Book Now</button>

          {/* Hamburger Menu Button */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="hamburger"
            style={{
              background: "transparent", 
              border: "none",
              color: "#fff", 
              cursor: "pointer",
              display: "none",
              flexDirection: "column",
              gap: 6,
              width: 44,
              height: 44,
              justifyContent: "center",
              alignItems: "center",
              padding: 8,
              transition: "transform 0.3s ease",
            }}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span style={{ width: 24, height: 2.5, background: "#fff", borderRadius: 2, transition: "all 0.3s ease", transform: menuOpen ? "rotate(45deg) translate(8px, 8px)" : "none" }} />
            <span style={{ width: 24, height: 2.5, background: "#fff", borderRadius: 2, transition: "all 0.3s ease", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ width: 24, height: 2.5, background: "#fff", borderRadius: 2, transition: "all 0.3s ease", transform: menuOpen ? "rotate(-45deg) translate(7px, -7px)" : "none" }} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div 
          style={{
            position: "fixed", 
            inset: 0, 
            zIndex: 99,
            background: dark ? "rgba(5,11,24,0.95)" : "rgba(13,31,60,0.95)",
            display: "flex", 
            flexDirection: "column", 
            alignItems: "stretch",
            justifyContent: "flex-start", 
            paddingTop: 68,
            animation: "slideDown 0.3s ease",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
          }}
          onClick={(e) => {
            // Close menu if clicking outside the menu content
            if (e.target === e.currentTarget) setMenuOpen(false);
          }}
        >
          {/* Menu Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {PAGES.map((p, idx) => (
              <div 
                key={p} 
                onClick={() => { onNavigate(p); setMenuOpen(false); }} 
                style={{
                  color: currentPage === p ? GOLD : "#fff",
                  fontSize: "1.1rem", 
                  fontWeight: currentPage === p ? 700 : 500, 
                  cursor: "pointer",
                  padding: "16px 24px", 
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  transition: "all 0.2s",
                  backgroundColor: currentPage === p ? "rgba(201,162,39,0.08)" : "transparent",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  fontFamily: "'Nunito Sans', sans-serif",
                  animation: `slideInLeft 0.3s ease ${idx * 0.05}s both`,
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                onMouseLeave={e => e.currentTarget.style.background = currentPage === p ? "rgba(201,162,39,0.08)" : "transparent"}
              >
                {p}
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${GOLD}40, transparent)`, margin: "16px 0" }} />

          {/* Dark Mode Toggle in Menu */}
          <button 
            onClick={() => setDark(!dark)} 
            style={{
              background: "transparent", 
              border: "none",
              color: "#fff",
              padding: "16px 24px",
              textAlign: "left",
              fontSize: "1rem",
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "'Nunito Sans', sans-serif",
              transition: "all 0.2s",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              animation: `slideInLeft 0.3s ease ${PAGES.length * 0.05}s both`,
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          {/* Book Now Button */}
          <div style={{ padding: "24px", marginTop: "auto" }}>
            <button 
              onClick={() => { onNavigate("Contact"); setMenuOpen(false); }} 
              style={{
                width: "100%",
                background: `linear-gradient(135deg, ${GOLD}, #e8c547)`,
                border: "none", 
                borderRadius: 6, 
                padding: "16px 24px",
                color: NAVY, 
                fontSize: "1rem", 
                fontWeight: 700, 
                cursor: "pointer",
                fontFamily: "'Nunito Sans', sans-serif", 
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                minHeight: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.2s",
                animation: `slideInLeft 0.3s ease ${(PAGES.length + 1) * 0.05}s both`,
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "none"}
            >
              📅 Book Your Stay
            </button>
          </div>
        </div>
      )}

      {/* Add keyboard shortcut to close menu */}
      {menuOpen && (
        <div style={{ display: "none" }} onKeyDown={(e) => {
          if (e.key === "Escape") setMenuOpen(false);
        }} />
      )}
    </>
  );
}
