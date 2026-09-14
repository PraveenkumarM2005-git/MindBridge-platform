import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vabhpkyohrssaadfqooy.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhYmhwa3lvaHJzc2FhZGZxb295Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4ODcyNTIsImV4cCI6MjA5MTQ2MzI1Mn0.WKbz1WpQmF-dLUFNcvWvWZnvB-sWQwWOIe6VxDhfIG0'

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      // Disable URL session detection - we handle it manually to avoid clock-skew 401s
      detectSessionInUrl: false,
      flowType: 'implicit'
    }
  }
)
