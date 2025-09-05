import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface BuddyPageProps {
  onNavigateToHome?: () => void;
  onNavigateToProfile?: () => void;
  onNavigateToNotifications?: () => void;
}

const BuddyPage = ({ onNavigateToHome, onNavigateToProfile, onNavigateToNotifications }: BuddyPageProps) => {
  const [searchText, setSearchText] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hi! I\'m your travel assistant. How can I help you find the perfect travel buddy?', isBot: true, time: '10:30 AM' }
  ]);

  const buddies = [
    { 
      id: 1, 
      name: 'Sarah Johnson', 
      location: 'Mumbai', 
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      rating: 4.8,
      trips: 23
    },
    { 
      id: 2, 
      name: 'Mike Chen', 
      location: 'Delhi', 
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      rating: 4.6,
      trips: 18
    },
    { 
      id: 3, 
      name: 'Emma Wilson', 
      location: 'Bangalore', 
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      rating: 4.9,
      trips: 31
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Ionicons
        key={index}
        name={index < rating ? 'star' : 'star-outline'}
        size={14}
        color="#ffc107"
      />
    ));
  };

  const sendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = { id: Date.now(), text: chatMessage, isBot: false, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
      setMessages([...messages, newMessage]);
      setChatMessage('');
      
      // Bot response
      setTimeout(() => {
        const botResponse = { id: Date.now() + 1, text: 'I can help you find buddies based on your destination, interests, or travel dates. What are you looking for?', isBot: true, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Travel Buddies</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => setShowSearch(!showSearch)} style={styles.headerIcon}>
            <Ionicons name="search" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="alarm-outline" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowChat(!showChat)} style={styles.headerIcon}>
            <Ionicons name="chatbubble-outline" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onNavigateToNotifications} style={styles.headerIcon}>
            <Ionicons name="notifications-outline" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      {showSearch && (
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search buddies..."
              value={searchText}
              onChangeText={setSearchText}
              autoFocus
            />
          </View>
        </View>
      )}



 

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Buddy List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Buddies</Text>
          {buddies.map((buddy) => (
            <View key={buddy.id} style={styles.buddyCard}>
              <Image source={{ uri: buddy.avatar }} style={styles.buddyAvatar} />
              <View style={styles.buddyInfo}>
                <Text style={styles.buddyName}>{buddy.name}</Text>
                <View style={styles.buddyLocation}>
                  <Ionicons name="location-outline" size={16} color="#666" />
                  <Text style={styles.locationText}>{buddy.location}</Text>
                </View>
                <View style={styles.buddyStats}>
                  <View style={styles.rating}>
                    {renderStars(Math.floor(buddy.rating))}
                    <Text style={styles.ratingText}>{buddy.rating}</Text>
                  </View>
                  <Text style={styles.tripsText}>{buddy.trips} trips</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.connectButton}>
                <Text style={styles.connectButtonText}>Connect</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Recent Connections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Connections</Text>
          <View style={styles.recentCard}>
            <Ionicons name="people" size={24} color="#4CAF50" />
            <View style={styles.recentInfo}>
              <Text style={styles.recentTitle}>Connected with Alex Travel</Text>
              <Text style={styles.recentSubtitle}>2 hours ago</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Chatbot */}
      {showChat && (
        <View style={styles.chatContainer}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatTitle}>Travel Assistant</Text>
            <TouchableOpacity onPress={() => setShowChat(false)}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.chatMessages}>
            {messages.map((message) => (
              <View key={message.id} style={[styles.messageContainer, message.isBot ? styles.botMessage : styles.userMessage]}>
                <Text style={[styles.messageText, message.isBot ? styles.botText : styles.userText]}>{message.text}</Text>
                <Text style={styles.messageTime}>{message.time}</Text>
              </View>
            ))}
          </ScrollView>
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
        </View>
      )}

      {/* Floating Chat Button */}
      {!showChat && (
        <TouchableOpacity style={styles.chatButton} onPress={() => setShowChat(true)}>
          <Ionicons name="chatbubble-ellipses" size={28} color="white" />
        </TouchableOpacity>
      )}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.bottomNavItem} onPress={onNavigateToHome}>
          <Ionicons name="home-outline" size={24} color="#333" />
          <Text style={styles.bottomNavLink}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavItem}>
          <View style={styles.activeBottomNavIndicator}>
            <Ionicons name="people-outline" size={24} color="#333" />
          </View>
          <Text style={styles.activeBottomNavLink}>Buddies</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavItem} onPress={onNavigateToProfile}>
          <Ionicons name="person-circle-outline" size={24} color="#333" />
          <Text style={styles.bottomNavLink}>Profile</Text>
        </TouchableOpacity>
      </View>
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
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: 15,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  notificationContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  notificationText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  buddyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  buddyAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  buddyInfo: {
    flex: 1,
  },
  buddyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  buddyLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  locationText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  buddyStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  tripsText: {
    fontSize: 14,
    color: '#666',
  },
  connectButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  connectButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  recentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  recentInfo: {
    marginLeft: 15,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  recentSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#e0e0e0',
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
  chatButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#4CAF50',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  chatContainer: {
    position: 'absolute',
    bottom: 70,
    right: 20,
    left: 20,
    height: 400,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  chatTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  chatMessages: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    marginVertical: 5,
    maxWidth: '80%',
  },
  botMessage: {
    alignSelf: 'flex-start',
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  messageText: {
    padding: 10,
    borderRadius: 15,
    fontSize: 14,
  },
  botText: {
    backgroundColor: '#f0f0f0',
    color: '#333',
  },
  userText: {
    backgroundColor: '#4CAF50',
    color: 'white',
  },
  messageTime: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
    textAlign: 'center',
  },
  chatInput: {
    flexDirection: 'row',
    padding: 15,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  chatTextInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BuddyPage;