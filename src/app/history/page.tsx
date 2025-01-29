'use client';

import { AppLayout } from '@/components/layout/AppLayout';
import { Timeline } from '@/components/features/Timeline';
import { Filter, Download } from 'lucide-react';

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  amount: string;
  type: 'credit' | 'debit';
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

// This would typically come from an API
const mockTransactions: TimelineItem[] = [
  {
    id: '1',
    title: 'Netflix Premium',
    description: 'Monthly subscription payment',
    amount: '$19.99',
    type: 'debit',
    date: 'Today at 2:30 PM',
    status: 'completed',
  },
  {
    id: '2',
    title: 'Salary Deposit',
    description: 'Monthly salary from Company Inc.',
    amount: '$5,000.00',
    type: 'credit',
    date: 'Yesterday',
    status: 'completed',
  },
  {
    id: '3',
    title: 'Adobe Creative Cloud',
    description: 'Annual subscription payment',
    amount: '$599.88',
    type: 'debit',
    date: 'Feb 15, 2024',
    status: 'pending',
  },
  {
    id: '4',
    title: 'Refund',
    description: 'Refund from cancelled service',
    amount: '$49.99',
    type: 'credit',
    date: 'Feb 14, 2024',
    status: 'completed',
  },
  {
    id: '5',
    title: 'Failed Payment',
    description: 'Payment to invalid account',
    amount: '$100.00',
    type: 'debit',
    date: 'Feb 13, 2024',
    status: 'failed',
  },
];

export default function HistoryPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Transaction History</h1>
            <p className="mt-1 text-sm text-[#8395A7]">
              View and manage your transaction history
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 rounded-lg border border-[#F1F2F6] bg-white px-4 py-2 text-sm font-medium text-[#8395A7] hover:border-[#7C5CFC] hover:text-[#7C5CFC]">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
            <button className="flex items-center space-x-2 rounded-lg bg-[#7C5CFC] px-4 py-2 text-sm font-medium text-white hover:bg-[#6B4FE0]">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-[#F1F2F6] bg-white p-6">
          <Timeline items={mockTransactions} />
        </div>
      </div>
    </AppLayout>
  );
}
