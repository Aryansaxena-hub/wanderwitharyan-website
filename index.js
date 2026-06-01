import Head from 'next/head'
import { useEffect, useState, useRef } from 'react'

const DESTINATIONS = [
  { name: 'Kashmir', tag: 'Most Popular', price: '₹18,999', img: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80' },
  { name: 'Bali', tag: 'International', price: '₹34,999', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80' },
  { name: 'Ladakh', tag: 'Adventure', price: '₹22,999', img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80' },
  { name: 'Thailand', tag: 'International', price: '₹32,999', img: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80' },
  { name: 'Himachal', tag: 'Best Value', price: '₹11,999', img: 'https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?w=600&q=80' },
  { name: 'Singapore', tag: 'Luxury', price: '₹38,999', img: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80' },
]

const PACKAGES = [
  {
    dest: 'Kashmir', dur: '6 Days / 5 Nights', price: '₹18,999', badge: '⭐ Most Popular', badgeClass: 'badge-popular', featured: false,
    inc: ['Houseboat + Hotel stays', 'All transfers included', 'Dal Lake Shikara ride', 'Gulmarg Gondola ticket', 'Daily breakfast & dinner', '24/7 WhatsApp support'],
  },
  {
    dest: 'Bali', dur: '7 Days / 6 Nights', price: '₹34,999', badge: '🌏 International', badgeClass: 'badge-intl', featured: true,
    inc: ['4-star resort stays', 'Airport & all transfers', 'Tanah Lot temple visit', 'Ubud rice terraces tour', 'Daily breakfast', '24/7 WhatsApp support'],
  },
  {
    dest: 'Himachal', dur: '5 Days / 4 Nights', price: '₹11,999', badge: '💰 Best Value', badgeClass: 'badge-value', featured: false,
    inc: ['Hotel in Manali/Kasol', 'All local transfers', 'Rohtang Pass visit', 'Solang Valley trip', 'Daily breakfast', '24/7 WhatsApp support'],
  },
]

const WHY = [
  { icon: '⚡', title: '5-Min Reply', desc: 'We respond to every inquiry within 5 minutes during business hours.' },
  { icon: '📋', title: 'Free Custom Itinerary', desc: 'Get a personalised day-by-day plan crafted just for you — free.' },
  { icon: '💰', title: 'Zero Hidden Charges', desc: 'What you see is what you pay. 100% transparent pricing, always.' },
  { icon: '📞', title: '24/7 Trip Support', desc: 'Aryan is personally reachable on WhatsApp throughout your trip.' },
  { icon: '⭐', title: '200+ Happy Travellers', desc: 'Real reviews from real customers — check our Instagram.' },
]

const REVIEWS = [
  { text: '"Booked our Kashmir honeymoon through Aryan — absolutely magical. The houseboat, the gondola, the food — everything was perfect. Zero stress from start to finish!"', name: 'Rahul & Priya Sharma', trip: 'Kashmir Honeymoon · April 2025', initial: 'R' },
  { text: '"Bali was a dream! Aryan planned every detail — the temples, the rice terraces, the beach clubs. At ₹35K I genuinely couldn\'t believe the quality. Already planning Thailand next!"', name: 'Sakshi Gupta', trip: 'Bali Trip · March 2025', initial: 'S' },
  { text: '"Our college group of 12 went to Himachal — Aryan handled everything perfectly. Unbeatable deal and he was available on WhatsApp the entire trip. Highly recommend!"', name: 'Amit Verma & Group', trip: 'Himachal Group Trip · Feb 2025', initial: 'A' },
]

function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0)
  const started = useRef(false)
  useEffect(() => {
    if (started.current) return
    started.current = true
    let start = 0
    const step = target / 60
    const interval = duration / 60
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, interval)
    return () => clearInterval(timer)
  }, [target, duration])
  return count
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMsgs, setChatMsgs] = useState([{ type: 'bot', text: 'Hi there! 👋 I\'m Aryan from WanderWithAryanSaxena.\n\nWhich destination are you dreaming of?' }])
  const [showOpts, setShowOpts] = useState(true)
  const [chatInput, setChatInput] = useState('')
  const [formData, setFormData] = useState({ name: '', phone: '', dest: '', pax: '2 people', month: 'July 2026', budget: '₹15,000 – ₹25,000', notes: '' })
  const [formSent, setFormSent] = useState(false)
  const [notif, setNotif] = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef(null)
  const chatEnd = useRef(null)

  const c1 = useCounter(statsVisible ? 200 : 0)
  const c2 = useCounter(statsVisible ? 12 : 0)
  const c3 = useCounter(statsVisible ? 350 : 0)
  const c4 = useCounter(statsVisible ? 3 : 0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    // Reveal on scroll
    const revealAll = () => {
      document.querySelectorAll('.reveal').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 60) el.classList.add('visible')
      })
      if (statsRef.current && statsRef.current.getBoundingClientRect().top < window.innerHeight) setStatsVisible(true)
    }
    window.addEventListener('scroll', revealAll)
    revealAll()
    // Auto notification
    const t = setTimeout(() => { setNotif(true); setTimeout(() => setNotif(false), 5000) }, 5000)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('scroll', revealAll); clearTimeout(t) }
  }, [])

  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: 'smooth' }) }, [chatMsgs])

  const addMsg = (text, type) => setChatMsgs(m => [...m, { type, text }])

  const chatSelect = (dest) => {
    setShowOpts(false)
    addMsg(dest === 'other' ? 'Tell me about other destinations ✈️' : `I'm interested in ${dest}! 🌟`, 'user')
    const resp = {
      Kashmir: 'Perfect choice! 🏔️ Kashmir is magical!\n\nOur 6D/5N package starts at ₹18,999/person (all inclusive).\n\nHow many people will be travelling?',
      Bali: 'Excellent! 🌴 Bali is our #1 international pick!\n\nOur 7D/6N package starts at ₹34,999/person.\n\nWhich month are you thinking?',
      Ladakh: 'Amazing! ⛰️ Ladakh is breathtaking!\n\nOur 7D/6N package starts at ₹22,999/person.\n\nBest time is June–September. When are you planning?',
      Thailand: 'Great choice! 🐘 Thailand is incredible value!\n\nOur 7D/6N package starts at ₹32,999/person.\n\nHow many people in your group?',
      Himachal: 'Lovely! 🌿 Himachal is perfect for a getaway!\n\nOur 5D/4N package starts at ₹11,999/person.\n\nManali, Kasol, or Spiti?',
      other: 'No problem! We cover Kashmir, Ladakh, Himachal, Uttarakhand, Bali, Thailand, Singapore & Vietnam!\n\nWhich region interests you? 😊',
    }
    setTimeout(() => {
      addMsg(resp[dest] || resp.other, 'bot')
      setTimeout(() => addMsg('Fill the inquiry form below and I\'ll WhatsApp you a full itinerary within 30 minutes! 👇', 'bot'), 1000)
    }, 700)
  }

  const sendChat = () => {
    if (!chatInput.trim()) return
    const val = chatInput.trim()
    addMsg(val, 'user')
    setChatInput('')
    const lower = val.toLowerCase()
    setTimeout(() => {
      if (['kashmir','bali','ladakh','himachal','thailand','singapore','vietnam'].some(d => lower.includes(d))) {
        const dest = ['Kashmir','Bali','Ladakh','Himachal','Thailand','Singapore','Vietnam'].find(d => lower.includes(d.toLowerCase()))
        chatSelect(dest)
      } else if (lower.includes('price') || lower.includes('cost') || lower.includes('budget')) {
        addMsg('Our packages start at:\n🏔️ Kashmir: ₹18,999/person\n🌴 Bali: ₹34,999/person\n⛰️ Ladakh: ₹22,999/person\n🌿 Himachal: ₹11,999/person\n\nAll-inclusive, no hidden charges!', 'bot')
      } else if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) {
        addMsg('Hey! 👋 Welcome to WanderWithAryanSaxena!\n\nI\'m Aryan — which destination are you dreaming of? 😊', 'bot')
      } else {
        addMsg('Thanks for your message! 😊\n\nFor fastest response, fill our inquiry form or WhatsApp me at +91 8076966431.\n\nI\'ll send a custom itinerary within 30 minutes!', 'bot')
      }
    }, 600)
  }

  const submitForm = () => {
    if (!formData.name || !formData.phone || !formData.dest) { alert('Please fill your name, WhatsApp number and destination!'); return }
    setFormSent(true)
    setNotif(true)
    setTimeout(() => setNotif(false), 5000)
  }

  return (
    <>
      <Head>
        <title>WanderWithAryanSaxena — Affordable Luxury Travel | Delhi</title>
        <meta name="description" content="Affordable luxury travel packages from Delhi. Kashmir, Bali, Ladakh, Thailand, Himachal & more. Custom itineraries, zero hidden charges, 24/7 support." />
        <meta name="keywords" content="travel packages Delhi, Kashmir trip, Bali package, Ladakh tour, affordable travel India" />
        <meta property="og:title" content="WanderWithAryanSaxena — Affordable Luxury Travel" />
        <meta property="og:description" content="Handcrafted travel experiences from Kashmir to Bali. Starting ₹8,999." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* NAVBAR */}
      <nav className={scrolled ? 'scrolled' : ''}>
        <a href="#home" className="nav-logo">Wander<span>WithAryan</span>Saxena</a>
        <ul className="nav-links">
          {['destinations','packages','why','reviews','booking'].map(s => (
            <li key={s}><a href={`#${s}`}>{s.charAt(0).toUpperCase()+s.slice(1)}</a></li>
          ))}
        </ul>
        <button className="nav-cta" onClick={() => document.getElementById('booking').scrollIntoView({ behavior: 'smooth' })}>Get Free Quote</button>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-bg"/>
        <div className="orb orb1"/><div className="orb orb2"/><div className="orb orb3"/>
        <div className="hero-grid"/>
        <div className="hero-content">
          <div className="hero-badge">✈ Delhi's Most Trusted Travel Brand</div>
          <h1 className="hero-title">Your Dream Trip<br/><em>Starts Here</em></h1>
          <p className="hero-sub">Handcrafted travel experiences from Kashmir to Bali — affordable luxury, zero hidden charges, 24/7 personal support from Aryan.</p>
          <div className="hero-btns">
            <a className="btn-primary" href="#booking">Plan My Trip ✈️</a>
            <a className="btn-outline" href="#packages">View Packages</a>
          </div>
          <div className="hero-stats" ref={statsRef}>
            <div className="stat"><div className="stat-num">{c1}+</div><div className="stat-label">Happy Travellers</div></div>
            <div className="stat"><div className="stat-num">{c2}+</div><div className="stat-label">Destinations</div></div>
            <div className="stat"><div className="stat-num">{c3}+</div><div className="stat-label">Trips Completed</div></div>
            <div className="stat"><div className="stat-num">{c4}+</div><div className="stat-label">Years Experience</div></div>
          </div>
        </div>
        <div className="hero-scroll">SCROLL<div className="scroll-line"/></div>
      </section>

      {/* DESTINATIONS */}
      <section className="destinations" id="destinations">
        <div className="dest-header reveal">
          <div className="section-label">Explore the World</div>
          <h2 className="section-title">Trending <em>Destinations</em></h2>
          <p className="section-sub">From the snowy peaks of Kashmir to the tropical beaches of Bali — we'll take you there.</p>
        </div>
        <div className="dest-grid reveal">
          {DESTINATIONS.map((d, i) => (
            <div className="dest-card" key={i} onClick={() => document.getElementById('booking').scrollIntoView({ behavior: 'smooth' })}>
              <img className="dest-img" src={d.img} alt={d.name}/>
              <div className="dest-overlay"/>
              <div className="dest-info">
                <div className="dest-tag">{d.tag}</div>
                <div className="dest-name">{d.name}</div>
                <div className="dest-price">Starting {d.price} / person</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PACKAGES */}
      <section className="packages" id="packages">
        <div style={{ textAlign: 'center' }} className="reveal">
          <div className="section-label">Curated Experiences</div>
          <h2 className="section-title">Our Best <em>Packages</em></h2>
          <p className="section-sub" style={{ margin: '14px auto 0' }}>Transparent pricing. Everything included. No surprises.</p>
        </div>
        <div className="pkg-grid reveal">
          {PACKAGES.map((p, i) => (
            <div className={`pkg-card${p.featured ? ' featured' : ''}`} key={i}>
              {p.featured && <div className="pkg-best-deal">Best Deal</div>}
              <div className={`pkg-badge ${p.badgeClass}`} style={{ marginTop: p.featured ? '16px' : '0' }}>{p.badge}</div>
              <div className="pkg-dest">{p.dest}</div>
              <div className="pkg-dur">{p.dur}</div>
              <div className="pkg-price">{p.price} <span>/ person</span></div>
              <div className="pkg-divider"/>
              <ul className="pkg-inc">{p.inc.map((item, j) => <li key={j}>{item}</li>)}</ul>
              <button className="pkg-btn" onClick={() => { setChatOpen(true); setTimeout(() => chatSelect(p.dest), 300) }}>Book {p.dest} Trip</button>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="why" id="why">
        <div style={{ textAlign: 'center' }} className="reveal">
          <div className="section-label">Why Choose Us</div>
          <h2 className="section-title">The Aryan <em>Difference</em></h2>
        </div>
        <div className="why-grid reveal">
          {WHY.map((w, i) => (
            <div className="why-card" key={i}>
              <div className="why-icon">{w.icon}</div>
              <div className="why-title">{w.title}</div>
              <div className="why-desc">{w.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="testimonials" id="reviews">
        <div style={{ textAlign: 'center' }} className="reveal">
          <div className="section-label">Real Stories</div>
          <h2 className="section-title">What Travellers <em>Say</em></h2>
        </div>
        <div className="testi-grid reveal">
          {REVIEWS.map((r, i) => (
            <div className="testi-card" key={i}>
              <div className="testi-stars">★★★★★</div>
              <div className="testi-text">{r.text}</div>
              <div className="testi-author">
                <div className="testi-avatar">{r.initial}</div>
                <div><div className="testi-name">{r.name}</div><div className="testi-trip">{r.trip}</div></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING FORM */}
      <section className="booking" id="booking">
        <div className="booking-inner reveal">
          <div className="booking-header">
            <div className="section-label">Let's Plan Together</div>
            <h2 className="section-title">Get Your <em>Free Quote</em></h2>
            <p className="section-sub" style={{ margin: '14px auto 0', textAlign: 'center' }}>Fill this form and Aryan will personally WhatsApp you a custom itinerary within 30 minutes.</p>
          </div>
          {!formSent ? (
            <>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input className="form-input" placeholder="Your name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}/>
                </div>
                <div className="form-group">
                  <label className="form-label">WhatsApp Number</label>
                  <input className="form-input" placeholder="+91 9XXXXXXXXX" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}/>
                </div>
                <div className="form-group">
                  <label className="form-label">Destination</label>
                  <select className="form-input" value={formData.dest} onChange={e => setFormData({...formData, dest: e.target.value})}>
                    <option value="">Select destination</option>
                    {['Kashmir','Ladakh','Bali','Thailand','Singapore','Vietnam','Himachal Pradesh','Uttarakhand','Goa'].map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">No. of Travellers</label>
                  <select className="form-input" value={formData.pax} onChange={e => setFormData({...formData, pax: e.target.value})}>
                    {['1 person','2 people','3–5 people','6–10 people','11+ people'].map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Travel Month</label>
                  <select className="form-input" value={formData.month} onChange={e => setFormData({...formData, month: e.target.value})}>
                    {['June 2026','July 2026','August 2026','September 2026','October 2026','November 2026','December 2026','January 2027'].map(m => <option key={m}>{m}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Budget per Person</label>
                  <select className="form-input" value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})}>
                    {['Under ₹15,000','₹15,000 – ₹25,000','₹25,000 – ₹40,000','₹40,000 – ₹60,000','₹60,000+'].map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>
                <div className="form-group full">
                  <label className="form-label">Special Requirements</label>
                  <textarea className="form-input" rows="3" placeholder="Honeymoon, adventure, vegetarian meals, any requests..." value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} style={{ resize: 'vertical' }}/>
                </div>
              </div>
              <button className="form-submit" onClick={submitForm}>Send My Inquiry — Get Free Itinerary ✈️</button>
              <p className="form-note">🔒 Your details are safe. Aryan personally responds within 30 minutes.</p>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', marginBottom: '12px' }}>Inquiry Received, {formData.name}!</h3>
              <p style={{ color: 'var(--grey)', fontSize: '16px', lineHeight: '1.7' }}>Aryan will WhatsApp you at <strong style={{ color: 'white' }}>{formData.phone}</strong> within 30 minutes with your custom {formData.dest} itinerary. 🏔️</p>
              <a href={`https://wa.me/918076966431?text=Hi Aryan! I just filled your inquiry form. Name: ${formData.name}, Destination: ${formData.dest}, Travellers: ${formData.pax}`} target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: '24px', background: '#25D366', color: 'white', padding: '14px 32px', borderRadius: '50px', textDecoration: 'none', fontWeight: '600' }}>
                💬 Also WhatsApp Aryan Directly
              </a>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-grid">
          <div>
            <div className="footer-brand">Wander<span>WithAryan</span>Saxena</div>
            <p className="footer-desc">Delhi's most trusted travel brand. Affordable luxury experiences from Kashmir to Bali — handcrafted, transparent, unforgettable.</p>
            <div className="footer-social">
              <a className="social-btn" href="https://instagram.com/wanderwitharyan" target="_blank" rel="noreferrer" title="Instagram">📸</a>
              <a className="social-btn" href="https://wa.me/918076966431" target="_blank" rel="noreferrer" title="WhatsApp">💬</a>
              <a className="social-btn" href="#" title="YouTube">▶️</a>
            </div>
          </div>
          <div>
            <div className="footer-heading">Destinations</div>
            <ul className="footer-links">
              {['Kashmir','Ladakh','Bali','Thailand','Singapore','Vietnam'].map(d => <li key={d}><a href="#booking">{d}</a></li>)}
            </ul>
          </div>
          <div>
            <div className="footer-heading">Services</div>
            <ul className="footer-links">
              {['International Tours','Domestic Tours','Honeymoon Packages','Group Tours','Corporate Travel'].map(s => <li key={s}><a href="#booking">{s}</a></li>)}
            </ul>
          </div>
          <div>
            <div className="footer-heading">Contact</div>
            <div className="footer-contact">
              <div className="footer-contact-item"><span>📱</span><span>+91 8076966431</span></div>
              <div className="footer-contact-item"><span>📧</span><span>wanderwitharyansaxena@gmail.com</span></div>
              <div className="footer-contact-item"><span>📍</span><span>Delhi, India</span></div>
              <div className="footer-contact-item"><span>⏰</span><span>Mon–Sat, 9AM–7PM</span></div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 <span>WanderWithAryanSaxena</span>. Made with ❤️ in Delhi, India.</p>
        </div>
      </footer>

      {/* CHAT WIDGET */}
      <button className="chat-trigger" onClick={() => setChatOpen(o => !o)}>{chatOpen ? '✕' : '💬'}</button>
      <div className={`chat-window${chatOpen ? ' open' : ''}`}>
        <div className="chat-header">
          <div className="chat-avatar">🏔️</div>
          <div className="chat-header-info">
            <h4>Aryan Saxena</h4>
            <p><span className="chat-online"/>Online — replies instantly</p>
          </div>
        </div>
        <div className="chat-messages">
          {chatMsgs.map((m, i) => <div key={i} className={`chat-msg msg-${m.type}`}>{m.text}</div>)}
          {showOpts && (
            <div className="chat-options">
              {['Kashmir','Bali','Ladakh','Thailand','Himachal','other'].map(d => (
                <button key={d} className="chat-opt" onClick={() => chatSelect(d)}>
                  {d==='Kashmir'?'🏔️':d==='Bali'?'🌴':d==='Ladakh'?'⛰️':d==='Thailand'?'🐘':d==='Himachal'?'🌿':'✈️'} {d==='other'?'Other':d}
                </button>
              ))}
            </div>
          )}
          <div ref={chatEnd}/>
        </div>
        <div className="chat-input-row">
          <input className="chat-input" placeholder="Type a message..." value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && sendChat()}/>
          <button className="chat-send" onClick={sendChat}>➤</button>
        </div>
      </div>

      {/* WHATSAPP FLOAT */}
      <a className="wa-float" href="https://wa.me/918076966431" target="_blank" rel="noreferrer" title="WhatsApp Aryan">
        💬<span className="wa-label">Chat on WhatsApp</span>
      </a>

      {/* NOTIFICATION */}
      <div className="notif" style={{ position:'fixed', top:'90px', right:'28px', zIndex:300, background:'var(--dark2)', border:'1px solid rgba(230,92,0,0.4)', borderRadius:'14px', padding:'14px 18px', maxWidth:'280px', boxShadow:'0 16px 40px rgba(0,0,0,0.4)', transform: notif ? 'translateX(0)' : 'translateX(120%)', transition:'.4s', display:'flex', alignItems:'flex-start', gap:'12px' }}>
        <span style={{ fontSize:'20px' }}>🔔</span>
        <div style={{ fontSize:'13px', color:'rgba(255,255,255,0.85)', lineHeight:'1.5' }}>
          <strong style={{ color:'var(--orange)', display:'block', marginBottom:'2px' }}>New booking alert!</strong>
          {formSent ? `${formData.name}'s inquiry received! Aryan will reply soon.` : 'Rohan just booked a Kashmir trip — only 3 seats left for July!'}
        </div>
      </div>
    </>
  )
}
