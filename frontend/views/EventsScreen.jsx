import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";

const EventsScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [categories, setCategories] = useState([]);
  const [themeLoading, setThemeLoading] = useState(true);
  const [perkLoading, setPerkLoading] = useState(true);
  const [perks, setPerks] = useState([]);
  const [themes, setThemes] = useState([]);
  const url = "https://absolute-willing-salmon.ngrok-free.app/api/event/all";

  //fetches all events
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json.events))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  //fetches all categories
  useEffect(() => {
    fetch(
      "https://absolute-willing-salmon.ngrok-free.app/api/event/categories/all"
    )
      .then((response) => response.json())
      .then((json) => setCategories(json))
      .catch((error) => console.log(error))
      .finally(() => setLoading2(false));
  }, []);

  //fetches all themes
  useEffect(() => {
    fetch("https://absolute-willing-salmon.ngrok-free.app/api/event/themes/all")
      .then((response) => response.json())
      .then((json) => setThemes(json))
      .catch((error) => console.log(error))
      .finally(() => setThemeLoading(false));
  }, []);

  //fetches all perks
  useEffect(() => {
    fetch("https://absolute-willing-salmon.ngrok-free.app/api/event/perks/all")
      .then((response) => response.json())
      .then((json) => setPerks(json))
      .catch((error) => console.log(error))
      .finally(() => setPerkLoading(false));
  }, []);

  //returns categories for each event
  const returnCategories = (event_id) => {
    let item_categories = [];
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].event_id == event_id) {
        item_categories.push(categories[i].category_names);
      }
    }
    return item_categories;
  };

  //returns themes for each event
  const returnThemes = (event_id) => {
    let item_themes = [];
    for (let i = 0; i < themes.length; i++) {
      if (themes[i].event_id == event_id) {
        item_themes.push(themes[i].theme_names);
      }
    }
    return item_themes;
  };

  //returns perks for each event
  const returnPerks = (event_id) => {
    let item_perks = [];
    for (let i = 0; i < perks.length; i++) {
      if (perks[i].event_id == event_id) {
        item_perks.push(perks[i].perk_names);
      }
    }
    return item_perks;
  };

  //categories stuff
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoriesModalVisible, setCategoriesModalVisible] = useState(false);

  //fetches a list of all categories
  useEffect(() => {
    fetch("https://absolute-willing-salmon.ngrok-free.app/api/event/categories")
      .then((response) => response.json())
      .then((json) => {
        setCategoriesList(json.categories);
        // console.log("categories: ", categoriesList);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  //handles button clicks for categories
  const handleButtonClick = (id) => {
    const isSelected = selectedCategories.includes(id);
    if (isSelected) {
      setSelectedCategories(
        selectedCategories.filter((buttonId) => buttonId !== id)
      );
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  //closes the categories modal
  const handleCloseModal = () => {
    setSelectedCategories(selectedCategories);
    console.log("Selected buttons:", selectedCategories);
    filterEvents();

    setCategoriesModalVisible(false);
  };

  //opens the categories modal
  const openModal = () => {
    setCategoriesModalVisible(true);
  };

  //perks stuff
  const [perksList, setPerksList] = useState([]);
  const [selectedPerks, setSelectedPerks] = useState([]);
  const [perkModalVisible, setPerkModalVisible] = useState(false);

  //fetches a list of all perks
  useEffect(() => {
    fetch("https://absolute-willing-salmon.ngrok-free.app/api/event/perks")
      .then((response) => response.json())
      .then((json) => {
        setPerksList(json.perks);
      })
      // .then(() => console.log("perks: ", perksList))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);
  //handles button clicks for perks
  const handleButton2Click = (id) => {
    const isSelected = selectedPerks.includes(id);
    if (isSelected) {
      setSelectedPerks(selectedPerks.filter((buttonId) => buttonId !== id));
    } else {
      setSelectedPerks([...selectedPerks, id]);
    }
  };
  //closes the perks modal
  const handleClosePerkModal = () => {
    setSelectedPerks(selectedPerks);
    console.log("Selected buttons:", selectedPerks);
    filterEvents();

    setPerkModalVisible(false);
  };
  //opens the perks modal
  const openPerkModal = () => {
    setPerkModalVisible(true);
  };

  //themes stuff
  const [themesList, setThemesList] = useState([]);

  const [selectedThemes, setSelectedThemes] = useState([]);
  const [themeModalVisible, setThemeModalVisible] = useState(false);
  //fetches a list of all themes
  useEffect(() => {
    fetch("https://absolute-willing-salmon.ngrok-free.app/api/event/themes")
      .then((response) => response.json())
      .then((json) => {
        setThemesList(json.themes);
      })
      // .then(() => console.log("themes: ", themesList))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);
  //handles button clicks for themes
  const handleThemeClick = (id) => {
    const isSelected = selectedThemes.includes(id);
    if (isSelected) {
      setSelectedThemes(selectedThemes.filter((buttonId) => buttonId !== id));
    } else {
      setSelectedThemes([...selectedThemes, id]);
    }
  };
  //closes the themes modal
  const handleThemeModalClose = () => {
    setSelectedThemes(selectedThemes);
    console.log("Selected buttons:", selectedThemes);

    filterEvents();
    setThemeModalVisible(false);
  };
  //opens the themes modal
  const openThemeModal = () => {
    setThemeModalVisible(true);
  };

  const [filteredEvents, setFilteredEvents] = useState([]);
  const [themedEvents, setThemedEvents] = useState([]);
  const [perkedEvents, setPerkedEvents] = useState([]);
  const [categorizedEvents, setCategorizedEvents] = useState([]);
  //fetches a list of all events that are categorized
  useEffect(() => {
    fetch(
      "https://absolute-willing-salmon.ngrok-free.app/api/event/categorized/all"
    )
      .then((response) => response.json())
      .then((json) => {
        setCategorizedEvents(json);
      });
  }, []);
  //fetches a list of all events that are perked
  useEffect(() => {
    fetch("https://absolute-willing-salmon.ngrok-free.app/api/event/perked/all")
      .then((response) => response.json())
      .then((json) => {
        setPerkedEvents(json);
      });
  }, []);
  //fetches a list of all events that are themed
  useEffect(() => {
    fetch("https://absolute-willing-salmon.ngrok-free.app/api/event/themed/all")
      .then((response) => response.json())
      .then((json) => {
        setThemedEvents(json);
      });
  }, []);
  // returns all events that are categorized
  const returnCategorizedEvents = (category_id) => {
    let event_ids = [];
    for (let i = 0; i < categorizedEvents.length; i++) {
      if (category_id == categorizedEvents[i].category_id) {
        for (let j = 0; j < categorizedEvents[i].events.length; j++) {
          event_ids.push(categorizedEvents[i].events[j]);
        }
      }
    }
    return event_ids;
  };
  // returns all events that are themed
  const returnThemedEvents = (theme_id) => {
    let event_ids = [];
    for (let i = 0; i < themedEvents.length; i++) {
      if (theme_id == themedEvents[i].theme_id) {
        for (let j = 0; j < themedEvents[i].events.length; j++) {
          event_ids.push(themedEvents[i].events[j]);
        }
      }
    }
    return event_ids;
  };
  // returns all events that are perked
  const returnPerkedEvents = (perk_id) => {
    let event_ids = [];
    for (let i = 0; i < perkedEvents.length; i++) {
      if (perk_id == perkedEvents[i].perk_id) {
        for (let j = 0; j < perkedEvents[i].events.length; j++) {
          event_ids.push(perkedEvents[i].events[j]);
        }
      }
    }
    return event_ids;
  };
  // MAIN FILTER EVENTS CODE
  const filterEvents = () => {
    let filteredEventsLocal = [];

    for (i in selectedCategories) {
      let category_id = selectedCategories[i];
      let event_ids = returnCategorizedEvents(category_id);
      for (let i = 0; i < event_ids.length; i++) {
        if (!filteredEvents.includes(event_ids[i])) {
          filteredEventsLocal.push(event_ids[i]);
        }
      }
    }
    for (i in selectedPerks) {
      let perk_name = selectedPerks[i];
      let event_ids = returnPerkedEvents(perk_name);
      for (let i = 0; i < event_ids.length; i++) {
        if (!filteredEvents.includes(event_ids[i])) {
          filteredEventsLocal.push(event_ids[i]);
        }
      }
    }
    for (i in selectedThemes) {
      let theme_name = selectedThemes[i];
      let event_ids = returnThemedEvents(theme_name);
      for (let i = 0; i < event_ids.length; i++) {
        if (!filteredEvents.includes(event_ids[i])) {
          filteredEventsLocal.push(event_ids[i]);
        }
      }
    }

    setFilteredEvents(filteredEventsLocal);
    console.log("filtered events: ", filteredEventsLocal);
  };

  if (!loading && !loading2 && !themeLoading && !perkLoading) {
    return (
      <View>
        <View style={styles.buttonContainer}>
          {/* Event Categories */}
          <TouchableOpacity style={styles.button1} onPress={openModal}>
            <Text style={styles.buttonText}> Categories </Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={categoriesModalVisible}
            onRequestClose={handleCloseModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.questionText}>
                  What event categories are you interested in?
                </Text>
                <View style={styles.card2}>
                  <ScrollView>
                    {categoriesList.map((item) => (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => handleButtonClick(item.id)}
                        style={[
                          styles.button,
                          {
                            backgroundColor: selectedCategories.includes(
                              item.id
                            )
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
                <TouchableOpacity
                  onPress={handleCloseModal}
                  style={styles.bottombutton1}
                >
                  <Text style={styles.bottombuttontext1}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Event Perks */}
          <TouchableOpacity style={styles.button2} onPress={openPerkModal}>
            <Text style={styles.button2Text}> Perks </Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={perkModalVisible}
            onRequestClose={handleClosePerkModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.questionText}>
                  What event perks are you interested in?
                </Text>
                <View style={styles.card2}>
                  <ScrollView>
                    {perksList.map((item) => (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => handleButton2Click(item.id)}
                        style={[
                          styles.button,
                          {
                            backgroundColor: selectedPerks.includes(item.id)
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
                <TouchableOpacity
                  onPress={handleClosePerkModal}
                  style={styles.bottombutton1}
                >
                  <Text style={styles.bottombuttontext1}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Event Themes */}
          <TouchableOpacity style={styles.button1} onPress={openThemeModal}>
            <Text style={styles.buttonText}> Themes </Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={themeModalVisible}
            onRequestClose={handleThemeModalClose}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.questionText}>
                  What event themes are you interested in?
                </Text>
                <View style={styles.card2}>
                  <ScrollView>
                    {themesList.map((item) => (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => handleThemeClick(item.id)}
                        style={[
                          styles.button,
                          {
                            backgroundColor: selectedThemes.includes(item.id)
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
                <TouchableOpacity
                  onPress={handleThemeModalClose}
                  style={styles.bottombutton1}
                >
                  <Text style={styles.bottombuttontext1}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        <FlatList
          style={styles.flatList}
          data={
            filteredEvents == undefined
              ? data
              : filteredEvents.length == 0
              ? data
              : filteredEvents
          }
          // data={data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("EventProfileScreen", {
                  eventId: item.id,
                });
                console.log("length: ", item.length);
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
  container: {
    backgroundColor: "#FF392E",
  },
  eventCard: {
    color: "red",
  },
  button1: {
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
  button2: {
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
  button2Text: {
    color: "#FF392E",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonText: {
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
  button2Text: {
    color: "#FF392E",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  card2: {
    backgroundColor: "white",
    borderColor: "#FF392E",
    borderWidth: 1,
    borderRadius: 10,
    width: 330,
    height: 525,
  },
  button: {
    backgroundColor: "#E6E6E6",
    padding: 10,
    marginVertical: 5,
    borderRadius: 15,
    marginHorizontal: "1%",
    borderColor: "#FF6961",
    borderWidth: "1%",
  },
  redButton: {
    backgroundColor: "#FF6961",
  },
  questionText: {
    color: "black",
    fontSize: 13,
    marginTop: "3%",
    fontWeight: "bold",
  },
  bottombuttontext1: {
    color: "#FF392E",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottombutton1: {
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
