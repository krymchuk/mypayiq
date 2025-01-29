import { AppLayout } from '@/components/layout/AppLayout';
import { SubscriptionList } from '@/components/layout/SubscriptionList';

interface Subscription {
  id: string;
  name: string;
  plan: string;
  status: 'active' | 'inactive' | 'pending' | 'ended';
  price: string;
  logoUrl?: string;
  dueDate?: string;
}

// This would typically come from an API
const mockSubscriptions: {
  active: Subscription[];
  ending: Subscription[];
  ended: Subscription[];
} = {
  active: [
    {
      id: '1',
      name: 'Netflix Premium',
      plan: 'Monthly Plan',
      status: 'active',
      price: '$19.99/mo',
      logoUrl: 'https://picsum.photos/200',
      dueDate: 'Feb 15, 2024',
    },
    {
      id: '2',
      name: 'Spotify Family',
      plan: 'Monthly Plan',
      status: 'active',
      price: '$14.99/mo',
      logoUrl: 'https://picsum.photos/201',
      dueDate: 'Feb 20, 2024',
    },
  ],
  ending: [
    {
      id: '3',
      name: 'Adobe Creative Cloud',
      plan: 'Annual Plan',
      status: 'pending',
      price: '$52.99/mo',
      logoUrl: 'https://picsum.photos/202',
      dueDate: 'Feb 28, 2024',
    },
  ],
  ended: [
    {
      id: '4',
      name: 'YouTube Premium',
      plan: 'Monthly Plan',
      status: 'ended',
      price: '$11.99/mo',
      logoUrl: 'https://picsum.photos/203',
    },
  ],
};

export default function SubscriptionsPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Subscriptions</h1>
          <p className="mt-1 text-sm text-[#8395A7]">
            Manage and track all your subscriptions
          </p>
        </div>

        <div className="space-y-8">
          <SubscriptionList
            title="Active Subscriptions"
            subscriptions={mockSubscriptions.active}
          />
          <SubscriptionList
            title="Ending Soon"
            subscriptions={mockSubscriptions.ending}
          />
          <SubscriptionList
            title="Recently Ended"
            subscriptions={mockSubscriptions.ended}
          />
        </div>
      </div>
    </AppLayout>
  );
}
