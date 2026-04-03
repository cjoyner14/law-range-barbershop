import { useState } from 'react';
import { Phone, MapPin, Clock, Facebook, Send, CheckCircle } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

interface ContactProps {
  navigate: (path: string) => void;
}

export default function Contact({ navigate: _navigate }: ContactProps) {
  useScrollReveal();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', phone: '', message: '' });
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  return (
    <div className="bg-cream min-h-screen pt-24">
      {/* Hero */}
      <section className="py-16 md:py-20 bg-charcoal">
        <div className="max-w-4xl mx-auto px-4 text-center hero-enter">
          <div className="accent-line-center">
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-cream mb-4">
              Get in <span className="text-gold">Touch</span>
            </h1>
          </div>
          <p className="text-cream/70 text-lg max-w-xl mx-auto">
            Walk in mornings or call to book an afternoon appointment. We're in the heart
            of downtown Sumter, right next to the old courthouse.
          </p>
        </div>
      </section>

      <div className="barber-stripe" />

      {/* Contact Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="scroll-reveal-left space-y-6">
              <h2 className="font-heading text-2xl font-bold text-charcoal mb-6 accent-line">
                Contact Information
              </h2>

              <div className="bg-white rounded-2xl p-6 border border-charcoal/5 card-lift">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-gold-dark" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-charcoal mb-1">Phone</h3>
                    <a
                      href="tel:+18037734812"
                      className="text-gold-dark hover:text-gold font-semibold text-lg transition-colors"
                    >
                      (803) 773-4812
                    </a>
                    <p className="text-warm-gray text-sm mt-1">Call to book an appointment</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-charcoal/5 card-lift">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-gold-dark" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-charcoal mb-1">Address</h3>
                    <p className="text-warm-gray">5 E Canal St</p>
                    <p className="text-warm-gray">Sumter, SC 29150</p>
                    <p className="text-warm-gray/60 text-sm mt-1">Next to the old courthouse</p>
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=5+E+Canal+St,+Sumter,+SC+29150"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold-dark hover:text-gold text-sm font-medium mt-2 inline-block transition-colors"
                    >
                      Get Directions &rarr;
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-charcoal/5 card-lift">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-gold-dark" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-charcoal mb-1">Hours</h3>
                    <div className="text-warm-gray space-y-1">
                      <p>
                        <span className="font-medium text-charcoal">Mon – Fri</span> 8:30 AM – 5:30 PM
                      </p>
                      <p className="text-sm text-warm-gray/60">Walk-ins: 8:30 AM – 12:00 PM</p>
                      <p className="text-sm text-warm-gray/60">Appointments: 1:00 – 5:30 PM</p>
                      <p className="mt-2">
                        <span className="font-medium text-charcoal">Sat – Sun</span>{' '}
                        <span className="text-barber-red">Closed</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="https://www.facebook.com/lawrange/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white rounded-2xl p-6 border border-charcoal/5 card-lift hover:border-gold/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Facebook className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-charcoal">Follow Us</h3>
                  <p className="text-warm-gray text-sm">facebook.com/lawrange</p>
                </div>
              </a>
            </div>

            {/* Contact Form + Map */}
            <div className="scroll-reveal-right space-y-8">
              <div className="bg-white rounded-2xl p-8 border border-charcoal/5">
                <h2 className="font-heading text-2xl font-bold text-charcoal mb-6 accent-line">
                  Send a Message
                </h2>

                {submitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="font-heading text-xl font-bold text-charcoal mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-warm-gray">
                      Thanks for reaching out. For immediate appointments, call{' '}
                      <a href="tel:+18037734812" className="text-gold-dark font-semibold">
                        (803) 773-4812
                      </a>
                      .
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 text-gold-dark hover:text-gold font-medium transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-charcoal mb-1"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-charcoal/10 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all bg-cream/50"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-charcoal mb-1"
                      >
                        Phone
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phone: formatPhone(e.target.value),
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-charcoal/10 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all bg-cream/50"
                        placeholder="(803) 555-0123"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-charcoal mb-1"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-charcoal/10 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all bg-cream/50 resize-none"
                        placeholder="How can we help?"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-charcoal font-semibold py-3 rounded-full transition-all hover:shadow-glow-gold"
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>
                    <p className="text-warm-gray/60 text-xs text-center">
                      For immediate appointments, call{' '}
                      <a href="tel:+18037734812" className="text-gold-dark font-semibold">
                        (803) 773-4812
                      </a>
                    </p>
                  </form>
                )}
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden shadow-card h-[300px]">
                <iframe
                  title="Law Range Barber Shop Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3341.5!2d-80.3415!3d33.9204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s5+E+Canal+St%2C+Sumter%2C+SC+29150!5e0!3m2!1sen!2sus!4v1"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
