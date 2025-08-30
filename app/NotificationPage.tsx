import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface NotificationPageProps {
  onNavigateBack?: () => void;
}

const NotificationPage = ({ onNavigateBack }: NotificationPageProps) => {
  const notifications = [
    { id: 1, icon: 'person-add', color: '#4CAF50', title: 'New buddy request from John', subtitle: '2 minutes ago', type: 'request' },
    { id: 2, icon: 'chatbubble', color: '#2196F3', title: 'Message from Sarah Johnson', subtitle: '5 minutes ago', type: 'message' },
    { id: 3, icon: 'car', color: '#FF9800', title: 'Trip reminder: Mumbai to Delhi', subtitle: '1 hour ago', type: 'reminder' },
    { id: 4, icon: 'heart', color: '#E91E63', title: 'Emma liked your travel post', subtitle: '3 hours ago', type: 'like' },
    { id: 5, icon: 'location', color: '#9C27B0', title: 'New buddy near your location', subtitle: '1 day ago', type: 'location' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onNavigateBack}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {notifications.map((notification) => (
          <TouchableOpacity key={notification.id} style={styles.notificationCard}>
            <View style={[styles.iconContainer, { backgroundColor: notification.color }]}>
              <Ionicons name={notification.icon as any} size={24} color="white" />
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationSubtitle}>{notification.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingTop: 50,
    backgroundColor: '#4CAF50',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  placeholder: {
    width: 28,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  notificationSubtitle: {
    fontSize: 14,
    color: '#666',
  },
});

export default NotificationPage;