import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "./SettingsScreen";
import ProfileDetails from "./ProfileDetails";
import EventProfileScreen from "./EventProfileScreen";
import OrganizationProfileScreen from "./OrganizationProfileScreen";
import FriendProfileScreen from "./FriendProfileScreen";

/**
 * ProfileScreen is a React component representing the user profile screen
 * in the application. It receives a navigation prop for navigating within
 * the app and may include components for displaying user details, posts,
 * followers, and other profile-related information.
 *
 * @param {object} navigation - Navigation prop for navigating within the app.
 */
const ProfileScreen = ({ navigation }) => {

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
      <ProfileStack.Screen
        name="Event Profile"
        component={EventProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name="Org Profile"
        component={OrganizationProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name="Friend Profile"
        component={FriendProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </ProfileStack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default ProfileScreen;
