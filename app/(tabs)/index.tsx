import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome to Alimco App 🚀</Text>
        <Text style={styles.subtitle}>
          Login securely and manage everything from one place.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace('/home')}
        >
          <Text style={styles.buttonText}>Go to Dashboard</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.authContainer}>
        <Text style={styles.altText}>Or sign in with:</Text>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f6fc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#fff',
    padding: 32,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 6,
    width: '100%',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1e1e2d',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#6b7280',
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#3b82f6',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  authContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  altText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
});
