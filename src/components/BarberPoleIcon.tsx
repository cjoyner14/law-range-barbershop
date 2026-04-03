interface BarberPoleIconProps {
  className?: string;
}

export default function BarberPoleIcon({ className = 'w-5 h-5' }: BarberPoleIconProps) {
  return (
    <svg
      viewBox="-5 0 130 135"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* "LAW RANGE" curved text on top */}
      <defs>
        <path id="top-arc" d="M10,48 A65,65 0 0,1 110,48" />
        <clipPath id="logo-pole-clip">
          <rect x="48" y="42" width="24" height="48" />
        </clipPath>
      </defs>

      <text fill="#D4A574" fontFamily="'Playfair Display', Georgia, serif" fontWeight="700" fontSize="15" letterSpacing="3">
        <textPath href="#top-arc" startOffset="50%" textAnchor="middle">LAW RANGE</textPath>
      </text>

      {/* Gold dome top */}
      <path d="M48 38 C48 30, 72 30, 72 38 L72 42 L48 42 Z" fill="#D4A574" stroke="#B8864E" strokeWidth="0.8" />
      {/* Gold band below cap */}
      <rect x="47" y="41" width="26" height="3" fill="#B8864E" />
      {/* White pole body */}
      <rect x="48" y="42" width="24" height="48" fill="#FFFFFF" stroke="#CCCCCC" strokeWidth="0.8" />
      {/* Thick stripes: 2 blue, 1 red */}
      <g clipPath="url(#logo-pole-clip)">
        <rect x="30" y="20" width="10" height="90" fill="#1B3D8E" transform="rotate(-28 60 65)" />
        <rect x="46" y="20" width="12" height="90" fill="#D42B2B" transform="rotate(-28 60 65)" />
        <rect x="64" y="20" width="10" height="90" fill="#1B3D8E" transform="rotate(-28 60 65)" />
      </g>
      {/* Gold band above base */}
      <rect x="47" y="89" width="26" height="3" fill="#B8864E" />
      {/* Gold flat base */}
      <rect x="48" y="92" width="24" height="8" rx="1" fill="#D4A574" stroke="#B8864E" strokeWidth="0.8" />

      {/* "BARBER SHOP" straight text on bottom */}
      <text x="60" y="120" fill="#D4A574" fontFamily="'Playfair Display', Georgia, serif" fontWeight="700" fontSize="15" letterSpacing="3" textAnchor="middle">BARBER SHOP</text>
    </svg>
  );
}
