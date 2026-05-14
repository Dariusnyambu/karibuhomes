import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { GOLD, NAVY } from "./data/constants";

export default function App() {
  const [page, setPage] = useState("Home");
  const [dark, setDark] = useState(false);

  const navigate = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pages = { Home, Properties, Gallery, About, Contact };
  const PageComponent = pages[page];

  return (
    <>
      <Navbar currentPage={page} onNavigate={navigate} dark={dark} setDark={setDark} />
      <main>
        <PageComponent onNavigate={navigate} dark={dark} />
      </main>
      <Footer onNavigate={navigate} dark={dark} />

      {/* Floating WhatsApp */}
      <a href="https://wa.me/254723329598?text=Hello!%20I'd%20like%20to%20book%20a%20stay%20at%20Karibu%20Diaspora%20Homes."
        target="_blank" rel="noopener noreferrer"
        title="Chat on WhatsApp"
        style={{ position: "fixed", bottom: 24, right: 24, zIndex: 200, background: "#25d366", borderRadius: "50%", width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(37,211,102,0.45)", fontSize: 26, textDecoration: "none", transition: "transform 0.2s" }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.12)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
        💬
      </a>

      {/* Scroll to top */}
      <ScrollTop />
    </>
  );
}

function ScrollTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  if (!show) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{ position: "fixed", bottom: 90, right: 24, zIndex: 200, background: NAVY, border: `1px solid ${GOLD}`, borderRadius: "50%", width: 42, height: 42, color: GOLD, fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.2)", transition: "transform 0.2s" }}
      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
      ↑
    </button>
  );
}
