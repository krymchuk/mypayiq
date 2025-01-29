'use client';

import { AppLayout } from '@/components/layout/AppLayout';
import { Calendar } from '@/components/features/Calendar';
import { Plus, Filter } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  type: 'payment' | 'meeting' | 'reminder';
}

// This would typically come from an API
const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Netflix Payment',
    date: '2024-02-15',
    time: '14:30',
    type: 'payment',
  },
  {
    id: '2',
    title: 'Team Meeting',
    date: '2024-02-15',
    time: '10:00',
    type: 'meeting',
  },
  {
    id: '3',
    title: 'Adobe CC Payment',
    date: '2024-02-28',
    type: 'payment',
  },
  {
    id: '4',
    title: 'Subscription Review',
    date: '2024-02-20',
    time: '15:00',
    type: 'reminder',
  },
];

export default function CalendarPage() {
  const handleEventClick = (event: CalendarEvent) => {
    console.log('Event clicked:', event);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Calendar</h1>
            <p className="mt-1 text-sm text-[#8395A7]">
              Manage your schedule and upcoming payments
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 rounded-lg border border-[#F1F2F6] bg-white px-4 py-2 text-sm font-medium text-[#8395A7] hover:border-[#7C5CFC] hover:text-[#7C5CFC]">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
            <button className="flex items-center space-x-2 rounded-lg bg-[#7C5CFC] px-4 py-2 text-sm font-medium text-white hover:bg-[#6B4FE0]">
              <Plus className="h-4 w-4" />
              <span>Add Event</span>
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-[#F1F2F6] bg-white p-6">
          <Calendar events={mockEvents} onEventClick={handleEventClick} />
        </div>
      </div>
    </AppLayout>
  );
}
