import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { supabase } from '../src/lib/supabase'; // Ensure this path is correct
import FacebookAuthButton from '../src/components/AuthFacebook';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error.message);
        Alert.alert('Error', 'Failed to fetch user information.');
      } else if (user) {
        setUserEmail(user.email);
      }
    };

    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {userEmail ? `Welcome, ${userEmail}!` : 'Welcome to the Home Page'}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('/home')}
      >
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  button: {
    marginTop: 24,
    backgroundColor: '#1877F2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
