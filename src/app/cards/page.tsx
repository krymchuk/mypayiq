import { AppLayout } from '@/components/layout/AppLayout';
import { PaymentCard } from '@/components/features/PaymentCard';
import { Plus } from 'lucide-react';

// This would typically come from an API
const mockCards = [
  {
    id: '1',
    cardNumber: '4532123456789012',
    cardHolder: 'John Doe',
    expiryDate: '12/25',
    cardType: 'Visa',
    lastUsed: 'Today at 2:30 PM',
  },
  {
    id: '2',
    cardNumber: '5412345678901234',
    cardHolder: 'John Doe',
    expiryDate: '09/24',
    cardType: 'Mastercard',
    isVirtual: true,
    lastUsed: 'Yesterday',
  },
  {
    id: '3',
    cardNumber: '3712345678901234',
    cardHolder: 'John Doe',
    expiryDate: '03/26',
    cardType: 'American Express',
    lastUsed: '3 days ago',
  },
];

export default function CardsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Payment Cards</h1>
            <p className="mt-1 text-sm text-[#8395A7]">
              Manage your payment methods and virtual cards
            </p>
          </div>
          <button className="flex items-center space-x-2 rounded-lg bg-[#7C5CFC] px-4 py-2 text-sm font-medium text-white hover:bg-[#6B4FE0]">
            <Plus className="h-4 w-4" />
            <span>Add New Card</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockCards.map((card) => (
            <PaymentCard
              key={card.id}
              cardNumber={card.cardNumber}
              cardHolder={card.cardHolder}
              expiryDate={card.expiryDate}
              cardType={card.cardType}
              isVirtual={card.isVirtual}
              lastUsed={card.lastUsed}
            />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
