'use client';

import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  amount: string;
  type: 'credit' | 'debit';
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

interface TimelineProps {
  items: TimelineItem[];
}

const getStatusColor = (status: TimelineItem['status']) => {
  switch (status) {
    case 'completed':
      return 'text-[#2ECC71]';
    case 'pending':
      return 'text-[#7C5CFC]';
    case 'failed':
      return 'text-[#FF4757]';
    default:
      return 'text-[#8395A7]';
  }
};

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="space-y-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-start space-x-4 rounded-lg border border-[#F1F2F6] bg-white p-4"
        >
          <div
            className={`rounded-full p-2 ${
              item.type === 'credit'
                ? 'bg-[#2ECC71]/10 text-[#2ECC71]'
                : 'bg-[#FF4757]/10 text-[#FF4757]'
            }`}
          >
            {item.type === 'credit' ? (
              <ArrowDownRight className="h-5 w-5" />
            ) : (
              <ArrowUpRight className="h-5 w-5" />
            )}
          </div>

          <div className="flex flex-1 items-start justify-between">
            <div>
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-[#8395A7]">{item.description}</p>
              <p className="mt-1 text-xs text-[#8395A7]">{item.date}</p>
            </div>

            <div className="text-right">
              <p
                className={`font-medium ${
                  item.type === 'credit' ? 'text-[#2ECC71]' : 'text-[#FF4757]'
                }`}
              >
                {item.type === 'credit' ? '+' : '-'} {item.amount}
              </p>
              <p className={`text-sm ${getStatusColor(item.status)}`}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
