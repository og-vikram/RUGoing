import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import { useRoute } from "@react-navigation/native";

const url = "https://absolute-willing-salmon.ngrok-free.app/api/organization/";
const OrganizationProfileScreen = ({ navigation }) => {
  const events = [
    "Event 1",
    "Event 2",
    "Event 3",
    "Event 4",
    "Event 5",
    "Event 6",
  ];
  const route = useRoute();
  const organizationId = route.params.organizationId;
  const newUrl = url + organizationId;
  const [organizationData, setOrganizationData] = useState("");

  useEffect(() => {
    fetch(newUrl, {
      // headers: new Headers({
      //   "ngrok-skip-browser-warning": "true",
      // }),
    })
      .then((response) => response.json())
      .then((json) => setOrganizationData(json))
      .catch((error) => console.log(error));
  }, []);
  const imageUrl = "https://se-images.campuslabs.com/clink/images/";

  return (
    <ScrollView>
      {/* Banner with background image */}
      <Image
        source={{ uri: imageUrl + organizationData.image_id }}
        style={{ width: "100%", height: 200 }}
      />
      <View>
        <Text>Hello</Text>
      </View>

      <View style={styles.header}>
        <Image
          source={{ uri: organizationData.image_id }}
          style={styles.profileImage}
        />
        <Text style={styles.organizationName}>{organizationData.name}</Text>
      </View>
      <View style={styles.memberSection}>
        <Text style={styles.memberCount}>{"# Members"}</Text>
        <Button title="Join" onPress={() => {}} />
      </View>

      <Text style={styles.about}>{organizationData.about}</Text>

      <Text style={styles.frq}>{organizationData.frq}</Text>

      <Text style={styles.eventsHeader}>Events</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {events.map((event, index) => (
          <View style={styles.eventContainer} key={index}>
            <Text style={styles.eventItem}>{event}</Text>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.contactInfo}>
        {"Contact Information:"}
        {organizationData.contact}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white", // Background color
  },
  bannerImage: {
    width: "100%",
    height: 200,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    paddingBottom: 0,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  organizationName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  memberSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    paddingTop: 0,
  },
  memberCount: {
    fontSize: 18,
    paddingRight: 200,
  },
  about: {
    fontSize: 16,
    padding: 15,
  },
  frq: {
    fontSize: 16,
    padding: 15,
  },
  eventsHeader: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 15,
  },
  eventContainer: {
    flexDirection: "row",
    padding: 10,
  },
  eventItem: {
    width: 150, // Width of each event item
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f0f0f0", // Event item background color
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  eventDate: {
    fontSize: 14,
  },
  eventLocation: {
    fontSize: 14,
  },
  eventDescription: {
    fontSize: 14,
  },
  contactInfo: {
    fontSize: 16,
    padding: 15,
  },
});

export default OrganizationProfileScreen;
