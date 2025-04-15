
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'

const supabaseUrl = 'https://bixatyzhymgcttsbuqih.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpeGF0eXpoeW1nY3R0c2J1cWloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3Mjk3NjUsImV4cCI6MjA2MDMwNTc2NX0.hO1shykBQkF4eEFkuuVfDBrg_MB8RSt-pm24d-k4kQU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

