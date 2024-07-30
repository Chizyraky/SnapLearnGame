import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WordsScreen from '../components/words/WordsScreen';
import PlayScreen from '../components/play/PlayScreen';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Words') {
            return <MaterialIcons name="assignment-add" size={size} color={color} />;
          } else if (route.name === 'Play') {
            return <FontAwesome name="play" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Words" component={WordsScreen} />
      <Tab.Screen name="Play" component={PlayScreen} />
    </Tab.Navigator>
  );
}

export default AppNavigator;
