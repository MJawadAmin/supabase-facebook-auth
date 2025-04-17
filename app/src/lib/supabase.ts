import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// It's recommended to store these in environment variables for security
const SUPABASE_URL = 'https://bixatyzhymgcttsbuqih.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpeGF0eXpoeW1nY3R0c2J1cWloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3Mjk3NjUsImV4cCI6MjA2MDMwNTc2NX0.hO1shykBQkF4eEFkuuVfDBrg_MB8RSt-pm24d-k4kQU'; // Truncated for security

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // Set to false for React Native
  },
});


