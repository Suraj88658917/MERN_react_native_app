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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

export default function LoginScreen({ navigation, setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

const handleLogin = async () => {
  try {
    
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    const response = await fetch("http://192.168.1.3:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  email: email.trim().toLowerCase(),
  password
})

    });

    const data = await response.json();
    console.log("Raw Response:", data); // Debugging

    if (response.ok) {
  await AsyncStorage.setItem("token", data.token);
  setToken(data.token); // for App.js to switch to MainTabs
  navigation.reset({
    index: 0,
    routes: [{ name: "Main" }], // <-- reset to tab navigator
  });
}
 else {
      // Show server error message properly
      Alert.alert("Login Failed", data.error || "Something went wrong");
    }
  } catch (err) {
    console.error("Login Error:", err);
    Alert.alert("Error", "Could not connect to server");
  }
};


  return (
    <View style={styles.container}>
      {/* Top Image */}
      {/* <Image
        style={styles.image}
        source={require('../assets/images/image35.png')}
      /> */}

      <Text style={styles.title}>Login to your Account</Text>

      {/* Email Field */}
      <View style={styles.inputContainer}>
        <Icon name="logo-google" size={20} color="#555" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Password Field with Show/Hide */}
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
            name={showPassword ? 'eye-off' : 'eye'}
            size={22}
            color="#555"
            style={{ marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>

      {/* Keep Me Logged In & Forgot Password */}
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setKeepLoggedIn(!keepLoggedIn)}
        >
          <Icon
            name={keepLoggedIn ? 'checkbox-outline' : 'square-outline'}
            size={20}
            color="#5edc1f"
          />
          <Text style={styles.checkboxLabel}>  Keep me logged in</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Alert.alert('Forgot Password', 'Reset flow coming soon.')}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      {loading ? (
        <ActivityIndicator size="large" color="#28a745" style={{ marginTop: 20 }} />
      ) : (
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      )}

      {/* Register Link */}
      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
        Don't have an account? <Text style={{ fontWeight: 'bold' }}>Register</Text>
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
  image: {
    height: 180,
    width: 160,
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 40,
  },
  title: {
    fontSize: 20,
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
    color: '#0b150cff',
    textAlign: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
  },
  forgotPassword: {
    fontSize: 14,
    color: '#071107ff',
  },
});
