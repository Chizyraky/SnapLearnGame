import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { loginUser } from "../../../firebase/Authentication";

export function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Email and password are required.");
      return;
    }
    try {
      const user = await loginUser(email, password);
    } catch (error) {
      Alert.alert("Login Error", error.message);
      return;
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate("Registration");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SnapLearn</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TouchableOpacity
        style={[
          styles.loginButton,
          !email || !password ? styles.loginButtonDisabled : {},
        ]}
        onPress={handleLogin}
        disabled={!email || !password}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCreateAccount}>
        <Text style={styles.createAccountText}>Create an account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "tomato",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 18,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "tomato",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  loginButtonDisabled: {
    backgroundColor: "gray",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  createAccountText: {
    color: "gray",
    fontSize: 16,
  },
});
