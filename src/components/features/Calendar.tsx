'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  type: 'payment' | 'meeting' | 'reminder';
}

interface CalendarProps {
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
}

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const getEventTypeStyles = (type: CalendarEvent['type']) => {
  switch (type) {
    case 'payment':
      return 'bg-[#7C5CFC]/10 text-[#7C5CFC]';
    case 'meeting':
      return 'bg-[#2ECC71]/10 text-[#2ECC71]';
    case 'reminder':
      return 'bg-[#FF4757]/10 text-[#FF4757]';
    default:
      return 'bg-[#8395A7]/10 text-[#8395A7]';
  }
};

export function Calendar({ events, onEventClick }: CalendarProps) {
  // In a real app, we would use a proper date library like date-fns
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const previousMonthDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {currentMonth} {currentYear}
        </h2>
        <div className="flex items-center space-x-2">
          <button className="rounded-lg p-2 text-[#8395A7] hover:bg-[#F1F2F6] hover:text-[#7C5CFC]">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button className="rounded-lg p-2 text-[#8395A7] hover:bg-[#F1F2F6] hover:text-[#7C5CFC]">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-[#F1F2F6] bg-white">
        <div className="grid grid-cols-7 gap-px border-b border-[#F1F2F6]">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="p-2 text-center text-sm font-medium text-[#8395A7]"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-px">
          {previousMonthDays.map((_, index) => (
            <div
              key={`prev-${index}`}
              className="min-h-[100px] bg-[#F1F2F6]/50 p-2"
            />
          ))}

          {days.map((day) => {
            const dayEvents = events.filter(
              (event) => new Date(event.date).getDate() === day
            );
            const isToday = day === currentDate.getDate();

            return (
              <div
                key={day}
                className={`min-h-[100px] p-2 ${
                  isToday ? 'bg-[#7C5CFC]/5' : 'hover:bg-[#F1F2F6]/50'
                }`}
              >
                <span
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-sm ${
                    isToday
                      ? 'bg-[#7C5CFC] font-medium text-white'
                      : 'text-[#8395A7]'
                  }`}
                >
                  {day}
                </span>

                <div className="mt-1 space-y-1">
                  {dayEvents.map((event) => (
                    <button
                      key={event.id}
                      onClick={() => onEventClick?.(event)}
                      className={`w-full rounded px-2 py-1 text-left text-xs ${getEventTypeStyles(
                        event.type
                      )}`}
                    >
                      {event.time && <span>{event.time} - </span>}
                      {event.title}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
