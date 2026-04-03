import { useState, useEffect, useRef } from 'react';
import {
  Phone,
  MapPin,
  Clock,
  Star,
  Scissors,
  ChevronDown,
  Menu,
  X,
  Facebook,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
} from 'lucide-react';
import useScrollReveal from './hooks/useScrollReveal';
import useSEO from './hooks/useSEO';
import ShareButtons from './components/ShareButtons';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

/* ── Placeholder images (swap with real photos) ── */
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1920&q=80';
const ABOUT_IMAGE =
  'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80';
const SHOP_IMAGE =
  'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80';

/* ── Services data ── */
const SERVICES = [
  {
    name: "Men's Haircut",
    desc: 'Classic cuts, fades, tapers, and modern styles — tailored to your look.',
    icon: Scissors,
    price: '$',
  },
  {
    name: 'Beard Trim',
    desc: 'Precision beard shaping, lineup, and grooming to keep it clean.',
    icon: Scissors,
    price: '$',
  },
  {
    name: 'Head Shave',
    desc: 'Smooth, clean head shave with hot lather and a straight razor finish.',
    icon: Scissors,
    price: '$',
  },
  {
    name: 'Hot Towel Shave',
    desc: 'The classic barbershop experience — hot towel, lather, straight razor.',
    icon: Scissors,
    price: '$',
  },
  {
    name: "Kids' Haircut",
    desc: 'Patient, friendly cuts for the younger generation. All ages welcome.',
    icon: Scissors,
    price: '$',
  },
];

/* ── Reviews data ── */
const REVIEWS = [
  {
    text: "Best barber in Sumter, hands down. Kisha always gets the cut right. I've been coming here for years and never been disappointed.",
    author: 'Marcus T.',
    rating: 5,
  },
  {
    text: "Love the atmosphere — feels like a real, old-school barbershop. Clean shop, great conversation, and the best fade I've ever had.",
    author: 'James W.',
    rating: 5,
  },
  {
    text: 'My sons and I all go to Law Range. Kisha is great with kids and my boys actually look forward to getting their hair cut.',
    author: 'Darnell R.',
    rating: 5,
  },
  {
    text: 'Walk-in friendly in the mornings, which is perfect for my schedule. Never have to wait too long and the cuts are always on point.',
    author: 'Chris B.',
    rating: 5,
  },
  {
    text: 'Professional, consistent, and always a great experience. Kisha takes pride in every single cut. Highly recommend.',
    author: 'Anthony L.',
    rating: 5,
  },
  {
    text: "Downtown location is super convenient. I work nearby and pop in on my lunch break for a trim. Can't beat it.",
    author: 'Kevin D.',
    rating: 4,
  },
];

