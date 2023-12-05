import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  Keyboard,
} from "react-native";
import { auth } from "../firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Switch } from "react-native";
import { getAuth } from "firebase/auth";
import firebase from "firebase/app";
import { Icon } from "react-native-elements";
import MyModal from './MyModal';

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
  const [logoTop, setLogoTop] = useState(90);

  const email = emailPrefix + defaultEmailDomain;

  const handleSwitchChange = (value) => {
    setIsOfficer(value);

    if (isOfficer == false) {
      setLogoTop(70);
    } else {
      setLogoTop(90);
    }
  };

  const keyboardDidShowListener = Keyboard.addListener(
    "keyboardDidShow",
    () => {
      setLogoTop(80);
    }
  );
  const keyboardDidHideListener = Keyboard.addListener(
    "keyboardDidHide",
    () => {
      setLogoTop(90);
    }
  );

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

        fetch(`https://absolute-willing-salmon.ngrok-free.app/api/users/add/`, {
          method: "POST",
          body: JSON.stringify({
            uid: userCredential.user.uid,
            netid: userCredential.user.email.split("@")[0],
            firstName: firstName,
            lastName: lastName,
            isOfficer: isOfficer,
          }),
        });

        navigation.navigate("LoginScreen");
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    }
  };

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  return (
    <View style={styles.container}>
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
        <Text style={{ color: "#FF392E", fontSize: 15 }}>
          Are you an organization officer?
        </Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>No</Text>
          <Switch
            value={isOfficer}
            onValueChange={handleSwitchChange}
            trackColor={{ false: "blue", true: "#FF392E" }}
          />
          <Text style={styles.switchText}>Yes</Text>
        </View>
        {isOfficer && (
          <View style={styles.inputSwitchContainer}>
            <TextInput
              placeholder="Please enter the organization name"
              style={styles.input}
              value={organizationName}
              onChangeText={(text) => setOrganizationName(text)}
            />
          </View>
        )}
      </View>
      
      <TouchableOpacity style={styles.signupButton} onPress={openModal}>
        <Text style={styles.signupButtonText}>Next</Text>
      </TouchableOpacity>

      <MyModal
        isVisible={modalVisible}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
        onSignupClick={handleSubmit}
      />
      
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    position: "absolute",
    top: 160, // Adjust to move the logo higher
    alignItems: "center",
  },
  logo: {
    width: 300, // Adjust to make the logo smaller
    height: 120, // Adjust to make the logo smaller
  },
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
  inputSwitchContainer: {
    marginTop: 12,
    width: "100%",
  },
  emailInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderRadius: 15,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 8,
    width: "100%",
    borderRadius: 15,
  },
  emailInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    padding: 8,
    borderRadius: 15,
  },
  fixedText: {
    marginLeft: 8,
    color: "#FF392E",
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
    color: "#FF392E",
  },
  signupButton: {
    backgroundColor: "#FF392E",
    padding: 15,
    marginTop: 10,
    width: "80%",
    alignItems: "center",
    borderRadius: 15,
  },
  signupButtonText: {
    color: "#E6E6E6",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginButton: {
    backgroundColor: "white",
    padding: 15,
    marginTop: 10,
    width: "80%",
    alignItems: "center",
    borderRadius: 15,
  },
  loginButtonText: {
    color: "#FF392E",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CreateAccountScreen;
