import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { auth } from "../firebase.config";

//EventProfileScreen component
const EventProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  //Extracting event ID from route parameters
  const eventId = route.params.eventId
    ? route.params.eventId
    : route.params.selectedProps.eventId;
  //State variables
  const [data, setData] = useState([]);
  const [host, setHost] = useState([]);
  const [attending, setAttending] = useState(false);
  const [attendees, setAttendees] = useState([]);

  //Fetch event data on component mount
  useLayoutEffect(() => {
    fetch(`https://absolute-willing-salmon.ngrok-free.app/api/event/${eventId}`)
      .then((response) => response.json())
      .then((json) => setData(json.event))
      .catch((error) => console.log(error));
  }, []);
  //Fetch host information on component mount
  useLayoutEffect(() => {
    fetch(
      `https://absolute-willing-salmon.ngrok-free.app/api/event/host/${eventId}`
    )
      .then((response) => response.json())
      .then((json) => setHost(json))
      .catch((error) => console.log(error));
  }, []);
  //Fetch list of attendees on component mount
  useEffect(() => {
    fetch(
      `https://absolute-willing-salmon.ngrok-free.app/api/event/attending/${eventId}`
    )
      .then((response) => response.json())
      .then((json) => {
        setAttendees(json.users);
      })
      .catch((error) => console.log(error));
  }, []);
  //Check if the user is attending the event on component mount
  useEffect(() => {
    fetch(
      "https://absolute-willing-salmon.ngrok-free.app/api/event/attending/" +
      auth.currentUser.uid
    )
      .then((response) => response.json())
      .then((json) => {
        if (json && json.events) {
          events = json.events;
          if (events.some((event) => event.id === eventId)) setAttending(true);
          else setAttending(false);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  //Function to handle attending an event
  const handleAttend = async () => {
    {
      OpenURLButton();
      try {
        const user = auth.currentUser;
        //API call to add user to the list of event attendees
        fetch(
          `https://absolute-willing-salmon.ngrok-free.app/api/event/attending/add/`,
          {
            method: "POST",
            body: JSON.stringify({
              uid: user.uid,
              event_id: eventId,
            }),
          }
        );
        console.log(user.uid, eventId);
        setAttending(true);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    }
  };
  //Function to handle leaving an event
  const handleRemove = async () => {
    {
      OpenURLButton();
      try {
        const user = auth.currentUser;
        //API call to remove user from the list of event attendees
        fetch(
          `https://absolute-willing-salmon.ngrok-free.app/api/event/attending/remove/`,
          {
            method: "POST",
            body: JSON.stringify({
              uid: user.uid,
              event_id: eventId,
            }),
          }
        );
        console.log(user.uid, eventId);
        setAttending(false);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    }
  };
  //Function to display the count of people attending the event
  const peopleCount = () => {
    if (attendees.length == 1) {
      return attendees.length + " person attending";
    }
    return attendees.length + " people attending";
  };
  //Function to open the event's RSVP link in a browser
  const OpenURLButton = async () => {
    const supported = await Linking.canOpenURL(data.rsvp);
    if (supported)
      await Linking.openURL(data.rsvp);
  }
  //Render the component
  return (
    <ScrollView>
      <View className="container" style={styles.container}>
        <View className="details-container">
          <View className="basiceventinfo" style={styles.basicInfo}>
            <Text style={styles.header}>{data.name}</Text>
            <Text style={styles.host}>Hosted by:</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("OrganizationProfileScreen", {
                  organizationId: data.host_org_id,
                });
              }}
            >
              <Text style={styles.host}>@{host.org_name}</Text>
            </TouchableOpacity>
            <Text>{peopleCount()}</Text>
          </View>

          <View className="location" style={styles.location}>
            <Text style={styles.header}>Location</Text>
            <Text>{data.location}</Text>
          </View>

          <View className="location" style={styles.location}>
            <Text style={styles.header}>Date And Time</Text>
            <Text>{data.start}</Text>
            <Text>{data.end}</Text>
          </View>

          <View>
            {attending ? (
              <View style={styles.attendingContainer}>
                <TouchableOpacity
                  style={styles.unAttendButton}
                  onPress={handleRemove}
                >
                  <Text style={styles.unAttendButtonText}>Leave</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.attendingContainer}>
                <TouchableOpacity
                  style={styles.attendingButton}
                  onPress={handleAttend}
                >
                  <Text style={styles.attendingButtonText}>Attend</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default EventProfileScreen;
//Component styling
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 15,
    width: "90%",
    borderRadius: 15,
  },
  bottombutton1: {
    backgroundColor: "#FF392E",
    padding: 15,
    marginTop: "1%",
    width: "93%",
    alignItems: "center",
    borderRadius: 15,
  },
  bottombuttontext1: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#FF392E",
    padding: 15,
    marginTop: "1%",
    width: "45%",
    alignItems: "center",
    borderRadius: 15,
  },
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  attendingButton: {
    backgroundColor: "#FF392E",
    padding: 15,
    marginTop: "1%",
    width: "93%",
    alignItems: "center",
    borderRadius: 15,
  },
  attendingButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  attendingContainer: {
    alignItems: "center",
  },
  basicInfo: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    margin: 15,
    marginTop: "5%",
  },
  location: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    margin: 15,
    marginTop: "1%",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  italic: { fontStyle: "italic" },
  unAttendButton: {
    backgroundColor: "white",
    padding: 15,
    marginTop: "1%",
    width: "93%",
    alignItems: "center",
    borderRadius: 15,
  },
  unAttendButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  host: {
    paddingTop: 10,
    fontStyle: "italic",
  },
});
