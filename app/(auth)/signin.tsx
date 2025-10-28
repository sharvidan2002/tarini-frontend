import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { Colors } from '../../constants/Colors';

export default function SignInScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!nickname) {
      Alert.alert('Error', 'Please enter your nickname');
      return;
    }

    try {
      setLoading(true);
      await login(nickname.toLowerCase());
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Nickname not found. Please check and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tāriņī</Text>
        <Text style={styles.subtitle}>Welcome Back</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.infoText}>
          Enter your nickname to continue
        </Text>

        <Input
          label="Nickname"
          value={nickname}
          onChangeText={setNickname}
          placeholder="Enter your nickname"
        />

        <Button title="Sign In" onPress={handleSignIn} loading={loading} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.text,
  },
  form: {
    padding: 40,
  },
  infoText: {
    fontSize: 14,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 20,
  },
});