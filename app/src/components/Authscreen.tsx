// app/(tabs)/index.tsx
import FacebookAuthButton from '../components/AuthFacebook';
import { View } from 'react-native';

export default function AuthScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <FacebookAuthButton />
    </View>
  );
}