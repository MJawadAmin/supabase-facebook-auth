import { useState, useEffect } from 'react';
import { TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { supabase } from '../lib/supabase';
import * as WebBrowser from 'expo-web-browser';
import { useRouter } from 'expo-router';
import * as AuthSession from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleAuthButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ✅ Log auth state changes
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('📢 [AuthStateChange] Event:', event);
      console.log('📢 [AuthStateChange] Session:', session);

      if (event === 'SIGNED_IN' && session) {
        console.log('✅ [Router] Navigating to /tabs');
        Alert.alert('Success', 'You are now logged in!');
        router.push('/(tabs)');
      } else if (event === 'SIGNED_OUT') {
        console.log('❌ [AuthStateChange] User signed out');
      } else {
        console.log('⚠️ [AuthStateChange] Unknown event:', event);
      }
    });

    return () => {
      console.log('🧹 [Cleanup] Removing auth listener');
      listener?.subscription.unsubscribe();
    };
  }, [router]);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      // Use AuthSession to get the redirect URI
      const redirectUri = AuthSession.makeRedirectUri({
        useProxy: true,
      }as any);
      
      console.log('🔗 [Redirect URI]:', redirectUri);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUri, // Static redirect URI
          skipBrowserRedirect: true, // Let Expo handle the redirect
        },
      });

      console.log('📡 [signInWithOAuth] Response Data:', data);
      if (error) {
        console.error('❌ [signInWithOAuth] Error:', error.message || error);
        throw error;
      }

      if (data?.url) {
        console.log('🌐 [Browser] Opening OAuth URL:', data.url);
        await WebBrowser.openBrowserAsync(data.url);
      } else {
        console.warn('⚠️ [signInWithOAuth] No URL returned');
      }

      // Manually check the session after OAuth login
      const { data: session, error: sessionError } = await supabase.auth.getSession();
      console.log('📢 [Session after login]:', session, sessionError);

      if (session) {
        // Redirect user after successful login
        router.push('/(tabs)');
      } else {
        console.error('❌ [Session Error] No active session detected');
        Alert.alert('Session Error', 'Failed to retrieve session');
      }
    } catch (error: any) {
      console.error('🚨 [handleGoogleLogin] Login Failed:', error.message || error);
      Alert.alert('Login Failed', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
      console.log('⏹️ [handleGoogleLogin] Finished');
    }
  };

  return (
    <TouchableOpacity
      onPress={handleGoogleLogin}
      disabled={loading}
      style={{
        backgroundColor: '#DB4437',
        padding: 15,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginHorizontal: 30,
      }}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <>
          <AntDesign name="google" size={24} color="white" style={{ marginRight: 10 }} />
          <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>
            Continue with Google
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}
