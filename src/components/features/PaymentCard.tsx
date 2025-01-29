'use client';

import { CreditCard, MoreVertical } from 'lucide-react';

interface PaymentCardProps {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cardType: string;
  isVirtual?: boolean;
  lastUsed?: string;
}

export function PaymentCard({
  cardNumber,
  cardHolder,
  expiryDate,
  cardType,
  isVirtual = false,
  lastUsed,
}: PaymentCardProps) {
  // Format card number to show only last 4 digits
  const formattedCardNumber = `•••• •••• •••• ${cardNumber.slice(-4)}`;

  return (
    <div className="relative overflow-hidden rounded-lg border border-[#F1F2F6] bg-white p-6">
      <div className="absolute right-4 top-4">
        <button className="text-[#8395A7] hover:text-[#7C5CFC]">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-6 flex items-center space-x-2">
        <CreditCard className="h-6 w-6 text-[#7C5CFC]" />
        <span className="text-sm font-medium">{cardType}</span>
        {isVirtual && (
          <span className="rounded-full bg-[#7C5CFC]/10 px-2 py-1 text-xs font-medium text-[#7C5CFC]">
            Virtual
          </span>
        )}
      </div>

      <div className="space-y-4">
        <p className="font-mono text-xl font-medium">{formattedCardNumber}</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-[#8395A7]">Card Holder</p>
            <p className="font-medium">{cardHolder}</p>
          </div>
          <div>
            <p className="text-xs text-[#8395A7]">Expires</p>
            <p className="font-medium">{expiryDate}</p>
          </div>
        </div>
        {lastUsed && (
          <p className="text-sm text-[#8395A7]">Last used: {lastUsed}</p>
        )}
      </div>
    </div>
  );
}
