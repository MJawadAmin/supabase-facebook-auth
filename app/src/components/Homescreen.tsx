// In your HomeScreen
import { View } from 'react-native';
import WelcomeBanner from '../components/Welcomebanner';

export default function HomeScreen() {
  return (
    <View>
      <WelcomeBanner />
      {/* Rest of your content */}
    </View>
  );
}