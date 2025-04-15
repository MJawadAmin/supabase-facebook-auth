// components/FacebookAuthButton.tsx
import { useState, useEffect } from 'react';
import { TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { supabase } from '../lib/supabase';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';

export default function FacebookAuthButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle deep link after Facebook login
  useEffect(() => {
    const handleAuthRedirect = async (url: string) => {
      try {
        if (url.includes('#access_token=')) {
          const params = new URLSearchParams(url.split('#')[1]);
          const access_token = params.get('access_token');
          const refresh_token = params.get('refresh_token');

          if (access_token && refresh_token) {
            const { error } = await supabase.auth.setSession({
              access_token,
              refresh_token
            });

            if (!error) {
              // Use correct route path based on Expo Router conventions
              router.push('/src/components/Homescreen');
            }
          }
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to handle login');
      } finally {
        setLoading(false);
        WebBrowser.dismissBrowser();
      }
    };

    const subscription = Linking.addEventListener('url', ({ url }) => {
      handleAuthRedirect(url);
    });

    return () => subscription.remove();
  }, [router]); // Add router to dependencies

  // Handle Facebook login
  const handleFacebookLogin = async () => {
    try {
      setLoading(true);
      const redirectUrl = Linking.createURL('/auth/callback');

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: redirectUrl,
          skipBrowserRedirect: true
        }
      });

      if (error) throw error;
      if (data?.url) {
        await WebBrowser.openBrowserAsync(data.url);
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred';
      Alert.alert('Login Failed', message);
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleFacebookLogin}
      disabled={loading}
      style={{
        backgroundColor: '#1877F2',
        padding: 15,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        marginTop: 350,
      }}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <>
          <AntDesign name="facebook-square" size={24} color="white" />
          <Text style={{ color: 'white', fontWeight: '600' }}>
            Continue with Facebook
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}