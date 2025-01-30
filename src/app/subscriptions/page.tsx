'use client';

import { useEffect, useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { SubscriptionList } from '@/components/layout/SubscriptionList';
import { useSupabase } from '@/hooks/useSupabase';
import type { Database } from '@/lib/database.types';

type Subscription = Database['public']['Tables']['subscriptions']['Row'];

interface GroupedSubscriptions {
  active: Subscription[];
  ending: Subscription[];
  ended: Subscription[];
}

export default function SubscriptionsPage() {
  const { client } = useSupabase();
  const [isLoading, setIsLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState<GroupedSubscriptions>({
    active: [],
    ending: [],
    ended: [],
  });

  useEffect(() => {
    async function fetchSubscriptions() {
      try {
        const { data, error } = await client
          .from('subscriptions')
          .select('*')
          .order('due_date', { ascending: true });

        if (error) throw error;

        const now = new Date();
        const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

        const grouped = (data || []).reduce<GroupedSubscriptions>(
          (acc, subscription) => {
            const dueDate = subscription.due_date ? new Date(subscription.due_date) : null;

            if (subscription.status === 'ended') {
              acc.ended.push(subscription);
            } else if (
              dueDate &&
              dueDate > now &&
              dueDate <= oneWeekFromNow
            ) {
              acc.ending.push(subscription);
            } else if (subscription.status === 'active') {
              acc.active.push(subscription);
            }

            return acc;
          },
          { active: [], ending: [], ended: [] }
        );

        setSubscriptions(grouped);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSubscriptions();
  }, [client]);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-[rgb(var(--muted))]">Loading subscriptions...</div>
        </div>
      </AppLayout>
    );
  }

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
          {subscriptions.active.length > 0 && (
            <SubscriptionList
              title="Active Subscriptions"
              subscriptions={subscriptions.active}
            />
          )}
          {subscriptions.ending.length > 0 && (
            <SubscriptionList
              title="Ending Soon"
              subscriptions={subscriptions.ending}
            />
          )}
          {subscriptions.ended.length > 0 && (
            <SubscriptionList
              title="Recently Ended"
              subscriptions={subscriptions.ended}
            />
          )}

          {Object.values(subscriptions).every(arr => arr.length === 0) && (
            <div className="text-center py-8 text-[rgb(var(--muted))]">
              No subscriptions found. Add your first subscription to get started.
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
