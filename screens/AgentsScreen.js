import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.1.3:8000"; // Replace with your backend URL

export default function AgentsScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch agents on component mount
  useEffect(() => {
    fetchAgents();
  }, []);

  const getToken = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      Alert.alert("Error", "Please login first");
      return null;
    }
    return token;
  };

  const addAgent = async () => {
    if (!name || !email || !mobile || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    const token = await getToken();
    if (!token) return;

    try {
      setLoading(true);
      const res = await axios.post(
        `${API_URL}/api/agents`,
        { name, email, mobile, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert("Success", "Agent added successfully");
      setName("");
      setEmail("");
      setMobile("");
      setPassword("");
      fetchAgents();
    } catch (err) {
      Alert.alert("Error", err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAgents = async () => {
    const token = await getToken();
    if (!token) return;

    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/agents`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAgents(res.data);
    } catch (err) {
      Alert.alert("Error", err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.agentName}>{item.name}</Text>
      <Text style={styles.agentEmail}>{item.email}</Text>
      <Text style={styles.agentMobile}>{item.mobile}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Add Agent</Text>

      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Mobile"
        style={styles.input}
        value={mobile}
        onChangeText={setMobile}
        keyboardType="phone-pad"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={addAgent}>
        <Text style={styles.buttonText}>Add Agent</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#007bff" }]}
        onPress={fetchAgents}
      >
        <Text style={styles.buttonText}>Refresh Agents</Text>
      </TouchableOpacity>

      {loading && (
        <ActivityIndicator
          size="large"
          color="#5edc1f"
          style={{ marginTop: 10 }}
        />
      )}

      <Text style={styles.heading}>Agents List</Text>

      <FlatList
        nestedScrollEnabled={true}
        data={agents}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f2f2f2" },
  heading: { fontSize: 20, fontWeight: "bold", marginVertical: 10, color: "#333" },
  input: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    backgroundColor: "#5edc1f",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  agentName: { fontWeight: "bold", fontSize: 16, color: "#333" },
  agentEmail: { fontSize: 14, color: "#555" },
  agentMobile: { fontSize: 14, color: "#555" },
});
