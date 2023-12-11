import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from "react-native";
import { auth } from "../firebase.config"; // Assuming you have your Firebase configuration correctly set up in 'firebase.config'
import { sendPasswordResetEmail } from "firebase/auth";

/**
 * ForgotPassword is a React component representing the screen for handling
 * password recovery. It allows users to reset their password via email.
 *
 * @param {object} navigation - React Navigation object for navigation control.
 */
const ForgotPassword = ({ navigation }) => {
  const [emailPrefix, setEmailPrefix] = useState("");
  const [sentPasswordReset, setPasswordReset] = useState(false);
  const defaultEmailDomain = "@scarletmail.rutgers.edu";
  const email = emailPrefix + defaultEmailDomain;

 /**
  * handleForgotPassword is an asynchronous function that initiates the process
  * of sending a password reset email to the specified email address. It sets a
  * state flag to indicate that a password reset email has been sent and navigates
  * to the login screen after a brief delay.
  */
  const handleForgotPassword = async () => {
    // Send a password reset email to the specified email address
    await sendPasswordResetEmail(auth, email);

    // Set a state flag to indicate that a password reset email has been sent
    setPasswordReset(true);

    // Navigate to the login screen after a brief delay (3 seconds)
    setTimeout(() => {
      navigation.navigate("LoginScreen");
    }, 3000);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={[styles.logoContainer]}>
        <Image
          source={require("../assets/RUGoing_Logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      {sentPasswordReset && (
        <Text style={styles.infoText}>
          If this user exists, we have sent you an email to reset your password.
        </Text>
      )}
      <View style={styles.inputContainer}>
        <View style={styles.emailInputContainer}>
          <TextInput
            style={styles.emailInput}
            placeholder="netID"
            value={emailPrefix}
            onChangeText={setEmailPrefix}
          />
          <Text style={styles.fixedEmailText}>@scarletmail.rutgers.edu</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Reset My Password</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginbutton}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
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
  infoText: {
    marginBottom: 16,
    color: "green",
  },
  inputContainer: {
    marginBottom: 12,
    width: "80%",
  },
  emailInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  emailInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    padding: 8,
    borderRadius: 15,
  },
  fixedEmailText: {
    marginLeft: 8,
    color: "#FF392E",
  },
  forgotPasswordButton: {
    backgroundColor: "#FF392E",
    padding: 10,
    width: "80%",
    borderRadius: 15,
  },
  forgotPasswordText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
  loginButtonText: {
    color: "#FF392E",
    textAlign: "center",
    fontSize: 18,
  },
  loginbutton: {
    marginTop: 12,
    backgroundColor: "white",
    padding: 10,
    width: "80%",
    borderRadius: 15,
  },
  logoContainer: {
    position: "absolute",
    top: 260,
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 90,
  },
});

export default ForgotPassword;
