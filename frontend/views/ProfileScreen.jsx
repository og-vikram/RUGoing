import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase.config";
import { signOut } from "firebase/auth";
import { reloadAsync } from "expo-updates";
import { Card } from "@rneui/themed";
import { Button, Icon } from "react-native-elements";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "./SettingsScreen";
import ProfileDetails from "./ProfileDetails";

const ProfileScreen = ({ navigation }) => {
  const handleLogout = () => {
    signOut(auth);
    reloadAsync();
  };

  const ProfileStack = createNativeStackNavigator();
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileDetails"
        component={ProfileDetails}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
        }}
      />
    </ProfileStack.Navigator>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#FF392E",
  },
  customButtonContainer: {
    backgroundColor: "#FF392E",
    marginTop: 10,
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
    height: 50,
    justifyContent: "center",
  },
  customButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    alignItems: "center",
  },
  cardContainer: {
    // marginTop: 20,
    width: "100%",
    backgroundColor: "#FF392E",
  },
  eventsCard: {
    backgroundColor: "#FF392E",
    borderRadius: 15,
    alignSelf: "center",
    height: "35%",
    width: "95%",
    justifyContent: "center",
    marginTop: "2.5%",
  },
  orgsCard: {
    backgroundColor: "white",
    borderRadius: 15,
    alignSelf: "center",
    height: "35%",
    width: "95%",
    justifyContent: "center",
    marginTop: "2.5%",
  },
  eventHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginTop: "3%",
  },
  orgHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF392E",
    textAlign: "center",
    marginTop: "3%",
  },
  eventsMiniCards: {
    width: 100,
    height: 100,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 15,
  },
  orgsMiniCards: {
    width: 100,
    height: 100,
    backgroundColor: "#FF392E",
    margin: 10,
    borderRadius: 15,
  },
});

export default ProfileScreen;
