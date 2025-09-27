"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

export function useSupabaseUser() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // fetch current user
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user ?? null);
    };

    fetchUser();

    // listen to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  return user;
}
