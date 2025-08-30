import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, KeyboardAvoidingView, Platform, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface ResetPasswordPageProps {
  onNavigateToLogin: () => void;
}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ onNavigateToLogin }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    
    Alert.alert('Success', 'Password reset successfully!', [
      { text: 'OK', onPress: onNavigateToLogin }
    ]);
  };

  return (
    <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80' }}
      style={styles.background}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.4)']}
        style={styles.overlay}
      >
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}
          >
            <ScrollView 
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.content}>
              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  <Ionicons name="lock-closed" size={20} color="#4CAF50" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="New Password"
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color="rgba(255,255,255,0.7)" />
                  </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                  <Ionicons name="lock-closed" size={20} color="#4CAF50" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                  />
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <Ionicons name={showConfirmPassword ? "eye" : "eye-off"} size={20} color="rgba(255,255,255,0.7)" />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
                  <Text style={styles.resetButtonText}>Reset Password</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.backButton} onPress={onNavigateToLogin}>
                  <Text style={styles.backButtonText}>Back to Login</Text>
                </TouchableOpacity>
              </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    minHeight: '100%',
  },
  content: {
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: 'white',
  },
  resetButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
  },
});

export default ResetPasswordPage;