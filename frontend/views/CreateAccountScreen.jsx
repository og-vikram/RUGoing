import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { auth } from "../firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Switch } from "react-native";
import { getAuth } from "firebase/auth";
import firebase from "firebase/app";

const CreateAccountScreen = ({ navigation }) => {
  const defaultEmailDomain = "@scarletmail.rutgers.edu";

  const [emailPrefix, setEmailPrefix] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [isInvalidEmail, setInvalidEmail] = useState(false);
  const [isInvalidFirstName, setInvalidFirstName] = useState(false);
  const [isInvalidLastName, setInvalidLastName] = useState(false);
  const [isInvalidPassword, setInvalidPassword] = useState(false);
  const [isPasswordMismatch, setPasswordMismatch] = useState(false);
  const [isOfficer, setIsOfficer] = useState(false);
  const [organizationName, setOrganizationName] = useState("");

  const email = emailPrefix + defaultEmailDomain;

  const isValidEmail = () => {
    const emailRegex = /^[^\s@]+@scarletmail\.rutgers\.edu$/;
    return emailRegex.test(email);
  };

  const isValidName = (name) => {
    return /^[a-zA-Z]+$/.test(name);
  };

  const isValidPassword = () => {
    // Check if the password contains at least one uppercase letter, one number, and one special character
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%&])[A-Za-z\d@!#$%&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async () => {
    if (!isValidEmail()) {
      setInvalidEmail(true);
      return;
    } else {
      setInvalidEmail(false);
    }

    if (!isValidName(firstName)) {
      setInvalidFirstName(true);
      return;
    } else {
      setInvalidFirstName(false);
    }

    if (!isValidName(lastName)) {
      setInvalidLastName(true);
      return;
    } else {
      setInvalidLastName(false);
    }

    if (!isValidPassword()) {
      setInvalidPassword(true);
      return;
    } else {
      setInvalidPassword(false);
    }

    if (
      isValidEmail &&
      isValidName(firstName) &&
      isValidName(lastName) &&
      isValidPassword()
    ) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log(user);

        navigation.navigate("LoginScreen");
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <View style={styles.inputContainer}>
        <Text>First Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={(text) => setFirstname(text)}
        />
        {isInvalidFirstName && (
          <Text style={styles.invalidText}>
            Invalid First Name. Please enter a valid name.
          </Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <Text>Last Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={(text) => setLastname(text)}
        />
        {isInvalidLastName && (
          <Text style={styles.invalidText}>
            Invalid Last Name. Please enter a valid name.
          </Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <Text>Email Address:</Text>
        <View style={styles.emailInputContainer}>
          <TextInput
            style={styles.emailInput}
            placeholder="NetID"
            value={emailPrefix}
            onChangeText={(text) => setEmailPrefix(text)}
          />
          <Text style={styles.fixedText}>{defaultEmailDomain}</Text>
        </View>
        {isInvalidEmail && (
          <Text style={styles.invalidText}>
            Invalid Email. Please enter a valid email address.
          </Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <Text>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        {isInvalidPassword && (
          <Text style={styles.invalidText}>
            Password must contain at least one uppercase letter, one number, and
            one special character (@, !, #, $, %, &).
          </Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <Text>Confirm Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        {isPasswordMismatch && (
          <Text style={styles.invalidText}>
            Passwords do not match. Please try again.
          </Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <Text>Are you an organization officer?</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>No</Text>
          <Switch
            value={isOfficer}
            onValueChange={(value) => setIsOfficer(value)}
          />
          <Text style={styles.switchText}>Yes</Text>
        </View>
        {isOfficer && (
          <View>
            <Text>Please enter the organization name:</Text>
            <TextInput
              style={styles.input}
              value={organizationName}
              onChangeText={(text) => setOrganizationName(text)}
            />
          </View>
        )}
      </View>
      <Button title="Sign Up" onPress={handleSubmit} />
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
  emailInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 8,
    width: "100%",
  },
  emailInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    padding: 8,
  },
  fixedText: {
    marginLeft: 8,
  },
  invalidText: {
    color: "red",
    marginTop: 5,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchText: {
    marginHorizontal: 10,
  },
});

export default CreateAccountScreen;
