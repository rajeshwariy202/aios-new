import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface ReminderPageProps {
  onNavigateBack?: () => void;
}

const ReminderPage = ({ onNavigateBack }: ReminderPageProps) => {
  const reminders = [
    {
      id: 1,
      type: 'ongoing',
      title: 'Ride to Airport',
      route: 'Koramangala → Kempegowda Airport',
      status: 'Ongoing',
      time: 'Started 15 mins ago',
      driver: 'Rajesh Kumar',
      vehicle: 'Car - KA 01 AB 1234',
      icon: 'car',
      color: '#FF9800',
      statusColor: '#FF9800'
    },
    {
      id: 2,
      type: 'upcoming',
      title: 'Return Trip',
      route: 'Kempegowda Airport → Indiranagar',
      status: 'Scheduled',
      time: 'Tomorrow 6:00 PM',
      driver: 'Priya Sharma',
      vehicle: 'Auto - KA 05 C 5678',
      icon: 'time',
      color: '#2196F3',
      statusColor: '#2196F3'
    },
    {
      id: 3,
      type: 'completed',
      title: 'Trip to Mysore',
      route: 'Bangalore → Mysore Palace',
      status: 'Completed',
      time: 'Yesterday 8:30 PM',
      driver: 'Suresh Reddy',
      vehicle: 'Car - KA 03 MN 9876',
      icon: 'checkmark-circle',
      color: '#4CAF50',
      statusColor: '#4CAF50'
    },
    {
      id: 4,
      type: 'completed',
      title: 'City Tour',
      route: 'MG Road → Lalbagh → Cubbon Park',
      status: 'Completed',
      time: '2 days ago',
      driver: 'Anil Kumar',
      vehicle: 'Bike - KA 02 XY 4321',
      icon: 'checkmark-circle',
      color: '#4CAF50',
      statusColor: '#4CAF50'
    },
    {
      id: 5,
      type: 'cancelled',
      title: 'Weekend Trip',
      route: 'Bangalore → Coorg',
      status: 'Cancelled',
      time: '3 days ago',
      driver: 'Not assigned',
      vehicle: 'Car booking',
      icon: 'close-circle',
      color: '#F44336',
      statusColor: '#F44336'
    }
  ];

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'ongoing': return 'play-circle';
      case 'upcoming': return 'time-outline';
      case 'completed': return 'checkmark-circle';
      case 'cancelled': return 'close-circle';
      default: return 'time-outline';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onNavigateBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ride Reminders</Text>
        <TouchableOpacity style={styles.headerAction}>
          <Ionicons name="refresh" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {reminders.map((reminder) => (
          <TouchableOpacity key={reminder.id} style={styles.reminderCard}>
            <View style={[styles.reminderIcon, { backgroundColor: `${reminder.color}20` }]}>
              <Ionicons name={getStatusIcon(reminder.type) as any} size={24} color={reminder.color} />
            </View>
            <View style={styles.reminderContent}>
              <View style={styles.reminderHeader}>
                <Text style={styles.reminderTitle}>{reminder.title}</Text>
                <View style={[styles.statusBadge, { backgroundColor: reminder.statusColor }]}>
                  <Text style={styles.statusText}>{reminder.status}</Text>
                </View>
              </View>
              <Text style={styles.reminderRoute}>{reminder.route}</Text>
              <View style={styles.reminderDetails}>
                <View style={styles.detailRow}>
                  <Ionicons name="time-outline" size={16} color="#666" />
                  <Text style={styles.detailText}>{reminder.time}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="person-outline" size={16} color="#666" />
                  <Text style={styles.detailText}>{reminder.driver}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="car-outline" size={16} color="#666" />
                  <Text style={styles.detailText}>{reminder.vehicle}</Text>
                </View>
              </View>
              {reminder.type === 'ongoing' && (
                <TouchableOpacity style={styles.trackButton}>
                  <Ionicons name="location" size={16} color="white" />
                  <Text style={styles.trackButtonText}>Track Live</Text>
                </TouchableOpacity>
              )}
            </View>
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
  reminderCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reminderIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  reminderContent: {
    flex: 1,
  },
  reminderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  reminderRoute: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    fontWeight: '500',
  },
  reminderDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 8,
  },
  trackButton: {
    backgroundColor: '#FF9800',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  trackButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
  },
});

export default ReminderPage;