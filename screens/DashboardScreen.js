import React from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DashboardScreen({ navigation }) {
 const handleLogout = async () => {
  try {
    await AsyncStorage.removeItem("token");
    Alert.alert("Logged out", "You have been logged out.");

    // Navigate to Login screen in root stack
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }], // make sure "Login" exists in Stack
    });
  } catch (err) {
    console.error(err);
    Alert.alert("Error", "Could not logout");
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Dashboard</Text>
      <View style={{ marginTop: 20 }}>
        <Button title="Logout" color="#ff3b30" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 22, fontWeight: "bold" },
});
