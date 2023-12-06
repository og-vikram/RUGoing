import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import OrganizationCard from "../components/OrganizationCard";
import EventCard from "../components/EventCard";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "react-native-elements";

const Stack = createNativeStackNavigator();

const url =
  "https://absolute-willing-salmon.ngrok-free.app/api/organization/all";

const OrganizationsScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const [categories, setCategories] = useState([]);

  //me
  const [categoriesList, setCategoriesList] = useState([]);

  const[selectedButtons, setSelectedButtons] = useState([]);
  const[modalVisible, setModalVisible] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try{
  //       const response = await fetch('');
  //       const result= await response.json();
  //       setData(result);
  //     } catch ( error) {
  //       console.error('Error fetching data: ', error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    fetch(
      "https://absolute-willing-salmon.ngrok-free.app/api/organization/categories"
    )
      .then((response) => response.json())
      .then((json) => {
        setCategoriesList(json.categories);
        console.log('categories: ', categoriesList)
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  const handleButtonClick = (id) => {
    const isSelected = selectedButtons.includes(id);
    if(isSelected) {
      setSelectedButtons(selectedButtons.filter((buttonId) => buttonId !== id));
    }else{
      setSelectedButtons([...selectedButtons, id]);
    }
  };

  const handleCloseModal = () => {

    setSelectedButtons(selectedButtons);
    console.log('Selected buttons:', selectedButtons);

    setModalVisible(false);
  }


  const openModal = () => {
    setModalVisible(true);
  };


  useEffect(() => {
    fetch(url, {
      // headers: new Headers({
      //   "ngrok-skip-browser-warning": "true",
      // }),
    })
      .then((response) => response.json())
      .then((json) => setData(json.orgs))
      // .then(() => console.log(data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch(
      "https://absolute-willing-salmon.ngrok-free.app/api/organization/categories/all"
    )
      .then((response) => response.json())
      .then((json) => setCategories(json))
      .catch((error) => console.log(error))
      .finally(() => setLoading2(false));
  }, []);

  const returnCategories = (org_id) => {
    let item_categories = [];
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].org_id == org_id) {
        item_categories.push(categories[i].category_names);
      }
    }
    return item_categories;
  };

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
                          onPress={()=>handleButtonClick(item.id)}
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

  return <ActivityIndicator size="large" color="#000000" />;
};

export default OrganizationsScreen;

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
