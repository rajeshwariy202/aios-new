import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface DashboardPageProps {
  onNavigateToProfile?: () => void;
  onLogout?: () => void;
}

const DashboardPage = ({ onNavigateToProfile, onLogout }: DashboardPageProps) => {
  const handleLogout = () => {
    console.log('User logged out.');
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to Travenor</Text>
      <Text style={styles.subtitle}>Your dashboard awaits!</Text>
      
      <TouchableOpacity
        onPress={onNavigateToProfile}
        style={styles.actionButton}
      >
        <Text style={styles.actionButtonText}>Go to Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLogout}
        style={[styles.actionButton, styles.logoutButton]}
      >
        <Text style={styles.actionButtonText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  actionButton: {
    backgroundColor: '#ffc107',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  actionButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#e0e0e0',
  },
});

export default DashboardPage;