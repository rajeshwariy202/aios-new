import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import UserProfilePage from './UserProfilePage';
import RegistrationPage from './RegistrationPage';
import SplashScreen from './SplashScreen';
import ForgotPasswordPage from './ForgotPasswordPage';
import ResetPasswordPage from './ResetPasswordPage';
import RegistrationSuccessPage from './RegistrationSuccessPage';
import SocialProfilePage from './SocialProfilePage';
import ProfilePage from './ProfilePage';
import BuddyPage from './BuddyPage';
import NotificationPage from './NotificationPage';
import ChatPage from './ChatPage';
import ReminderPage from './ReminderPage';

export default function Index() {
  const [currentPage, setCurrentPage] = useState('splash');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Show splash screen for 3 seconds
    const timer = setTimeout(() => {
      setCurrentPage(isLoggedIn ? 'home' : 'registration');
    }, 3000);
    return () => clearTimeout(timer);
  }, [isLoggedIn]);

  if (currentPage === 'splash') {
    return <SplashScreen />;
  }

  if (currentPage === 'home') {
    return (
      <HomePage 
        onNavigateToProfile={() => setCurrentPage('profile')}
        onNavigateToBuddies={() => setCurrentPage('buddies')}
        onNavigateToHome={() => setCurrentPage('home')}
        onLogout={() => {
          setIsLoggedIn(false);
          setCurrentPage('registration');
        }}
      />
    );
  }

  if (currentPage === 'profile') {
    return (
      <UserProfilePage 
        onNavigateBack={() => setCurrentPage('home')}
        onNavigateToHome={() => setCurrentPage('home')}
        onNavigateToSocialProfile={() => setCurrentPage('socialProfile')}
        onNavigateToBuddies={() => setCurrentPage('buddies')}
      />
    );
  }

  if (currentPage === 'login') {
    return (
      <LoginPage 
        onBackToRegister={() => setCurrentPage('registration')}
        onLoginSuccess={() => {
          setIsLoggedIn(true);
          setCurrentPage('home');
        }}
        onForgotPassword={() => setCurrentPage('forgotPassword')}
      />
    );
  }

  if (currentPage === 'forgotPassword') {
    return (
      <ForgotPasswordPage 
        onBackToLogin={() => setCurrentPage('login')}
        onNavigateToReset={() => setCurrentPage('resetPassword')}
      />
    );
  }

  if (currentPage === 'resetPassword') {
    return <ResetPasswordPage onNavigateToLogin={() => setCurrentPage('login')} />;
  }

  if (currentPage === 'registrationSuccess') {
    return <RegistrationSuccessPage onNavigateToLogin={() => setCurrentPage('login')} />;
  }

  if (currentPage === 'socialProfile') {
    return (
      <SocialProfilePage 
        onNavigateBack={() => setCurrentPage('buddies')}
        onNavigateToHome={() => setCurrentPage('home')}
        onNavigateToBuddies={() => setCurrentPage('buddies')}
        onNavigateToProfile={() => setCurrentPage('profile')}
      />
    );
  }

  if (currentPage === 'buddies') {
    return (
      <BuddyPage 
        onNavigateToHome={() => setCurrentPage('home')}
        onNavigateToProfile={() => setCurrentPage('profile')}
        onNavigateToNotifications={() => setCurrentPage('notifications')}
        onNavigateToChat={() => setCurrentPage('chat')}
        onNavigateToReminders={() => setCurrentPage('reminders')}
      />
    );
  }

  if (currentPage === 'notifications') {
    return (
      <NotificationPage 
        onNavigateBack={() => setCurrentPage('buddies')}
      />
    );
  }

  if (currentPage === 'chat') {
    return (
      <ChatPage 
        onNavigateBack={() => setCurrentPage('buddies')}
      />
    );
  }

  if (currentPage === 'reminders') {
    return (
      <ReminderPage 
        onNavigateBack={() => setCurrentPage('buddies')}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <RegistrationPage 
        onNavigateToLogin={() => setCurrentPage('login')}
        onRegisterSuccess={() => setCurrentPage('registrationSuccess')}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  switchContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  switchButton: {
    backgroundColor: '#ffc107',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  switchText: {
    color: '#333',
    fontWeight: 'bold',
  },
});