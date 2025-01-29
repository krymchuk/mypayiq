'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProfileFormData {
  full_name: string;
  email: string;
  phone: string;
  company: string;
  job_title: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    full_name: '',
    email: '',
    phone: '',
    company: '',
    job_title: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement profile update logic with Supabase
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
      router.push('/settings');
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[rgb(var(--foreground))]">Profile Information</h1>
          <p className="text-[rgb(var(--muted))]">Update your personal information and preferences</p>
        </div>

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
                value={formData.full_name}
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
                value={formData.email}
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
                value={formData.phone}
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
                value={formData.company}
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
                value={formData.job_title}
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
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-[#7C5CFC] rounded-md hover:bg-[#6B4FD8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7C5CFC] disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
