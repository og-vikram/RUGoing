import { ActivityIndicator, ScrollView, StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, } from "react-native";
import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";

/**
 * EventsScreen is a React component representing the screen that displays events.
 *
 * @param {object} navigation - Navigation prop for navigating within the app.
 */
const EventsScreen = ({ navigation }) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [categories, setCategories] = useState([]);
  const [themeLoading, setThemeLoading] = useState(true);
  const [perkLoading, setPerkLoading] = useState(true);
  const [perks, setPerks] = useState([]);
  const [themes, setThemes] = useState([]);
  const [eventsCategoriesList, setEventsCategoriesList] = useState([]);
  const [selectedEventCategories, setSelectedEventCategories] = useState([]);
  const [eventCategoriesModalVisible, setEventCategoriesModalVisible] = useState(false);
  const [eventsPerksList, setEventsPerksList] = useState([]);
  const [selectedEventsPerks, setSelectedEventsPerks] = useState([]);
  const [eventsPerksModalVisible, setEventsPerksModalVisible] = useState(false);
  const [eventThemesList, setEventThemesList] = useState([]);
  const [selectedEventThemes, setSelectedEventThemes] = useState([]);
  const [eventThemesModalVisible, setEventThemesModalVisible] = useState(false);

  const url = "https://absolute-willing-salmon.ngrok-free.app/api/event/all";

  /**
   * useEffect hook fetches data from the specified URL and updates the component state.
   * It sets the loading state to false after the data retrieval process is completed.
   */
  useEffect(() => {
    // Fetch data from the specified URL
    fetch(url, {})
      .then((response) => response.json())
      .then((json) => {
        // Update the component state with the retrieved data
        setData(json.events);
      })
      .catch((error) => {
        // Log any errors that occur during the data retrieval process
        console.log(error);
      })
      .finally(() => {
        // Set the loading state to false after data retrieval is completed
        setLoading(false);
      });
  }, []);

  /**
   * useEffect hook fetches all event categories from the specified API endpoint,
   * updates the component state with the retrieved categories, and sets the loading
   * state to false after the data retrieval process is completed.
   */
  useEffect(() => {
    // Fetch all event categories from the specified API endpoint
    fetch("https://absolute-willing-salmon.ngrok-free.app/api/event/categories/all")
      .then((response) => response.json())
      .then((json) => {
        // Update the component state with the retrieved categories
        setCategories(json);
      })
      .catch((error) => {
        // Log any errors that occur during the data retrieval process
        console.log(error);
      })
      .finally(() => {
        // Set the loading state to false after data retrieval is completed
        setLoading2(false);
      });
  }, []);

  /**
   * useEffect hook fetches all event themes from the specified API endpoint,
   * updates the component state with the retrieved themes, and sets the loading
   * state for themes to false after the data retrieval process is completed.
   */
  useEffect(() => {
    // Fetch all event themes from the specified API endpoint
    fetch("https://absolute-willing-salmon.ngrok-free.app/api/event/themes/all")
      .then((response) => response.json())
      .then((json) => {
        // Update the component state with the retrieved themes
        setThemes(json);
      })
      .catch((error) => {
        // Log any errors that occur during the data retrieval process
        console.log(error);
      })
      .finally(() => {
        // Set the loading state for themes to false after data retrieval is completed
        setThemeLoading(false);
      });
  }, []);

  /**
   * useEffect hook fetches all event perks from the specified API endpoint,
   * updates the component state with the retrieved perks, and sets the loading
   * state for perks to false after the data retrieval process is completed.
   */
  useEffect(() => {
    // Fetch all event perks from the specified API endpoint
    fetch("https://absolute-willing-salmon.ngrok-free.app/api/event/perks/all")
      .then((response) => response.json())
      .then((json) => {
        // Update the component state with the retrieved perks
        setPerks(json);
      })
      .catch((error) => {
        // Log any errors that occur during the data retrieval process
        console.log(error);
      })
      .finally(() => {
        // Set the loading state for perks to false after data retrieval is completed
        setPerkLoading(false);
      });
  }, []);

  /**
   * Returns an array of category names associated with the specified event ID.
   *
   * @param {number} event_id - The ID of the event to retrieve categories for.
   * @returns {string[]} An array of category names associated with the specified event.
   */
  const returnCategories = (event_id) => {
    // Initialize an empty array to store category names
    let item_categories = [];

    // Iterate through the categories array to find categories associated with the event_id
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].event_id === event_id) {
        // Push category names to the item_categories array
        item_categories.push(categories[i].category_names);
      }
    }

  // Return the array of category names
  return item_categories;
  };

  /**
   * Returns an array of theme names associated with the specified event ID.
   *
   * @param {number} event_id - The ID of the event to retrieve themes for.
   * @returns {string[]} An array of theme names associated with the specified event.
   */
  const returnThemes = (event_id) => {
    // Initialize an empty array to store theme names
    let item_themes = [];

    // Iterate through the themes array to find themes associated with the event_id
    for (let i = 0; i < themes.length; i++) {
      if (themes[i].event_id === event_id) {
        // Push theme names to the item_themes array
        item_themes.push(themes[i].theme_names);
      }
    }

    // Return the array of theme names
    return item_themes;
  };

  /**
   * Returns an array of perk names associated with the specified event ID.
   *
   * @param {number} event_id - The ID of the event to retrieve perks for.
   * @returns {string[]} An array of perk names associated with the specified event.
   */
  const returnPerks = (event_id) => {
    // Initialize an empty array to store perk names
    let item_perks = [];

    // Iterate through the perks array to find perks associated with the event_id
    for (let i = 0; i < perks.length; i++) {
      if (perks[i].event_id === event_id) {
        // Push perk names to the item_perks array
        item_perks.push(perks[i].perk_names);
      }
    }

    // Return the array of perk names
    return item_perks;
  };

  /**
   * useEffect hook fetches event categories from the specified API endpoint,
   * sets the component state with the retrieved categories, logs the categories
   * to the console, and sets the loading state to false after the fetch is complete.
   */
  useEffect(() => {
    // Fetch event categories from the specified API endpoint
    fetch("https://absolute-willing-salmon.ngrok-free.app/api/event/categories")
      .then((response) => response.json())
      .then((json) => {
        // Set the fetched event categories to the state
        setEventsCategoriesList(json.categories);
        
        // Log the fetched categories to the console
        console.log("categories: ", eventsCategoriesList);
      })
      .catch((error) => {
        // Log any errors that occur during the fetch
        console.log(error);
      })
      .finally(() => {
        // Set loading state to false after fetch is complete
        setLoading(false);
      });
  }, []);

  /**
   * Handles the selection and deselection of event categories.
   *
   * @param {number} id - The ID of the event category to be selected or deselected.
   */
  const handleEventCategories = (id) => {
    // Check if the category with the given ID is already selected
    const isSelected = selectedEventCategories.includes(id);

    // Update the selectedEventCategories state based on whether the category is selected or not
    if (isSelected) {
      // If selected, remove the category from the selected list
      setSelectedEventCategories(
        selectedEventCategories.filter((buttonId) => buttonId !== id)
      );
    } else {
      // If not selected, add the category to the selected list
      setSelectedEventCategories([...selectedEventCategories, id]);
    }
  };

  /**
   * Closes the event categories modal, logs the selected event categories to the console,
   * and updates the component state with the final selected event categories.
   */
  const closeEventCategoriesModal = () => {
    // Log the selected event categories to the console
    console.log("Selected buttons:", selectedEventCategories);

    // Update the component state with the final selected event categories
    setSelectedEventCategories(selectedEventCategories);

    // Close the event categories modal
    setEventCategoriesModalVisible(false);
  };

  /**
   * Opens the event categories modal, allowing users to select event categories.
   */
  const openEventCategoriesModal = () => {
    // Set the event categories modal to be visible
    setEventCategoriesModalVisible(true);
  };

  /**
   * Fetches the list of event perks from the API and updates the component state accordingly.
   * Logs the fetched perks to the console and sets the loading state to false once the fetch is complete.
   */
  useEffect(() => {
    // Fetch event perks from the API
    fetch("https://absolute-willing-salmon.ngrok-free.app/api/event/perks")
      .then((response) => response.json())
      .then((json) => {
        // Set the fetched event perks to the component state
        setEventsPerksList(json.perks);
      })
      .then(() => {
        // Log the fetched perks to the console
        console.log("perks: ", eventsPerksList);
      })
      .catch((error) => {
        // Log any errors that occur during the fetch
        console.log(error);
      })
      .finally(() => {
        // Set loading state to false after fetch is complete
        setLoading(false);
      });
  }, []);

  /**
   * Handles the selection or deselection of an event perk.
   * If the perk is already selected, it is removed from the selected list.
   * If the perk is not selected, it is added to the selected list.
   *
   * @param {string} id - The unique identifier of the event perk.
   */
  const handleEventPerks = (id) => {
    // Check if the perk is already selected
    const isSelected = selectedEventsPerks.includes(id);

    // Update the selected event perks based on the current selection status
    if (isSelected) {
      // If the perk is selected, remove it from the list
      setSelectedEventsPerks(
        selectedEventsPerks.filter((buttonId) => buttonId !== id)
      );
    } else {
      // If the perk is not selected, add it to the list
      setSelectedEventsPerks([...selectedEventsPerks, id]);
    }
  };

  /**
   * Closes the events perks modal, preserving the selected event perks and logging them.
   * This function sets the modal visibility to false.
   */
  const closeEventsPerksModal = () => {
    // Preserve the selected event perks and log them
    setSelectedEventsPerks(selectedEventsPerks);
    console.log("Selected event perks:", selectedEventsPerks);

    // Set the events perks modal visibility to false
    setEventsPerksModalVisible(false);
  };

  /**
   * Opens the events perks modal by setting its visibility to true.
   */
  const openEventsPerksModal = () => {
    // Set the events perks modal visibility to true
    setEventsPerksModalVisible(true);
  };

  /**
   * Fetches event themes from the API and updates the state with the retrieved data.
   * The themes are then logged to the console, and loading state is set to false.
   * This effect runs once on component mount.
   */
  useEffect(() => {
    // Fetch event themes from the API
    fetch("https://absolute-willing-salmon.ngrok-free.app/api/event/themes")
      .then((response) => response.json())
      .then((json) => {
        // Update the state with the retrieved event themes
        setEventThemesList(json.themes);
      })
      .then(() => {
        // Log the themes to the console
        console.log("themes: ", eventThemesList);
      })
      .catch((error) => {
        // Log any errors that occur during the fetch
        console.log(error);
      })
      .finally(() => {
        // Set loading state to false after the fetch is complete
        setLoading(false);
      });
  }, []);

  /**
   * Handles the selection or deselection of an event theme.
   * @param {string} id - The unique identifier of the event theme.
   */
  const handleEventThemes = (id) => {
    // Check if the theme is already selected
    const isSelected = selectedEventThemes.includes(id);

    // If selected, remove the theme from the selected themes list
    // If not selected, add the theme to the selected themes list
    if (isSelected) {
      setSelectedEventThemes(
        selectedEventThemes.filter((buttonId) => buttonId !== id)
      );
    } else {
      setSelectedEventThemes([...selectedEventThemes, id]);
    }
  };

  /**
   * Closes the event themes modal and logs the selected event themes.
   */
  const closeEventThemesModal = () => {
    // Update the state with the selected event themes
    setSelectedEventThemes(selectedEventThemes);

    // Log the selected event themes to the console for debugging or monitoring
    console.log("Selected buttons:", selectedEventThemes);

    // Close the event themes modal
    setEventThemesModalVisible(false);
  };

  /**
   * Opens the event themes modal.
   */
  const openEventThemesModal = () => {
    // Set the visibility state to true, displaying the event themes modal
    setEventThemesModalVisible(true);
  };

  if (!loading && !loading2 && !themeLoading && !perkLoading) {
    return (
      <View>
        <View style={styles.buttonContainer}>
          {/* Event Categories */}
          <TouchableOpacity style={styles.categoriesAndThemesButton} onPress={openEventCategoriesModal}>
            <Text style={styles.buttonTextWhite}> Categories </Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={eventCategoriesModalVisible}
            onRequestClose={closeEventCategoriesModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.questionText}>
                  What event categories are you interested in?
                </Text>
                <View style={styles.scrollViewContainer}>
                  <ScrollView>
                    {eventsCategoriesList.map((item) => (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => handleEventCategories(item.id)}
                        style={[
                          styles.scrollViewButton,
                          {
                            backgroundColor: selectedEventCategories.includes(item.id)
                              ? "#FF6961"
                              : "#E6E6E6",
                          },
                        ]}
                      >
                        <Text style={styles.buttonTextRed}>{item.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
                <TouchableOpacity
                  onPress={closeEventCategoriesModal}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Event Perks */}
          <TouchableOpacity style={styles.perksButton} onPress={openEventsPerksModal}>
            <Text style={styles.buttonTextRed}> Perks </Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={eventsPerksModalVisible}
            onRequestClose={closeEventsPerksModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.questionText}>
                  What event perks are you interested in?
                </Text>
                <View style={styles.scrollViewContainer}>
                  <ScrollView>
                    {eventsPerksList.map((item) => (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => handleEventPerks(item.id)}
                        style={[
                          styles.scrollViewButton,
                          {
                            backgroundColor: selectedEventsPerks.includes(item.id)
                              ? "#FF6961"
                              : "#E6E6E6",
                          },
                        ]}
                      >
                        <Text style={styles.buttonTextRed}>{item.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
                <TouchableOpacity
                  onPress={closeEventsPerksModal}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Event Themes */}
          <TouchableOpacity style={styles.categoriesAndThemesButton} onPress={openEventThemesModal}>
            <Text style={styles.buttonTextWhite}> Themes </Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={eventThemesModalVisible}
            onRequestClose={closeEventThemesModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.questionText}>
                  What event themes are you interested in?
                </Text>
                <View style={styles.scrollViewContainer}>
                  <ScrollView>
                    {eventThemesList.map((item) => (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => handleEventThemes(item.id)}
                        style={[
                          styles.scrollViewButton,
                          {
                            backgroundColor: selectedEventThemes.includes(item.id)
                              ? "#FF6961"
                              : "#E6E6E6",
                          },
                        ]}
                      >
                        <Text style={styles.buttonTextRed}>{item.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
                <TouchableOpacity
                  onPress={closeEventThemesModal}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        <FlatList
          style={styles.flatList}
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("EventProfileScreen", {
                  eventId: item.id,
                });
              }}
            >
              <EventCard
                title={item.name}
                description={item.description}
                categories={returnCategories(item.id)}
                themes={returnThemes(item.id)}
                perks={returnPerks(item.id)}
                image_id={
                  "https://se-images.campuslabs.com/clink/images/" +
                  item.image_id
                }
                eventId={item.id}
              />
            </TouchableOpacity>
          )}
          key={(item) => item.id}
        />
      </View>
    );
  }

  return <ActivityIndicator size="large" color="#000000" />;
};

export default EventsScreen;

const styles = StyleSheet.create({
  categoriesAndThemesButton: {
    backgroundColor: "#FF392E",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: "33%",
    marginTop: "3%",
    marginBottom: "3%",
    flexDirection: "column",
    justifyContent: "center",
  },
  perksButton: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: "32%",
    marginTop: "3%",
    marginBottom: "3%",
    flexDirection: "column",
    justifyContent: "center",
  },
  buttonTextRed: {
    color: "#FF392E",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonTextWhite: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonContainer: {
    backgroundColor: "#E6E6E6",
    justifyContent: "space-between",
    flexDirection: "row",
    height: "8.5%",
  },
  scrollViewContainer: {
    backgroundColor: "white",
    borderColor: "#FF392E",
    borderWidth: 1,
    borderRadius: 10,
    width: 330,
    height: 525,
  },
  scrollViewButton: {
    backgroundColor: "#E6E6E6",
    padding: 10,
    marginVertical: 5,
    borderRadius: 15,
    marginHorizontal: "1%",
    borderColor: "#FF6961",
    borderWidth: "1%",
  },
  questionText: {
    color: "black",
    fontSize: 13,
    marginTop: "3%",
    fontWeight: "bold",
  },
  closeButtonText: {
    color: "#FF392E",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
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
    height: "75%",
  },
});
