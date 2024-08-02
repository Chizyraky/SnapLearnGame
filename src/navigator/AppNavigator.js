import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WordsScreen from "../components/words/WordsScreen";
import PlayScreen from "../components/play/PlayScreen";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Text } from "react-native";
import { logoutUser } from "../firebase/Authentication";

const Tab = createBottomTabNavigator();

function AppNavigator({ user }) {
  // This should be removed at some point. This is just to let you know that the user is being passed to the AppNavigator.
  console.info("user:", user.uid);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Words") {
            return (
              <MaterialIcons name="assignment-add" size={size} color={color} />
            );
          } else if (route.name === "Play") {
            return <FontAwesome name="play" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        headerRight: () => (
          <Text
            style={{ color: "tomato", fontSize: 18, marginRight: 15 }}
            onPress={() => logoutUser()}
          >
            Logout
          </Text>
        ),
      })}
    >
      <Tab.Screen name="Words" component={WordsScreen} />
      <Tab.Screen name="Play" component={PlayScreen} />
    </Tab.Navigator>
  );
}

export default AppNavigator;
