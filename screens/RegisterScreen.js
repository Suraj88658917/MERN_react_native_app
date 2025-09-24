import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

const handleRegister = async () => {
  if (!name || !email || !password) {
    Alert.alert('Validation Error', 'All fields are required');
    return;
  }

  setLoading(true);

  try {
    const res = await fetch('http://192.168.1.3:8000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        password,
      }),
    });

    const rawText = await res.text();
    console.log('Status Code:', res.status);
    console.log('Raw Response:', rawText);

    let data;
    try {
      data = JSON.parse(rawText);
    } catch {
      throw new Error('Invalid JSON from server');
    }

    if (res.ok) {
      Alert.alert('Success', data?.message || 'Registered successfully.');
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    } else {
      Alert.alert('Register Failed', data?.error || data?.message || 'Unknown error');
    }
  } catch (err) {
    console.error('Register Error:', err);
    Alert.alert('Network Error', err.message || 'Failed to register');
  } finally {
    setLoading(false);
  }
};

  return (
    <View style={styles.container}>
      {/* <Image
        source={require('../assets/images/image35.png')}
        style={styles.logo}
      /> */}

      <Text style={styles.title}>Create an Account</Text>

      {/* Name */}
      <View style={styles.inputContainer}>
        <Icon name="person-outline" size={20} color="#555" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Email */}
      <View style={styles.inputContainer}>
        <Icon name="mail-outline" size={20} color="#555" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
        />
      </View>

      {/* Password */}
      <View style={styles.inputContainer}>
        <Icon name="lock-closed-outline" size={20} color="#555" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color="#555"
          />
        </TouchableOpacity>
      </View>

      {/* Register Button */}
      {loading ? (
        <ActivityIndicator size="large" color="#28a745" style={{ marginTop: 20 }} />
      ) : (
        <Pressable style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>
      )}

      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
        Already have an account? <Text style={{ fontWeight: 'bold' }}>Login</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 40,
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  logo: {
    height: 180,
    width: 160,
    alignSelf: 'center',
    marginBottom: 15,
    borderRadius: 40,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    color: 'black',
  },
  button: {
    backgroundColor: '#5edc1f',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    marginTop: 20,
    color: '#02080eff',
    textAlign: 'center',
  },
});
