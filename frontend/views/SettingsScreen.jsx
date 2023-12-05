import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import { Button } from "@rneui/base";
import { auth } from "../firebase.config";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { reloadAsync } from "expo-updates";


const SettingsScreen = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    signOut(auth);
    reloadAsync();
  };

  const [termsModalVisible, setTermsModalVisible] = useState(false);
  const [aboutModalVisible, setAboutModalVisible] = useState(false);


  const openTermsModal = () => {
    setTermsModalVisible(true);
  };

  const closeTermsModal = () => {
    setTermsModalVisible(false);
  };


  const openAboutModal = () => {
    setAboutModalVisible(true);
  };

  const closeAboutModal = () => {
    setAboutModalVisible(false);
  };


  return (
    <View>
      <TouchableOpacity
        style={[styles.customButtonContainer, {marginTop: "10%"}]}

        onPress={handleLogout}
      >
        <Text style={styles.customButtonText}>Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity
      onPress={openTermsModal}   style={styles.customButtonContainer}
      >
          <Text style={styles.editProfileButtonText}>Terms of Use</Text>
          </TouchableOpacity>

          <Modal
        animationType="slide"
        transparent={true}
        visible={termsModalVisible}
        onRequestClose={closeTermsModal}
        backdropOpacity={.3}
      >

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 5 }}>

            <Text style = {{fontSize: 8}}><Text style= {{fontWeight: "bold", fontSize: 14}} >Terms and Conditions of Use </Text>
            {"\n"}

This document outlines the terms and conditions (the "Agreement") for the use of RUGoing (the "App") provided by RUSWE, hereafter referred to as the "Company."
{"\n"}

By downloading, installing, or using the App, you agree to be bound by the terms and conditions outlined in this Agreement. If you do not agree with any part of these terms, please refrain from using the App.

{"\n"}
<Text style= {{fontWeight: "bold", fontSize: 10}} >
1. Account Registration and Security
</Text>
{"\n"}

1.1. To use certain features of the App, you must create an account by providing accurate and complete information.
{"\n"}
1.2. You are responsible for maintaining the confidentiality of your account credentials.
{"\n"}
1.3. The Company reserves the right to suspend or terminate your account if any information provided is found to be inaccurate or violates these terms.
{"\n"}
<Text style= {{fontWeight: "bold", fontSize: 10}} >

2. User Conduct
</Text>
{"\n"}
2.1. You are solely responsible for your interactions with other users and organizations within the App.
{"\n"}
2.2. The Company reserves the right to remove any content that violates these terms or is deemed inappropriate.
{"\n"}
<Text style= {{fontWeight: "bold", fontSize: 10}} >

3. Account Verification and Passwords
</Text>
{"\n"}

3.1. Passwords must be kept confidential, and users are responsible for any activity that occurs under their account.
{"\n"}
<Text style= {{fontWeight: "bold", fontSize: 10}} >

4. Admin Accounts
</Text>
{"\n"}
4.1. Admin accounts are subject to verification against GetInvolved officers.
{"\n"}
<Text style= {{fontWeight: "bold", fontSize: 10}} >

5. Organization and Event Information
</Text>
{"\n"}
5.1. The App displays information about organizations and events sourced from GetInvolved, including images, names, mission statements, and contact information.
{"\n"}
<Text style= {{fontWeight: "bold", fontSize: 10}} >

6. Termination of Account
</Text>
{"\n"}
6.1. The Company reserves the right to terminate or suspend user accounts at its discretion.
{"\n"}
<Text style= {{fontWeight: "bold", fontSize: 10}} >

7. Changes to Terms and Conditions
</Text>
{"\n"}
7.1. The Company reserves the right to modify or update these terms at any time. Users will be notified of significant changes.
{"\n"}
</Text>

            <TouchableOpacity onPress={closeTermsModal}>
              <Text>Close</Text>
              
            </TouchableOpacity>

          </View>

        </View>
      </Modal>
      <TouchableOpacity
      style={styles.customButtonContainer}>
        <View style={styles.editProfileButton}>
          <Text style={styles.editProfileButtonText}>Manage Organizations</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
      style={styles.customButtonContainer}>
        <View style={styles.editProfileButton}>
          <Text style={styles.editProfileButtonText}>Manage Friends</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
      style={styles.customButtonContainer}>
        <View style={styles.editProfileButton}>
          <Text style={styles.editProfileButtonText}>Manage Preferences</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={openAboutModal}   style={styles.customButtonContainer}>
        <View style={styles.editProfileButton}>
          <Text style={styles.editProfileButtonText}>About RUSWE</Text>
  
        </View>
      </TouchableOpacity>
      <Modal
  animationType="slide"
  transparent={true}
  visible={aboutModalVisible}
  onRequestClose={closeAboutModal}
>
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
        About RUSWE
      </Text>
      <Text style={{ textAlign: 'justify' }}>
        RUSWE offers a reimagined take on Rutgers' own Get Involved website.
        “RUGoing?” is an engaging, user-friendly “re-engineered” application
        where students can view the details of ongoing events and various
        organizations at the university, customized to their interests. Users
        can also connect with friends who are also on the app. Essentially, the
        application provides a more personalized experience, making it easier
        for students to discover activities and clubs, enhancing their overall
        Rutgers experience.
      </Text>
      <TouchableOpacity onPress={closeAboutModal} style={{ marginTop: 15 }}>
        <Text style={{ color: 'blue', fontSize: 16, textAlign: 'center' }}>
          Close
        </Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>


    </View>
  );
};
const styles = StyleSheet.create({
  customButtonContainer: {
    backgroundColor: "#FF392E",
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
    height: 50,
    justifyContent: "center",
    marginBottom: "10%",
  },
  customButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    alignItems: "center",
  },
  editProfileButton: {
    backgroundColor: "#FF392E",
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
    height: 50,
    justifyContent: "center",
  },
  editProfileButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    alignItems: "center",
  },
});

export default SettingsScreen;
