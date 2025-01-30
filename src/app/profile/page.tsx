'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabase } from '@/hooks/useSupabase';
import type { Database } from '@/lib/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

export default function ProfilePage() {
  const router = useRouter();
  const { client } = useSupabase();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);
  const [formData, setFormData] = useState<Omit<Profile, 'id' | 'created_at' | 'updated_at' | 'user_id'>>({
    full_name: '',
    email: '',
    phone: '',
    company: '',
    job_title: '',
  });

  useEffect(() => {
    async function loadProfile() {
      try {
        const { data: { user } } = await client.auth.getUser();

        if (!user) {
          router.push('/auth/signin');
          return;
        }

        const { data: profile, error } = await client
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;

        if (profile) {
          setFormData({
            full_name: profile.full_name || '',
            email: profile.email || '',
            phone: profile.phone || '',
            company: profile.company || '',
            job_title: profile.job_title || '',
          });
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        setMessage({ type: 'error', text: 'Failed to load profile' });
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, [client, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const { data: { user } } = await client.auth.getUser();

      if (!user) {
        throw new Error('No user found');
      }

      const { error } = await client
        .from('profiles')
        .update({
          ...formData,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);

      if (error) throw error;

      setMessage({ type: 'success', text: 'Profile updated successfully' });
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ type: 'error', text: 'Failed to update profile' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 w-full">
        <div className="text-[rgb(var(--muted))]">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Profile Information</h1>
          <p className="text-[rgb(var(--muted))]">Update your personal information and preferences</p>
        </div>

        {message && (
          <div className={`p-4 mb-4 rounded-md ${
            message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-[rgb(var(--foreground))]">
                Full Name
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={formData.full_name || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-[rgb(var(--foreground))] bg-white shadow-sm focus:border-[#7C5CFC] focus:ring-[#7C5CFC] focus:ring-1"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[rgb(var(--foreground))]">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-[rgb(var(--foreground))] bg-white shadow-sm focus:border-[#7C5CFC] focus:ring-[#7C5CFC] focus:ring-1"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-[rgb(var(--foreground))]">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-[rgb(var(--foreground))] bg-white shadow-sm focus:border-[#7C5CFC] focus:ring-[#7C5CFC] focus:ring-1"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-[rgb(var(--foreground))]">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-[rgb(var(--foreground))] bg-white shadow-sm focus:border-[#7C5CFC] focus:ring-[#7C5CFC] focus:ring-1"
                placeholder="Enter your company name"
              />
            </div>

            <div>
              <label htmlFor="job_title" className="block text-sm font-medium text-[rgb(var(--foreground))]">
                Job Title
              </label>
              <input
                type="text"
                id="job_title"
                name="job_title"
                value={formData.job_title || ''}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-[rgb(var(--foreground))] bg-white shadow-sm focus:border-[#7C5CFC] focus:ring-[#7C5CFC] focus:ring-1"
                placeholder="Enter your job title"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 text-sm font-medium text-[rgb(var(--foreground))] bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 text-sm font-medium text-white bg-[#7C5CFC] rounded-md hover:bg-[#6B4FD8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7C5CFC] disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
