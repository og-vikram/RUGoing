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
import React, { useEffect, useState, useReducer } from "react";
import OrganizationCard from "../components/OrganizationCard";
import EventCard from "../components/EventCard";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const url =
  "https://absolute-willing-salmon.ngrok-free.app/api/organization/all";

const OrganizationsScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const [categories, setCategories] = useState([]);

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

  
  const [ModalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
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
            <Text style={styles.buttonText}> Organization Categories </Text>
          </TouchableOpacity>
          
          <Modal
            animationType="slide"
            transparent={true}
            visible={ModalVisible}
            onRequestClose={closeModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                
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
              <TouchableOpacity onPress={closeModal} style={styles.bottombutton1}>
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

});
