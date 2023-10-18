import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Add your login logic here
    console.log("Logging in with:", username, password);
  };

  const handleForgotPassword = () => {
    // Add your forgot password logic here
    console.log("Forgot password for:", username);
  };

  return (
    <View style={styles.container}>
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
        <Button
          title="Login"
          onPress={() => navigation.navigate("OrganizationInfoPage")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Create Account"
          onPress={() => navigation.navigate("AccountCreationPage")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Forgot Password" onPress={handleForgotPassword} />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Use as Guest"
          onPress={() => navigation.navigate("Main")}
        />
      </View>
    </View>
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

export default LoginScreen;
