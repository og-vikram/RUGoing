import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "@rneui/base";
import { auth } from "../firebase.config";
import { signOut } from "firebase/auth";

const ProfileScreen = ({ navigation }) => {
  const handleLogout = () => {
    signOut(auth).then(navigation.navigate());
  };

  return (
    <View>
      <Button onPress={handleLogout}>Logout</Button>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
