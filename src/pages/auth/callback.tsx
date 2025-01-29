import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams?.get('next') || '/dashboard';

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const { error } = await supabase.auth.getSession();
        if (error) throw error;

        router.push(next);
      } catch {
        router.push('/auth/signin');
      }
    };

    handleRedirect();
  }, [router, supabase, next]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F1F2F6]">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Processing authentication...
        </h2>
        <p className="mt-2 text-sm text-[#8395A7]">
          Please wait while we redirect you.
        </p>
      </div>
    </div>
  );
}
