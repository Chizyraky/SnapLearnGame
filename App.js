import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigator/AppNavigator";
import { auth } from "./src/firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import LoginNavigation from "./src/components/authentication/navigation/LoginNavigation";
import { ActivityIndicator, View } from "react-native";

export default function App() {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return loading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="tomato" />
    </View>
  ) : user ? (
    <NavigationContainer>
      <AppNavigator user={user} />
    </NavigationContainer>
  ) : (
    <LoginNavigation />
  );
}
