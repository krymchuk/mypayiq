'use client';

import { useEffect, useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useSupabase } from '@/hooks/useSupabase';

interface DashboardStats {
  activeSubscriptions: number;
  pendingPayments: number;
  totalMonthlySpending: number;
}

export default function DashboardPage() {
  const { client } = useSupabase();
  const [stats, setStats] = useState<DashboardStats>({
    activeSubscriptions: 0,
    pendingPayments: 0,
    totalMonthlySpending: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const { data: subscriptions, error } = await client
          .from('subscriptions')
          .select('*');

        if (error) throw error;

        const now = new Date();
        const stats = (subscriptions || []).reduce((acc, sub) => {
          // Count active subscriptions
          if (sub.status === 'active') {
            acc.activeSubscriptions += 1;
            acc.totalMonthlySpending += sub.price;
          }

          // Count pending payments (due within next 7 days)
          if (sub.due_date) {
            const dueDate = new Date(sub.due_date);
            const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

            if (dueDate <= sevenDaysFromNow && dueDate >= now) {
              acc.pendingPayments += 1;
            }
          }

          return acc;
        }, {
          activeSubscriptions: 0,
          pendingPayments: 0,
          totalMonthlySpending: 0,
        });

        setStats(stats);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, [client]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
          <div className="text-center">
            <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-[#7C5CFC]"></div>
            <p className="mt-4 text-[#8395A7]">Loading dashboard...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="mt-1 text-sm text-muted">
            Overview of your subscriptions and payments
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-default bg-white p-6">
            <h2 className="text-lg font-semibold">Active Subscriptions</h2>
            <p className="mt-2 text-3xl font-bold text-success">{stats.activeSubscriptions}</p>
          </div>
          <div className="rounded-lg border border-default bg-white p-6">
            <h2 className="text-lg font-semibold">Pending Payments</h2>
            <p className="mt-2 text-3xl font-bold text-warning">{stats.pendingPayments}</p>
          </div>
          <div className="rounded-lg border border-default bg-white p-6">
            <h2 className="text-lg font-semibold">Total Spent (This Month)</h2>
            <p className="mt-2 text-3xl font-bold text-[rgb(var(--primary))]">{formatCurrency(stats.totalMonthlySpending)}</p>
          </div>
        </div>

        <div className="rounded-lg border border-default">
          <div className="border-b border-default bg-white px-6 py-4">
            <h2 className="text-lg font-semibold">Recent Subscriptions</h2>
          </div>
          <div className="divide-y divide-[rgb(var(--border))]">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between bg-white px-6 py-4">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-lg bg-[rgb(var(--hover))]" />
                  <div>
                    <h3 className="font-medium">Netflix Premium</h3>
                    <p className="text-sm text-muted">Monthly Plan</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="rounded-full bg-[rgba(var(--success),0.1)] px-3 py-1 text-sm font-medium text-success">
                    Active
                  </span>
                  <span className="text-sm font-medium">$19.99/mo</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
