import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface ForgotPasswordPageProps {
  onBackToLogin: () => void;
  onNavigateToReset?: () => void;
}

const ForgotPasswordPage = ({ onBackToLogin, onNavigateToReset }: ForgotPasswordPageProps) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    if (!email) {
      alert('Please enter your email address');
      return;
    }
    alert('Reset code sent! Redirecting to password reset...');
    setTimeout(() => {
      onNavigateToReset?.();
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        source={{ uri: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400&h=800&fit=crop' }}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onBackToLogin} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Reset Password</Text>
            <View style={{ width: 28 }} />
          </View>

          <KeyboardAvoidingView 
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <ScrollView 
              contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.formContainer}>
                <View style={styles.iconContainer}>
                  <View style={styles.lockIcon}>
                    <Ionicons name="lock-closed" size={40} color="#ffc107" />
                  </View>
                </View>

                <Text style={styles.title}>Forgot Password?</Text>
                
                <Text style={styles.instructionText}>
                  No worries! Enter your email address and we&apos;ll send you a secure link to reset your password.
                </Text>

                <View style={styles.inputContainer}>
                  <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email address"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
                  <Text style={styles.resetButtonText}>Send Reset Link</Text>
                  <Ionicons name="paper-plane" size={20} color="white" style={styles.buttonIcon} />
                </TouchableOpacity>

                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>or</Text>
                  <View style={styles.dividerLine} />
                </View>

                <TouchableOpacity onPress={onBackToLogin} style={styles.backToLogin}>
                  <Ionicons name="arrow-back-circle-outline" size={20} color="#ffc107" style={styles.backIcon} />
                  <Text style={styles.backToLoginText}>Back to Sign In</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingTop: 40,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  formContainer: {
    padding: 30,
    minHeight: 500,
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  lockIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  instructionText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 25,
    marginBottom: 30,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputIcon: {
    marginRight: 15,
  },
  input: {
    flex: 1,
    height: 55,
    fontSize: 16,
    color: '#333',
  },
  resetButton: {
    backgroundColor: '#ffc107',
    height: 55,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  resetButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 10,
  },
  buttonIcon: {
    marginLeft: 5,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  dividerText: {
    marginHorizontal: 15,
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
  },
  backToLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    marginRight: 8,
  },
  backToLoginText: {
    fontSize: 16,
    color: '#ffc107',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default ForgotPasswordPage;