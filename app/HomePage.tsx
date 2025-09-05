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
  const [showChat, setShowChat] = useState(true);
  const [chatMessage, setChatMessage] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Welcome to Travel Buddy! How can I help you today?', isBot: true, time: '10:30 AM' }
  ]);

  const locations = [
    'Kempegowda International Airport', 'Bangalore City Railway Station', 'KR Puram Railway Station',
    'Majestic Bus Stand', 'Shantinagar Bus Stand', 'Electronic City',
    'Whitefield', 'Koramangala', 'Indiranagar', 'Jayanagar',
    'BTM Layout', 'HSR Layout', 'Marathahalli', 'Sarjapur Road',
    'Bannerghatta Road', 'Hebbal', 'Yelahanka', 'JP Nagar',
    'Rajajinagar', 'Malleshwaram', 'Basavanagudi', 'Commercial Street',
    'Brigade Road', 'MG Road', 'UB City Mall', 'Forum Mall Koramangala',
    'Phoenix MarketCity', 'Orion Mall', 'Manyata Tech Park', 'Bagmane Tech Park',
    'Prestige Tech Park', 'RMZ Infinity', 'Ecospace', 'Cessna Business Park'
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
    setShowBookingModal(true);
  };

  const handleVehicleSelect = (vehicle: { name: string }) => {
    setSelectedVehicle(vehicle.name);
    setShowVehicleModal(false);
    setShowBookingModal(true);
  };

  const handleBookRide = () => {
    if (!pickupLocation || !dropLocation || !selectedVehicle) {
      Alert.alert("Missing Info", "Please select pickup, drop, and vehicle.");
      return;
    }
    console.log('Booking ride from', pickupLocation, 'to', dropLocation, 'via', selectedVehicle);
  };

  const sendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = { id: Date.now(), text: chatMessage, isBot: false, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
      setMessages([...messages, newMessage]);
      setChatMessage('');
      
      setTimeout(() => {
        const botResponse = { id: Date.now() + 1, text: 'I can help you book a ride or find travel buddies. What would you like to do?', isBot: true, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
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

      {/* Booking Form - Only show when showBookingForm is true */}
      {showBookingForm && (
        <View style={styles.mainCard}>
          <Text style={styles.mainTitle}>Book a Ride</Text>
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
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Real-time Chat Section */}
      {showChat && (
        <View style={styles.chatContainer}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatTitle}>Travel Assistant</Text>
          </View>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={[styles.messageContainer, item.isBot ? styles.botMessage : styles.userMessage]}>
                <Text style={[styles.messageText, item.isBot ? styles.botText : styles.userText]}>{item.text}</Text>
                <Text style={styles.messageTime}>{item.time}</Text>
              </View>
            )}
            style={styles.chatMessages}
          />
          <View style={styles.chatInput}>
            <TextInput
              style={styles.chatTextInput}
              placeholder="Type your message..."
              value={chatMessage}
              onChangeText={setChatMessage}
              onSubmitEditing={sendMessage}
            />
            <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
              <Ionicons name="send" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.bookRideButton} onPress={() => setShowBookingModal(true)}>
            <Text style={styles.bookRideButtonText}>Book a ride</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Floating Chat Button */}
      {!showChat && (
        <TouchableOpacity style={styles.floatingChatButton} onPress={() => setShowChat(true)}>
          <Ionicons name="chatbubbles" size={24} color="white" />
        </TouchableOpacity>
      )}

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

      {/* Booking Modal */}
      <Modal visible={showBookingModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Book a Ride</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>PICK UP LOCATION</Text>
              <TouchableOpacity
                style={styles.vehicleSelect}
                onPress={() => {
                  setCurrentLocationField('pickup');
                  setShowBookingModal(false);
                  setShowLocationSuggestions(true);
                }}
              >
                <Text style={pickupLocation ? styles.inputText : styles.vehicleSelectText}>
                  {pickupLocation || 'Select pickup location'}
                </Text>
                <Ionicons name="chevron-down-outline" size={20} color="#555" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>DROP LOCATION</Text>
              <TouchableOpacity
                style={styles.vehicleSelect}
                onPress={() => {
                  setCurrentLocationField('drop');
                  setShowBookingModal(false);
                  setShowLocationSuggestions(true);
                }}
              >
                <Text style={dropLocation ? styles.inputText : styles.vehicleSelectText}>
                  {dropLocation || 'Select drop location'}
                </Text>
                <Ionicons name="chevron-down-outline" size={20} color="#555" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>SELECT VEHICLE</Text>
              <TouchableOpacity style={styles.vehicleSelect} onPress={() => {
                setShowBookingModal(false);
                setShowVehicleModal(true);
              }}>
                <Text style={selectedVehicle ? styles.inputText : styles.vehicleSelectText}>
                  {selectedVehicle || 'Choose your ride'}
                </Text>
                <Ionicons name="chevron-down-outline" size={20} color="#555" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.bookButton} onPress={() => {
              handleBookRide();
              setShowBookingModal(false);
            }}>
              <Text style={styles.bookButtonText}>Confirm Booking</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowBookingModal(false)}
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
        <TouchableOpacity style={styles.bottomNavItem}>
          <View style={styles.activeBottomNavIndicator}>
            <Ionicons name="home-outline" size={24} color="white" />
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
    backgroundColor: '#f0f4f7',
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  profileIcon: {
    padding: 5,
  },
  mainCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    marginHorizontal: 20,
    marginTop: -30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  inputText: {
    color: '#333',
    fontSize: 16,
  },
  placeholderText: {
    color: '#a0a0a0',
    fontSize: 16,
  },
  vehicleSelect: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  vehicleSelectText: {
    color: '#555',
    fontSize: 16,
  },
  bookButton: {
    backgroundColor: '#4CAF50',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  bookButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  chatContainer: {
    position: 'absolute',
    top: 150,
    bottom: 120,
    right: 20,
    left: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  chatTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatMessages: {
    flex: 1,
    padding: 15,
  },
  messageContainer: {
    marginVertical: 4,
    maxWidth: '80%',
  },
  botMessage: {
    alignSelf: 'flex-start',
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  messageText: {
    padding: 12,
    borderRadius: 18,
    fontSize: 16,
  },
  botText: {
    backgroundColor: '#e9e9eb',
    color: '#333',
  },
  userText: {
    backgroundColor: '#dcf8c6',
    color: '#333',
  },
  messageTime: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
    alignSelf: 'flex-end',
  },
  chatInput: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  chatTextInput: {
    flex: 1,
    height: 45,
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingChatButton: {
    position: 'absolute',
    right: 30,
    bottom: 90,
    backgroundColor: '#4CAF50',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    zIndex: 1000,
    elevation: 1000,
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
    maxHeight: '70%',
    zIndex: 1001,
    elevation: 1001,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  locationText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  vehicleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  vehicleInfo: {
    marginLeft: 15,
    flex: 1,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  vehiclePrice: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  closeButton: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  bottomNavItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomNavLink: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
  activeBottomNavIndicator: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginBottom: 4,
  },
  activeBottomNavLink: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginTop: 4,
  },
  bookRideButton: {
    backgroundColor: '#4CAF50',
    marginHorizontal: 40,
    marginVertical: 8,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  bookRideButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});