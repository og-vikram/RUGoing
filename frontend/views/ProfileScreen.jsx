import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Button } from "@rneui/base";
import { auth } from "../firebase.config";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { reloadAsync } from "expo-updates";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    signOut(auth);
    reloadAsync();
  };

  return (
    <TouchableOpacity
      style={styles.customButtonContainer}
      onPress={handleLogout}
    >
      <Text style={styles.customButtonText}>Logout</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  customButtonContainer: {
    backgroundColor: "#FF392E",
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
});

export default ProfileScreen;
