import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface DashboardPageProps {
  onNavigateToProfile?: () => void;
  onLogout?: () => void;
}

const DashboardPage = ({ onNavigateToProfile, onLogout }: DashboardPageProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Welcome to Travel Buddy Dashboard</Text>
        <TouchableOpacity style={styles.button} onPress={onNavigateToProfile}>
          <Text style={styles.buttonText}>Go to Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={onLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#ffc107',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#e0e0e0',
    marginTop: 10,
  },
});

export default DashboardPage;