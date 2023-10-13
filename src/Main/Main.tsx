import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import Leaderboard from "./Leaderboard";
import FeedNav from "./Feed";
import Profile from './Profile';

const Tab = createBottomTabNavigator();

export const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Leaderboard") {
            iconName = "analytics-outline" as const;
          } else {
            iconName = "newspaper-outline" as const;
          }
          return (
            <Ionicons
              name={iconName}
              size={25}
              color={focused ? "purple" : "grey"}
            />
          );
        },
        tabBarActiveTintColor: "purple",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Feed"
        component={FeedNav}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={Leaderboard}
        options={{
          headerStyle: {
            backgroundColor: "purple",
          },
          headerTitleStyle: {
            color: "white",
          },
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          headerStyle: {
            backgroundColor: "purple",
          },
          headerTitleStyle: {
            color: "white",
          },
        }}
      />
    </Tab.Navigator>
  );
};
