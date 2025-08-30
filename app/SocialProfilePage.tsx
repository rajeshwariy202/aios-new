import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SocialProfilePageProps {
  onNavigateBack?: () => void;
  onNavigateToHome?: () => void;
  onNavigateToBuddies?: () => void;
  onNavigateToProfile?: () => void;
}

const SocialProfilePage = ({ onNavigateBack, onNavigateToHome, onNavigateToBuddies, onNavigateToProfile }: SocialProfilePageProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [likeCount, setLikeCount] = useState(234);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [selectedStat, setSelectedStat] = useState('');

  const posts = [
    {
      id: 1,
      image: { uri: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop' },
      caption: 'Machu Picchu at sunrise! 🏔️ Ancient Incan ruins surrounded by mystical clouds and mountains.',
      likes: 312,
      comments: 45,
      timeAgo: '2 hours ago'
    },
    {
      id: 2,
      image: { uri: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400&h=300&fit=crop' },
      caption: 'Safari adventure in Kenya! 🦁 Nothing beats witnessing wildlife in their natural habitat.',
      likes: 267,
      comments: 38,
      timeAgo: '1 day ago'
    },
    {
      id: 3,
      image: { uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop' },
      caption: 'Sunset at Santorini! 🌅 The most breathtaking views in the Greek islands.',
      likes: 189,
      comments: 22,
      timeAgo: '3 days ago'
    },
    {
      id: 4,
      image: { uri: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400&h=300&fit=crop' },
      caption: 'Northern Lights in Iceland! 🌌 Mother nature putting on the most incredible light show.',
      likes: 421,
      comments: 67,
      timeAgo: '5 days ago'
    },
    {
      id: 5,
      image: { uri: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=400&h=300&fit=crop' },
      caption: 'Exploring ancient ruins in Thailand 🏛️ History comes alive in these sacred places.',
      likes: 198,
      comments: 31,
      timeAgo: '1 week ago'
    }
  ];

  const comments = [
    { id: 1, user: 'Sarah Johnson', text: 'Wow! This looks amazing! 😍', timeAgo: '1h' },
    { id: 2, user: 'Mike Chen', text: 'I would love to join your next trip!', timeAgo: '45m' },
    { id: 3, user: 'Emma Wilson', text: 'Beautiful capture! 📸', timeAgo: '30m' }
  ];

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleShare = () => {
    console.log('Share profile');
  };

  const handleComment = () => {
    if (commentText.trim()) {
      console.log('Add comment:', commentText);
      setCommentText('');
    }
  };

  const handleStatPress = (statType: string) => {
    setSelectedStat(statType);
    setShowStatsModal(true);
  };

  const travelPosts = [
    { id: 1, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&h=300&fit=crop', location: 'Machu Picchu, Peru' },
    { id: 2, image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=300&h=300&fit=crop', location: 'Kenya Safari' },
    { id: 3, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop', location: 'Santorini, Greece' },
    { id: 4, image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=300&h=300&fit=crop', location: 'Thailand Temples' },
    { id: 5, image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop', location: 'Swiss Alps' },
    { id: 6, image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&h=300&fit=crop', location: 'Bali, Indonesia' },
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onNavigateBack}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Skynie</Text>
        <TouchableOpacity onPress={handleShare}>
          <Ionicons name="share-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' }}
              style={styles.profileImage}
            />
            <View style={styles.onlineIndicator} />
          </View>
          
          <Text style={styles.userName}>Skynie</Text>
          <Text style={styles.userBio}>🌍 Travel Enthusiast | 📸 Adventure Photographer | ✈️ Solo Traveler</Text>
          <Text style={styles.location}>📍 Delhi, India</Text>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <TouchableOpacity style={styles.statItem} onPress={() => handleStatPress('posts')}>
              <Text style={styles.statNumber}>45</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.statItem} onPress={() => handleStatPress('followers')}>
              <Text style={styles.statNumber}>1.2K</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.statItem} onPress={() => handleStatPress('following')}>
              <Text style={styles.statNumber}>890</Text>
              <Text style={styles.statLabel}>Following</Text>
            </TouchableOpacity>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.followButton, isFollowing && styles.followingButton]}
              onPress={handleFollow}
            >
              <Ionicons 
                name={isFollowing ? "checkmark" : "person-add"} 
                size={18} 
                color={isFollowing ? "#666" : "white"} 
              />
              <Text style={[styles.followButtonText, isFollowing && styles.followingButtonText]}>
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.messageButton}>
              <Ionicons name="chatbubble-outline" size={18} color="#4CAF50" />
              <Text style={styles.messageButtonText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Posts Section */}
        <View style={styles.postsSection}>
          <Text style={styles.sectionTitle}>Recent Posts</Text>
          
          {posts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <Image source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face' }} style={styles.postUserImage} />
                <View style={styles.postUserInfo}>
                  <Text style={styles.postUserName}>Skynie</Text>
                  <Text style={styles.postTime}>{post.timeAgo}</Text>
                </View>
                <TouchableOpacity>
                  <Ionicons name="ellipsis-horizontal" size={20} color="#666" />
                </TouchableOpacity>
              </View>

              <Image source={post.image} style={styles.postImage} />

              <View style={styles.postActions}>
                <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
                  <Ionicons 
                    name={isLiked ? "heart" : "heart-outline"} 
                    size={24} 
                    color={isLiked ? "#ff4444" : "#333"} 
                  />
                  <Text style={styles.actionCount}>{post.likes}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => setShowComments(!showComments)}
                >
                  <Ionicons name="map-outline" size={24} color="#333" />
                  <Text style={styles.actionCount}>{post.comments}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="compass-outline" size={24} color="#333" />
                </TouchableOpacity>
                
                <View style={styles.spacer} />
               
              </View>

              <Text style={styles.postCaption}>{post.caption}</Text>

              {/* Comments Section */}
              {showComments && (
                <View style={styles.commentsSection}>
                  {comments.map((comment) => (
                    <View key={comment.id} style={styles.commentItem}>
                      <Text style={styles.commentUser}>{comment.user}</Text>
                      <Text style={styles.commentText}>{comment.text}</Text>
                      <Text style={styles.commentTime}>{comment.timeAgo}</Text>
                    </View>
                  ))}
                  
                  <View style={styles.addCommentContainer}>
                    <TextInput
                      style={styles.commentInput}
                      placeholder="Add a comment..."
                      value={commentText}
                      onChangeText={setCommentText}
                    />
                    <TouchableOpacity onPress={handleComment}>
                      <Ionicons name="send" size={20} color="#4CAF50" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>
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
        <TouchableOpacity style={styles.bottomNavItem} onPress={onNavigateToProfile}>
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
              {selectedStat === 'posts' ? 'Travel Posts' : 
               selectedStat === 'followers' ? 'Followers' : 'Following'}
            </Text>
            
            {selectedStat === 'posts' ? (
              <FlatList
                data={travelPosts}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.postGridItem}>
                    <Image source={{ uri: item.image }} style={styles.gridImage} />
                    <Text style={styles.gridLocation}>{item.location}</Text>
                    <View style={styles.postGridActions}>
                      <TouchableOpacity style={styles.gridActionButton}>
                        <Ionicons name="airplane" size={20} color="#ff6b6b" />
                        <Text style={styles.gridActionText}>234</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.gridActionButton}>
                        <Ionicons name="map" size={20} color="#4ecdc4" />
                        <Text style={styles.gridActionText}>45</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.gridActionButton}>
                        <Ionicons name="compass" size={20} color="#45b7d1" />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            ) : (
              <FlatList
                data={selectedStat === 'followers' ? followers : following}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.userItem}>
                    <Image source={{ uri: item.avatar }} style={styles.userAvatar} />
                    <Text style={styles.userNameModal}>{item.name}</Text>
                  </View>
                )}
              />
            )}
            
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setShowStatsModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#4CAF50',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    borderWidth: 3,
    borderColor: 'white',
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  userBio: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginBottom: 25,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    width: '100%',
    gap: 15,
  },
  followButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 25,
    gap: 8,
  },
  followingButton: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  followButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  followingButtonText: {
    color: '#666',
  },
  messageButton: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#4CAF50',
    gap: 8,
  },
  messageButtonText: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 16,
  },
  postsSection: {
    backgroundColor: 'white',
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  postCard: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 20,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  postUserImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  postUserInfo: {
    flex: 1,
  },
  postUserName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  postTime: {
    fontSize: 12,
    color: '#666',
  },
  postImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionCount: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  spacer: {
    flex: 1,
  },
  postCaption: {
    fontSize: 15,
    color: '#333',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  commentsSection: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  commentItem: {
    marginBottom: 12,
  },
  commentUser: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  commentText: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  commentTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  addCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    fontSize: 14,
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
    color: '#333',
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
  postGridItem: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },
  gridImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 5,
  },
  gridLocation: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  userNameModal: {
    fontSize: 16,
    color: '#333',
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
  postGridActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
    paddingHorizontal: 10,
  },
  gridActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gridActionText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
});

export default SocialProfilePage;