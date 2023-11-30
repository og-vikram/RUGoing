import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { auth } from "../firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Alert } from "react-native";

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [logoTop, setLogoTop] = useState(210);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );
      if (!userCredential.user.emailVerified) {
        Alert.alert("Please verify your email");
        return;
      }
      // console.log("User logged in:", userCredential.user);
    } catch (error) {
      console.log(error);
      if (error.code === "auth/invalid-login-credentials") {
        Alert.alert("Invalid login credentials");
      }
    }
  };

  const keyboardDidShowListener = Keyboard.addListener(
    "keyboardDidShow",
    () => {
      setLogoTop(40);
    }
  );
  const keyboardDidHideListener = Keyboard.addListener(
    "keyboardDidHide",
    () => {
      setLogoTop(210);
    }
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={[styles.logoContainer, { top: logoTop }]}>
        <Image
          source={require("../assets/Screenshot_(276)-transformed.png")}
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
        style={styles.accountButton}
        onPress={() => navigation.navigate("CreateAccount")}
      >
        <Text style={styles.accountButtonText}>Create Account</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#E6E6E6",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
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
    top: 160, // Adjust to move the logo higher
    alignItems: "center",
  },
  logo: {
    width: 300, // Adjust to make the logo smaller
    height: 90, // Adjust to make the logo smaller
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
  accountButton: {
    backgroundColor: "white",
    padding: 15,
    marginTop: 11,
    width: "80%",
    alignItems: "center",
    borderRadius: 15,
  },
  accountButtonText: {
    color: "#FF392E",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginPage;
