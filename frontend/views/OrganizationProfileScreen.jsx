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
  TextInput,
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
  const [joining, setJoining] = useState(false);
  const [officer, setOfficer] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newAbout, setNewAbout] = useState("");
  const [newContact, setNewContact] = useState("");

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

  useEffect(() => {
    fetch(
      "https://absolute-willing-salmon.ngrok-free.app/api/organization/joined/" +
        auth.currentUser.uid
    )
      .then((response) => response.json())
      .then((json) => {
        if (json && json.orgs) {
          orgs = json.orgs;
          if (orgs.some((org) => org.id === organizationId)) setJoining(true);
          else setJoining(false);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(
      `https://absolute-willing-salmon.ngrok-free.app/api/users/${auth.currentUser.uid}`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          user = json.user;
          if (user.isOfficer && user.organization == organizationId) {
            setOfficer(true);
          }
        }
      })
      .catch((error) => console.log(error));
  });

  const handleJoin = async () => {
    {
      try {
        const user = auth.currentUser;

        fetch(
          `https://absolute-willing-salmon.ngrok-free.app/api/organization/joined/add/`,
          {
            method: "POST",
            body: JSON.stringify({
              uid: user.uid,
              org_id: organizationId,
            }),
          }
        );

        console.log(user.uid, organizationId);
        setJoining(true);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    }
  };

  const handleRemove = async () => {
    {
      try {
        const user = auth.currentUser;

        fetch(
          `https://absolute-willing-salmon.ngrok-free.app/api/organization/joined/remove/`,
          {
            method: "POST",
            body: JSON.stringify({
              uid: user.uid,
              org_id: organizationId,
            }),
          }
        );
        console.log(user.uid, organizationId);
        setJoining(false);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    }
  };

  const returnOfficerOrJoin = () => {
    if (officer && !editing) {
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.joinButton} onPress={handleEdit}>
            <Text style={styles.joinButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (officer && editing) {
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.joinButton} onPress={handleEdit}>
            <Text style={styles.joinButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (joining && !officer) {
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.unJoinButton} onPress={handleRemove}>
            <Text style={styles.unJoinButtonText}>Leave</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.joinButton} onPress={handleJoin}>
            <Text style={styles.joinButtonText}>Join</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  const updateAbout = () => {
    if (newAbout == "") {
      return;
    }
    fetch(
      `https://absolute-willing-salmon.ngrok-free.app/api/officers/change/about/`,
      {
        method: "POST",
        body: JSON.stringify({
          uid: auth.currentUser.uid,
          org_id: organizationId,
          newAbout: newAbout,
        }),
      }
    );
  };

  const updateContact = () => {
    if (newContact == "") {
      return;
    }
    fetch(
      `https://absolute-willing-salmon.ngrok-free.app/api/officers/change/contact/`,
      {
        method: "POST",
        body: JSON.stringify({
          uid: auth.currentUser.uid,
          org_id: organizationId,
          newContact: newContact,
        }),
      }
    );
  };

  const handleEdit = () => {
    if (editing) {
      updateAbout();
      updateContact();
    }
    setEditing(!editing);
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
          <View style={styles.buttonContainer}>{returnOfficerOrJoin()}</View>
        </View>
      </View>

      <View style={styles.orgInfo}>
        {editing ? (
          <TextInput
            style={styles.about}
            value={newAbout ? newAbout : organizationData.about}
            multiline
            editable
            onChangeText={(text) => {
              setNewAbout(text);
            }}
          ></TextInput>
        ) : (
          <Text style={styles.about}>
            {newAbout ? newAbout : organizationData.about}
          </Text>
        )}
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
              style={{}}
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
        {editing ? (
          <TextInput
            style={styles.contactInfo}
            value={newContact ? newContact : organizationData.contact}
            multiline
            editable
            onChangeText={(text) => {
              setNewContact(text);
            }}
          ></TextInput>
        ) : (
          <Text style={styles.contactInfo}>
            {newContact ? newContact : organizationData.contact}
          </Text>
        )}
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginLeft: "-15%",
  },
  joinButton: {
    backgroundColor: "#FF392E",
    padding: 10,
    width: 75,
    alignItems: "center",
    borderRadius: 15,
    marginRight: "3%",
    marginTop: "4%",
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
    marginRight: 10,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  eventItem: {

    color: "white",
    fontWeight: "bold",    
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
  unJoinButton: {
    backgroundColor: "grey",
    padding: 10,
    width: 75,
    alignItems: "center",
    borderRadius: 15,
    marginLeft: "auto",
    marginTop: "-8%",
  },
  unJoinButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OrganizationProfileScreen;
