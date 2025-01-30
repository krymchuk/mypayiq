'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { useSupabase } from '@/hooks/useSupabase';
import type { Database } from '@/lib/database.types';

type Subscription = Database['public']['Tables']['subscriptions']['Row'];

interface EditSubscriptionModalProps {
  subscription: Subscription;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditSubscriptionModal({
  subscription,
  isOpen,
  onClose,
  onSuccess,
}: EditSubscriptionModalProps) {
  const { client } = useSupabase();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: subscription.name,
    plan: subscription.plan,
    status: subscription.status,
    price: subscription.price,
    price_interval: subscription.price_interval,
    logo_url: subscription.logo_url,
    due_date: subscription.due_date,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await client
        .from('subscriptions')
        .update(formData)
        .eq('id', subscription.id);

      if (error) throw error;

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error updating subscription:', error);
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
          <h2 className="text-xl font-bold">Edit Subscription</h2>
          <button onClick={onClose} className="text-[#8395A7] hover:text-[#FF4757]">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Service Name</label>
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
            <label htmlFor="plan" className="block text-sm font-medium">Plan</label>
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
            <label htmlFor="status" className="block text-sm font-medium">Status</label>
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
            <label htmlFor="price" className="block text-sm font-medium">Price</label>
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
            <label htmlFor="logo_url" className="block text-sm font-medium">Logo URL</label>
            <input
              type="url"
              id="logo_url"
              name="logo_url"
              placeholder="https://example.com/logo.png"
              value={formData.logo_url || ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#7C5CFC] focus:ring-[#7C5CFC]"
            />
          </div>

          <div>
            <label htmlFor="due_date" className="block text-sm font-medium">Due Date</label>
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
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
