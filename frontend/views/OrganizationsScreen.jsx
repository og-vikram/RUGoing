import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import OrganizationCard from "../components/OrganizationCard";

//URL for API to recieve all organizations
const url =
  "https://absolute-willing-salmon.ngrok-free.app/api/organization/all";

//OrganizationsScreen component
const OrganizationsScreen = ({ navigation }) => {
  //State variables for organization data, categories, selected categories, boolean modalVisible, selected filter buttons, and loading states
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [categories, setCategories] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  //Fetch organization categories from the API on component mount
  useEffect(() => {
    fetch(
      "https://absolute-willing-salmon.ngrok-free.app/api/organization/categories"
    )
      .then((response) => response.json())
      .then((json) => {
        setCategoriesList(json.categories);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  //Handle button click to toggle selection in filter screen
  const handleButtonClick = (id) => {
    const isSelected = selectedButtons.includes(id);
    if (isSelected) {
      setSelectedButtons(selectedButtons.filter((buttonId) => buttonId !== id));
    } else {
      setSelectedButtons([...selectedButtons, id]);
    }
  };

  //Handle closing the modal
  const handleCloseModal = () => {

    setSelectedButtons(selectedButtons);
    setModalVisible(false);
  }

  //Handle opening the modal
  const openModal = () => {
    setModalVisible(true);
  };

  //Fetch organizations data from the API on component mount
  useEffect(() => {
    fetch(url, {
    })
      .then((response) => response.json())
      .then((json) => setData(json.orgs))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  //Fetch all organization categories from the API
  useEffect(() => {
    fetch(
      "https://absolute-willing-salmon.ngrok-free.app/api/organization/categories/all"
    )
      .then((response) => response.json())
      .then((json) => setCategories(json))
      .catch((error) => console.log(error))
      .finally(() => setLoading2(false));
  }, []);

  //Return categories associated with an organization
  const returnCategories = (org_id) => {
    let item_categories = [];
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].org_id == org_id) {
        item_categories.push(categories[i].category_names);
      }
    }
    return item_categories;
  };

  //Render component after loading is complete
  if (!loading && !loading2) {
    return (
      <View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button1} onPress={openModal}>
            <Text style={styles.buttonText}> Organizations Categories </Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={handleCloseModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>

                <Text style={styles.questionText}>What organization categories are you interested in?</Text>
                <View style={styles.card2}>
                  <ScrollView>
                    {categoriesList.map((item) => (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => handleButtonClick(item.id)}
                        style={[
                          styles.button, {
                            backgroundColor: selectedButtons.includes(item.id) ? '#FF6961' : '#E6E6E6',
                          },
                        ]}
                      >
                        <Text style={styles.buttonText}>{item.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>

                </View>
                <TouchableOpacity onPress={handleCloseModal} style={styles.bottombutton1}>
                  <Text style={styles.bottombuttontext1}>
                    Close
                  </Text>
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
                navigation.navigate("OrganizationProfileScreen", {
                  organizationId: item.id,
                });
              }}
            >
              <OrganizationCard
                title={item.name}
                description={item.about}
                categories={returnCategories(item.id)}
                image_id={
                  "https://se-images.campuslabs.com/clink/images/" + item.image_id
                }
              />
            </TouchableOpacity>
          )}
          key={(item) => item.org_id}
        />
      </View>
    );
  }
  //Display loading indicator while data is being fetched
  return <ActivityIndicator size="large" color="#000000" />;
};

//Export the OrganizationsScreen component
export default OrganizationsScreen;

//Styles for the component
const styles = StyleSheet.create({
  flatList: {
    backgroundColor: "#FF392E",
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
    height: "75%",
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
  buttonContainer: {
    backgroundColor: "#E6E6E6",
    height: "7%",
    alignItems: "center",
    justifyContent: "center",
    borderTopColor: "#FF392E",
    borderTopWidth: "2%",
  },
  button1: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: "96%",
  },
  buttonText: {
    color: '#FF392E',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: "bold",
  },
  card2: {
    backgroundColor: 'white',
    borderColor: "#FF392E",
    borderWidth: 1,
    borderRadius: 10,
    width: 330,
    height: 525,
  },
});
