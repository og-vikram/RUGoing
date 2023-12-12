import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./views/LoginScreen";
import ForgotPassword from "./views/ForgetPassword";
import CreateAccountScreen from "./views/CreateAccountScreen";
import {
  onAuthStateChanged,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase.config";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreenStack } from "./views/HomeScreen";
import ExploreScreen from "./views/ExploreScreen";
import ProfileScreen from "./views/ProfileScreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { reloadAsync } from "expo-updates";

//Create native stack and bottom tab navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Main app component
export default function App() {
  //State variable to track the user's authentification status
  const [user, setUser] = useState(null);

  //Check the user's authentification status on component mount
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  //If the user is authentificated but email is not verified, prompt verification
  if (user && !user.emailVerified) {
    return (
      <SafeAreaView>
        <View>
          <Text
            style={{
              textAlign: "center",
              marginTop: "3%",
              color: "#FF392E",
              fontWeight: "bold",
              fontSize: 26,
            }}
          >
            Please verify your email
          </Text>
        </View>
        <View style={{ backgroundColor: "#E6E6E6", height: "100%" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "red",
              borderRadius: 15,
              marginTop: "3%",
              padding: "3%",
              alignItems: "center",
            }}
            onPress={() => {
              sendEmailVerification(auth.currentUser);
              Alert.alert("Email sent", "Check your email for verification");
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Verify
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "red",
              borderRadius: 15,
              marginTop: "3%",
              padding: "3%",
              alignItems: "center",
            }}
            onPress={() => reloadAsync()}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {" "}
              I've verified!
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "red",
              borderRadius: 15,
              marginTop: "3%",
              padding: "3%",
              alignItems: "center",
            }}
            onPress={() => signOut(auth)}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
    //If the user is authenticated and email is verified, display the main navigation
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
            component={HomeScreenStack}
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

  //If the user is not authenticated, display the authentication stack
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
