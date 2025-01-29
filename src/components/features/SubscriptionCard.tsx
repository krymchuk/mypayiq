'use client';

import Image from 'next/image';
import { MoreVertical } from 'lucide-react';
import { StatusBadge } from '@/components/shared/StatusBadge';

interface SubscriptionCardProps {
  name: string;
  plan: string;
  status: 'active' | 'inactive' | 'pending' | 'ended';
  price: string;
  logoUrl?: string;
  dueDate?: string;
}

export function SubscriptionCard({
  name,
  plan,
  status,
  price,
  logoUrl,
  dueDate,
}: SubscriptionCardProps) {
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
        <StatusBadge status={status} />
        <div className="text-right">
          <p className="font-medium">{price}</p>
          {dueDate && (
            <p className="text-sm text-[#8395A7]">Due {dueDate}</p>
          )}
        </div>
        <button className="text-[#8395A7] hover:text-[#7C5CFC]">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
