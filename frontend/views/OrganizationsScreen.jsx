import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
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
    // categories.map((category) => {
    //   if (category.org_id == org_id) {
    //     return category.category_names;
    //   }
    // });
  };

  if (!loading && !loading2) {
    return (
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
    );
  }

  return <ActivityIndicator size="large" color="#000000" />;
};

export default OrganizationsScreen;

const styles = StyleSheet.create({
  flatList: {
    backgroundColor: "#FF392E",
  },
});
