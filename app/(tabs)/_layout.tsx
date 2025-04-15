// app/(tabs)/_layout.tsx
import { Slot, Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" /> {/* AuthScreen */}
      <Stack.Screen name="HomeScreen" />
    </Stack>
  );
}