'use client';

interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'ended';
}

const statusStyles = {
  active: {
    bg: 'bg-[#2ECC71]/10',
    text: 'text-[#2ECC71]',
  },
  inactive: {
    bg: 'bg-[#8395A7]/10',
    text: 'text-[#8395A7]',
  },
  pending: {
    bg: 'bg-[#7C5CFC]/10',
    text: 'text-[#7C5CFC]',
  },
  ended: {
    bg: 'bg-[#FF4757]/10',
    text: 'text-[#FF4757]',
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const style = statusStyles[status];

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${style.bg} ${style.text}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
