import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { supabase } from '../src/lib/supabase';

export default function IndexScreen() {
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        // Get the session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        if (!session) {
          console.log('⚠️ No active session found');
          return;
        }

        // Fetch the user data
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;

        console.log('👤 User:', user);

        // Check if the user has a custom username or use their email
        let userName = user?.user_metadata?.name || user?.email;

        // If email exists, remove the domain part
        if (userName?.includes('@')) {
          userName = userName.split('@')[0];  // Get everything before '@'
        }

        // Set the username in state
        setUserName(userName || 'User');
      } catch (error: any) {
        console.error('❌ Error fetching user:', error.message || error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>👋 Welcome, {userName}!</Text>
      <Text style={styles.subText}>Glad to see you again 😄</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eef6ff',
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#475569',
  },
});
