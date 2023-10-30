import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import HomeScreen from "./HomeScreen";
import ExploreScreen from "./ExploreScreen";
import ProfileScreen from "./ProfileScreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import EventProfileScreen from "./EventProfileScreen";
import OrganizationsScreen from "./OrganizationsScreen";

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  return (
    <>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            paddingBottom: 0,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) => {
              return (
                <FontAwesomeIcon icon={faHouse} size={size} color={color} />
              );
            },
            title: "",
            headerTitle: "Home",
          }}
        />
        <Tab.Screen
          name="Explore"
          component={ExploreScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) => {
              return (
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  size={size}
                  color={color}
                />
              );
            },
            title: "",
            headerTitle: "Explore",
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) => {
              return (
                <FontAwesomeIcon icon={faUser} size={size} color={color} />
              );
            },
            title: "",
            headerTitle: "Profile",
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
