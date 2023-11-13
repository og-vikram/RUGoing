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

  useEffect(() => {
    fetch(url, {
      // headers: new Headers({
      //   "ngrok-skip-browser-warning": "true",
      // }),
    })
      .then((response) => response.json())
      .then((json) => setData(json.orgs))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (!loading) {
    return (
      <FlatList
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
              description={item.description}
              category="test_category"
              image_id={
                "https://se-images.campuslabs.com/clink/images/" + item.image_id
              }
            />
          </TouchableOpacity>
        )}
        key={(item) => item.org_id}
      />
      // <EventCard
      //   host="somedude"
      //   title="Come join us for coffee!"
      //   category="hello"
      //   eventid="1"
      // />
    );
  }

  return <ActivityIndicator size="large" color="#000000" />;
};

export default OrganizationsScreen;

const styles = StyleSheet.create({});
