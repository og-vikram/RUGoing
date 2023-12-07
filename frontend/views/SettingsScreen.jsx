import { StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
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
    setSelectedButtons3(selectedButtons3);
    console.log("Selected buttons:", selectedButtons3);

    setSelectedButtons2(selectedButtons2);
    console.log("Selected buttons:", selectedButtons2);

    setSelectedButtons1(selectedButtons1);
    console.log("Selected buttons:", selectedButtons1);

    setSelectedButtons(selectedButtons);
    console.log("Selected buttons:", selectedButtons);
    setPreferencesModalVisible(false);
  }

  //categories stuff
  const [categories2List, setCategories2List] = useState([]);

  const [selectedButtons1, setSelectedButtons1] = useState([]);

  useEffect(() => {
    fetch("https://absolute-willing-salmon.ngrok-free.app/api/event/categories")
      .then((response) => response.json())
      .then((json) => {
        setCategories2List(json.categories);
        console.log("categories: ", categories2List);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  const handleButton1Click = (id) => {
    const isSelected = selectedButtons1.includes(id);
    if (isSelected) {
      setSelectedButtons1(
        selectedButtons1.filter((buttonId) => buttonId !== id)
      );
    } else {
      setSelectedButtons1([...selectedButtons1, id]);
    }
  };

  //perks stuff
  const [perksList, setPerksList] = useState([]);

  const [selectedButtons2, setSelectedButtons2] = useState([]);

  useEffect(() => {
    fetch("https://absolute-willing-salmon.ngrok-free.app/api/event/perks")
      .then((response) => response.json())
      .then((json) => {
        setPerksList(json.perks);
      })
      .then(() => console.log("perks: ", perksList))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  const handleButton2Click = (id) => {
    const isSelected = selectedButtons2.includes(id);
    if (isSelected) {
      setSelectedButtons2(
        selectedButtons2.filter((buttonId) => buttonId !== id)
      );
    } else {
      setSelectedButtons2([...selectedButtons2, id]);
    }
  };

  //themes stuff
  const [themesList, setThemesList] = useState([]);

  const [selectedButtons3, setSelectedButtons3] = useState([]);

  useEffect(() => {
    fetch("https://absolute-willing-salmon.ngrok-free.app/api/event/themes")
      .then((response) => response.json())
      .then((json) => {
        setThemesList(json.themes);
      })
      .then(() => console.log("themes: ", themesList))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);
  const handleButton3Click = (id) => {
    const isSelected = selectedButtons3.includes(id);
    if (isSelected) {
      setSelectedButtons3(
        selectedButtons3.filter((buttonId) => buttonId !== id)
      );
    } else {
      setSelectedButtons3([...selectedButtons3, id]);
    }
  };

  //org stuff
  const [categoriesList, setCategoriesList] = useState([]);

  const [selectedButtons, setSelectedButtons] = useState([]);

  useEffect(() => {
    fetch(
      "https://absolute-willing-salmon.ngrok-free.app/api/organization/categories"
    )
      .then((response) => response.json())
      .then((json) => {
        setCategoriesList(json.categories);
        console.log("categories: ", categoriesList);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);
  const handleButtonClick = (id) => {
    const isSelected = selectedButtons.includes(id);
    if (isSelected) {
      setSelectedButtons(selectedButtons.filter((buttonId) => buttonId !== id));
    } else {
      setSelectedButtons([...selectedButtons, id]);
    }
  };


  return (
    <View style={{alignItems: "center"}}>
      <TouchableOpacity onPress={openPreferencesModal} style={[styles.customButtonContainer, {marginTop: "3%"}]}>        
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
                {perksList.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => handleButton2Click(item.id)}
                    style={[
                      styles.button,
                      {
                        backgroundColor: selectedButtons2.includes(item.id)
                          ? "#FF6961"
                          : "#E6E6E6",
                      },
                    ]}
                  >
                    <Text style={styles.button2Text}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
                </View>
            </View>
            <View>
                <Text style={styles.questionText}>What event categories are you interested in?</Text>
                <View style={styles.card2}>
                <ScrollView>
                {categories2List.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => handleButton1Click(item.id)}
                    style={[
                      styles.button,
                      {
                        backgroundColor: selectedButtons1.includes(item.id)
                          ? "#FF6961"
                          : "#E6E6E6",
                      },
                    ]}
                  >
                    <Text style={styles.button2Text}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
                    
           
                </View>
                <View>
                    <Text style={styles.questionText}> What event themes are you interest in?</Text>
                    <View style={styles.card2}>
                    <ScrollView>
                  {themesList.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => handleButton3Click(item.id)}
                      style={[
                        styles.button,
                        {
                          backgroundColor: selectedButtons3.includes(item.id)
                            ? "#FF6961"
                            : "#E6E6E6",
                        },
                      ]}
                    >
                      <Text style={styles.button2Text}>{item.name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                    </View>
                </View>
                <View style={styles.questionText}>
                    <Text style={styles.questionText}> What organization categories are you interest in?</Text>
                    <View style={styles.card2}>
                    <ScrollView>
                  {categoriesList.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => handleButtonClick(item.id)}
                      style={[
                        styles.button,
                        {
                          backgroundColor: selectedButtons.includes(item.id)
                            ? "#FF6961"
                            : "#E6E6E6",
                        },
                      ]}
                    >
                      <Text style={styles.buttonText}>{item.name}</Text>
                    </TouchableOpacity>
                  ))}
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

      <TouchableOpacity style={styles.customButtonContainer}>
          <Text style={styles.editProfileButtonText}>Manage Friends</Text>
      </TouchableOpacity>
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
      <TouchableOpacity
        style={[styles.customButtonContainer]}

        onPress={handleLogout}
      >
        <Text style={styles.customButtonText}>Logout</Text>
      </TouchableOpacity>


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
