import React, { useEffect } from 'react';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { supabase } from '../lib/supabase';

export default function GoogleAuthButton() {
  // Configure GoogleSignin on mount
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // Adjust based on required permissions
      webClientId: '359467660879-chm13qbj1ms5m1o5r1ie017liiq4fs9i.apps.googleusercontent.com', // Replace this with your actual web client ID
    });
  }, []);

  const handleGoogleLogin = async () => {
    try {
      // Check if Play Services are available
      await GoogleSignin.hasPlayServices();

      // Sign in with Google
      const userInfo = await GoogleSignin.signIn();

      if (userInfo) {
        // Fetch tokens after signing in
        const { idToken } = await GoogleSignin.getTokens();

        if (idToken) {
          // Now it's safe to use idToken for Supabase sign-in
          const { data, error } = await supabase.auth.signInWithIdToken({
            provider: 'google',
            token: idToken, // Pass the idToken retrieved from Google
          });

          if (error) {
            throw error; // Handle error if any
          }

          console.log('Supabase Auth Data:', data); // Success - Logged in
        } else {
          throw new Error('No ID token available');
        }
      } else {
        throw new Error('Google SignIn returned no user info');
      }
    } catch (error: any) {
      // Error handling based on error type
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign-in operation is in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services not available or outdated');
      } else {
        console.error('Error during Google Sign-in:', error.message);
      }
    }
  };

  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={handleGoogleLogin}
    />
  );
}
