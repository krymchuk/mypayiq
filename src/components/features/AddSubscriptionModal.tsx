'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { useSupabase } from '@/hooks/useSupabase';
import type { Database } from '@/lib/database.types';
import { useRouter } from 'next/navigation';

type SubscriptionInsert = Database['public']['Tables']['subscriptions']['Insert'];

interface AddSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddSubscriptionModal({ isOpen, onClose, onSuccess }: AddSubscriptionModalProps) {
  const router = useRouter();
  const { client } = useSupabase();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Omit<SubscriptionInsert, 'user_id' | 'created_at' | 'updated_at'>>({
    name: '',
    plan: '',
    status: 'active',
    price: 0,
    price_interval: 'monthly',
    logo_url: '',
    due_date: null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: { user } } = await client.auth.getUser();

      if (!user) throw new Error('No user found');

      const { error } = await client
        .from('subscriptions')
        .insert({
          ...formData,
          user_id: user.id,
        });

      if (error) throw error;

      onSuccess();
      onClose();
      setFormData({
        name: '',
        plan: '',
        status: 'active',
        price: 0,
        price_interval: 'monthly',
        logo_url: '',
        due_date: null,
      });
      router.push('/subscriptions');
      router.refresh();
    } catch (error) {
      console.error('Error adding subscription:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Add New Subscription</h2>
          <button onClick={onClose} className="text-[#8395A7] hover:text-[#FF4757]">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Service Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#7C5CFC] focus:ring-[#7C5CFC]"
            />
          </div>

          <div>
            <label htmlFor="plan" className="block text-sm font-medium">
              Plan
            </label>
            <input
              type="text"
              id="plan"
              name="plan"
              required
              value={formData.plan}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#7C5CFC] focus:ring-[#7C5CFC]"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium">
              Status
            </label>
            <select
              id="status"
              name="status"
              required
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#7C5CFC] focus:ring-[#7C5CFC]"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
              <option value="ended">Ended</option>
            </select>
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              required
              step="0.01"
              min="0"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#7C5CFC] focus:ring-[#7C5CFC]"
            />
          </div>

          <div>
            <label htmlFor="price_interval" className="block text-sm font-medium">
              Billing Interval
            </label>
            <select
              id="price_interval"
              name="price_interval"
              required
              value={formData.price_interval}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#7C5CFC] focus:ring-[#7C5CFC]"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div>
            <label htmlFor="logo_url" className="block text-sm font-medium">
              Logo URL
            </label>
            <input
              type="url"
              id="logo_url"
              name="logo_url"
              value={formData.logo_url || ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#7C5CFC] focus:ring-[#7C5CFC]"
            />
          </div>

          <div>
            <label htmlFor="due_date" className="block text-sm font-medium">
              Due Date
            </label>
            <input
              type="date"
              id="due_date"
              name="due_date"
              value={formData.due_date || ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#7C5CFC] focus:ring-[#7C5CFC]"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-[#7C5CFC] px-4 py-2 text-sm font-medium text-white hover:bg-[#6B4FD8] disabled:opacity-50"
            >
              {isSubmitting ? 'Adding...' : 'Add Subscription'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
