import { useState, useEffect } from 'react';
import { HERO_IMAGES } from '../data/properties';

const GOLD = '#c9a227';
const NAVY = '#0d1f3c';

export default function Hero({ formData, setFormData, onSearch }) {
  const [heroImg, setHeroImg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setHeroImg((i) => (i + 1) % HERO_IMAGES.length), 5000);
    return () => clearInterval(interval);
  }, []);

  const scroll = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" style={{ position: 'relative', height: '100vh', minHeight: 'clamp(600px, 120vh, 900px)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', paddingTop: 'clamp(68px, 10vh, 100px)' }}>
      {/* Background images */}
      {HERO_IMAGES.map((img, i) => (
        <div key={i} style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: i === heroImg ? 1 : 0,
          transition: 'opacity 1.2s ease',
        }} />
      ))}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(13,31,60,0.7) 60%, rgba(13,31,60,0.9) 100%)' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: 'clamp(1rem, 6vw, 2rem) clamp(1rem, 8vw, 1.5rem)', maxWidth: 820, margin: '0 auto', paddingTop: 'clamp(2rem, 8vh, 4rem)', paddingBottom: 'clamp(2rem, 8vh, 4rem)' }}>
        <div style={{ display: 'inline-block', padding: '6px 18px', marginBottom: 'clamp(1.5rem, 4vw, 2rem)', border: `1px solid ${GOLD}`, borderRadius: 20, color: GOLD, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: "'Nunito Sans', sans-serif" }}>
          ✦ Karibu · Welcome
        </div>

        <h1 style={{ color: '#fff', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}>
          Feel At <span style={{ color: GOLD }}>Home.</span><br />
          Stay In <span style={{ color: GOLD }}>Thika.</span>
        </h1>

        <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', lineHeight: 1.7, marginBottom: 'clamp(2rem, 5vw, 3rem)', fontFamily: "'Nunito Sans', sans-serif", fontWeight: 300 }}>
          Luxury curated stays designed for comfort, convenience,<br />and unforgettable experiences in the heart of Kenya.
        </p>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
          <button onClick={() => scroll('contact')} style={{ padding: '14px 32px', borderRadius: 4, border: 'none', background: `linear-gradient(135deg, ${GOLD}, #e8c547)`, color: NAVY, fontSize: 14, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'Nunito Sans', sans-serif", cursor: 'pointer', transition: 'transform 0.2s', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onMouseEnter={e => (e.target.style.transform = 'translateY(-2px)')}
            onMouseLeave={e => (e.target.style.transform = 'none')}>
            Book Your Stay
          </button>
          <button onClick={() => scroll('properties')} style={{ padding: '14px 32px', borderRadius: 4, cursor: 'pointer', background: 'transparent', border: '2px solid rgba(255,255,255,0.6)', color: '#fff', fontSize: 14, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'Nunito Sans', sans-serif", transition: 'all 0.2s', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
            Explore Homes
          </button>
        </div>

        {/* Search bar */}
        <div style={{ marginTop: 'clamp(2rem, 5vw, 3rem)', background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 8, padding: 'clamp(1.25rem, 4vw, 1.5rem)', display: 'flex', flexWrap: 'wrap', gap: 'clamp(1rem, 3vw, 1.5rem)' }}>
          {[
            { label: 'Check-in', type: 'date', key: 'checkin' },
            { label: 'Check-out', type: 'date', key: 'checkout' },
          ].map((f) => (
            <div key={f.key} style={{ flex: '1 1 140px', minWidth: 120, paddingBottom: '0.5rem' }}>
              <label style={{ display: 'block', color: GOLD, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8, fontFamily: "'Nunito Sans', sans-serif", fontWeight: 600 }}>{f.label}</label>
              <input type={f.type} style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '2px solid rgba(255,255,255,0.4)', color: '#fff', fontSize: 14, padding: '8px 0', outline: 'none', fontFamily: "'Nunito Sans', sans-serif", minHeight: '36px', transition: 'border-color 0.2s' }}
                onFocus={e => (e.target.style.borderColor = GOLD)}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.4)')}
                value={formData[f.key]} onChange={e => setFormData({ ...formData, [f.key]: e.target.value })} />
            </div>
          ))}
          <div style={{ flex: '1 1 140px', minWidth: 120, paddingBottom: '0.5rem' }}>
            <label style={{ display: 'block', color: GOLD, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8, fontFamily: "'Nunito Sans', sans-serif", fontWeight: 600 }}>Guests</label>
            <select style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '2px solid rgba(255,255,255,0.4)', color: '#fff', fontSize: 14, padding: '8px 0', outline: 'none', fontFamily: "'Nunito Sans', sans-serif", minHeight: '36px', transition: 'border-color 0.2s', cursor: 'pointer' }}
              onFocus={e => (e.target.style.borderColor = GOLD)}
              onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.4)')}
              value={formData.guests} onChange={e => setFormData({ ...formData, guests: e.target.value })}>
              {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>)}
            </select>
          </div>
          <div style={{ flex: '1 1 140px', minWidth: 120, paddingBottom: '0.5rem' }}>
            <label style={{ display: 'block', color: GOLD, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8, fontFamily: "'Nunito Sans', sans-serif", fontWeight: 600 }}>Property</label>
            <select style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '2px solid rgba(255,255,255,0.4)', color: '#fff', fontSize: 14, padding: '8px 0', outline: 'none', fontFamily: "'Nunito Sans', sans-serif", minHeight: '36px', transition: 'border-color 0.2s', cursor: 'pointer' }}
              onFocus={e => (e.target.style.borderColor = GOLD)}
              onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.4)')}
              value={formData.property} onChange={e => setFormData({ ...formData, property: e.target.value })}>
              <option value="">Any Property</option>
              <option value="Great Hornbill Thika">Great Hornbill Thika</option>
              <option value="Green Tourmaline Thika">Green Tourmaline Thika</option>
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button onClick={() => scroll('contact')} style={{ padding: '12px 24px', borderRadius: 4, border: 'none', background: `linear-gradient(135deg, ${GOLD}, #e8c547)`, color: NAVY, fontSize: 13, fontWeight: 700, fontFamily: "'Nunito Sans', sans-serif", cursor: 'pointer', whiteSpace: 'nowrap', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              Check Availability
            </button>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div style={{ position: 'absolute', bottom: 'clamp(1.5rem, 4vw, 2rem)', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 3 }}>
        {HERO_IMAGES.map((_, i) => (
          <div key={i} onClick={() => setHeroImg(i)} style={{ width: i === heroImg ? 28 : 8, height: 8, borderRadius: 4, background: i === heroImg ? GOLD : 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'all 0.3s' }} />
        ))}
      </div>
    </section>
  );
}
