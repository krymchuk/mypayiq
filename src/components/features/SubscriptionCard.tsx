'use client';

import Image from 'next/image';
import { MoreVertical } from 'lucide-react';
import { StatusBadge, SubscriptionStatus } from '@/components/shared/StatusBadge';

interface SubscriptionCardProps {
  name: string;
  plan: string;
  status: string;
  price: number;
  logoUrl: string | null;
  dueDate: string | null;
}

export function SubscriptionCard({
  name,
  plan,
  status,
  price,
  logoUrl,
  dueDate,
}: SubscriptionCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="flex items-center justify-between rounded-lg border border-[#F1F2F6] bg-white p-4">
      <div className="flex items-center space-x-4">
        {logoUrl ? (
          <div className="relative h-10 w-10 overflow-hidden rounded-lg">
            <Image
              src={logoUrl}
              alt={`${name} logo`}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="h-10 w-10 rounded-lg bg-[#F1F2F6]" />
        )}
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-[#8395A7]">{plan}</p>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <StatusBadge status={status as SubscriptionStatus} />
        <div className="text-right">
          <p className="font-medium">{formatPrice(price)}</p>
          {dueDate && (
            <p className="text-sm text-[#8395A7]">Due {formatDate(dueDate)}</p>
          )}
        </div>
        <button className="text-[#8395A7] hover:text-[#7C5CFC]">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
