'use client';

import { SubscriptionCard } from '@/components/features/SubscriptionCard';
import type { Database } from '@/lib/database.types';

type Subscription = Database['public']['Tables']['subscriptions']['Row'];

interface SubscriptionListProps {
  title: string;
  subscriptions: Subscription[];
}

export function SubscriptionList({ title, subscriptions }: SubscriptionListProps) {
  if (subscriptions.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="space-y-4">
        {subscriptions.map((subscription) => (
          <SubscriptionCard
            key={subscription.id}
            {...subscription}
          />
        ))}
      </div>
    </div>
  );
}