export default function App() {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reviewsRef = useRef<HTMLDivElement>(null);

  useScrollReveal();

  useSEO({
    title:
      currentRoute === 'contact'
        ? 'Contact | Law Range Barber Shop | (803) 773-4812'
        : 'Law Range Barber Shop | Classic Cuts in Downtown Sumter, SC | (803) 773-4812',
    description:
      currentRoute === 'contact'
        ? 'Contact Law Range Barber Shop in downtown Sumter, SC. Call (803) 773-4812 for appointments or walk in mornings. 5 E Canal St, Sumter, SC 29150.'
        : 'Law Range Barber Shop — classic cuts and timeless style in downtown Sumter, SC. Walk-ins welcome mornings, appointments available afternoons. 4.8 stars.',
    canonical:
      currentRoute === 'contact'
        ? 'https://lawrangebarbershop.com/contact'
        : 'https://lawrangebarbershop.com',
  });

  useEffect(() => {
    const handleRoute = () => {
      const path = window.location.pathname.replace(/\/$/, '') || '/';
      if (path === '/') setCurrentRoute('home');
      else if (path === '/contact') setCurrentRoute('contact');
      else setCurrentRoute('404');
    };

    handleRoute();
    window.addEventListener('popstate', handleRoute);
    return () => window.removeEventListener('popstate', handleRoute);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    if (currentRoute !== 'home') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const scrollReviews = (dir: 'left' | 'right') => {
    if (!reviewsRef.current) return;
    const amount = dir === 'left' ? -320 : 320;
    reviewsRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  if (currentRoute === '404') return <NotFound navigate={navigate} />;

  if (currentRoute === 'contact')
    return (
      <>
        <Header
          scrolled={scrolled}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          navigate={navigate}
          scrollToSection={scrollToSection}
        />
        <Contact navigate={navigate} />
        <Footer navigate={navigate} scrollToSection={scrollToSection} />
      </>
    );

  return (
    <div className="bg-cream text-charcoal">
      {/* ── HEADER ── */}
      <Header
        scrolled={scrolled}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        navigate={navigate}
        scrollToSection={scrollToSection}
      />

      {/* ── HERO ── */}
      <section id="hero" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Law Range Barber Shop"
            className="ken-burns w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-charcoal/80" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto hero-enter">
          <div className="floating-badge inline-flex items-center gap-2 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full px-4 py-2 mb-6">
            <Star className="w-4 h-4 text-gold fill-gold" />
            <span className="text-gold text-sm font-medium">4.8 Stars on Google</span>
          </div>

          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Classic Cuts.
            <br />
            <span className="text-gold">Timeless Style.</span>
          </h1>

          <p className="text-white/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto font-body">
            Downtown Sumter's neighborhood barbershop. Walk-ins welcome mornings,
            appointments available afternoons.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href="tel:+18037734812"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-charcoal font-semibold px-8 py-4 rounded-full transition-all hover:shadow-glow-gold text-lg"
            >
              <Phone className="w-5 h-5" />
              (803) 773-4812
            </a>
            <button
              onClick={() => scrollToSection('services')}
              className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-gold text-white hover:text-gold px-8 py-4 rounded-full transition-all"
            >
              View Services
            </button>
          </div>

          <div className="flex items-center justify-center gap-6 text-white/70 text-sm">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Users className="w-4 h-4" />
              Walk-ins 8:30–12
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Calendar className="w-4 h-4" />
              Appts 1–5:30
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <button
            onClick={() => scrollToSection('about')}
            className="text-white/60 hover:text-gold transition-colors"
            aria-label="Scroll down"
          >
            <ChevronDown className="w-8 h-8 scroll-indicator" />
          </button>
        </div>
      </section>

      {/* Barber pole stripe divider */}
      <div className="barber-stripe" />

      {/* ── ABOUT ── */}
      <section id="about" className="py-20 md:py-28 bg-cream">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="scroll-reveal-left">
              <div className="relative">
                <img
                  src={ABOUT_IMAGE}
                  alt="Kisha O'Neal at Law Range Barber Shop"
                  className="rounded-2xl shadow-card w-full object-cover aspect-[4/5]"
                />
                <div className="absolute -bottom-4 -right-4 bg-gold text-charcoal font-bold px-6 py-3 rounded-xl shadow-lg font-heading text-lg">
                  Owner-Operated
                </div>
              </div>
            </div>

            <div className="scroll-reveal-right">
              <div className="accent-line">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-6">
                  Your Barber, <span className="text-gold-dark">Kisha O'Neal</span>
                </h2>
              </div>
              <p className="text-warm-gray text-lg leading-relaxed mb-6">
                Law Range Barber Shop is a classic, owner-operated barbershop in the heart of
                downtown Sumter. Kisha O'Neal brings years of experience and a genuine passion
                for the craft to every cut.
              </p>
              <p className="text-warm-gray text-lg leading-relaxed mb-6">
                Located at 5 E Canal St — right next to the old courthouse — Law Range is where
                the community comes for clean cuts, good conversation, and that timeless
                barbershop experience.
              </p>
              <p className="text-warm-gray text-lg leading-relaxed mb-8">
                Whether you're a regular or a first-timer, walk-ins are always welcome in the
                mornings. For afternoon visits, just call ahead to book your spot.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="tel:+18037734812"
                  className="inline-flex items-center gap-2 bg-charcoal hover:bg-charcoal/90 text-cream font-semibold px-6 py-3 rounded-full transition-all"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
                <button
                  onClick={() => navigate('/contact')}
                  className="inline-flex items-center gap-2 border-2 border-charcoal hover:border-gold hover:text-gold-dark font-semibold px-6 py-3 rounded-full transition-all"
                >
                  <MapPin className="w-4 h-4" />
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── SERVICES ── */}
      <section id="services" className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16 scroll-reveal">
            <div className="accent-line-center">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-4">
                Services & <span className="text-gold-dark">Pricing</span>
              </h2>
            </div>
            <p className="text-warm-gray text-lg max-w-2xl mx-auto">
              From classic cuts to hot towel shaves — every service is performed with care
              and attention to detail.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {SERVICES.map((s) => (
              <div
                key={s.name}
                className="card-lift bg-cream rounded-2xl p-8 border border-charcoal/5 hover:border-gold/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                  <s.icon className="w-6 h-6 text-gold-dark" />
                </div>
                <h3 className="font-heading text-xl font-bold text-charcoal mb-2">{s.name}</h3>
                <p className="text-warm-gray leading-relaxed mb-4">{s.desc}</p>
                <span className="text-gold-dark font-semibold text-sm">Call for pricing</span>
              </div>
            ))}

            {/* CTA card */}
            <div className="card-lift bg-charcoal rounded-2xl p-8 flex flex-col justify-center items-center text-center">
              <Phone className="w-10 h-10 text-gold mb-4" />
              <h3 className="font-heading text-xl font-bold text-cream mb-2">Book Your Cut</h3>
              <p className="text-cream/70 mb-6">
                Call to schedule an afternoon appointment or walk in before noon.
              </p>
              <a
                href="tel:+18037734812"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-charcoal font-semibold px-6 py-3 rounded-full transition-all"
              >
                <Phone className="w-4 h-4" />
                (803) 773-4812
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── WALK-IN vs APPOINTMENT ── */}
      <section id="schedule" className="py-20 md:py-28 bg-cream">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16 scroll-reveal">
            <div className="accent-line-center">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-4">
                Walk-in <span className="text-barber-red">or</span> Appointment
              </h2>
            </div>
            <p className="text-warm-gray text-lg max-w-2xl mx-auto">
              We make it easy — no app needed, no hassle. Just show up or call ahead.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 scroll-reveal">
            {/* Walk-in */}
            <div className="bg-white rounded-2xl p-8 md:p-10 border-2 border-gold/20 hover:border-gold/40 transition-colors card-lift">
              <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-gold-dark" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-charcoal mb-4">
                Walk-Ins Welcome
              </h3>
              <div className="text-3xl font-bold text-gold-dark mb-2 font-heading">
                8:30 AM – 12:00 PM
              </div>
              <p className="text-warm-gray text-sm mb-6">Monday – Friday</p>
              <ul className="space-y-3 text-warm-gray">
                <li className="flex items-start gap-3">
                  <Star className="w-4 h-4 text-gold mt-1 flex-shrink-0 fill-gold" />
                  First come, first served
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-4 h-4 text-gold mt-1 flex-shrink-0 fill-gold" />
                  No need to call ahead
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-4 h-4 text-gold mt-1 flex-shrink-0 fill-gold" />
                  Great for quick cuts and trims
                </li>
              </ul>
            </div>

            {/* Appointment */}
            <div className="bg-charcoal rounded-2xl p-8 md:p-10 card-lift">
              <div className="w-14 h-14 rounded-2xl bg-gold/20 flex items-center justify-center mb-6">
                <Calendar className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-cream mb-4">
                By Appointment
              </h3>
              <div className="text-3xl font-bold text-gold mb-2 font-heading">
                1:00 PM – 5:30 PM
              </div>
              <p className="text-cream/60 text-sm mb-6">Monday – Friday</p>
              <ul className="space-y-3 text-cream/80">
                <li className="flex items-start gap-3">
                  <Star className="w-4 h-4 text-gold mt-1 flex-shrink-0 fill-gold" />
                  Guaranteed time slot
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-4 h-4 text-gold mt-1 flex-shrink-0 fill-gold" />
                  No wait when you arrive
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-4 h-4 text-gold mt-1 flex-shrink-0 fill-gold" />
                  Call (803) 773-4812 to book
                </li>
              </ul>
              <a
                href="tel:+18037734812"
                className="mt-8 inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-charcoal font-semibold px-6 py-3 rounded-full transition-all w-full justify-center"
              >
                <Phone className="w-4 h-4" />
                Book Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── REVIEWS ── */}
      <section id="reviews" className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 scroll-reveal">
            <div className="accent-line-center">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-4">
                What Our <span className="text-gold-dark">Customers Say</span>
              </h2>
            </div>
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${i < 5 ? 'text-gold fill-gold' : 'text-charcoal/20'}`}
                />
              ))}
              <span className="text-charcoal font-bold text-lg ml-2">4.8</span>
              <span className="text-warm-gray">/ 5 on Google</span>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => scrollReviews('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-charcoal text-cream flex items-center justify-center shadow-lg hover:bg-gold hover:text-charcoal transition-colors hidden md:flex"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div
              ref={reviewsRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 scroll-reveal"
            >
              {REVIEWS.map((r, i) => (
                <div
                  key={i}
                  className="min-w-[300px] max-w-[340px] flex-shrink-0 snap-start bg-cream rounded-2xl p-6 border border-charcoal/5"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(r.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-gold fill-gold" />
                    ))}
                  </div>
                  <p className="text-warm-gray leading-relaxed mb-4 italic">"{r.text}"</p>
                  <p className="text-charcoal font-semibold">{r.author}</p>
                  <p className="text-warm-gray/60 text-sm">Google Review</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollReviews('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-charcoal text-cream flex items-center justify-center shadow-lg hover:bg-gold hover:text-charcoal transition-colors hidden md:flex"
              aria-label="Next reviews"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── LOCATION & HOURS ── */}
      <section id="location" className="py-20 md:py-28 bg-cream">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16 scroll-reveal">
            <div className="accent-line-center">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-4">
                Find Us in <span className="text-gold-dark">Downtown Sumter</span>
              </h2>
            </div>
            <p className="text-warm-gray text-lg">
              Right next to the old courthouse on E Canal St.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Map */}
            <div className="scroll-reveal-left rounded-2xl overflow-hidden shadow-card h-[400px]">
              <iframe
                title="Law Range Barber Shop Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3341.5!2d-80.3415!3d33.9204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s5+E+Canal+St%2C+Sumter%2C+SC+29150!5e0!3m2!1sen!2sus!4v1"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            {/* Info */}
            <div className="scroll-reveal-right space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-charcoal/5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-gold-dark" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-charcoal mb-1">Address</h3>
                    <p className="text-warm-gray">5 E Canal St</p>
                    <p className="text-warm-gray">Sumter, SC 29150</p>
                    <p className="text-warm-gray/60 text-sm mt-1">Next to the old courthouse</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-charcoal/5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-gold-dark" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-charcoal mb-1">Hours</h3>
                    <div className="space-y-1 text-warm-gray">
                      <p>
                        <span className="font-medium text-charcoal">Mon – Fri</span>{' '}
                        8:30 AM – 5:30 PM
                      </p>
                      <p className="text-sm text-warm-gray/60">
                        Walk-ins: 8:30 AM – 12:00 PM
                      </p>
                      <p className="text-sm text-warm-gray/60">
                        Appointments: 1:00 PM – 5:30 PM
                      </p>
                    </div>
                    <div className="mt-2 space-y-1 text-warm-gray">
                      <p>
                        <span className="font-medium text-charcoal">Sat – Sun</span>{' '}
                        <span className="text-barber-red">Closed</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-charcoal/5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-gold-dark" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-charcoal mb-1">Contact</h3>
                    <a
                      href="tel:+18037734812"
                      className="text-gold-dark hover:text-gold font-semibold text-lg transition-colors"
                    >
                      (803) 773-4812
                    </a>
                  </div>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=5+E+Canal+St,+Sumter,+SC+29150"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-charcoal hover:bg-charcoal/90 text-cream font-semibold px-6 py-3 rounded-full transition-all w-full justify-center"
              >
                <MapPin className="w-4 h-4" />
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SHOP IMAGE SECTION ── */}
      <section className="relative h-[40vh] overflow-hidden">
        <img
          src={SHOP_IMAGE}
          alt="Inside Law Range Barber Shop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/60 flex items-center justify-center">
          <div className="text-center hero-enter">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-cream mb-4">
              Ready for a Fresh Cut?
            </h2>
            <a
              href="tel:+18037734812"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-charcoal font-semibold px-8 py-4 rounded-full transition-all hover:shadow-glow-gold text-lg"
            >
              <Phone className="w-5 h-5" />
              Call (803) 773-4812
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer navigate={navigate} scrollToSection={scrollToSection} />
    </div>
  );
}

/* ══════════════════════════════════════════════
   HEADER COMPONENT
   ══════════════════════════════════════════════ */
function Header({
  scrolled,
  menuOpen,
  setMenuOpen,
  navigate,
  scrollToSection,
}: {
  scrolled: boolean;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  navigate: (path: string) => void;
  scrollToSection: (id: string) => void;
}) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-charcoal/95 backdrop-blur-md shadow-lg'
          : 'bg-charcoal/70 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center">
            <Scissors className="w-5 h-5 text-charcoal" />
          </div>
          <div>
            <span className="font-heading text-lg font-bold text-cream group-hover:text-gold transition-colors leading-none block">
              Law Range
            </span>
            <span className="text-cream/60 text-xs leading-none block">Barber Shop</span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {[
            { label: 'About', id: 'about' },
            { label: 'Services', id: 'services' },
            { label: 'Schedule', id: 'schedule' },
            { label: 'Reviews', id: 'reviews' },
            { label: 'Location', id: 'location' },
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="nav-link text-cream/80 hover:text-gold text-sm font-medium transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => navigate('/contact')}
            className="nav-link text-cream/80 hover:text-gold text-sm font-medium transition-colors"
          >
            Contact
          </button>
        </nav>

        {/* CTA + Mobile menu */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+18037734812"
            className="hidden sm:inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-charcoal font-semibold px-5 py-2.5 rounded-full text-sm transition-all"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-cream p-2"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-charcoal/95 backdrop-blur-md border-t border-cream/10 px-4 py-4 space-y-1">
          {[
            { label: 'About', id: 'about' },
            { label: 'Services', id: 'services' },
            { label: 'Schedule', id: 'schedule' },
            { label: 'Reviews', id: 'reviews' },
            { label: 'Location', id: 'location' },
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="block w-full text-left text-cream/80 hover:text-gold py-3 px-4 rounded-lg hover:bg-cream/5 transition-colors font-medium"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => navigate('/contact')}
            className="block w-full text-left text-cream/80 hover:text-gold py-3 px-4 rounded-lg hover:bg-cream/5 transition-colors font-medium"
          >
            Contact
          </button>
          <a
            href="tel:+18037734812"
            className="flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-charcoal font-semibold py-3 rounded-full mt-4 transition-all"
          >
            <Phone className="w-4 h-4" />
            (803) 773-4812
          </a>
        </div>
      </div>
    </header>
  );
}

/* ══════════════════════════════════════════════
   FOOTER COMPONENT
   ══════════════════════════════════════════════ */
function Footer({
  navigate,
  scrollToSection,
}: {
  navigate: (path: string) => void;
  scrollToSection: (id: string) => void;
}) {
  return (
    <footer className="bg-charcoal text-cream">
      <div className="barber-stripe" />
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center">
                <Scissors className="w-5 h-5 text-charcoal" />
              </div>
              <div>
                <span className="font-heading text-lg font-bold text-cream leading-none block">
                  Law Range
                </span>
                <span className="text-cream/60 text-xs leading-none block">Barber Shop</span>
              </div>
            </div>
            <p className="text-cream/60 text-sm leading-relaxed mb-4">
              Classic cuts and timeless style in downtown Sumter, SC.
            </p>
            <ShareButtons />
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-gold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'About', id: 'about' },
                { label: 'Services', id: 'services' },
                { label: 'Schedule', id: 'schedule' },
                { label: 'Reviews', id: 'reviews' },
                { label: 'Location', id: 'location' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-cream/60 hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => navigate('/contact')}
                  className="text-cream/60 hover:text-gold transition-colors text-sm"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-heading font-bold text-gold mb-4">Hours</h4>
            <div className="space-y-2 text-cream/60 text-sm">
              <p>
                <span className="text-cream">Mon – Fri</span>
                <br />
                8:30 AM – 5:30 PM
              </p>
              <p className="text-xs">Walk-ins: 8:30 AM – 12 PM</p>
              <p className="text-xs">Appointments: 1 – 5:30 PM</p>
              <p className="mt-3">
                <span className="text-cream">Sat – Sun</span>
                <br />
                Closed
              </p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-gold mb-4">Contact</h4>
            <div className="space-y-3 text-cream/60 text-sm">
              <a
                href="tel:+18037734812"
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <Phone className="w-4 h-4 text-gold" />
                (803) 773-4812
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold mt-0.5" />
                <span>
                  5 E Canal St
                  <br />
                  Sumter, SC 29150
                </span>
              </div>
              <a
                href="https://www.facebook.com/lawrange/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <Facebook className="w-4 h-4 text-gold" />
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-cream/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-cream/40 text-sm">
            &copy; {new Date().getFullYear()} Law Range Barber Shop. All rights reserved.
          </p>
          <p className="text-cream/30 text-xs">
            5 E Canal St, Sumter, SC 29150 &middot; (803) 773-4812
          </p>
        </div>
      </div>
    </footer>
  );
}
