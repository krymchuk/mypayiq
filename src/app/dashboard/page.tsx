import { AppLayout } from '@/components/layout/AppLayout';

export default function DashboardPage() {
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
            <p className="mt-2 text-3xl font-bold text-success">6</p>
          </div>
          <div className="rounded-lg border border-default bg-white p-6">
            <h2 className="text-lg font-semibold">Pending Payments</h2>
            <p className="mt-2 text-3xl font-bold text-warning">3</p>
          </div>
          <div className="rounded-lg border border-default bg-white p-6">
            <h2 className="text-lg font-semibold">Total Spent (This Month)</h2>
            <p className="mt-2 text-3xl font-bold text-[rgb(var(--primary))]">$284.34</p>
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
