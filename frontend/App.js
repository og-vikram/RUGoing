import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./views/LoginScreen";
import MainScreen from "./views/MainScreen";
import ForgotPassword from "./views/ForgetPassword";
import { createStackNavigator } from "@react-navigation/stack";
import CreateAccountScreen from "./views/CreateAccountScreen";
import {
  onAuthStateChanged,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase.config";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./views/HomeScreen";
import ExploreScreen from "./views/ExploreScreen";
import ProfileScreen from "./views/ProfileScreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Alert, SafeAreaView, Text } from "react-native";
import { Button } from "@rneui/themed";
import { reloadAsync } from "expo-updates";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // console.log("user", user);
      }
    });
  }, []);

  if (user && !user.emailVerified) {
    return (
      <SafeAreaView>
        <Text>Verify your email</Text>
        <Button
          onPress={() => {
            sendEmailVerification(auth.currentUser);
            Alert.alert("Email sent", "Check your email for verification");
          }}
        >
          Verify
        </Button>
        <Button onPress={() => reloadAsync()}>I've verified!</Button>
        <Button onPress={() => signOut(auth)}>Sign out</Button>
      </SafeAreaView>
    );
  } else if (user && user.emailVerified) {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              paddingBottom: 0,
            },
            headerShown: true,
            headerTintColor: "#FF392E",
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color, size, focused }) => {
                return (
                  <FontAwesomeIcon
                    icon={faHouse}
                    size={size}
                    color={"#FF392E"}
                  />
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
                    color={"#FF392E"}
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
                  <FontAwesomeIcon
                    icon={faUser}
                    size={size}
                    color={"#FF392E"}
                  />
                );
              },
              title: "",
              headerTitle: "Profile",
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{ headerShown: false, gestureEnabled: false }}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
