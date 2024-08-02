import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { registerUser } from "../../../firebase/Authentication";

export function Registration({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await registerUser(email, password);
      navigation.goBack();
    } catch (error) {
      Alert.alert("Login Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SnapLearn</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={[
          styles.registerButton,
          !email || !password || !confirmPassword
            ? styles.registerButtonDisabled
            : {},
        ]}
        onPress={handleRegister}
        disabled={!email || !password || !confirmPassword}
      >
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Already have an account?{" "}
        <Text style={styles.loginLink} onPress={() => navigation.goBack()}>
          Login here
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "tomato",
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
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  loginText: {
    marginTop: 20,
    textAlign: "center",
  },
  loginLink: {
    color: "tomato",
    fontWeight: "bold",
  },
  registerButton: {
    width: "100%",
    height: 50,
    backgroundColor: "tomato",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  registerButtonDisabled: {
    backgroundColor: "gray",
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
