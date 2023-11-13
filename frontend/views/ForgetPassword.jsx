import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image,Button } from 'react-native';
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
      <View style={[styles.logoContainer]}>
        <Image
          source={require('../assets/Screenshot_(276)-transformed.png')}
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
          <Text style={styles.fixedText}>@scarletmail.rutgers.edu</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleForgotPassword}
      >
        <Text style={styles.buttonText}>Reset My Password</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginbutton}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text style={styles.loginButtonText}>Login</Text>
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
    backgroundColor: '#E6E6E6',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16, 
    color: '#FF392E',
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
    borderWidth: 1,
    padding: 8,
    borderRadius: 15,
  },
  fixedText: {
    marginLeft: 8,
    color: '#FF392E',
  },
  button: {
    backgroundColor: '#FF392E',
    padding: 10,
    width: '80%',
    borderRadius: 15,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  loginButtonText:{
    color: '#FF392E',
    textAlign: 'center',
    fontSize: 18,
  },
  loginbutton: {
    marginTop: 12,
    backgroundColor: 'white',
    padding: 10,
    width: '80%',
    borderRadius: 15,
  },
  logoContainer: {
    position: 'absolute',
    top: 260, // Adjust to move the logo higher
    alignItems: 'center',
  },
  logo: {
    width: 300, // Adjust to make the logo smaller
    height: 120, // Adjust to make the logo smaller
  },
});

export default ForgotPassword;
