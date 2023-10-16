import React, { useState } from "react";
import { Button, TextInput, StyleSheet } from "react-native";

const AccountCreationPage = () => {

  const defaultEmailDomain = "@scarletmail.rutgers.edu";

  const [emailPrefix, setEmailPrefix] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");

  const email = emailPrefix + defaultEmailDomain;
  

  const handleSubmit = async () => {
    if(password == confirmPassword){
    const response = await fetch("http://localhost:5000/create_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({firstName, lastName, email, password }),
    });

    if (response.status === 201) {
      // Account created successfully
    } else {
      // Something went wrong
    }
    }
  };


  return (
    <div style = {styles.container}>
      <h1>Create an Account</h1>
      <div style = {styles.inputContainer}>
        <label> First Name: </label>
        <TextInput
          style = {styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={(text) => setFirstname(text)}
        />
      </div>
      <div style = {styles.inputContainer}>
        <label> Last Name: </label>
        <TextInput
          style = {styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={(text) => setLastname(text)}
        />
      </div>
      <div style = {styles.inputContainer}>
        <label> Email Address: </label>
        <div style = {styles.emailInputContainer}>
          <TextInput
            style = {styles.emailInput}
            placeholder="NetID"
            value={emailPrefix}
            onChangeText={(text) => setEmailPrefix(text)}
          />
          <span style={styles.fixedText}>{defaultEmailDomain}</span>
        </div>
      </div>
      <div style = {styles.inputContainer}>
        <label>Password:</label>
        <TextInput
          style = {styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </div>
      <div style = {styles.inputContainer}>
        <label> Confirm Password: </label>
        <TextInput
          style = {styles.input}
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
      </div>
      <Button title="Sign Up" onPress={handleSubmit} />
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center", 
    padding: 16,
  },
  inputContainer: {
    marginBottom: 12,
    width: "80%",
  },
  emailInputContainer: {
    display: "flex",
    flexDirection:"row",
    alignItems: "center",
    width: "100%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 8,
    width: "100%"
  },
  emailInput: {
    flex: 1,
    height: 40,
    border: "1px solid gray",
    padding: 8,
  },
  fixedText:{
    marginLeft: 8.
  },
});

export default AccountCreationPage;
