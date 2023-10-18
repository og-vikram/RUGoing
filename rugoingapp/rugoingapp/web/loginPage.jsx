import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { FIREBASE_AUTH } from "../firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = FIREBASE_AUTH;


  const handleForgotPassword = () => {
    // Add your forgot password logic here
    console.log("Forgot password for:", username);
  };

  const logIn = async () =>{
    setLoading(true);
    try{
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error){
      console.log(error);
      alert('Sign in failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

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
        <Button title="Login" onPress={logIn} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Create Account" onPress={() => navigation.navigate('AccountCreationPage')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Forgot Password" onPress={handleForgotPassword} />
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

export default LoginPage;
