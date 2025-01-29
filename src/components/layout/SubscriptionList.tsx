'use client';

import { SubscriptionCard } from '@/components/features/SubscriptionCard';

interface Subscription {
  id: string;
  name: string;
  plan: string;
  status: 'active' | 'inactive' | 'pending' | 'ended';
  price: string;
  logoUrl?: string;
  dueDate?: string;
}

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
            name={subscription.name}
            plan={subscription.plan}
            status={subscription.status}
            price={subscription.price}
            logoUrl={subscription.logoUrl}
            dueDate={subscription.dueDate}
          />
        ))}
      </div>
    </div>
  );
}
