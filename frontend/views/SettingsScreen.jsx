import { StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView } from "react-native";
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
  const [preferencesModalVisible, setPreferencesModalVisible] = useState(false);


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

  const openPreferencesModal = () => {
    setPreferencesModalVisible(true);
  }

  const closePreferencesModal = () => {
    setPreferencesModalVisible(false);
  }

  const [button1Clicked, setButton1Clicked] = useState(false);
  const [button2Clicked, setButton2Clicked] = useState(false);
  const [button3Clicked, setButton3Clicked] = useState(false);
  const [button4Clicked, setButton4Clicked] = useState(false);
  const [button5Clicked, setButton5Clicked] = useState(false);
  const [button6Clicked, setButton6Clicked] = useState(false);
  const [button7Clicked, setButton7Clicked] = useState(false);
  const [button8Clicked, setButton8Clicked] = useState(false);
  const [button9Clicked, setButton9Clicked] = useState(false);
  const [button10Clicked, setButton10Clicked] = useState(false);
  const [button11Clicked, setButton11Clicked] = useState(false);
  const [button12Clicked, setButton12Clicked] = useState(false);
  const [button13Clicked, setButton13Clicked] = useState(false);
  const [button14Clicked, setButton14Clicked] = useState(false);
  const [button15Clicked, setButton15Clicked] = useState(false);
  const [button16Clicked, setButton16Clicked] = useState(false);
  const [button17Clicked, setButton17Clicked] = useState(false);
  const [button18Clicked, setButton18Clicked] = useState(false);
  const [button19Clicked, setButton19Clicked] = useState(false);
  const [button20Clicked, setButton20Clicked] = useState(false);
  const [button21Clicked, setButton21Clicked] = useState(false);
  const [button22Clicked, setButton22Clicked] = useState(false);
  const [button23Clicked, setButton23Clicked] = useState(false);
  const [button24Clicked, setButton24Clicked] = useState(false);
  const [button25Clicked, setButton25Clicked] = useState(false);
  const [button26Clicked, setButton26Clicked] = useState(false);
  const [button27Clicked, setButton27Clicked] = useState(false);
  const [button28Clicked, setButton28Clicked] = useState(false);
  const [button29Clicked, setButton29Clicked] = useState(false);
  const [button30Clicked, setButton30Clicked] = useState(false);
  const [button31Clicked, setButton31Clicked] = useState(false);
  const [button32Clicked, setButton32Clicked] = useState(false);
  const [button33Clicked, setButton33Clicked] = useState(false);
  const [button34Clicked, setButton34Clicked] = useState(false);
  const [button35Clicked, setButton35Clicked] = useState(false);
  const [button36Clicked, setButton36Clicked] = useState(false);
  const [button37Clicked, setButton37Clicked] = useState(false);
  const [button38Clicked, setButton38Clicked] = useState(false);
  const [button39Clicked, setButton39Clicked] = useState(false);
  const [button40Clicked, setButton40Clicked] = useState(false);
  const [button41Clicked, setButton41Clicked] = useState(false);
  const [button42Clicked, setButton42Clicked] = useState(false);
  const [button43Clicked, setButton43Clicked] = useState(false);
  const [button44Clicked, setButton44Clicked] = useState(false);
  const [button45Clicked, setButton45Clicked] = useState(false);
  const [button46Clicked, setButton46Clicked] = useState(false);
  const [button47Clicked, setButton47Clicked] = useState(false);
  const [button48Clicked, setButton48Clicked] = useState(false);
  const [button49Clicked, setButton49Clicked] = useState(false);
  const [button50Clicked, setButton50Clicked] = useState(false);
  const [button51Clicked, setButton51Clicked] = useState(false);
  const [button52Clicked, setButton52Clicked] = useState(false);
  const [button53Clicked, setButton53Clicked] = useState(false);
  const [button54Clicked, setButton54Clicked] = useState(false);
  const [button55Clicked, setButton55Clicked] = useState(false);
  const [button56Clicked, setButton56Clicked] = useState(false);
  const [button57Clicked, setButton57Clicked] = useState(false);
  const [button58Clicked, setButton58Clicked] = useState(false);
  const [button59Clicked, setButton59Clicked] = useState(false);
  const [button60Clicked, setButton60Clicked] = useState(false);


  const handleButton1Click = () => {
    setButton1Clicked((prev) => !prev);
  };

  const handleButton2Click = () => {
    setButton2Clicked((prev) => !prev);
  };

  const handleButton3Click = () => {
    setButton3Clicked((prev) => !prev);
  };

  const handleButton4Click = () => {
    setButton4Clicked((prev) => !prev);
  };

  const handleButton5Click = () => {
    setButton5Clicked((prev) => !prev);
  };
  const handleButton6Click = () => {
    setButton6Clicked((prev) => !prev);
  };
  const handleButton7Click = () => {
    setButton7Clicked((prev) => !prev);
  };
  const handleButton8Click = () => {
    setButton8Clicked((prev) => !prev);
  };
  const handleButton9Click = () => {
    setButton9Clicked((prev) => !prev);
  };
  const handleButton10Click = () => {
    setButton10Clicked((prev) => !prev);
  };
  const handleButton11Click = () => {
    setButton11Clicked((prev) => !prev);
  };
  const handleButton12Click = () => {
    setButton12Clicked((prev) => !prev);
  };
  const handleButton13Click = () => {
    setButton13Clicked((prev) => !prev);
  };
  const handleButton14Click = () => {
    setButton14Clicked((prev) => !prev);
  };
  const handleButton15Click = () => {
    setButton15Clicked((prev) => !prev);
  };
  const handleButton16Click = () => {
    setButton16Clicked((prev) => !prev);
  };
  const handleButton17Click = () => {
    setButton17Clicked((prev) => !prev);
  };
  const handleButton18Click = () => {
    setButton18Clicked((prev) => !prev);
  };
  const handleButton19Click = () => {
    setButton19Clicked((prev) => !prev);
  };
  const handleButton20Click = () => {
    setButton20Clicked((prev) => !prev);
  };
  const handleButton21Click = () => {
    setButton21Clicked((prev) => !prev);
  };
  const handleButton22Click = () => {
    setButton22Clicked((prev) => !prev);
  };
  const handleButton23Click = () => {
    setButton23Clicked((prev) => !prev);
  };
  const handleButton24Click = () => {
    setButton24Clicked((prev) => !prev);
  };
  const handleButton25Click = () => {
    setButton25Clicked((prev) => !prev);
  };
  const handleButton26Click = () => {
    setButton26Clicked((prev) => !prev);
  };
  const handleButton27Click = () => {
    setButton27Clicked((prev) => !prev);
  };
  const handleButton28Click = () => {
    setButton28Clicked((prev) => !prev);
  };
  const handleButton29Click = () => {
    setButton29Clicked((prev) => !prev);
  };
  const handleButton30Click = () => {
    setButton30Clicked((prev) => !prev);
  };
  const handleButton31Click = () => {
    setButton31Clicked((prev) => !prev);
  };
  const handleButton32Click = () => {
    setButton32Clicked((prev) => !prev);
  };
  const handleButton33Click = () => {
    setButton33Clicked((prev) => !prev);
  };
  const handleButton34Click = () => {
    setButton34Clicked((prev) => !prev);
  };
  const handleButton35Click = () => {
    setButton35Clicked((prev) => !prev);
  };
  const handleButton36Click = () => {
    setButton36Clicked((prev) => !prev);
  };
  const handleButton37Click = () => {
    setButton37Clicked((prev) => !prev);
  };
  const handleButton38Click = () => {
    setButton38Clicked((prev) => !prev);
  };
  const handleButton39Click = () => {
    setButton39Clicked((prev) => !prev);
  };
  const handleButton40Click = () => {
    setButton40Clicked((prev) => !prev);
  };
  const handleButton41Click = () => {
    setButton41Clicked((prev) => !prev);
  };
  const handleButton42Click = () => {
    setButton42Clicked((prev) => !prev);
  };
  const handleButton43Click = () => {
    setButton43Clicked((prev) => !prev);
  };
  const handleButton44Click = () => {
    setButton44Clicked((prev) => !prev);
  };
  const handleButton45Click = () => {
    setButton45Clicked((prev) => !prev);
  };
  const handleButton46Click = () => {
    setButton46Clicked((prev) => !prev);
  };
  const handleButton47Click = () => {
    setButton47Clicked((prev) => !prev);
  };
  const handleButton48Click = () => {
    setButton48Clicked((prev) => !prev);
  };
  const handleButton49Click = () => {
    setButton49Clicked((prev) => !prev);
  };
  const handleButton50Click = () => {
    setButton50Clicked((prev) => !prev);
  };
  const handleButton51Click = () => {
    setButton51Clicked((prev) => !prev);
  };
  const handleButton52Click = () => {
    setButton52Clicked((prev) => !prev);
  };
  const handleButton53Click = () => {
    setButton53Clicked((prev) => !prev);
  };
  const handleButton54Click = () => {
    setButton54Clicked((prev) => !prev);
  };
  const handleButton55Click = () => {
    setButton55Clicked((prev) => !prev);
  };
  const handleButton56Click = () => {
    setButton56Clicked((prev) => !prev);
  };
  const handleButton57Click = () => {
    setButton57Clicked((prev) => !prev);
  };
  const handleButton58Click = () => {
    setButton58Clicked((prev) => !prev);
  };
  const handleButton59Click = () => {
    setButton59Clicked((prev) => !prev);
  };
  const handleButton60Click = () => {
    setButton60Clicked((prev) => !prev);
  };


  return (
    <View style={{alignItems: "center"}}>
      <TouchableOpacity
        style={[styles.customButtonContainer, {marginTop: "3%"}]}

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

        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>

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

            <TouchableOpacity style={styles.bottombutton1} onPress={closeTermsModal}>
              <Text style={styles.bottombuttontext1}>Close</Text>
              
            </TouchableOpacity>

          </View>

        </View>
      </Modal>
      <TouchableOpacity style={styles.customButtonContainer}>
          <Text style={styles.editProfileButtonText}>Manage Friends</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={openPreferencesModal} style={styles.customButtonContainer}>        
        <Text style={styles.editProfileButtonText}>Edit Preferences</Text>       
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={preferencesModalVisible}
        onRequestClose={closePreferencesModal}
      >
        <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
            <View>
                <Text style={styles.questionText}> What event perks are you interest in?</Text>
                <View style={styles.card1}>
                    <ScrollView>
                        <TouchableOpacity
                            onPress={handleButton1Click}
                            style={[styles.button, button1Clicked && styles.redButton]}
                        >
                            <Text>Free Food</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleButton2Click}
                            style={[styles.button, button2Clicked && styles.redButton]}
                        >
                            <Text>Free Stuff</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleButton3Click}
                            style={[styles.button, button3Clicked && styles.redButton]}
                        >
                            <Text>Credit</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
            <View>
                <Text style={styles.questionText}>What event categories are you interested in?</Text>
                <View style={styles.card2}>
                    <ScrollView>
                        <TouchableOpacity
                            onPress={handleButton4Click}
                            style={[styles.button, button4Clicked && styles.redButton]}
                        >
                            <Text>Political/Social Action Public Forum</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleButton5Click}
                            style={[styles.button, button5Clicked && styles.redButton]}
                        >
                            <Text>Community (Residence Life)</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleButton6Click}
                            style={[styles.button, button6Clicked && styles.redButton]}
                        >
                            <Text>Banquet/Food or Culinary</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleButton7Click}
                            style={[styles.button, button7Clicked && styles.redButton]}
                        >
                            <Text>Career Fair/Panel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleButton8Click}
                            style={[styles.button, button8Clicked && styles.redButton]}
                        >
                            <Text>Community Service Event on Campus</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleButton9Click}
                            style={[styles.button, button9Clicked && styles.redButton]}
                        >
                            <Text>Concert/Musical Performance</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleButton10Click}
                            style={[styles.button, button10Clicked && styles.redButton]}
                        >
                            <Text>Cultural Performance</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleButton11Click}
                            style={[styles.button, button11Clicked && styles.redButton]}
                        >
                            <Text>Educational Conference/Seminar/Workshop/Panel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleButton12Click}
                            style={[styles.button, button12Clicked && styles.redButton]}
                        >
                            <Text>Educational Lecture</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleButton13Click}
                            style={[styles.button, button13Clicked && styles.redButton]}
                        >
                            <Text>Entertainment</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleButton14Click}
                            style={[styles.button, button14Clicked && styles.redButton]}
                        >
                            <Text>Film</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleButton15Click}
                            style={[styles.button, button15Clicked && styles.redButton]}
                        >
                            <Text>General Organization Meeting</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleButton16Click}
                            style={[styles.button, button16Clicked && styles.redButton]}
                        >
                            <Text>Performance</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleButton17Click}
                            style={[styles.button, button17Clicked && styles.redButton]}
                        >
                            <Text>Religious/Religious Cultural/Spiritual Event</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleButton18Click}
                            style={[styles.button, button18Clicked && styles.redButton]}
                        >
                            <Text>Seasonal/Holiday</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleButton19Click}
                            style={[styles.button, button19Clicked && styles.redButton]}
                        >
                            <Text>Special Interest</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleButton20Click}
                            style={[styles.button, button20Clicked && styles.redButton]}
                        >
                            <Text>Sporst/Recreation/Intramural</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleButton21Click}
                            style={[styles.button, button21Clicked && styles.redButton]}
                        >
                            <Text>Trip to Competition</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleButton22Click}
                            style={[styles.button, button22Clicked && styles.redButton]}
                        >
                            <Text>Wellness Event</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleButton23Click}
                            style={[styles.button, button23Clicked && styles.redButton]}
                        >
                            <Text>Graduate Student Organization Event</Text>
                        </TouchableOpacity>
                    </ScrollView>
                    
           
                </View>
                <View>
                    <Text style={styles.questionText}> What event themes are you interest in?</Text>
                    <View style={styles.card2}>
                        <ScrollView>
                            <TouchableOpacity
                                onPress={handleButton24Click}
                                style={[styles.button, button24Clicked && styles.redButton]}
                            >
                                <Text>Arts & Music</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleButton25Click}
                                style={[styles.button, button25Clicked && styles.redButton]}
                            >
                                <Text>Athletics</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleButton26Click}
                                style={[styles.button, button26Clicked && styles.redButton]}
                            >
                                <Text>Service</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleButton27Click}
                                style={[styles.button, button27Clicked && styles.redButton]}
                            >
                                <Text>Cultural</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleButton28Click}
                                style={[styles.button, button28Clicked && styles.redButton]}
                            >
                                <Text>Fundraising</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleButton29Click}
                                style={[styles.button, button29Clicked && styles.redButton]}
                            >
                                <Text>Group Business</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleButton30Click}
                                style={[styles.button, button30Clicked && styles.redButton]}
                            >
                                <Text>Social</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleButton31Click}
                                style={[styles.button, button31Clicked && styles.redButton]}
                            >
                                <Text>Spirituality</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleButton32Click}
                                style={[styles.button, button32Clicked && styles.redButton]}
                            >
                                <Text>Learning</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
                <View style={styles.questionText}>
                    <Text style={styles.questionText}> What organization categories are you interest in?</Text>
                    <View style={styles.card2}>
                        <ScrollView>
                            <TouchableOpacity
                                onPress={handleButton33Click}
                                style={[styles.button, button33Clicked && styles.redButton]}
                            >
                                <Text>Performing Arts Student Organizations</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleButton34Click}
                                style={[styles.button, button34Clicked && styles.redButton]}
                            >
                                <Text>Cultural Student Organizations</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleButton35Click}
                                style={[styles.button, button35Clicked && styles.redButton]}
                            >
                                <Text>Community Service student Organizations</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleButton36Click}
                                style={[styles.button, button36Clicked && styles.redButton]}
                            >
                                <Text>Academic Student Organizations</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleButton37Click}
                                style={[styles.button, button37Clicked && styles.redButton]}
                            >
                                <Text>Honorary Student Organizations</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleButton38Click}
                                style={[styles.button, button38Clicked && styles.redButton]}
                            >
                                <Text>Leisure Student Organizations</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleButton39Click}
                                style={[styles.button, button39Clicked && styles.redButton]}
                            >
                                <Text>Media Student Organizations</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleButton40Click}
                                style={[styles.button, button40Clicked && styles.redButton]}
                            >
                                <Text>Business Student Organizations</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleButton41Click}
                                style={[styles.button, button41Clicked && styles.redButton]}
                            >
                                <Text>Mason Gross Student Organizations</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleButton42Click}
                                style={[styles.button, button42Clicked && styles.redButton]}
                            >
                                <Text>Engineering Student Organizations</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleButton43Click}
                                style={[styles.button, button43Clicked && styles.redButton]}
                            >
                                <Text>Environmental & Biological Sciences (SEBS)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleButton44Click}
                                style={[styles.button, button44Clicked && styles.redButton]}
                            >
                                <Text>Faith-based Student Organizations</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleButton45Click}
                                style={[styles.button, button45Clicked && styles.redButton]}
                            >
                                <Text>Social Action/Political Student Organizations</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleButton46Click}
                                style={[styles.button, button46Clicked && styles.redButton]}
                            >
                                <Text>Interfraternity Council</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleButton47Click}
                                style={[styles.button, button47Clicked && styles.redButton]}
                            >
                                <Text>Multicultural Greek Council</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleButton48Click}
                                style={[styles.button, button48Clicked && styles.redButton]}
                            >
                                <Text>Recreation Sports Clubs</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleButton49Click}
                                style={[styles.button, button49Clicked && styles.redButton]}
                            >
                                <Text>Panhellenic Coundil</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleButton50Click}
                                style={[styles.button, button50Clicked && styles.redButton]}
                            >
                                <Text>Professional Fraternities and Sororities</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleButton51Click}
                                style={[styles.button, button51Clicked && styles.redButton]}
                            >
                                <Text>Department at Rutgers University</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleButton52Click}
                                style={[styles.button, button52Clicked && styles.redButton]}
                            >
                                <Text>Philanthropic Student Organizations</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleButton53Click}
                                style={[styles.button, button53Clicked && styles.redButton]}
                            >
                                <Text>Geek Student Organizations</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleButton54Click}
                                style={[styles.button, button54Clicked && styles.redButton]}
                            >
                                <Text>Pre-Professional Student Organizations</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleButton55Click}
                                style={[styles.button, button55Clicked && styles.redButton]}
                            >
                                <Text>LGBTQ Students Community</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleButton56Click}
                                style={[styles.button, button56Clicked && styles.redButton]}
                            >
                                <Text>getINVOLVED Help</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleButton57Click}
                                style={[styles.button, button57Clicked && styles.redButton]}
                            >
                                <Text>Graduate Student Organizations</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleButton58Click}
                                style={[styles.button, button58Clicked && styles.redButton]}
                            >
                                <Text>Academic Graduate Student Organizations</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleButton59Click}
                                style={[styles.button, button59Clicked && styles.redButton]}
                            >
                                <Text>Academic</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleButton60Click}
                                style={[styles.button, button60Clicked && styles.redButton]}
                            >
                                <Text>Cultural</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
                <TouchableOpacity style={styles.bottombutton1} onPress={closePreferencesModal}>
                    <Text style={styles.bottombuttontext1}>Close</Text>
                </TouchableOpacity>
                
            </View>
        </View>
      </View>
      </Modal>
      <TouchableOpacity onPress={openAboutModal}   style={styles.customButtonContainer}>
        <Text style={styles.editProfileButtonText}>About RUSWE</Text>
      </TouchableOpacity>
      <Modal
  animationType="slide"
  transparent={true}
  visible={aboutModalVisible}
  onRequestClose={closeAboutModal}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
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
      <TouchableOpacity onPress={closeAboutModal} style={styles.bottombutton1}>
        <Text style={styles.bottombuttontext1}>
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
    height: "10%",
    justifyContent: "center",
    marginBottom: "3%",
    width: "95%",
  },
  customButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    alignItems: "center",
  },
  editProfileButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    alignItems: "center",
  },
  questionText: {
    color: "black",
    fontSize: 13,
    marginTop: "3%",
    fontWeight: "bold",
  },
  bottombuttontext: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
  },
  bottombuttontext1: {
      color: "#FF392E",
      fontSize: 16,
      fontWeight: "bold",
  },
  bottombutton: {
      backgroundColor: "#FF392E",
      borderRadius: 15,
      marginTop: "3%",
      padding: "3%",
      alignItems: "center",

  },
  bottombutton1: {
      backgroundColor: "#E6E6E6",
      borderRadius: 15,
      marginTop: "3%",
      padding: "3%",
      alignItems: "center",
  },
  scrollView:{
      width: 1,
      height:1,
  },
  modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 15,
  },
  buttonContainer: {
      flexDirection: 'row',
      marginBottom: 0,
  },
  buttonContainer2: {
      flexDirection: 'row',
      marginBottom: 10,
  },
  button: {
      backgroundColor: '#E6E6E6',
      padding: 10,
      marginVertical: 5,
      borderRadius: 15,
      marginHorizontal: "1%",
      borderColor: "#FF6961",
      borderWidth: "1%",

  },
  redButton: {
      backgroundColor: '#FF6961',
  },
  card1:{
      backgroundColor: 'white',
      borderColor: "#FF392E",
      borderWidth: 1,
      borderRadius: 10,
      width: 330,
      height: 120,
  },
  card2: {
      backgroundColor: 'white',
      borderColor: "#FF392E",
      borderWidth: 1,
      borderRadius: 10,
      width: 330,
      height: 120,
  },
});

export default SettingsScreen;
