'use client';

import { useEffect, useState, useCallback } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { SubscriptionList } from '@/components/layout/SubscriptionList';
import { useSupabase } from '@/hooks/useSupabase';
import type { Database } from '@/lib/database.types';

type Subscription = Database['public']['Tables']['subscriptions']['Row'];

export default function SubscriptionsPage() {
  const { client } = useSupabase();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSubscriptions = useCallback(async () => {
    try {
      const { data, error } = await client
        .from('subscriptions')
        .select('*')
        .order('due_date', { ascending: true });

      if (error) throw error;

      setSubscriptions(data || []);
    } catch (error) {
      console.error('Error loading subscriptions:', error);
    } finally {
      setIsLoading(false);
    }
  }, [client]);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
          <div className="text-center">
            <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-[#7C5CFC]"></div>
            <p className="mt-4 text-[#8395A7]">Loading subscriptions...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active');
  const inactiveSubscriptions = subscriptions.filter(sub => sub.status === 'inactive');
  const pendingSubscriptions = subscriptions.filter(sub => sub.status === 'pending');
  const endedSubscriptions = subscriptions.filter(sub => sub.status === 'ended');

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
          <SubscriptionList title="Active" subscriptions={activeSubscriptions} onReload={fetchSubscriptions} />
          <SubscriptionList title="Pending" subscriptions={pendingSubscriptions} onReload={fetchSubscriptions} />
          <SubscriptionList title="Inactive" subscriptions={inactiveSubscriptions} onReload={fetchSubscriptions} />
          <SubscriptionList title="Ended" subscriptions={endedSubscriptions} onReload={fetchSubscriptions} />

          {subscriptions.length === 0 && (
            <div className="text-center py-8 text-[rgb(var(--muted))]">
              No subscriptions found. Add your first subscription to get started.
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
