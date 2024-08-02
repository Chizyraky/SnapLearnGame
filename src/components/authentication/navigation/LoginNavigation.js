import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../login/Login";
import { Registration } from "../regitration/Registration";

const Stack = createNativeStackNavigator();

export default function LoginNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{ title: "" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
