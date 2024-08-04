import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WordsScreen from "../components/words/WordsScreen";
import PlayScreen from "../components/play/PlayScreen";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Text } from "react-native";
import { logoutUser } from "../firebase/Authentication";

const Tab = createBottomTabNavigator();

function AppNavigator({ user }) {
  const [isQuizActive, setIsQuizActive] = useState(false);

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
        tabBarStyle: {
          display: isQuizActive && route.name === 'Words' ? 'none' : 'flex'
        },
      })}
    >
      {isQuizActive ? (
        <Tab.Screen
          name="Play"
          children={() => <PlayScreen setIsQuizActive={setIsQuizActive} />}
        />
      ) : (
        <>
          <Tab.Screen
            name="Words"
            component={WordsScreen}
            listeners={{
              focus: () => setIsQuizActive(false),
            }}
          />
          <Tab.Screen
            name="Play"
            children={() => <PlayScreen setIsQuizActive={setIsQuizActive} />}
          />
        </>
      )}
    </Tab.Navigator>
  );
}

export default AppNavigator;
