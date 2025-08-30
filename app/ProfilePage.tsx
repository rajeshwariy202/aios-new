import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ProfilePageProps {
  onNavigateToAuth?: () => void;
  onNavigateToSocialProfile?: () => void;
}

const ProfilePage = ({ onNavigateToAuth, onNavigateToSocialProfile }: ProfilePageProps) => {
  const [activeTab, setActiveTab] = useState('FIND');

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Ionicons name="menu-outline" size={28} color="white" />
        <Text style={styles.title}>Travel Buddy</Text>
        <View style={styles.topBarRightIcons}>
          <Ionicons name="refresh-outline" size={24} color="white" style={styles.iconMargin} />
          <Ionicons name="notifications-outline" size={24} color="white" style={styles.iconMargin} />
          <Ionicons name="location-outline" size={24} color="white" />
        </View>
      </View>

      {/* Find/Local Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'FIND' && styles.activeTab]}
          onPress={() => setActiveTab('FIND')}
        >
          <Ionicons name="search-outline" size={20} color="#333" style={styles.iconMargin} />
          <Text style={activeTab === 'FIND' ? styles.activeTabText : styles.tabText}>FIND</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'LOCAL' && styles.activeTab]}
          onPress={() => setActiveTab('LOCAL')}
        >
          <Ionicons name="home-outline" size={20} color="#333" style={styles.iconMargin} />
          <Text style={activeTab === 'LOCAL' ? styles.activeTabText : styles.tabText}>LOCAL</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <TouchableOpacity onPress={onNavigateToSocialProfile}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face' }}
                style={styles.profileImage}
              />
            </TouchableOpacity>
            <View style={styles.profileInfo}>
              <Text style={styles.name}>Skynie</Text>
              <Text style={styles.location}>Delhi, Goa, Kerala, Chennai on</Text>
              <Text style={styles.date}>3rd Jul, 2025</Text>
            </View>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionsButton}>
              <Ionicons name="ellipsis-vertical" size={20} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Main Image */}
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=280&fit=crop' }}
            style={styles.mainImage}
          />

          {/* Similar Trips Button */}
          <TouchableOpacity style={styles.similarTripsButton}>
            <Text style={styles.similarTripsText}>Similar Trips</Text>
          </TouchableOpacity>

          {/* Interaction Bar */}
          <View style={styles.interactionBar}>
            <TouchableOpacity style={styles.interactionButton}>
              <Ionicons name="heart-outline" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.count}>34</Text>
            <TouchableOpacity style={styles.interactionButton}>
              <Ionicons name="chatbubble-outline" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.count}>24</Text>
            <TouchableOpacity style={styles.interactionButton}>
              <Ionicons name="paper-plane-outline" size={24} color="#333" />
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
            <TouchableOpacity style={styles.interactionButton}>
              <Ionicons name="bookmark-outline" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Description */}
          <Text style={styles.description}>
            Skynie is looking for Buddies in Delhi, Goa, Kerala, Chennai. I am a Solo traveler and is looking for Any ...
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
     <View style={styles.bottomNav}>
  <TouchableOpacity style={styles.bottomNavItem}>
    <Ionicons name="home-outline" size={24} color="#333" />
    <Text style={styles.bottomNavLink}>Home</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.bottomNavItem}>
    <View style={styles.activeBottomNavIndicator}>
      <Ionicons name="people-outline" size={24} color="#333" />
    </View>
    <Text style={styles.activeBottomNavLink}>Buddies</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.bottomNavItem} onPress={onNavigateToAuth}>
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
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingTop: 50,
    backgroundColor: '#ffc107',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  topBarRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconMargin: {
    marginRight: 15,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  activeTab: {
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 2,
    borderBottomColor: '#ffc107',
  },
  tabText: {
    fontSize: 15,
    color: '#555',
  },
  activeTabText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollViewContent: {
    paddingVertical: 20,
    paddingBottom: 100,
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileImage: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    marginRight: 15,
    borderWidth: 3,
    borderColor: '#ffc107',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  location: {
    fontSize: 13,
    color: '#666',
  },
  date: {
    fontSize: 13,
    color: '#666',
  },
  followButton: {
    backgroundColor: '#ffc107',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 10,
    shadowColor: '#ffc107',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  followButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  optionsButton: {
    padding: 5,
    marginLeft: 5,
  },
  mainImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  similarTripsButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    position: 'absolute',
    bottom: 15,
    right: 15,
    borderColor: '#ccc',
    borderWidth: 0.5,
  },
  similarTripsText: {
    color: '#333',
    fontSize: 13,
    fontWeight: '500',
  },
  interactionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  interactionButton: {
    padding: 5,
  },
  count: {
    fontSize: 15,
    color: '#555',
    marginRight: 20,
    marginLeft: 5,
  },
  description: {
    padding: 15,
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingBottom: Platform.OS === 'android' ? 10 : 25,
    borderTopWidth: 0.5,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
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
    backgroundColor: '#ffc107',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  activeBottomNavLink: {
    fontSize: 11,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 2,
  },
});

export default ProfilePage;