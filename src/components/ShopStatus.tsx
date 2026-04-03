import { useState, useEffect } from 'react';

const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;

const HOURS: Record<string, string> = {
  sunday: 'Closed',
  monday: '8:30 AM - 5:30 PM',
  tuesday: '8:30 AM - 5:30 PM',
  wednesday: '8:30 AM - 5:30 PM',
  thursday: '8:30 AM - 5:30 PM',
  friday: '8:30 AM - 5:30 PM',
  saturday: 'Closed',
};

function parseTime(timeStr: string): { hours: number; minutes: number } | null {
  const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3].toUpperCase();
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  return { hours, minutes };
}

function getShopStatus(): { isOpen: boolean; message: string } {
  const now = new Date();
  const eastern = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const dayName = DAYS[eastern.getDay()];
  const currentTime = eastern.getHours() * 60 + eastern.getMinutes();

  const todayHours = HOURS[dayName];

  if (todayHours === 'Closed') {
    for (let i = 1; i <= 7; i++) {
      const nextDay = DAYS[(eastern.getDay() + i) % 7];
      const nextHours = HOURS[nextDay];
      if (nextHours !== 'Closed') {
        const openTime = nextHours.split(' - ')[0];
        const dayLabel = i === 1 ? 'tomorrow' : nextDay.charAt(0).toUpperCase() + nextDay.slice(1);
        return { isOpen: false, message: `Opens ${dayLabel} at ${openTime}` };
      }
    }
    return { isOpen: false, message: 'Closed' };
  }

  const [openStr, closeStr] = todayHours.split(' - ');
  const open = parseTime(openStr.trim());
  const close = parseTime(closeStr.trim());

  if (!open || !close) return { isOpen: false, message: 'Closed' };

  const openTime = open.hours * 60 + open.minutes;
  const closeTime = close.hours * 60 + close.minutes;

  if (currentTime >= openTime && currentTime < closeTime) {
    const minutesLeft = closeTime - currentTime;
    if (minutesLeft <= 30) {
      return { isOpen: true, message: `Closes soon at ${closeStr.trim()}` };
    }
    return { isOpen: true, message: `Open until ${closeStr.trim()}` };
  }

  if (currentTime < openTime) {
    return { isOpen: false, message: `Opens today at ${openStr.trim()}` };
  }

  for (let i = 1; i <= 7; i++) {
    const nextDay = DAYS[(eastern.getDay() + i) % 7];
    const nextHours = HOURS[nextDay];
    if (nextHours !== 'Closed') {
      const nextOpen = nextHours.split(' - ')[0];
      const dayLabel = i === 1 ? 'tomorrow' : nextDay.charAt(0).toUpperCase() + nextDay.slice(1);
      return { isOpen: false, message: `Opens ${dayLabel} at ${nextOpen}` };
    }
  }

  return { isOpen: false, message: 'Closed' };
}

interface ShopStatusProps {
  variant?: 'badge' | 'full';
}

export default function ShopStatus({ variant = 'badge' }: ShopStatusProps) {
  const [status, setStatus] = useState<{ isOpen: boolean; message: string } | null>(null);

  useEffect(() => {
    setStatus(getShopStatus());
    const interval = setInterval(() => setStatus(getShopStatus()), 60000);
    return () => clearInterval(interval);
  }, []);

  if (!status) return null;

  if (variant === 'badge') {
    return (
      <div className="flex items-center gap-1.5">
        <span className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
        <span className={`text-xs font-medium ${status.isOpen ? 'text-green-400' : 'text-red-400'}`}>
          {status.isOpen ? 'Open' : 'Closed'}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className={`w-2.5 h-2.5 rounded-full ${status.isOpen ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
      <div className="flex flex-col">
        <span className={`text-sm font-semibold ${status.isOpen ? 'text-green-400' : 'text-red-400'}`}>
          {status.isOpen ? 'Open Now' : 'Currently Closed'}
        </span>
        <span className="text-xs text-cream/60">{status.message}</span>
      </div>
    </div>
  );
}
