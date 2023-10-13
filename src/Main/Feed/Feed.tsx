import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import auth from '@react-native-firebase/auth';
import db, { FirebaseDatabaseTypes } from "@react-native-firebase/database"
import { StatusBar } from "expo-status-bar";

import CTAButton from "@Components/CTAButton";
import ListItem from "@Components/ListItem";
import { FeedWorkout } from "@Types/FeedWorkout";

export const Feed = () => {
  const nav = useNavigation<NativeStackNavigationProp<any>>();

  const [feed, setFeed] = useState<FeedWorkout[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [limit, setLimit] = useState(5);

  const onWorkoutChange = (snapshot: FirebaseDatabaseTypes.DataSnapshot) => {
    if (snapshot.val()) {
      const values: FeedWorkout[] = Object.values(snapshot.val())
      values.sort((a, b) => b.date - a.date)
      setFeed(values)
    }
  }

  useEffect(() => {
    const currentUser = auth().currentUser;
    const refPath = `/users/${currentUser?.uid}/sessions`
    db()
      .ref(refPath)
      .orderByKey()
      .limitToLast(limit)
      .on("value", onWorkoutChange)

    return () => db().ref(refPath).off("value", onWorkoutChange)

  }, [limit]);

  const goToWorkout = () => {
    nav.push("ActiveWorkout");
  };

  const onPress = async (id: number) => {
    const currentUser = auth().currentUser!;
    db()
      .ref(`/users/${currentUser.uid}/sessions/${id}`)
      .set(null);
  };

  const renderItem = (listData: ListRenderItemInfo<FeedWorkout>) => {
    return <ListItem {...listData} onPress={onPress} />;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor="purple" />
      <Text style={styles.userBlock}>
        Account:{" "}
        <Text>
          {auth().currentUser?.email}
        </Text>
      </Text>
      <FlatList
        data={feed}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
      />
      <View style={styles.buttonContainer}>
        <CTAButton variant="primary" title="START WALK" onPress={goToWorkout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  userBlock: {
    margin: 5,
    padding: 20,
    backgroundColor: "#9296ff",
    borderRadius: 5
  }
});
