import { AppLayout } from '@/components/layout/AppLayout';

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="mt-1 text-sm text-[#8395A7]">
            Overview of your subscriptions and payments
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-[#F1F2F6] bg-white p-6">
            <h2 className="text-lg font-semibold">Active Subscriptions</h2>
            <p className="mt-2 text-3xl font-bold text-[#2ECC71]">12</p>
          </div>
          <div className="rounded-lg border border-[#F1F2F6] bg-white p-6">
            <h2 className="text-lg font-semibold">Pending Payments</h2>
            <p className="mt-2 text-3xl font-bold text-[#FF4757]">3</p>
          </div>
          <div className="rounded-lg border border-[#F1F2F6] bg-white p-6">
            <h2 className="text-lg font-semibold">Total Spent (This Month)</h2>
            <p className="mt-2 text-3xl font-bold text-[#7C5CFC]">$284.34</p>
          </div>
        </div>

        <div className="rounded-lg border border-[#F1F2F6]">
          <div className="border-b border-[#F1F2F6] bg-white px-6 py-4">
            <h2 className="text-lg font-semibold">Recent Subscriptions</h2>
          </div>
          <div className="divide-y divide-[#F1F2F6]">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between bg-white px-6 py-4">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-lg bg-[#F1F2F6]" />
                  <div>
                    <h3 className="font-medium">Netflix Premium</h3>
                    <p className="text-sm text-[#8395A7]">Monthly Plan</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="rounded-full bg-[#2ECC71]/10 px-3 py-1 text-sm font-medium text-[#2ECC71]">
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
