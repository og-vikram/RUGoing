import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Image, TouchableOpacity, Keyboard,} from "react-native";
import { auth } from "../firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Alert } from "react-native";

/**
 * LoginPage is a React component representing the login screen.
 *
 * @param {object} navigation - React Navigation object for navigation control.
 */
const LoginPage = ({ navigation }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [logoTop, setLogoTop] = useState(210);

  /**
   * handleLogin is an asynchronous function that attempts to log in
   * a user using provided credentials (username and password). It checks
   * if the user's email is verified and displays alerts accordingly.
   */
  const handleLogin = async () => {
    try {
      // Attempt to sign in with the provided username and password
      const userCredential = await signInWithEmailAndPassword(auth, username, password);

      // Check if the user's email is not verified
      if (!userCredential.user.emailVerified) {
        // Display an alert prompting the user to verify their email
        Alert.alert("Please verify your email");
        return;
      }
    } catch (error) {
      console.log(error);

      // Handle specific errors and display appropriate alerts
      if (error.code === "auth/invalid-login-credentials") {
        Alert.alert("Invalid login credentials");
      }
    }
  };

  /**
   * Add a keyboard event listener for the "keyboardDidShow" event
   * to adjust the position of the logo when the keyboard is displayed.
   */
  const keyboardDidShowListener = Keyboard.addListener(
    "keyboardDidShow",
    () => {
      // Set the top position of the logo when the keyboard is displayed
      setLogoTop(40);
    }
  );

  /**
   * Add a keyboard event listener for the "keyboardDidHide" event
   * to adjust the position of the logo when the keyboard is hidden.
   */
  const keyboardDidHideListener = Keyboard.addListener(
    "keyboardDidHide",
    () => {
      // Set the top position of the logo when the keyboard is hidden
      setLogoTop(210);
    }
  );


  return (
    <KeyboardAvoidingView style={styles.mainContainer} behavior="height">
      <View style={[styles.logoContainer, { top: logoTop }]}>
        <Image
          source={require("../assets/RUGoing_Logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.forgotPasswordContainer}>
          <Text
            style={styles.forgotPasswordText}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            Forgot Password?
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.createAccountButton}
        onPress={() => navigation.navigate("CreateAccount")}
      >
        <Text style={styles.createAccountButtonText}>Create Account</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#E6E6E6",
  },
  inputContainer: {
    marginBottom: 12,
    width: "80%",
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 8,
    width: "100%",
    color: "#4A4A4A",
    borderRadius: 15,
  },
  logoContainer: {
    position: "absolute",
    top: 160,
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 90,
  },
  forgotPasswordContainer: {
    marginTop: 5,
    alignItems: "flex-end",
  },
  forgotPasswordText: {
    color: "#FF392E",
  },
  loginButton: {
    backgroundColor: "#FF392E",
    padding: 15,
    marginTop: 10,
    width: "80%",
    alignItems: "center",
    borderRadius: 15,
  },
  loginButtonText: {
    color: "#E6E6E6",
    fontSize: 16,
    fontWeight: "bold",
  },
  createAccountButton: {
    backgroundColor: "white",
    padding: 15,
    marginTop: 11,
    width: "80%",
    alignItems: "center",
    borderRadius: 15,
  },
  createAccountButtonText: {
    color: "#FF392E",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginPage;
