import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Button } from "@rneui/base";
import { auth } from "../firebase.config";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { reloadAsync } from "expo-updates";

const SettingsScreen = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    signOut(auth);
    reloadAsync();
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.customButtonContainer}
        onPress={handleLogout}
      >
        <Text style={styles.customButtonText}>Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <View style={styles.editProfileButton}>
          <Text style={styles.editProfileButtonText}>Edit Profile</Text>
        </View>
      </TouchableOpacity>
    </View>
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
  editProfileButton: {
    backgroundColor: "#FF392E",
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
    height: 50,
    justifyContent: "center",
  },
  editProfileButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    alignItems: "center",
  },
});

export default SettingsScreen;
