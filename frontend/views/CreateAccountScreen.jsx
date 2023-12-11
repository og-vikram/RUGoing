import React, { useState } from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Keyboard} from "react-native";
import { auth } from "../firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Switch } from "react-native";
import MyModal from "./MyModal";

/**
 * CreateAccountScreen is a React Native functional component
 * responsible for rendering the screen for creating a new account.
 *
 * @param {Object} navigation - The navigation object from React Navigation.
 *                              Used for navigating between screens.
*/

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
  const [modalVisible, setModalVisible] = useState(false);
  const [orgWarning, setOrgWarning] = useState(false);
  const [organizationName, setOrganizationName] = useState("");
  const [logoTop, setLogoTop] = useState(90);
  const email = emailPrefix + defaultEmailDomain;

  /**
   * handleSwitchChange is a function that handles the change event
   * of the club officer switch, updating state variables and adjusting the position
   * of the logo based on the new switch value.
   *
   * @param {boolean} value - The new value of the switch.
  */
  const handleSwitchChange = (value) => {

    // Update the state variable isOfficer with the new switch value
    setIsOfficer(value);

    // Check the previous value of isOfficer to determine the logo position
    if (isOfficer == false) {

      // If the user is not an officer, set the logoTop to 70
      setLogoTop(70);
    } else {

      // If the user is an officer, set the logoTop to 90
      setLogoTop(90);
    }
  };


  /**
   * keyboardDidShowListener is an event listener that responds to
   * the "keyboardDidShow" event, adjusting the position of the logo
   * when the keyboard is displayed.
  */
  const keyboardDidShowListener = Keyboard.addListener(
    "keyboardDidShow",
    () => {
      // When the keyboard is displayed, set the logoTop position to 80
      setLogoTop(80);
    }
  );

  /**
   * keyboardDidHideListener is an event listener that responds to
   * the "keyboardDidHide" event, adjusting the position of the logo
   * when the keyboard is not displayed.
  */
  const keyboardDidHideListener = Keyboard.addListener(
    "keyboardDidHide",
    () => {
      // When the keyboard is not displayed, set the logoTop position to 90
      setLogoTop(90);
    }
  );

  /**
   * isValidEmail is a function that validates whether the given email
   * follows the specific pattern for ScarletMail email addresses.
   *
   * @returns {boolean} - True if the email is valid, false otherwise.
  */
  const isValidEmail = () => {
    // Define a regular expression pattern for ScarletMail email addresses
    const emailRegex = /^[^\s@]+@scarletmail\.rutgers\.edu$/;

    // Test if the provided email matches the defined pattern
    return emailRegex.test(email);
  };

  /**
   * isValidName is a function that validates whether the given name
   * consists only of alphabetical characters (both lowercase and uppercase).
   *
   * @param {string} name - The name to be validated.
   * @returns {boolean} - True if the name is valid, false otherwise.
  */
  const isValidName = (name) => {
    // Define a regular expression pattern for validating alphabetical names
    const nameRegex = /^[a-zA-Z]+$/;

    // Test if the provided name matches the defined pattern
    return nameRegex.test(name);
  };

  /**
   * isValidPassword is a function that validates whether the given password
   * meets specific criteria, including at least one uppercase letter,
   * one digit, and one special character, and has a minimum length of 8 characters.
   *
   * @returns {boolean} - True if the password is valid, false otherwise.
  */
  const isValidPassword = () => {
    // Define a regular expression pattern for validating passwords
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%&])[A-Za-z\d@!#$%&]{8,}$/;

    // Test if the provided password matches the defined pattern
    return passwordRegex.test(password);
  };

  /**
   * handleCreateAccount is an asynchronous function that handles the
   * process of creating a new user account, including validation,
   * data submission, and navigation.
   *
   * @param {Array} perks - Array of perk preferences.
   * @param {Array} themes - Array of theme preferences.
   * @param {Array} cats_events - Array of category preferences for events.
   * @param {Array} cats_orgs - Array of category preferences for organizations.
  */
  const handleCreateAccount = async (perks, themes, cats_events, cats_orgs) => {
    //validate org officer
    if(isOfficer && organizationName.length == 0){
      setOrgWarning(true);
      return;
    }
    
    // Validate email
    if (!isValidEmail()) {
      setInvalidEmail(true);
      return;
    } else {
      setInvalidEmail(false);
    }

    // Validate first name
    if (!isValidName(firstName)) {
      setInvalidFirstName(true);
      return;
    } else {
      setInvalidFirstName(false);
    }

    // Validate last name
    if (!isValidName(lastName)) {
      setInvalidLastName(true);
      return;
    } else {
      setInvalidLastName(false);
    }

    // Validate password
    if (!isValidPassword()) {
      setInvalidPassword(true);
      return;
    } else {
      setInvalidPassword(false);
    } 

    // If all validations pass, proceed with account creation
    if (isValidEmail && isValidName(firstName) && isValidName(lastName) && isValidPassword()) {
      try {
        // Create user account
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Submit user data to the server
        await fetch(`https://absolute-willing-salmon.ngrok-free.app/api/users/add/`, {
          method: "POST",
          body: JSON.stringify({
            uid: user.uid,
            netid: user.email.split("@")[0],
            firstName: firstName,
            lastName: lastName,
            isOfficer: isOfficer,
            organization: organizationName,
          }),
        });

        // Submit event preferences to the server
        await fetch(`https://absolute-willing-salmon.ngrok-free.app/api/event/perk/preference/add/`, {
          method: "POST",
          body: JSON.stringify({
            uid: user.uid,
            perk_ids: perks,
          }),
        });

        // Submit theme preferences to the server
        await fetch(`https://absolute-willing-salmon.ngrok-free.app/api/event/theme/preference/add/`, {
          method: "POST",
          body: JSON.stringify({
            uid: user.uid,
            theme_ids: themes,
          }),
        });

        // Submit event category preferences to the server
        await fetch(`https://absolute-willing-salmon.ngrok-free.app/api/event/category/preference/add/`, {
          method: "POST",
          body: JSON.stringify({
            uid: user.uid,
            category_ids: cats_events,
          }),
        });

        // Submit organization category preferences to the server
        await fetch(`https://absolute-willing-salmon.ngrok-free.app/api/organization/category/preference/add/`, {
          method: "POST",
          body: JSON.stringify({
            uid: user.uid,
            category_ids: cats_orgs,
          }),
        });

        // Navigate to the login screen upon successful account creation
        navigation.navigate("LoginScreen");
      } catch (error) {
        // Handle errors during account creation
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    }
  };

  /**
   * openModal is a function that sets the visibility state of a modal to true,
   * triggering the display of the modal.
  */
  const openModal = () => {
    // Set the visibility state of the modal to true
    setModalVisible(true);
  };

  /**
   * closeModal is a function that sets the visibility state of a modal to false,
   * triggering the modal to close.
  */
  const closeModal = () => {
    // Set the visibility state of the modal to false
    setModalVisible(false);
  };

  return (
    <View style={styles.mainContainer}>
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
          <Text style={styles.emailDomain}>{defaultEmailDomain}</Text>
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
              placeholder="Please enter the organization ID"
              style={styles.input}
              value={organizationName}
              onChangeText={(text) => setOrganizationName(text)
              }
            />
            {orgWarning && (
                <Text style={{color: 'red'}}>Please enter a valid org ID or untoggle officer</Text>
              )}
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.signupButton} onPress={openModal}>
        <Text style={styles.signupButtonText}>Next</Text>
      </TouchableOpacity>

      <MyModal
        isVisible={modalVisible}
        closeModal={closeModal}
        handleSubmit={handleCreateAccount}
        onSignupClick={handleCreateAccount}
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
    top: 140, 
    alignItems: "center",
  },
  logo: {
    width: 300, 
    height: 90,
  },
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