import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export const checkUserSubscription = async (userId: string) => {
  // This is a mock implementation for development purposes
  // In a real implementation, you would check the user's subscription status in your database
  return { hasActiveSubscription: true };
};
