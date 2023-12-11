import { StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView, } from "react-native";
import React, { useState, useEffect } from "react";
import { auth } from "../firebase.config";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { reloadAsync } from "expo-updates";

/**
 * SettingsScreen is a React component representing the screen where users
 * can configure and adjust application settings.
 */
const SettingsScreen = () => {

  const navigation = useNavigation();
  const [termsModalVisible, setTermsModalVisible] = useState(false);
  const [aboutModalVisible, setAboutModalVisible] = useState(false);
  const [preferencesModalVisible, setPreferencesModalVisible] = useState(false);
  const [eventCategoriesList, setEventCategoriesList] = useState([]);
  const [selectedEventCategories, setSelectedEventCategories] = useState([]);
  const [eventPerksList, setEventPerksList] = useState([]);
  const [selectedEventPerks, setSelectedEventPerks] = useState([]);
  const [eventThemesList, setEventThemesList] = useState([]);
  const [selectedEventThemes, setSelectedEventThemes] = useState([]);
  const [organizationCategoriesList, setOrganizationCategoriesList] = useState([]);
  const [selectedOrganizationCategories, setSelectedOrganizationCategories] = useState([]);
  

  /**
   * handleLogout is a function that logs the user out by signing out
   * of the authentication system and triggers a reload of the application.
   */
  const handleLogout = () => {
    // Sign out of the authentication system
    signOut(auth);

    // Trigger a reload of the application
    reloadAsync();
  };

  /**
   * openTermsModal is a function that sets the visibility state
   * of the terms modal to true, displaying the modal.
   */
  const openTermsModal = () => {
    // Set the visibility state of the terms modal to true
    setTermsModalVisible(true);
  };

  /**
   * closeTermsModal is a function that sets the visibility state
   * of the terms modal to false, hiding the modal.
   */
  const closeTermsModal = () => {
    // Set the visibility state of the terms modal to false
    setTermsModalVisible(false);
  };


  /**
   * openAboutModal is a function that sets the visibility state
   * of the about modal to true, displaying the modal.
   */
  const openAboutModal = () => {
    // Set the visibility state of the about modal to true
    setAboutModalVisible(true);
  };

  /**
   * closeAboutModal is a function that sets the visibility state
   * of the about modal to false, hiding the modal.
   */
  const closeAboutModal = () => {
    // Set the visibility state of the about modal to false
    setAboutModalVisible(false);
  };


  /**
   * openPreferencesModal is a function that sets the visibility state
   * of the preferences modal to true, displaying the modal.
   */
  const openPreferencesModal = () => {
    // Set the visibility state of the preferences modal to true
    setPreferencesModalVisible(true);
  };

  /**
   * closePreferencesModal is a function that updates and logs the selected
   * event themes, event perks, event categories, and organization categories.
   * It then sets the visibility state of the preferences modal to false, hiding the modal.
   */
  const closePreferencesModal = () => {
    // Update and log selected event themes
    setSelectedEventThemes(selectedEventThemes);
    console.log("Selected event themes:", selectedEventThemes);

    // Update and log selected event perks
    setSelectedEventPerks(selectedEventPerks);
    console.log("Selected event perks:", selectedEventPerks);

    // Update and log selected event categories
    setSelectedEventCategories(selectedEventCategories);
    console.log("Selected event categories:", selectedEventCategories);

    // Update and log selected organization categories
    setSelectedOrganizationCategories(selectedOrganizationCategories);
    console.log("Selected organization categories:", selectedOrganizationCategories);

    // Close the preferences modal
    setPreferencesModalVisible(false);
  };

  /**
   * useEffect to fetch event categories data from the server
   * and update the component state accordingly.
  */
  useEffect(() => {
    // Fetch event categories data from the server
    fetch("https://absolute-willing-salmon.ngrok-free.app/api/event/categories")
      .then((response) => response.json())
      .then((json) => {
        // Update the component state with the fetched event categories
        setEventCategoriesList(json.categories);
        console.log("categories: ", eventCategoriesList);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        // Set loading state to false once the fetch operation is completed
        setLoading(false);
      });
  }, []);

  /**
   * handleSelectedEventCategories is a function that toggles the selection
   * of an event category identified by its ID. It updates the component state
   * to include or exclude the selected category.
   *
   * @param {string} id - The ID of the event category to be toggled.
  */
  const handleSelectedEventCategories = (id) => {
    // Check if the category is already selected
    const isSelected = selectedEventCategories.includes(id);

    // Toggle the selection by updating the component state
    if (isSelected) {
      // If selected, remove the category from the selection
      setSelectedEventCategories(selectedEventCategories.filter((buttonId) => buttonId !== id));
    } else {
      // If not selected, add the category to the selection
      setSelectedEventCategories([...selectedEventCategories, id]);
    }
  };

  /**
   * useEffect to fetch event perks data from the server
   * and update the component state accordingly.
  */
  useEffect(() => {
    // Fetch event perks data from the server
    fetch("https://absolute-willing-salmon.ngrok-free.app/api/event/perks")
      .then((response) => response.json())
      .then((json) => {
        // Update the component state with the fetched event perks
        setEventPerksList(json.perks);
      })
      .then(() => console.log("perks: ", eventPerksList))
      .catch((error) => console.log(error))
      .finally(() => {
        // Set loading state to false once the fetch operation is completed
        setLoading(false);
      });
  }, []);

  /**
   * handleSelectedEventPerks is a function that toggles the selection
   * of an event perk identified by its ID. It updates the component state
   * to include or exclude the selected perk.
   *
   * @param {string} id - The ID of the event perk to be toggled.
   */
  const handleSelectedEventPerks = (id) => {
    // Check if the perk is already selected
    const isSelected = selectedEventPerks.includes(id);

    // Toggle the selection by updating the component state
    if (isSelected) {
      // If selected, remove the perk from the selection
      setSelectedEventPerks(selectedEventPerks.filter((buttonId) => buttonId !== id));
    } else {
      // If not selected, add the perk to the selection
      setSelectedEventPerks([...selectedEventPerks, id]);
    }
  };

  /**
   * useEffect to fetch event themes data from the server
   * and update the component state accordingly.
  */
  useEffect(() => {
    // Fetch event themes data from the server
    fetch("https://absolute-willing-salmon.ngrok-free.app/api/event/themes")
      .then((response) => response.json())
      .then((json) => {
        // Update the component state with the fetched event themes
        setEventThemesList(json.themes);
      })
      .then(() => console.log("themes: ", eventThemesList))
      .catch((error) => console.log(error))
      .finally(() => {
        // Set loading state to false once the fetch operation is completed
        setLoading(false);
      });
  }, []);

  /**
   * handleSelectedEventThemes is a function that toggles the selection
   * of an event theme identified by its ID. It updates the component state
   * to include or exclude the selected theme.
   *
   * @param {string} id - The ID of the event theme to be toggled.
  */
  const handleSelectedEventThemes = (id) => {
    // Check if the theme is already selected
    const isSelected = selectedEventThemes.includes(id);

    // Toggle the selection by updating the component state
    if (isSelected) {
      // If selected, remove the theme from the selection
      setSelectedEventThemes(
        selectedEventThemes.filter((buttonId) => buttonId !== id)
      );
    } else {
      // If not selected, add the theme to the selection
      setSelectedEventThemes([...selectedEventThemes, id]);
    }
  };

  /**
   * useEffect to fetch organization categories data from the server
   * and update the component state accordingly.
  */
  useEffect(() => {
    // Fetch organization categories data from the server
    fetch("https://absolute-willing-salmon.ngrok-free.app/api/organization/categories")
      .then((response) => response.json())
      .then((json) => {
        // Update the component state with the fetched organization categories
        setOrganizationCategoriesList(json.categories);
        console.log("categories: ", organizationCategoriesList);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        // Set loading state to false once the fetch operation is completed
        setLoading(false);
      });
  }, []);

  /**
   * handleSelectedOrganizationCategories is a function that toggles the selection
   * of an organization category identified by its ID. It updates the component state
   * to include or exclude the selected category.
   *
   * @param {string} id - The ID of the organization category to be toggled.
   */
  const handleSelectedOrganizationCategories = (id) => {
    // Check if the category is already selected
    const isSelected = selectedOrganizationCategories.includes(id);

    // Toggle the selection by updating the component state
    if (isSelected) {
      // If selected, remove the category from the selection
      setSelectedOrganizationCategories(selectedOrganizationCategories.filter((buttonId) => buttonId !== id));
    } else {
      // If not selected, add the category to the selection
      setSelectedOrganizationCategories([...selectedOrganizationCategories, id]);
    }
  };

  return (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity
        onPress={openPreferencesModal}
        style={[styles.settingsButtons, { marginTop: "3%" }]}
      >
        <Text style={styles.settingsButtonsText}>Edit Preferences</Text>
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
              <Text style={styles.questionText}>
                {" "}
                What event perks are you interest in?
              </Text>
              <View style={styles.scrollViewCards}>
                <ScrollView>
                  {eventPerksList.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => handleSelectedEventPerks(item.id)}
                      style={[
                        styles.preferencesButtons,
                        {
                          backgroundColor: selectedEventPerks.includes(item.id)
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
              <Text style={styles.questionText}>
                What event categories are you interested in?
              </Text>
              <View style={styles.scrollViewCards}>
                <ScrollView>
                  {eventCategoriesList.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => handleSelectedEventCategories(item.id)}
                      style={[
                        styles.preferencesButtons,
                        {
                          backgroundColor: selectedEventCategories.includes(item.id)
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
                <Text style={styles.questionText}>
                  {" "}
                  What event themes are you interest in?
                </Text>
                <View style={styles.scrollViewCards}>
                  <ScrollView>
                    {eventThemesList.map((item) => (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => handleSelectedEventThemes(item.id)}
                        style={[
                          styles.preferencesButtons,
                          {
                            backgroundColor: selectedEventThemes.includes(item.id)
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
                <Text style={styles.questionText}>
                  {" "}
                  What organization categories are you interest in?
                </Text>
                <View style={styles.scrollViewCards}>
                  <ScrollView>
                    {organizationCategoriesList.map((item) => (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => handleSelectedOrganizationCategories(item.id)}
                        style={[
                          styles.preferencesButtons,
                          {
                            backgroundColor: selectedOrganizationCategories.includes(item.id)
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
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={closePreferencesModal}
              >
                <Text style={styles.modalCloseText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        onPress={openAboutModal}
        style={styles.settingsButtons}
      >
        <Text style={styles.settingsButtonsText}>About RUSWE</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={aboutModalVisible}
        onRequestClose={closeAboutModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
            >
              About RUSWE
            </Text>
            <Text style={{ textAlign: "justify" }}>
              RUSWE offers a reimagined take on Rutgers' own Get Involved
              website. “RUGoing?” is an engaging, user-friendly “re-engineered”
              application where students can view the details of ongoing events
              and various organizations at the university, customized to their
              interests. Users can also connect with friends who are also on the
              app. Essentially, the application provides a more personalized
              experience, making it easier for students to discover activities
              and clubs, enhancing their overall Rutgers experience.
            </Text>
            <TouchableOpacity
              onPress={closeAboutModal}
              style={styles.modalCloseButton}
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={openTermsModal}
        style={styles.settingsButtons}
      >
        <Text style={styles.settingsButtonsText}>Terms of Use</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={termsModalVisible}
        onRequestClose={closeTermsModal}
        backdropOpacity={0.3}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 8 }}>
              <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                Terms and Conditions of Use{" "}
              </Text>
              {"\n"}
              This document outlines the terms and conditions (the "Agreement")
              for the use of RUGoing (the "App") provided by RUSWE, hereafter
              referred to as the "Company."
              {"\n"}
              By downloading, installing, or using the App, you agree to be
              bound by the terms and conditions outlined in this Agreement. If
              you do not agree with any part of these terms, please refrain from
              using the App.
              {"\n"}
              <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                1. Account Registration and Security
              </Text>
              {"\n"}
              1.1. To use certain features of the App, you must create an
              account by providing accurate and complete information.
              {"\n"}
              1.2. You are responsible for maintaining the confidentiality of
              your account credentials.
              {"\n"}
              1.3. The Company reserves the right to suspend or terminate your
              account if any information provided is found to be inaccurate or
              violates these terms.
              {"\n"}
              <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                2. User Conduct
              </Text>
              {"\n"}
              2.1. You are solely responsible for your interactions with other
              users and organizations within the App.
              {"\n"}
              2.2. The Company reserves the right to remove any content that
              violates these terms or is deemed inappropriate.
              {"\n"}
              <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                3. Account Verification and Passwords
              </Text>
              {"\n"}
              3.1. Passwords must be kept confidential, and users are
              responsible for any activity that occurs under their account.
              {"\n"}
              <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                4. Admin Accounts
              </Text>
              {"\n"}
              4.1. Admin accounts are subject to verification against
              GetInvolved officers.
              {"\n"}
              <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                5. Organization and Event Information
              </Text>
              {"\n"}
              5.1. The App displays information about organizations and events
              sourced from GetInvolved, including images, names, mission
              statements, and contact information.
              {"\n"}
              <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                6. Termination of Account
              </Text>
              {"\n"}
              6.1. The Company reserves the right to terminate or suspend user
              accounts at its discretion.
              {"\n"}
              <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                7. Changes to Terms and Conditions
              </Text>
              {"\n"}
              7.1. The Company reserves the right to modify or update these
              terms at any time. Users will be notified of significant changes.
              {"\n"}
            </Text>

            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={closeTermsModal}
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={[styles.settingsButtons]}
        onPress={handleLogout}
      >
        <Text style={styles.settingsButtonsText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  settingsButtons: {
    backgroundColor: "#FF392E",
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
    height: "12%",
    justifyContent: "center",
    marginBottom: "3%",
    width: "95%",
  },
  settingsButtonsText: {
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
  modalCloseText: {
    color: "#FF392E",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalCloseButton: {
    backgroundColor: "#E6E6E6",
    borderRadius: 15,
    marginTop: "3%",
    padding: "3%",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
  },
  preferencesButtons: {
    backgroundColor: "#E6E6E6",
    padding: 10,
    marginVertical: 5,
    borderRadius: 15,
    marginHorizontal: "1%",
    borderColor: "#FF6961",
    borderWidth: "1%",
  },
  scrollViewCards: {
    backgroundColor: "white",
    borderColor: "#FF392E",
    borderWidth: 1,
    borderRadius: 10,
    width: 330,
    height: 120,
  },
});

export default SettingsScreen;
