import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { auth } from '../firebase.config'; // Assuming you have your Firebase configuration correctly set up in 'firebase.config'
import {sendPasswordResetEmail} from "firebase/auth";




const ForgotPassword = ({ navigation }) => {
  const [emailPrefix, setEmailPrefix] = useState('');
  const [sentPasswordReset, setPasswordReset] = useState(false);

  const defaultEmailDomain = "@scarletmail.rutgers.edu";
  const email = emailPrefix + defaultEmailDomain;


  const handleForgotPassword = async () => {

    await sendPasswordResetEmail(auth, email);
    
    setPasswordReset(true);
    setTimeout(() => {
      navigation.navigate('LoginScreen');
    }, 3000);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
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
          <Text style={styles.fixedText}>@scarletmail.rutgers.edu</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleForgotPassword}
      >
        <Text style={styles.buttonText}>Reset My Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoText: {
    marginBottom: 16,
    color: 'green',
  },
  inputContainer: {
    marginBottom: 12,
    width: '80%',
  },
  emailInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  emailInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
  },
  fixedText: {
    marginLeft: 8,
    color: 'black',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default ForgotPassword;
