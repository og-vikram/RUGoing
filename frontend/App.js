import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./views/LoginScreen";
import MainScreen from "./views/MainScreen";
import ForgotPassword from "./views/ForgetPassword";
import { createStackNavigator } from "@react-navigation/stack";
import CreateAccountScreen from "./views/CreateAccountScreen";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.config";

const Stack = createNativeStackNavigator();
export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log("user", user);
      } 
    });
  }, []);

  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Main"
          screenOptions={{ headerShown: false, gestureEnabled: false }}
        >
          <Stack.Screen name="Main" component={MainScreen} />
        </Stack.Navigator>
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
