import { AppLayout } from '@/components/layout/AppLayout';

export default function Home() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome to MyPay IQ</h1>
            <p className="mt-1 text-sm text-[#8395A7]">
              Manage your subscriptions and payments in one place
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-[#F1F2F6] bg-white p-6">
            <h2 className="text-lg font-semibold">Monthly Subscriptions</h2>
            <p className="mt-2 text-3xl font-bold text-[#7C5CFC]">$284.34</p>
          </div>
          <div className="rounded-lg border border-[#F1F2F6] bg-white p-6">
            <h2 className="text-lg font-semibold">Yearly Subscriptions</h2>
            <p className="mt-2 text-3xl font-bold text-[#7C5CFC]">$3,240.43</p>
          </div>
          <div className="rounded-lg border border-[#F1F2F6] bg-gradient-to-r from-[#7C5CFC] to-[#6B4FE0] p-6 text-white">
            <h2 className="text-lg font-semibold">Upgrade to PRO</h2>
            <p className="mt-2 text-sm">Get access to advanced features and analytics</p>
            <button className="mt-4 rounded-lg bg-white px-4 py-2 text-sm font-medium text-[#7C5CFC]">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
