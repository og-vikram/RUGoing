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

  useEffect(() => {
    fetch(url, {
      // headers: new Headers({
      //   "ngrok-skip-browser-warning": "true",
      // }),
    })
      .then((response) => response.json())
      .then((json) => setData(json.events))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch(
      "https://absolute-willing-salmon.ngrok-free.app/api/event/categories/all"
    )
      .then((response) => response.json())
      .then((json) => setCategories(json))
      .catch((error) => console.log(error))
      .finally(() => setLoading2(false));
  }, []);

  useEffect(() => {
    fetch("https://absolute-willing-salmon.ngrok-free.app/api/event/themes/all")
      .then((response) => response.json())
      .then((json) => setThemes(json))
      .catch((error) => console.log(error))
      .finally(() => setThemeLoading(false));
  }, []);

  useEffect(() => {
    fetch("https://absolute-willing-salmon.ngrok-free.app/api/event/perks/all")
      .then((response) => response.json())
      .then((json) => setPerks(json))
      .catch((error) => console.log(error))
      .finally(() => setPerkLoading(false));
  }, []);

  const returnCategories = (event_id) => {
    let item_categories = [];
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].event_id == event_id) {
        item_categories.push(categories[i].category_names);
      }
    }
    return item_categories;
  };

  const returnThemes = (event_id) => {
    let item_themes = [];
    for (let i = 0; i < themes.length; i++) {
      if (themes[i].event_id == event_id) {
        item_themes.push(themes[i].theme_names);
      }
    }
    return item_themes;
  };

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

  const [selectedButtons1, setSelectedButtons1] = useState([]);
  const [modal1Visible, setModal1Visible] = useState(false);

  useEffect(() => {
    fetch("https://absolute-willing-salmon.ngrok-free.app/api/event/categories")
      .then((response) => response.json())
      .then((json) => {
        setCategoriesList(json.categories);
        console.log("categories: ", categoriesList);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  const handleButtonClick = (id) => {
    const isSelected = selectedButtons1.includes(id);
    if (isSelected) {
      setSelectedButtons1(
        selectedButtons1.filter((buttonId) => buttonId !== id)
      );
    } else {
      setSelectedButtons1([...selectedButtons1, id]);
    }
  };

  const handleCloseModal = () => {
    setSelectedButtons1(selectedButtons1);
    console.log("Selected buttons:", selectedButtons1);

    setModal1Visible(false);
  };

  const openModal = () => {
    setModal1Visible(true);
  };

  //perks stuff
  const [perksList, setPerksList] = useState([]);

  const [selectedButtons2, setSelectedButtons2] = useState([]);
  const [modal2Visible, setModal2Visible] = useState(false);

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

  const handleCloseModal2 = () => {
    setSelectedButtons2(selectedButtons2);
    console.log("Selected buttons:", selectedButtons2);

    setModal2Visible(false);
  };

  const openModal2 = () => {
    setModal2Visible(true);
  };

  //themes stuff
  const [themesList, setThemesList] = useState([]);

  const [selectedButtons3, setSelectedButtons3] = useState([]);
  const [modal3Visible, setModal3Visible] = useState(false);

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

  const handleCloseModal3 = () => {
    setSelectedButtons3(selectedButtons3);
    console.log("Selected buttons:", selectedButtons3);

    setModal3Visible(false);
  };

  const openModal3 = () => {
    setModal3Visible(true);
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
            visible={modal1Visible}
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
          <TouchableOpacity style={styles.button2} onPress={openModal2}>
            <Text style={styles.button2Text}> Perks </Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modal2Visible}
            onRequestClose={handleCloseModal2}
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
                <TouchableOpacity
                  onPress={handleCloseModal2}
                  style={styles.bottombutton1}
                >
                  <Text style={styles.bottombuttontext1}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Event Themes */}
          <TouchableOpacity style={styles.button1} onPress={openModal3}>
            <Text style={styles.buttonText}> Themes </Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modal3Visible}
            onRequestClose={handleCloseModal3}
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
                <TouchableOpacity
                  onPress={handleCloseModal3}
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
