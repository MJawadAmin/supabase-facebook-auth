import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { supabase } from '../../src/lib/supabase';
import { useRouter } from 'expo-router';
import FacebookAuthButton from '../components/AuthFacebook';

export default function AuthScreen() {
  const router = useRouter();
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        router.replace('/home'); // ✅ Redirect to home if already logged in
      } else {
        setCheckingSession(false);
      }
    };

    checkSession();
  }, []);

  if (checkingSession) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1877F2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My App</Text>
      <FacebookAuthButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
