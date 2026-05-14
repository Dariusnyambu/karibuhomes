export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/254723329598?text=Hello,%20I'd%20like%20to%20book%20a%20stay%20at%20Karibu%20Diaspora%20Homes"
      target="_blank" rel="noopener noreferrer"
      style={{ position: "fixed", bottom: 28, right: 28, zIndex: 200, background: "#25d366", borderRadius: "50%", width: 58, height: 58, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(37,211,102,0.4)", fontSize: 28, textDecoration: "none", transition: "transform 0.2s" }}
      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      title="Chat on WhatsApp"
    >💬</a>
  );
}
