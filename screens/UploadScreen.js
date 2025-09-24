import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";

const API_URL = "http://192.168.1.3:8000"; // Replace with your backend URL

export default function UploadScreen() {
  const [lists, setLists] = useState({});
  const [loading, setLoading] = useState(false);

  const pickFile = async () => {
    const res = await DocumentPicker.getDocumentAsync({ type: "text/csv" });
    if (res.type === "success") {
      const uri = res.uri;
      const name = uri.split("/").pop();
      const form = new FormData();
      form.append("file", { uri, name, type: "text/csv" });
      try {
        setLoading(true);
        const upload = await axios.post(`${API_URL}/api/upload`, form, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${global.token}`,
          },
        });
        setLists(upload.data.grouped || {});
        Alert.alert("Success", "File uploaded successfully!");
      } catch (err) {
        console.error(err);
        Alert.alert("Error", err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const renderItem = ({ item }) => {
    const group = lists[item];
    return (
      <View style={styles.card}>
        <Text style={styles.agentName}>{group.agent?.name || "Agent"}</Text>
        {group.items?.map((it) => (
          <Text key={it._id} style={styles.itemText}>
            {it.firstName} - {it.phone}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.uploadButton} onPress={pickFile}>
        <Text style={styles.uploadButtonText}>Pick & Upload CSV</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#5edc1f" style={{ marginTop: 20 }} />}

      <FlatList
        data={Object.keys(lists)}
        keyExtractor={(k) => k}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 90,
    backgroundColor: "#f2f2f2",
  },
  uploadButton: {
    backgroundColor: "#5edc1f",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  uploadButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  agentName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  itemText: {
    fontSize: 14,
    color: "#555",
    marginLeft: 10,
  },
});
