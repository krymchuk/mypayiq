import { useCallback, useMemo } from 'react';
import { createClient } from '@/utils/supabase';

export const useSupabase = () => {
  const client = useMemo(() => createClient(), []);

  const signOut = useCallback(async () => {
    const { error } = await client.auth.signOut();
    return { error };
  }, [client]);

  return {
    client,
    signOut,
    // Add other common Supabase operations here
  };
};
