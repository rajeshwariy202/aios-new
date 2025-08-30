import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface HomePageProps {
  onNavigateToProfile?: () => void;
  onNavigateToBuddies?: () => void;
  onNavigateToHome?: () => void;
  onLogout?: () => void;
}

const HomePage = ({ onNavigateToProfile, onNavigateToBuddies, onNavigateToHome, onLogout }: HomePageProps) => {

  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [currentLocationField, setCurrentLocationField] = useState('');

  const locations = [
    'Airport Terminal 1', 'Airport Terminal 2', 'Central Railway Station',
    'Bus Stand', 'City Mall', 'Hospital', 'University Campus',
    'Tech Park', 'Downtown', 'Beach Road', 'Market Square',
    'Sports Complex', 'Government Office', 'Shopping Center'
  ];

  const vehicles = [
    { id: 'bike', name: 'Bike', icon: 'bicycle', price: '₹50-80' },
    { id: 'scooty', name: 'Scooty', icon: 'car-sport', price: '₹60-90' },
    { id: 'auto', name: 'Auto', icon: 'car', price: '₹80-120' },
    { id: 'car', name: 'Car', icon: 'car-outline', price: '₹120-200' }
  ];

  const handleLocationSelect = (location: string) => {
    if (currentLocationField === 'pickup') {
      setPickupLocation(location);
    } else {
      setDropLocation(location);
    }
    setShowLocationSuggestions(false);
  };

  const handleVehicleSelect = (vehicle: { name: string }) => {
    setSelectedVehicle(vehicle.name);
    setShowVehicleModal(false);
  };

  const handleBookRide = () => {
    if (!pickupLocation || !dropLocation || !selectedVehicle) {
      Alert.alert("Missing Info", "Please select pickup, drop, and vehicle.");
      return;
    }
    console.log('Booking ride from', pickupLocation, 'to', dropLocation, 'via', selectedVehicle);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Travel Buddy</Text>
        <TouchableOpacity
          style={styles.profileIcon}
          onPress={onNavigateToProfile}
        >
          <Ionicons name="person-circle-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* Ride Details Input Section */}
      <View style={styles.inputContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>PICK UP LOCATION</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => {
              setCurrentLocationField('pickup');
              setShowLocationSuggestions(true);
            }}
          >
            <Text style={pickupLocation ? styles.inputText : styles.placeholderText}>
              {pickupLocation || 'Select pickup location'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>DROP LOCATION</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => {
              setCurrentLocationField('drop');
              setShowLocationSuggestions(true);
            }}
          >
            <Text style={dropLocation ? styles.inputText : styles.placeholderText}>
              {dropLocation || 'Select drop location'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>SELECT VEHICLE</Text>
          <TouchableOpacity style={styles.vehicleSelect} onPress={() => setShowVehicleModal(true)}>
            <Text style={selectedVehicle ? styles.inputText : styles.vehicleSelectText}>
              {selectedVehicle || 'Choose your ride'}
            </Text>
            <Ionicons name="chevron-down-outline" size={20} color="#555" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.bookButton} onPress={handleBookRide}>
          <Text style={styles.bookButtonText}>Book a ride</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Chat Input Section */}
      <View style={styles.bottomChat}>
        <TextInput
          style={styles.chatInput}
          placeholder="TYPE OR CHAT"
        />
        <TouchableOpacity style={styles.sendButton}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Location Suggestions Modal */}
      <Modal visible={showLocationSuggestions} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Location</Text>
            <FlatList
              data={locations}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.locationItem}
                  onPress={() => handleLocationSelect(item)}
                >
                  <Ionicons name="location-outline" size={20} color="#4CAF50" />
                  <Text style={styles.locationText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowLocationSuggestions(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Vehicle Selection Modal */}
      <Modal visible={showVehicleModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose Vehicle</Text>
            <FlatList
              data={vehicles}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.vehicleItem}
                  onPress={() => handleVehicleSelect(item)}
                >
                  <Ionicons
                    name={item.icon as keyof typeof Ionicons.glyphMap}
                    size={30}
                    color="#4CAF50"
                  />
                  <View style={styles.vehicleInfo}>
                    <Text style={styles.vehicleName}>{item.name}</Text>
                    <Text style={styles.vehiclePrice}>{item.price}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowVehicleModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.bottomNavItem} onPress={onNavigateToHome}>
          <View style={styles.activeBottomNavIndicator}>
            <Ionicons name="home-outline" size={24} color="#333" />
          </View>
          <Text style={styles.activeBottomNavLink}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavItem} onPress={onNavigateToBuddies}>
          <Ionicons name="people-outline" size={24} color="#333" />
          <Text style={styles.bottomNavLink}>Buddies</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavItem} onPress={onNavigateToProfile}>
          <Ionicons name="person-circle-outline" size={24} color="#333" />
          <Text style={styles.bottomNavLink}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#4CAF50',
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingTop: 50,
    flexDirection: 'row', // Align children horizontally
    justifyContent: 'space-between', // Distribute space between title and icon
    alignItems: 'center', // Align children vertically
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  profileIcon: {
    padding: 5,
  },
  inputContainer: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    justifyContent: 'center',
  },
  inputText: {
    color: '#333',
    fontSize: 16,
  },
  placeholderText: {
    color: '#999',
    fontSize: 16,
  },
  vehicleSelect: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vehicleSelectText: {
    color: '#555',
    fontSize: 16,
  },
  bookButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  bookButtonText: {
    color: '#fffefeff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  bottomChat: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 60,
  },
  chatInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingG: {
    position: 'absolute',
    right: 20,
    bottom: 80,
    backgroundColor: '#fff',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  gText: {
    color: '#4CAF50',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  locationText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  vehicleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  vehicleInfo: {
    marginLeft: 15,
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  vehiclePrice: {
    fontSize: 14,
    color: '#666',
  },
  closeButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#e0e0e0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomNavItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  bottomNavLink: {
    fontSize: 11,
    color: '#555',
    marginTop: 2,
  },
  activeBottomNavIndicator: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  activeBottomNavLink: {
    fontSize: 11,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginTop: 2,
  },
});