import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, FlatList, TextInput, Alert, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface UserProfilePageProps {
  onNavigateBack?: () => void;
  onNavigateToHome?: () => void;
  onNavigateToSocialProfile?: () => void;
  onNavigateToBuddies?: () => void;
}

const UserProfilePage = ({ onNavigateBack, onNavigateToHome, onNavigateToSocialProfile, onNavigateToBuddies }: UserProfilePageProps) => {
  const [activeTab, setActiveTab] = useState('rides');
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [selectedStat, setSelectedStat] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState('John Traveler');
  const [editEmail, setEditEmail] = useState('john.traveler@email.com');
  const [editBio, setEditBio] = useState('Love exploring new places and meeting fellow travelers! 🌍✈️');

  const profileStats = {
    rides: 45,
    followers: 128,
    following: 89,
    rating: 4.8
  };

  const recentRides = [
    { id: 1, destination: 'Mumbai Airport', date: 'Dec 15, 2024', rating: 5 },
    { id: 2, destination: 'Goa Beach Resort', date: 'Dec 10, 2024', rating: 4 },
    { id: 3, destination: 'Delhi Metro Station', date: 'Dec 5, 2024', rating: 5 },
  ];

  const followers = [
    { id: 1, name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face' },
    { id: 2, name: 'Mike Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face' },
    { id: 3, name: 'Emma Wilson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face' },
  ];

  const following = [
    { id: 1, name: 'Alex Travel', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face' },
    { id: 2, name: 'Lisa Adventure', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face' },
  ];

  const handleStatPress = (statType: string) => {
    setSelectedStat(statType);
    setShowStatsModal(true);
  };

  const handleShareProfile = async () => {
    try {
      const shareContent = {
        message: `Check out ${editName}'s Travel Buddy profile!\n\n${editBio}\n\nRides: ${profileStats.rides} | Rating: ${profileStats.rating}⭐\n\nJoin Travel Buddy app to connect with fellow travelers!`,
        title: 'Travel Buddy Profile'
      };
      
      await Share.share(shareContent);
    } catch (error) {
      Alert.alert('Error', 'Could not share profile');
    }
  };

  const renderStatContent = () => {
    if (selectedStat === 'rides') {
      return recentRides.map((ride) => (
        <View key={ride.id} style={styles.modalItem}>
          <Ionicons name="car" size={24} color="#4CAF50" />
          <View style={styles.modalItemInfo}>
            <Text style={styles.modalItemTitle}>{ride.destination}</Text>
            <Text style={styles.modalItemSubtitle}>{ride.date}</Text>
          </View>
        </View>
      ));
    } else if (selectedStat === 'followers') {
      return followers.map((follower) => (
        <View key={follower.id} style={styles.modalItem}>
          <Image source={{ uri: follower.avatar }} style={styles.modalAvatar} />
          <View style={styles.modalItemInfo}>
            <Text style={styles.modalItemTitle}>{follower.name}</Text>
            <Text style={styles.modalItemSubtitle}>Following you</Text>
          </View>
        </View>
      ));
    } else if (selectedStat === 'following') {
      return following.map((person) => (
        <View key={person.id} style={styles.modalItem}>
          <Image source={{ uri: person.avatar }} style={styles.modalAvatar} />
          <View style={styles.modalItemInfo}>
            <Text style={styles.modalItemTitle}>{person.name}</Text>
            <Text style={styles.modalItemSubtitle}>You are following</Text>
          </View>
        </View>
      ));
    }
    return null;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Ionicons
        key={index}
        name={index < rating ? 'star' : 'star-outline'}
        size={16}
        color="#4CAF50"
      />
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onNavigateBack}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <TouchableOpacity onPress={onNavigateToSocialProfile}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' }}
                style={styles.profileImage}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.editImageButton}>
              <Ionicons name="camera" size={16} color="white" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>{editName}</Text>
          <Text style={styles.userEmail}>{editEmail}</Text>
          <Text style={styles.userBio}>{editBio}</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <TouchableOpacity style={styles.statItem} onPress={() => handleStatPress('rides')}>
            <Text style={styles.statNumber}>{profileStats.rides}</Text>
            <Text style={styles.statLabel}>Rides</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statItem} onPress={() => handleStatPress('followers')}>
            <Text style={styles.statNumber}>{profileStats.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statItem} onPress={() => handleStatPress('following')}>
            <Text style={styles.statNumber}>{profileStats.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.editProfileButton} onPress={() => setShowEditModal(true)}>
            <Ionicons name="create-outline" size={20} color="white" />
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareProfileButton} onPress={handleShareProfile}>
            <Ionicons name="share-outline" size={20} color="#4CAF50" />
            <Text style={styles.shareProfileText}>Share</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'rides' && styles.activeTab]}
            onPress={() => setActiveTab('rides')}
          >
            <Text style={[styles.tabText, activeTab === 'rides' && styles.activeTabText]}>Recent Rides</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'reviews' && styles.activeTab]}
            onPress={() => setActiveTab('reviews')}
          >
            <Text style={[styles.tabText, activeTab === 'reviews' && styles.activeTabText]}>Reviews</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === 'rides' && (
          <View style={styles.tabContent}>
            {recentRides.map((ride) => (
              <View key={ride.id} style={styles.rideCard}>
                <View style={styles.rideIcon}>
                  <Ionicons name="car" size={24} color="#4CAF50" />
                </View>
                <View style={styles.rideInfo}>
                  <Text style={styles.rideDestination}>{ride.destination}</Text>
                  <Text style={styles.rideDate}>{ride.date}</Text>
                </View>
                <View style={styles.rideRating}>
                  {renderStars(ride.rating)}
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'reviews' && (
          <View style={styles.tabContent}>
            <View style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewerName}>Sarah Johnson</Text>
                <View style={styles.reviewRating}>
                  {renderStars(5)}
                </View>
              </View>
              <Text style={styles.reviewText}>Great travel companion! Very punctual and friendly.</Text>
              <Text style={styles.reviewDate}>2 days ago</Text>
            </View>
            
            <View style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewerName}>Mike Chen</Text>
                <View style={styles.reviewRating}>
                  {renderStars(4)}
                </View>
              </View>
              <Text style={styles.reviewText}>Had a wonderful trip together. Highly recommended!</Text>
              <Text style={styles.reviewDate}>1 week ago</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.bottomNavItem} onPress={onNavigateToHome}>
          <Ionicons name="home-outline" size={24} color="#333" />
          <Text style={styles.bottomNavLink}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavItem} onPress={onNavigateToBuddies}>
          <Ionicons name="people-outline" size={24} color="#333" />
          <Text style={styles.bottomNavLink}>Buddies</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavItem}>
          <View style={styles.activeBottomNavIndicator}>
            <Ionicons name="person-circle-outline" size={24} color="#333" />
          </View>
          <Text style={styles.activeBottomNavLink}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Modal */}
      <Modal visible={showStatsModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedStat === 'rides' ? 'Your Rides' : 
               selectedStat === 'followers' ? 'Followers' : 'Following'}
            </Text>
            <ScrollView style={styles.modalList}>
              {renderStatContent()}
            </ScrollView>
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setShowStatsModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Edit Profile Modal */}
      <Modal visible={showEditModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            
            <View style={styles.editForm}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                style={styles.editInput}
                value={editName}
                onChangeText={setEditName}
                placeholder="Enter your name"
              />
              
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.editInput}
                value={editEmail}
                onChangeText={setEditEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
              />
              
              <Text style={styles.inputLabel}>Bio</Text>
              <TextInput
                style={[styles.editInput, styles.bioInput]}
                value={editBio}
                onChangeText={setEditBio}
                placeholder="Tell us about yourself"
                multiline
                numberOfLines={3}
              />
            </View>
            
            <View style={styles.editButtons}>
              <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={() => setShowEditModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.saveButton} 
                onPress={() => {
                  Alert.alert('Success', 'Profile updated successfully!');
                  setShowEditModal(false);
                }}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#4CAF50',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#4CAF50',
    borderRadius: 18,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2,
    borderColor: 'white',
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
    textAlign: 'center',
  },
  userBio: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 25,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  ratingContainer: {
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 15,
  },
  editProfileButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  editProfileText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  shareProfileButton: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  shareProfileText: {
    color: '#4CAF50',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#4CAF50',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#333',
    fontWeight: 'bold',
  },
  tabContent: {
    backgroundColor: 'white',
    padding: 25,
    marginHorizontal: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  rideCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 5,
  },
  rideIcon: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: '#e8f5e8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  rideInfo: {
    flex: 1,
  },
  rideDestination: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  rideDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  rideRating: {
    flexDirection: 'row',
  },
  reviewCard: {
    paddingVertical: 18,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 5,
    backgroundColor: '#fafafa',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  reviewRating: {
    flexDirection: 'row',
  },
  reviewText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 5,
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
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
    borderRadius: 8,
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
  modalList: {
    maxHeight: 400,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  modalItemInfo: {
    flex: 1,
    marginLeft: 15,
  },
  modalItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  modalItemSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
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
  editForm: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    marginTop: 15,
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  bioInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  editButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserProfilePage;