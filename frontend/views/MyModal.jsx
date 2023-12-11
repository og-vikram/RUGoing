import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

const MyModal = ({
  isVisible,
  closeModal,
  modalText,
  handleSubmit,
  onSignupClick,
}) => {
  const signup = () => {
    setSelectedButtons3(selectedButtons3);
    console.log("Selected buttons:", selectedButtons3);

    setSelectedButtons2(selectedButtons2);
    console.log("Selected buttons:", selectedButtons2);

    setSelectedButtons1(selectedButtons1);
    console.log("Selected buttons:", selectedButtons1);

    setSelectedButtons(selectedButtons);
    console.log("Selected buttons:", selectedButtons);

    closeModal();
    onSignupClick(
      selectedButtons2,
      selectedButtons3,
      selectedButtons1,
      selectedButtons
    );
  };

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
            <Text style={styles.questionText}>
              What event categories are you interested in?
            </Text>
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
              <Text style={styles.questionText}>
                {" "}
                What event themes are you interest in?
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
            </View>
            <View style={styles.questionText}>
              <Text style={styles.questionText}>
                {" "}
                What organization categories are you interest in?
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
            <TouchableOpacity style={styles.bottombutton} onPress={signup}>
              <Text style={styles.bottombuttontext}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottombutton1} onPress={closeModal}>
              <Text style={styles.bottombuttontext1}>Close</Text>
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
  scrollView: {
    width: 1,
    height: 1,
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
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 0,
  },
  buttonContainer2: {
    flexDirection: "row",
    marginBottom: 10,
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
  card1: {
    backgroundColor: "white",
    borderColor: "#FF392E",
    borderWidth: 1,
    borderRadius: 10,
    width: 330,
    height: 120,
  },
  card2: {
    backgroundColor: "white",
    borderColor: "#FF392E",
    borderWidth: 1,
    borderRadius: 10,
    width: 330,
    height: 120,
  },
});

export default MyModal;
