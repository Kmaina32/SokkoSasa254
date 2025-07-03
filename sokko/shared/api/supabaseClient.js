import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // Or process.env.REACT_APP_SUPABASE_URL for CRA
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY; // Or process.env.REACT_APP_SUPABASE_ANON_KEY for CRA

export const supabase = createClient(supabaseUrl, supabaseAnonKey);