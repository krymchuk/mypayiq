'use client';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F1F2F6] p-4">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-lg sm:p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#7C5CFC]">MyPay IQ</h1>
          <h2 className="mt-6 text-xl font-semibold text-gray-900">{title}</h2>
          <p className="mt-2 text-sm text-[#8395A7]">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
