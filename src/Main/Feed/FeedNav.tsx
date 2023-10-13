import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Feed } from "./Feed";
import ActiveWorkout from "@Main/ActiveWorkout";

// import { requestPermissions } from "expo-sample-pedometer";

const Stack = createNativeStackNavigator();

export const FeedNav = () => {
  useEffect(() => {
    // requestPermissions();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "purple",
        },
        headerTitleStyle: {
          color: "white",
        },
      }}
    >
      <Stack.Screen
        name="FeedScreen"
        component={Feed}
        options={{
          headerTitle: "Feed",
        }}
      />
      <Stack.Screen
        name="ActiveWorkout"
        component={ActiveWorkout}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
