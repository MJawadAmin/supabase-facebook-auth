// screens/AuthScreen.tsx
import { View } from 'react-native';
import FacebookAuthButton from './AuthFacebook';

export default function AuthScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <FacebookAuthButton />
    </View>
  );
}