import { useState } from 'react';

const siteUrl = 'https://lawrangebarbershop.com';
const shareText =
  "Check out Law Range Barber Shop — classic cuts and timeless style in downtown Sumter, SC. Walk-ins welcome mornings, appointments available afternoons!";

export default function ShareButtons() {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(siteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-3">
      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}&quote=${encodeURIComponent(shareText)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full bg-charcoal/10 flex items-center justify-center hover:bg-gold/20 transition-colors"
        aria-label="Share on Facebook"
      >
        <svg className="w-4 h-4 text-charcoal" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>

      {/* X / Twitter */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(siteUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full bg-charcoal/10 flex items-center justify-center hover:bg-gold/20 transition-colors"
        aria-label="Share on X"
      >
        <svg className="w-4 h-4 text-charcoal" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      {/* Email */}
      <a
        href={`mailto:?subject=${encodeURIComponent('Check out Law Range Barber Shop!')}&body=${encodeURIComponent(shareText)}%0A%0A${encodeURIComponent(siteUrl)}`}
        className="w-9 h-9 rounded-full bg-charcoal/10 flex items-center justify-center hover:bg-gold/20 transition-colors"
        aria-label="Share via Email"
      >
        <svg className="w-4 h-4 text-charcoal" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      </a>

      {/* Copy Link */}
      <button
        onClick={copyLink}
        className="w-9 h-9 rounded-full bg-charcoal/10 flex items-center justify-center hover:bg-gold/20 transition-colors"
        aria-label="Copy link"
      >
        {copied ? (
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-charcoal" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </button>
    </div>
  );
}
