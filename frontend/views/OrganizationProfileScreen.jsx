import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Button,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { auth } from "../firebase.config";

const Stack = createNativeStackNavigator();

const url = "https://absolute-willing-salmon.ngrok-free.app/api/organization/";
const eventHosts =
  "https://absolute-willing-salmon.ngrok-free.app/api/organization/events/";
const eventEndpoint =
  "https://absolute-willing-salmon.ngrok-free.app/api/event/";

const OrganizationProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const organizationId = route.params.organizationId;
  const newUrl = url + organizationId;
  const newEventHosts = eventHosts + organizationId;
  const [organizationData, setOrganizationData] = useState({});
  const [eventHostData, setEventHostData] = useState([]);

  useEffect(() => {
    fetch(newUrl)
      .then((response) => response.json())
      .then((json) => {
        if (json && json.org) {
          setOrganizationData(json.org);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(newEventHosts)
      .then((response) => response.json())
      .then((json) => {
        if (json && json.events) {
          for (let i = 0; i < json.events.length; i++) {
            fetch(eventEndpoint + json.events[i])
              .then((response) => response.json())
              .then((json) => {
                if (json && json.event) {
                  setEventHostData((eventHostData) => [
                    ...eventHostData,
                    json.event,
                  ]);
                }
              })
              .catch((error) => console.log(error));
          }
        }
      });
  }, []);

  const handleJoin = async () => {
    {
      try {
        const user = auth.currentUser;

        fetch(`https://absolute-willing-salmon.ngrok-free.app/api/organization/joined/add/`, {
          method: "POST",
          body: JSON.stringify({
            uid: user.uid,
            org_id: organizationId,
          }),
        });

        console.log(user.uid, organizationId)
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    }
  };

  const imageUrl = "https://se-images.campuslabs.com/clink/images/";

  return (
    <ScrollView>
      {/* Banner with background image */}
      <Image
        source={{ uri: imageUrl + organizationData.image_id }}
        style={{ width: "100%", height: 200 }}
      />
      <View style={styles.orgDetails}>
        <View style={styles.header}>
          <Image
            source={{ uri: organizationData.image_id }}
            style={styles.profileImage}
          />
          <Text style={styles.organizationName}>{organizationData.name}</Text>
        </View>
        <View style={styles.memberSection}>
          <Text style={styles.memberCount}>{"# Members"}</Text>
          <TouchableOpacity style={styles.joinButton} onPress={(handleJoin)}>
            <Text style={styles.joinButtonText}>Join</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.orgInfo}>
        <Text style={styles.about}>{organizationData.about}</Text>
      </View>

      <Text style={styles.frq}>{organizationData.frq}</Text>

      <View style={styles.orgEvent}>
        <Text style={styles.eventsHeader}>Events</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {eventHostData.map((event, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate("Event Profile", {
                  eventId: event.id,
                });
              }}
            >
              <View style={styles.eventContainer}>
                <Text style={styles.eventItem}>{event.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.contactContainer}>
        <Text style={styles.contactHeader}>{"Contact Information:"}</Text>
        <Text style={styles.contactInfo}>{organizationData.contact}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white", // Background color
  },
  orgDetails: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    margin: 15,
  },
  orgInfo: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    margin: 15,
    marginTop: "1%",
  },
  contactContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    margin: 15,
    marginTop: "1%",
  },
  orgEvent: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    margin: 15,
    marginTop: "-10%",
  },
  bannerImage: {
    width: "100%",
    height: 200,
  },
  joinButton: {
    backgroundColor: "#FF392E",
    padding: 10,
    width: 75,
    alignItems: "center",
    borderRadius: 15,
    marginLeft: "auto",
    marginTop: "-8%",
  },
  joinButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  header: {
    alignItems: "left",
    padding: 5,
    paddingBottom: 0,
    marginTop: -50,
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
    padding: 5,
    paddingTop: 0,
  },
  memberCount: {
    fontSize: 18,
    paddingRight: 200,
    marginTop: "5%",
  },
  about: {
    fontSize: 16,
    padding: 0,
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
    borderRadius: 15,
    backgroundColor: "#FF392E", // Event item background color
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  eventDate: {
    fontSize: 14,
    color: "white",
  },
  eventLocation: {
    fontSize: 14,
    color: "white",
  },
  eventDescription: {
    fontSize: 14,
    color: "white",
  },
  contactHeader: {
    fontSize: 20,
    padding: 15,
    fontWeight: "bold",
  },
  contactInfo: {
    fontSize: 16,
    padding: 15,
    marginTop: "-5%",
  },
});

export default OrganizationProfileScreen;
