'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { useSupabase } from '@/hooks/useSupabase';
import { StatusBadge, SubscriptionStatus } from '@/components/shared/StatusBadge';
import { EditSubscriptionModal } from './EditSubscriptionModal';
import type { Database } from '@/lib/database.types';
import { useRouter } from 'next/dist/client/components/navigation';

type Subscription = Database['public']['Tables']['subscriptions']['Row'];

export function SubscriptionCard({
  id,
  name,
  plan,
  status,
  price,
  logo_url: logoUrl,
  due_date: dueDate,
  ...subscription
}: Subscription) {
  const { client } = useSupabase();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleUpdate = () => {
    router.refresh();
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this subscription?')) {
      return;
    }

    setIsDeleting(true);
    try {
      const { error } = await client
        .from('subscriptions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      handleUpdate();
    } catch (error) {
      console.error('Error deleting subscription:', error);
    } finally {
      setIsDeleting(false);
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between rounded-lg border border-[#F1F2F6] bg-white p-4">
        <div className="flex items-center space-x-4">
          {logoUrl ? (
            <div className="relative h-10 w-10 overflow-hidden rounded-lg">
              <Image
                src={logoUrl}
                alt={`${name} logo`}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="h-10 w-10 rounded-lg bg-[#F1F2F6]" />
          )}
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-sm text-[#8395A7]">{plan}</p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <StatusBadge status={status as SubscriptionStatus} />
          <div className="text-right">
            <p className="font-medium">{formatPrice(price)}</p>
            {dueDate && (
              <p className="text-sm text-[#8395A7]">Due {formatDate(dueDate)}</p>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#8395A7] hover:text-[#7C5CFC]"
            >
              <MoreVertical className="h-5 w-5" />
            </button>

            {isMenuOpen && (
              <div className="absolute z-10 right-0 mt-2 w-48 rounded-lg border border-[#F1F2F6] bg-white py-1 shadow-lg">
                <button
                  onClick={() => {
                    setIsEditModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="flex w-full items-center space-x-2 px-4 py-2 text-sm text-[rgb(var(--foreground))] hover:bg-[#F1F2F6]"
                >
                  <Edit2 className="h-4 w-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex w-full items-center space-x-2 px-4 py-2 text-sm text-[#FF4757] hover:bg-[#F1F2F6]"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <EditSubscriptionModal
        subscription={{ id, name, plan, status, price, logo_url: logoUrl, due_date: dueDate, ...subscription }}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={() => handleUpdate()}
      />
    </>
  );
}
