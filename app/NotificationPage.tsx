import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface NotificationPageProps {
  onNavigateBack?: () => void;
}

const NotificationPage = ({ onNavigateBack }: NotificationPageProps) => {
  const notifications = [
    {
      id: 1,
      type: 'buddy_request',
      title: 'New Buddy Request',
      message: 'John Smith wants to connect with you for a trip to Goa',
      time: '2 hours ago',
      icon: 'person-add',
      color: '#4CAF50',
      unread: true
    },
    {
      id: 2,
      type: 'message',
      title: 'New Message',
      message: 'Sarah Johnson: "Hey! Are you still planning the Mumbai trip?"',
      time: '4 hours ago',
      icon: 'chatbubble',
      color: '#2196F3',
      unread: true
    },
    {
      id: 3,
      type: 'trip_reminder',
      title: 'Trip Reminder',
      message: 'Your trip to Delhi starts tomorrow at 9:00 AM',
      time: '6 hours ago',
      icon: 'car',
      color: '#FF9800',
      unread: false
    },
    {
      id: 4,
      type: 'booking_confirmed',
      title: 'Booking Confirmed',
      message: 'Your ride from Airport to Hotel has been confirmed',
      time: '1 day ago',
      icon: 'checkmark-circle',
      color: '#4CAF50',
      unread: false
    },
    {
      id: 5,
      type: 'payment',
      title: 'Payment Successful',
      message: 'Payment of ₹450 for Bangalore to Mysore trip completed',
      time: '2 days ago',
      icon: 'card',
      color: '#9C27B0',
      unread: false
    },
    {
      id: 6,
      type: 'review',
      title: 'New Review',
      message: 'Mike Chen left you a 5-star review for your recent trip',
      time: '3 days ago',
      icon: 'star',
      color: '#FFC107',
      unread: false
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onNavigateBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.headerAction}>
          <Ionicons name="checkmark-done" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {notifications.map((notification) => (
          <TouchableOpacity key={notification.id} style={[styles.notificationCard, notification.unread && styles.unreadCard]}>
            <View style={styles.notificationIcon}>
              <Ionicons name={notification.icon as any} size={24} color={notification.color} />
            </View>
            <View style={styles.notificationContent}>
              <Text style={[styles.notificationTitle, notification.unread && styles.unreadTitle]}>
                {notification.title}
              </Text>
              <Text style={styles.notificationMessage}>{notification.message}</Text>
              <Text style={styles.notificationTime}>{notification.time}</Text>
            </View>
            {notification.unread && <View style={styles.unreadDot} />}
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
    backgroundColor: '#4CAF50',
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerAction: {
    padding: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  notificationCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  unreadCard: {
    backgroundColor: '#f8f9ff',
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  notificationIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f5f5f5',
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
  unreadTitle: {
    fontWeight: 'bold',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    marginTop: 5,
  },
});

export default NotificationPage;