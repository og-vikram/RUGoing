import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, TextInput, Linking } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { auth } from "../firebase.config";
import EventProfileScreen from "./EventProfileScreen";

const url = "https://absolute-willing-salmon.ngrok-free.app/api/organization/";

const eventHosts = "https://absolute-willing-salmon.ngrok-free.app/api/organization/events/";

const eventEndpoint = "https://absolute-willing-salmon.ngrok-free.app/api/event/";

/**
 * OrganizationProfileScreen is a React component representing the profile screen
 * for an organization in the application. It may include components for displaying
 * details about the organization, events, members, and other relevant information.
 */
const OrganizationProfileScreen = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const organizationId = route.params.organizationId;
  const newUrl = url + organizationId;
  const newEventHosts = eventHosts + organizationId;
  const imageUrl = "https://se-images.campuslabs.com/clink/images/";

  const [organizationData, setOrganizationData] = useState({});
  const [eventHostData, setEventHostData] = useState([]);
  const [joining, setJoining] = useState(false);
  const [members, setMembers] = useState([]);
  const [officer, setOfficer] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newAbout, setNewAbout] = useState("");
  const [newContact, setNewContact] = useState("");

  const externalURL = 'https://rutgers.campuslabs.com/engage/organization/' + organizationId;

  /**
   * useEffect hook fetches and sets data for the organization profile screen.
   * It makes a GET request to the specified URL, expecting JSON data that
   * includes details about the organization. If the data is available, it
   * updates the state with the organization data.
   */
  useEffect(() => {
    // Fetch data for the organization profile screen
    fetch(newUrl)
      .then((response) => response.json())
      .then((json) => {
        // Check if organization data is available in the JSON response
        if (json && json.org) {
          // Set the organization data in the state
          setOrganizationData(json.org);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  /**
   * useEffect hook fetches and sets data for event hosts associated with
   * the specified URL. It makes a GET request to the URL expecting JSON data
   * that includes information about events and their hosts. If the data is
   * available, it iterates through the events, fetches additional details
   * for each event, and updates the state with the event host data.
   */
  useEffect(() => {
    // Fetch data for event hosts associated with the specified URL
    fetch(newEventHosts)
      .then((response) => response.json())
      .then((json) => {
        // Check if events data is available in the JSON response
        if (json && json.events) {
          // Iterate through events and fetch additional details for each event
          for (let i = 0; i < json.events.length; i++) {
            fetch(eventEndpoint + json.events[i])
              .then((response) => response.json())
              .then((json) => {
                // Check if event data is available in the JSON response
                if (json && json.event) {
                  // Update the state with the event host data
                  setEventHostData((eventHostData) => [...eventHostData, json.event]);
                }
              })
              .catch((error) => console.log(error));
          }
        }
      });
  }, []);

  /**
   * useEffect hook fetches and sets the members of the organization with the
   * specified organization ID. It makes a GET request to the server endpoint
   * that retrieves information about the members of the organization. If the
   * data is available, it updates the state with the members' information.
   */
  useEffect(() => {
    // Fetch members of the organization with the specified ID
    fetch(`https://absolute-willing-salmon.ngrok-free.app/api/organization/members/${organizationId}`)
      .then((response) => response.json())
      .then((json) => {
        // Set the state with the members' information
        setMembers(json.members);
      })
      .catch((error) => console.log(error));
  }, []);

  /**
   * useEffect hook fetches and checks if the current user is already a member
   * of the organization with the specified organization ID. It makes a GET
   * request to the server endpoint that retrieves information about the
   * organizations joined by the current user. If the data is available,
   * it checks if the user is a member of the specified organization and
   * updates the state accordingly.
   */
  useEffect(() => {
    // Fetch organizations joined by the current user
    fetch("https://absolute-willing-salmon.ngrok-free.app/api/organization/joined/" + auth.currentUser.uid)
      .then((response) => response.json())
      .then((json) => {
        // Check if organizations data is available in the JSON response
        if (json && json.orgs) {
          // Store organizations data in a variable
          const orgs = json.orgs;

          // Check if the user is a member of the specified organization
          if (orgs.some((org) => org.id === organizationId)) {
            // Set state to indicate that the user is joining the organization
            setJoining(true);
          } else {
            // Set state to indicate that the user is not joining the organization
            setJoining(false);
          }
        }
      })
      .catch((error) => console.log(error));
  }, []);

/**
 * useEffect hook fetches and checks if the current user is an officer
 * of the organization with the specified organization ID. It makes a GET
 * request to the server endpoint that retrieves information about the
 * current user. If the data is available, it checks if the user is an
 * officer of the specified organization and updates the state accordingly.
 */
  useEffect(() => {
    // Fetch information about the current user
    fetch(`https://absolute-willing-salmon.ngrok-free.app/api/users/${auth.currentUser.uid}`)
      .then((response) => response.json())
      .then((json) => {
        // Check if user data is available in the JSON response
        if (json) {
          // Store user data in a variable
          const user = json.user;

          // Check if the user is an officer of the specified organization
          if (user.isOfficer && user.organization === organizationId) {
            // Set state to indicate that the user is an officer
            setOfficer(true);
          }
        }
      })
      .catch((error) => console.log(error));
  }, []);

  /**
   * handleJoin is a function that initiates the process of joining
   * the organization with the specified organization ID. It opens
   * a URL and then makes a POST request to the server endpoint to
   * add the current user to the organization's members. It updates
   * the state to indicate that the user is joining the organization.
   */
  const handleJoin = async () => {
    // Open a URL (assuming OpenURLButton is a function defined elsewhere)
    OpenURLButton();

    try {
      // Get the current user
      const user = auth.currentUser;

      // Make a POST request to add the user to the organization's members
      await fetch(`https://absolute-willing-salmon.ngrok-free.app/api/organization/joined/add/`, {
        method: "POST",
        body: JSON.stringify({
          uid: user.uid,
          org_id: organizationId,
        }),
      });

      // Set state to indicate that the user is joining the organization
      setJoining(true);
    } catch (error) {
      // Handle any errors that occur during the process
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  /**
   * handleRemove is a function that initiates the process of removing
   * the current user from the organization with the specified organization ID.
   * It opens a URL and then makes a POST request to the server endpoint to
   * remove the current user from the organization's members. It updates
   * the state to indicate that the user is no longer a member of the organization.
   */
  const handleRemove = async () => {
    // Open a URL (assuming OpenURLButton is a function defined elsewhere)
    OpenURLButton();

    try {
      // Get the current user
      const user = auth.currentUser;

      // Make a POST request to remove the user from the organization's members
      await fetch(`https://absolute-willing-salmon.ngrok-free.app/api/organization/joined/remove/`, {
        method: "POST",
        body: JSON.stringify({
          uid: user.uid,
          org_id: organizationId,
        }),
      });

      // Log user ID and organization ID to the console
      console.log(user.uid, organizationId);

      // Set state to indicate that the user is no longer a member of the organization
      setJoining(false);
    } catch (error) {
      // Handle any errors that occur during the process
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  /**
   * returnOfficerOrJoin is a function that dynamically renders different
   * buttons based on the user's role (officer or member) and the current
   * editing state. It returns a button to either edit, leave, join, or
   * confirm changes, depending on the user's role and the editing state.
   *
   * @returns {JSX.Element} - A JSX element representing the rendered button.
   */
  const returnOfficerOrJoin = () => {
    if (officer && !editing) {
      // Render "Edit" button when the user is an officer and not in editing mode
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.joinButton} onPress={handleEdit}>
            <Text style={styles.joinButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (officer && editing) {
      // Render "Done" button when the user is an officer and in editing mode
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.joinButton} onPress={handleEdit}>
            <Text style={styles.joinButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (joining && !officer) {
      // Render "Leave" button when the user is a member and already joined
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.unJoinButton} onPress={handleRemove}>
            <Text style={styles.unJoinButtonText}>Leave</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      // Render "Join" button when the user is not an officer and not joined
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.joinButton} onPress={handleJoin}>
            <Text style={styles.joinButtonText}>Join</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  /**
   * updateAbout is a function that updates the about information of the organization
   * by making a POST request to the server endpoint. It checks if the newAbout value
   * is not empty before sending the request.
   */
  const updateAbout = () => {
    // Check if newAbout is an empty string
    if (newAbout === "") {
      // If newAbout is empty, return without making the request
      return;
    }

    // Make a POST request to update the about information
    fetch(`https://absolute-willing-salmon.ngrok-free.app/api/officers/change/about/`, {
      method: "POST",
      body: JSON.stringify({
        uid: auth.currentUser.uid,
        org_id: organizationId,
        newAbout: newAbout,
      }),
    });
  };

  /**
   * updateContact is a function that updates the contact information of the organization
   * by making a POST request to the server endpoint. It checks if the newContact value
   * is not empty before sending the request.
   */
  const updateContact = () => {
    // Check if newContact is an empty string
    if (newContact === "") {
      // If newContact is empty, return without making the request
      return;
    }

    // Make a POST request to update the contact information
    fetch(`https://absolute-willing-salmon.ngrok-free.app/api/officers/change/contact/`, {
      method: "POST",
      body: JSON.stringify({
        uid: auth.currentUser.uid,
        org_id: organizationId,
        newContact: newContact,
      }),
    });
  };

  /**
   * handleEdit is a function that toggles the editing state and, if in editing mode,
   * triggers the update of about and contact information by calling updateAbout
   * and updateContact functions.
   */
  const handleEdit = () => {
    // Check if currently in editing mode
    if (editing) {
      // If in editing mode, update about and contact information
      updateAbout();
      updateContact();
    }

    // Toggle the editing state
    setEditing(!editing);
  };

  /**
   * memberCount is a function that formats and returns the count of members
   * as a string based on the length of the members array.
   *
   * @returns {string} - A formatted string representing the count of members.
   */
  const memberCount = () => {
    // Check if there is only one member
    if (members.length === 1) {
      // If there's one member, return singular form
      return members.length + " member";
    }

    // If there are multiple members, return plural form
    return members.length + " members";
  };

  /**
   * OpenURLButton is an asynchronous function that opens a specified external URL
   * using the Linking module. It waits for the URL to be opened before proceeding.
   */
  const OpenURLButton = async () => {
    // Open the specified external URL using Linking module
    await Linking.openURL(externalURL);
  };

  return (
    <ScrollView>
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
          <Text style={styles.memberCount}>{memberCount()}</Text>
          <View style={styles.buttonContainer}>{returnOfficerOrJoin()}</View>
        </View>
      </View>

      <View style={styles.orgInfo}>
        <Text style={styles.faqHeader}>{"About"}</Text>
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
          {eventHostData.length > 0 ? (
            eventHostData.map((event, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate("EventProfileScreen", {
                    eventId: event.id,
                  });
                }}
                style={{}}
              >
                <View style={styles.eventContainer}>
                  <Text style={styles.eventItem}>{event.name}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.faqInfo}>{"No events!"}</Text>
          )}
        </ScrollView>
      </View>

      <View style={styles.contactContainer}>
        <Text style={styles.contactHeader}>{"Contact Information"}</Text>
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

      <View style={styles.faqContainer}>
        <Text style={styles.faqHeader}>{"Frequently Asked Questions"}</Text>
        <Text style={styles.faqInfo}>{organizationData.faq}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  faqContainer: {
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
    padding: 15,
    marginTop: "-5%",
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
  faqHeader: {
    fontSize: 20,
    padding: 15,
    fontWeight: "bold",
  },
  faqInfo: {
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
