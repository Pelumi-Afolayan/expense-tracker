import { createClient } from '@supabase/supabase-js'

// Read the Supabase connection details from .env.local.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

// Create one Supabase client that the entire application can reuse.
export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey,
)