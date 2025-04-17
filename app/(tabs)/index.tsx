import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../src/lib/supabase';
import { AntDesign } from '@expo/vector-icons'; // For the back arrow icon
import { useRouter } from 'expo-router'; // For routing

export default function IndexScreen() {
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Access the router object
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        // Get the session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        console.log('⚡️ Session:', session); // Log session data

        if (!session) {
          console.log('⚠️ No active session found');
          return;
        }

        // Fetch the user data
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;

        console.log('👤 User:', user); // Log user data

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

  const handleLogout = async () => {
    try {
      // Sign out from Supabase
      await supabase.auth.signOut();

      // Clear any session data (if applicable)
      Alert.alert('✅ Logged out successfully');

      // Navigate to the main page
      router.push('/home'); // Navigate to the main page after logout
    } catch (error: any) {
      console.error('❌ Error logging out:', error.message || error);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.push('/home')} // Navigate to the main page using router.push
        style={styles.backButton}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleLogout} // Handle logout
        style={styles.logoutButton}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.welcomeText}>👋 Welcome {userName}</Text>
      <Text style={styles.subText}>Glad to see you again 😄</Text>

      {/* Logout Button */}
     
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
    paddingTop: 30, // Add some padding to the top to make space for the back button
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
  backButton: {
    position: 'absolute',
    top: 40, // Adjust this for your preferred top margin
    left: 20, // Left margin for the back button
    padding: 10,
    zIndex: 1, // Ensure the button is above other elements
  },
  logoutButton: {
    marginTop: 2,
    backgroundColor: '#FF4D4D',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
