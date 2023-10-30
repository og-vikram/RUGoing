import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { auth } from "../firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Alert } from "react-native";

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
      console.log("User logged in:", userCredential.user);
    } catch (error) {
      console.log(error);
      if (error.code === "auth/invalid-login-credentials") {
        Alert.alert("Invalid login credentials");
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <Text style={styles.title}>Login</Text>
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
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Create Account"
          onPress={() => navigation.navigate("CreateAccount")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Forgot Password"
          onPress={() => navigation.navigate("ForgotPassword")}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
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
    borderColor: "gray",
    borderWidth: 1,
    padding: 8,
    width: "100%",
  },
  buttonContainer: {
    marginTop: 10,
    width: "80%",
  },
});

export default LoginPage;
