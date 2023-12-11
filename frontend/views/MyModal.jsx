import React, { useState, useEffect } from "react";
import {Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView} from "react-native";

/**
 * MyModal is a React Native functional component responsible for rendering a modal 
 * that allows the user to pick their organizations and events preferences.
 *
 * @param {boolean} isVisible - Controls the visibility of the modal.
 * @param {Function} closeModal - Callback function to close the modal.
 * @param {string} modalText - Text content displayed in the modal.
 * @param {Function} handleSubmit - Callback function for handling form submission within the modal.
 * @param {Function} onSignupClick - Callback function for handling clicks on the signup action.
*/
const MyModal = ({ isVisible, closeModal, modalText, handleCreateAccount, onSignupClick,}) => {
  
  const [eventCategoriesList, setEventCategoriesList] = useState([]);
  const [selectedEventCategories, setSelectedEventCategories] = useState([]);
  const [eventPerksList, setEventPerksList] = useState([]);
  const [selectedEventPerks, setSelectedEventPerks] = useState([]);
  const [eventThemesList, setEventThemesList] = useState([]);
  const [selectedEventThemes, setSelectedEventThemes] = useState([]);
  const [organizationCategoriesList, setOrganizationCategoriesList] = useState([]);
  const [selectedOrganizationCategories, setSelectedOrganizationCategories] = useState([]);

  /**
   * signup is a function that prepares and logs selected event themes,
   * perks, event categories, and organization categories, then invokes
   * the necessary callbacks to update the state and close the modal.
  */
  const signup = () => {
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

    // Close the modal
    closeModal();

    // Invoke the onSignupClick callback with selected preferences
    onSignupClick(
      selectedEventPerks,
      selectedEventThemes,
      selectedEventCategories,
      selectedOrganizationCategories,
    );
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
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View>
            <Text style={styles.questionText}> 
              {" "} 
              What event perks are you interest in? 
            </Text>
            <View style={styles.scrollViewCard}>
              <ScrollView>
                {eventPerksList.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => handleSelectedEventPerks (item.id)}
                    style={[
                      styles.preferencesButton,
                      {
                        backgroundColor: selectedEventPerks.includes(item.id)
                          ? "#FF6961"
                          : "#E6E6E6",
                      },
                    ]}
                  >
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
          <View>
            <Text style={styles.questionText}>
              What event categories are you interested in?
            </Text>
            <View style={styles.scrolllViewCard}>
              <ScrollView>
                {eventCategoriesList.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => handleSelectedEventCategories(item.id)}
                    style={[
                      styles.preferencesButton,
                      {
                        backgroundColor: selectedEventCategories.includes(item.id)
                          ? "#FF6961"
                          : "#E6E6E6",
                      },
                    ]}
                  >
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            <View>
              <Text style={styles.questionText}>
                {" "}
                What event themes are you interest in?
              </Text>
              <View style={styles.scrolllViewCard}>
                <ScrollView>
                  {eventThemesList.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => handleSelectedEventThemes(item.id)}
                      style={[
                        styles.preferencesButton,
                        {
                          backgroundColor: selectedEventThemes.includes(item.id)
                            ? "#FF6961"
                            : "#E6E6E6",
                        },
                      ]}
                    >
                      <Text>{item.name}</Text>
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
              <View style={styles.scrolllViewCard}>
                <ScrollView>
                  {organizationCategoriesList.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => handleSelectedOrganizationCategories(item.id)}
                      style={[
                        styles.preferencesButton,
                        {
                          backgroundColor: selectedOrganizationCategories.includes(item.id)
                            ? "#FF6961"
                            : "#E6E6E6",
                        },
                      ]}
                    >
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
            <TouchableOpacity style={styles.signUpButton} onPress={signup}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeModalButton} onPress={closeModal}>
              <Text style={styles.closeModalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  questionText: {
    color: "black",
    fontSize: 13,
    marginTop: "3%",
    fontWeight: "bold",
  },
  signUpText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeModalText: {
    color: "#FF392E",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUpButton: {
    backgroundColor: "#FF392E",
    borderRadius: 15,
    marginTop: "3%",
    padding: "3%",
    alignItems: "center",
  },
  closeModalButton: {
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
  preferencesButton: {
    backgroundColor: "#E6E6E6",
    padding: 10,
    marginVertical: 5,
    borderRadius: 15,
    marginHorizontal: "1%",
    borderColor: "#FF6961",
    borderWidth: "1%",
  },
  scrollViewCard: {
    backgroundColor: "white",
    borderColor: "#FF392E",
    borderWidth: 1,
    borderRadius: 10,
    width: 330,
    height: 120,
  },
  scrolllViewCard: {
    backgroundColor: "white",
    borderColor: "#FF392E", 
    borderWidth: 1,
    borderRadius: 10,
    width: 330,
    height: 120,
  },
});

export default MyModal;