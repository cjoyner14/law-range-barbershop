import { useEffect } from 'react';
import { Scissors, Home } from 'lucide-react';

interface NotFoundProps {
  navigate: (path: string) => void;
}

export default function NotFound({ navigate }: NotFoundProps) {
  useEffect(() => {
    const meta = document.querySelector('meta[name="robots"]');
    if (meta) meta.setAttribute('content', 'noindex, nofollow');
    document.title = 'Page Not Found | Law Range Barber Shop';

    return () => {
      if (meta) meta.setAttribute('content', 'index, follow');
    };
  }, []);

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6">
          <Scissors className="w-10 h-10 text-gold" />
        </div>
        <h1 className="font-heading text-6xl font-bold text-cream mb-4">404</h1>
        <p className="text-cream/70 text-lg mb-8">
          Looks like this page got a little too close to the clippers. Let's get you back
          to the shop.
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-charcoal font-semibold px-8 py-4 rounded-full transition-all hover:shadow-glow-gold"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </button>
      </div>
    </div>
  );
}
