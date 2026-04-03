import { useState, useEffect, useRef } from 'react';
import {
  Phone,
  MapPin,
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
  Camera,
  ExternalLink,
} from 'lucide-react';
import useScrollReveal from './hooks/useScrollReveal';
import useSEO from './hooks/useSEO';
import ShareButtons from './components/ShareButtons';
import ShopStatus from './components/ShopStatus';
import BarberPoleIcon from './components/BarberPoleIcon';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

/* ── Placeholder images (swap with real photos) ── */
/* Swap these with real photos when available */
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1920&q=80'; // Classic leather barber chair, warm brick wall

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
    text: 'Best barber shop Sumter, Super clean, very polite and quick. I won\'t be going anywhere else.',
    author: 'Joshua Knestaut',
    rating: 5,
  },
  {
    text: 'Could not ask for a better Barber, super nice lady as well!',
    author: 'Curtis Goyette',
    rating: 5,
  },
  {
    text: 'The best haircut I\'ve ever had in Sumter, no doubt. Relaxed friendly atmosphere. Looking forward to all my future haircuts here.',
    author: 'Paul Rosensteel',
    rating: 5,
  },
  {
    text: 'Great haircut and conversation. Keisha is wonderful at providing customers respect and making them feel worthy of friendly conversation.',
    author: 'Bob Nerbun',
    rating: 5,
  },
  {
    text: 'She has a wonderful personality and does a fantastic job, best haircut ever!',
    author: 'Terry Beers',
    rating: 5,
  },
  {
    text: 'Excellent service and great haircut, first time customer.',
    author: 'Michael Watts',
    rating: 5,
  },
  {
    text: 'Excellent haircuts! Best in town!',
    author: 'Jason Getz',
    rating: 5,
  },
  {
    text: 'A relaxed atmosphere. Loved listening to different stories being told.',
    author: "O'Neal Miles",
    rating: 5,
  },
  {
    text: 'If you know how to ask for it, she can do it!',
    author: 'Michael Simmons',
    rating: 5,
  },
  {
    text: 'Cut my hair the way I asked. Very friendly atmosphere.',
    author: 'Randy McDaniel',
    rating: 5,
  },
  {
    text: 'Best barber in Sumter. Great cut reasonable price.',
    author: 'Lath Harris',
    rating: 5,
  },
  {
    text: 'Kisha is the best.',
    author: 'Bob Jones',
    rating: 5,
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
        : 'Law Range Barber Shop — "Look Sharp and Be Sharp!" Straight razor shaves, classic haircuts & the newest trends in downtown Sumter, SC. Walk-ins & appointments. 4.8 stars.',
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
      <section id="hero" className="relative min-h-[85vh] sm:min-h-[92vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Law Range Barber Shop"
            className="ken-burns w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/85 via-charcoal/80 to-charcoal/95" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto hero-enter">
          <div className="floating-badge inline-flex items-center gap-2 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full px-4 py-2 mb-6">
            <Star className="w-4 h-4 text-gold fill-gold" />
            <span className="text-gold text-sm font-medium">4.8 Stars on Google</span>
          </div>

          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Look Sharp.
            <br />
            <span className="text-gold">Be Sharp.</span>
          </h1>

          <p className="text-white/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto font-body">
            Straight razor shaves, classic haircuts, or the newest trend — we can do it all.
            Downtown Sumter's neighborhood barbershop.
          </p>

          <div className="flex items-center justify-center mb-8 px-4 sm:px-0">
            <button
              onClick={() => scrollToSection('services')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-charcoal font-semibold px-8 py-4 rounded-full transition-all hover:shadow-glow-gold text-base sm:text-lg"
            >
              View Services
            </button>
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
      <section id="about" className="py-12 md:py-20 lg:py-28 bg-cream">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="scroll-reveal">
              <div className="accent-line">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-6">
                  About <span className="text-gold-dark">Law Range</span>
                </h2>
              </div>
              <p className="text-warm-gray text-lg leading-relaxed">
                Owner-operated by Kisha O'Neal in the heart of downtown Sumter — right next to the old courthouse. Straight razor shaves, classic cuts, and the newest trends. Walk-ins welcome mornings, appointments afternoons. <span className="text-charcoal font-semibold italic">"Look Sharp and Be Sharp!"</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider">
        <Scissors className="w-4 h-4 text-gold flex-shrink-0" />
      </div>

      {/* ── SERVICES ── */}
      <section id="services" className="py-12 md:py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10 md:mb-16 scroll-reveal">
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

          <div className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 scroll-reveal">
            {SERVICES.map((s) => (
              <div
                key={s.name}
                className="min-w-[240px] sm:min-w-[280px] max-w-[320px] flex-shrink-0 snap-start card-lift bg-cream rounded-2xl p-6 sm:p-8 border border-charcoal/5 hover:border-gold/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                  <s.icon className="w-6 h-6 text-gold-dark" />
                </div>
                <h3 className="font-heading text-xl font-bold text-charcoal mb-2">{s.name}</h3>
                <p className="text-warm-gray leading-relaxed mb-4">{s.desc}</p>
                <span className="text-gold-dark font-semibold text-sm">Call for pricing</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider">
        <Scissors className="w-4 h-4 text-gold flex-shrink-0" />
      </div>

      {/* ── WALK-IN vs APPOINTMENT ── */}
      <section id="schedule" className="py-12 md:py-20 lg:py-28 bg-cream">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10 md:mb-16 scroll-reveal">
            <div className="accent-line-center">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-4">
                Walk-in <span className="text-barber-red">or</span> Appointment
              </h2>
            </div>
            <p className="text-warm-gray text-lg max-w-2xl mx-auto">
              We make it easy — no app needed, no hassle. Just show up or call ahead.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-8 scroll-reveal">
            {/* Walk-in */}
            <div className="bg-white rounded-2xl p-4 sm:p-8 md:p-10 border-2 border-gold/20 hover:border-gold/40 transition-colors card-lift">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl bg-gold/10 flex items-center justify-center mb-3 sm:mb-6">
                <Users className="w-5 h-5 sm:w-7 sm:h-7 text-gold-dark" />
              </div>
              <h3 className="font-heading text-base sm:text-2xl font-bold text-charcoal mb-2 sm:mb-4">
                Walk-Ins Welcome
              </h3>
              <div className="text-lg sm:text-3xl font-bold text-gold-dark mb-1 sm:mb-2 font-heading">
                8:30 AM – 12 PM
              </div>
              <p className="text-warm-gray text-xs sm:text-sm mb-3 sm:mb-6">Monday – Friday</p>
              <ul className="space-y-2 sm:space-y-3 text-warm-gray text-sm sm:text-base hidden sm:block">
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
            <div className="bg-charcoal rounded-2xl p-4 sm:p-8 md:p-10 card-lift">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl bg-gold/20 flex items-center justify-center mb-3 sm:mb-6">
                <Calendar className="w-5 h-5 sm:w-7 sm:h-7 text-gold" />
              </div>
              <h3 className="font-heading text-base sm:text-2xl font-bold text-cream mb-2 sm:mb-4">
                By Appointment
              </h3>
              <div className="text-lg sm:text-3xl font-bold text-gold mb-1 sm:mb-2 font-heading">
                1:00 – 5:30 PM
              </div>
              <p className="text-cream/60 text-xs sm:text-sm mb-3 sm:mb-6">Monday – Friday</p>
              <ul className="space-y-2 sm:space-y-3 text-cream/80 text-sm sm:text-base hidden sm:block">
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
                className="mt-4 sm:mt-8 inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-charcoal font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all w-full justify-center text-sm sm:text-base"
              >
                <Phone className="w-4 h-4" />
                Book Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider">
        <Scissors className="w-4 h-4 text-gold flex-shrink-0" />
      </div>

      {/* ── REVIEWS ── */}
      <section id="reviews" className="py-12 md:py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
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
                  className="min-w-[260px] sm:min-w-[300px] max-w-[340px] flex-shrink-0 snap-start bg-cream rounded-2xl p-5 sm:p-6 border border-charcoal/5"
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

          {/* Leave a Review CTA */}
          <div className="mt-10 md:mt-14 scroll-reveal">
            <div className="bg-charcoal rounded-2xl p-6 sm:p-8 md:p-10 text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gold/20 flex items-center justify-center mx-auto mb-4">
                <Camera className="w-6 h-6 sm:w-7 sm:h-7 text-gold" />
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-cream mb-2">
                Love Your Fresh Cut?
              </h3>
              <p className="text-cream/70 text-sm sm:text-base mb-6 max-w-md mx-auto">
                Snap a photo and leave us a Google review — it means the world to a small business like ours.
              </p>
              <a
                href="https://search.google.com/local/writereview?placeid=ChIJx7M_aJYcV4gRAAAAAAAAAAAA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-charcoal font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all hover:shadow-glow-gold text-sm sm:text-base"
              >
                <Star className="w-4 h-4 fill-current" />
                Leave a Google Review
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider">
        <Scissors className="w-4 h-4 text-gold flex-shrink-0" />
      </div>

      {/* ── LOCATION & HOURS ── */}
      <section id="location" className="py-12 md:py-20 lg:py-28 bg-cream">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10 md:mb-16 scroll-reveal">
            <div className="accent-line-center">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-charcoal mb-4">
                Find Us in <span className="text-gold-dark">Downtown Sumter</span>
              </h2>
            </div>
            <p className="text-warm-gray text-lg">
              Right next to the old courthouse on E Canal St.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {/* Map */}
            <div className="scroll-reveal rounded-2xl overflow-hidden shadow-card h-[280px] md:h-[400px]">
              <iframe
                title="Law Range Barber Shop Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3341.5!2d-80.3415!3d33.9204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s5+E+Canal+St%2C+Sumter%2C+SC+29150!5e0!3m2!1sen!2sus!4v1"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            {/* Address + Directions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 scroll-reveal">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <MapPin className="w-5 h-5 text-gold-dark flex-shrink-0" />
                <div>
                  <p className="text-charcoal font-semibold">5 E Canal St, Sumter, SC 29150</p>
                  <p className="text-warm-gray text-sm">Next to the old courthouse</p>
                </div>
              </div>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=5+E+Canal+St,+Sumter,+SC+29150"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-charcoal hover:bg-charcoal/90 text-cream font-semibold px-6 py-3 rounded-full transition-all"
              >
                <MapPin className="w-4 h-4" />
                Get Directions
              </a>
            </div>
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
      <div className={`max-w-6xl mx-auto px-4 flex items-center justify-between transition-all duration-300 ${scrolled ? 'py-1' : 'py-3'}`}>
        {/* Logo */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 group"
        >
            <BarberPoleIcon className={`transition-all duration-300 ${scrolled ? 'w-14 h-14 md:w-16 md:h-16' : 'w-20 h-20 md:w-32 md:h-32'}`} />
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
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="tel:+18037734812"
            className="sm:hidden inline-flex items-center justify-center w-10 h-10 bg-gold hover:bg-gold-dark text-charcoal rounded-full transition-all"
            aria-label="Call now"
          >
            <Phone className="w-4 h-4" />
          </a>
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
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-16">
        {/* Brand row — logo + tagline inline */}
        <div className="flex items-center gap-3 mb-6 md:mb-10">
          <BarberPoleIcon className="w-14 h-14 md:w-20 md:h-20 flex-shrink-0" />
          <p className="text-cream/60 text-sm leading-snug">
            Classic cuts and timeless style in downtown Sumter, SC.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-gold mb-3 text-sm">Quick Links</h4>
            <ul className="space-y-1.5">
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
            <h4 className="font-heading font-bold text-gold mb-3 text-sm">Hours</h4>
            <div className="mb-2">
              <ShopStatus variant="full" />
            </div>
            <div className="space-y-1 text-cream/60 text-sm">
              <p><span className="text-cream">Mon – Fri</span><br />8:30 AM – 5:30 PM</p>
              <p><span className="text-cream">Sat – Sun</span><br />Closed</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-gold mb-3 text-sm">Contact</h4>
            <div className="space-y-2 text-cream/60 text-sm">
              <a
                href="tel:+18037734812"
                className="flex items-center gap-2 hover:text-gold transition-colors"
              >
                <Phone className="w-4 h-4 text-gold" />
                (803) 773-4812
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold mt-0.5" />
                <span>5 E Canal St<br />Sumter, SC 29150</span>
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

          {/* Share */}
          <div className="col-span-2 md:col-span-2">
            <h4 className="font-heading font-bold text-gold mb-3 text-sm">Share with a Friend</h4>
            <p className="text-cream/60 text-sm mb-3">Know someone who needs a fresh cut? Spread the word.</p>
            <ShareButtons />
          </div>
        </div>

        <div className="border-t border-cream/10 mt-6 md:mt-10 pt-4 md:pt-6 text-center">
          <p className="text-cream/40 text-sm">
            &copy; {new Date().getFullYear()} Law Range Barber Shop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
