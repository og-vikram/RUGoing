import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Modal,} from "react-native";
import React, { useEffect, useLayoutEffect, useState, useMemo } from "react";
import { auth } from "../firebase.config";
import { Card } from "@rneui/themed";
import { Icon } from "react-native-elements";

/**
 * ProfileDetails is a React component representing the screen for displaying
 * and editing user profile details.
 *
 * @param {object} navigation - React Navigation object for navigation control.
 */
const ProfileDetails = ({ navigation }) => {

  const [edit, toggleEdit] = useState(false);
  const [user, getUser] = useState({});
  const [events, setEvents] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUserBio, setNewUserBio] = useState("");
  const [actualUserBio, setActualUserBio] = useState("");
  const [followerList, setFollowerList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [followersModalVisible, setFollowersModalVisible] = useState(false);
  const [followingModalVisible, setFollowingModalVisible] = useState(false);

  /**
   * useLayoutEffect to fetch user profile data, attended events, and joined organizations
   * from the server and update the component state accordingly. It also sets the initial
   * user bio and updates it during subsequent changes.
   */
  useLayoutEffect(() => {
    // Fetch user profile data
    fetch(`https://absolute-willing-salmon.ngrok-free.app/api/users/${auth.currentUser.uid}`)
      .then((response) => response.json())
      .then((json) => getUser(json.user))
      .catch((error) => console.log(error))

      // Fetch attended events
      .then(
        fetch(`https://absolute-willing-salmon.ngrok-free.app/api/event/attending/${auth.currentUser.uid}`)
          .then((response) => response.json())
          .then((json) => setEvents(json.events))
          .catch((error) => console.log(error))
      )

      // Fetch joined organizations
      .then(
        fetch(`https://absolute-willing-salmon.ngrok-free.app/api/organization/joined/${auth.currentUser.uid}`)
          .then((response) => response.json())
          .then((json) => setOrganizations(json.orgs))
          .catch((error) => console.log(error))
      );

    // Set the initial user bio and update during subsequent changes
    setActualUserBio(user.bio_descrip);
    updateCurrBio();

    // Set loading state to false once the fetch operations are completed
    setLoading(false);
  }, [actualUserBio]);

  /**
   * updateBio is an asynchronous function that sends a POST request to the server
   * to update the user's bio with the new bio provided. It then updates the component
   * state with the new bio.
   */
  const updateBio = async () => {
    try {
      // Send a POST request to update the user's bio on the server
      fetch(`https://absolute-willing-salmon.ngrok-free.app/api/users/changeBio`, {
        method: "POST",
        body: JSON.stringify({
          uid: auth.currentUser.uid,
          newBio: newUserBio,
        }),
      });

      // Update the component state with the new bio
      setActualUserBio(newUserBio);
      setNewUserBio(newUserBio);
    } catch (error) {
      // Handle and log errors, if any
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  /**
   * useEffect to fetch the list of followers for the current user from the server
   * and update the component state accordingly.
   */
  useEffect(() => {
    // Fetch the list of followers for the current user
    fetch(`https://absolute-willing-salmon.ngrok-free.app/api/users/followers/${auth.currentUser.uid}`)
      .then((response) => response.json())
      .then((json) => setFollowerList(json.followers))
      .catch((error) => console.log(error));
  }, []);

  /**
   * useEffect to fetch the list of users that the current user is following
   * from the server and update the component state accordingly.
   */
  useEffect(() => {
    // Fetch the list of users that the current user is following
    fetch(`https://absolute-willing-salmon.ngrok-free.app/api/users/follows/${auth.currentUser.uid}`)
      .then((response) => response.json())
      .then((json) => setFollowingList(json.follows))
      .catch((error) => console.log(error));
  }, []);

  /**
   * refreshFollowing is an asynchronous function that fetches the updated list
   * of users that the current user is following from the server and updates
   * the component state accordingly.
   */
  const refreshFollowing = async () => {
    try {
      // Fetch the updated list of users that the current user is following
      const response = await fetch(`https://absolute-willing-salmon.ngrok-free.app/api/users/follows/${auth.currentUser.uid}`);
      const json = await response.json();

      // Update the component state with the refreshed list of following users
      setFollowingList(json.follows);
    } catch (error) {
      // Handle and log errors, if any
      console.log(error);
    }
  };


  /**
   * EditOrDone is a function that toggles the edit mode for user bio.
   * If in edit mode, it updates the user's bio and toggles back to the
   * non-edit mode.
   */
  function EditOrDone() {
    // If in edit mode, update the user's bio
    if (edit) {
      updateBio();
    }

    // Toggle the edit mode (switch between editing and non-editing states)
    toggleEdit(!edit);
  }


  /**
   * updateCurrBio is an asynchronous function that checks if the new user bio
   * is null or an empty string. If so, it sets the new user bio to the current
   * user's existing bio description.
   */
  const updateCurrBio = async () => {
    // Check if the new user bio is null or an empty string
    if (newUserBio == null || newUserBio === "") {
      // Set the new user bio to the current user's existing bio description
      setNewUserBio(user.bio_descrip);
    }
  };


  /**
   * openFollowersModal is a function that sets the visibility state
   * of the followers modal to true, displaying the modal.
   */
  const openFollowersModal = () => {
    // Set the visibility state of the followers modal to true
    setFollowersModalVisible(true);
  };


  /**
   * closeFollowersModal is a function that sets the visibility state
   * of the followers modal to false, hiding the modal.
   */
  const closeFollowersModal = () => {
    // Set the visibility state of the followers modal to false
    setFollowersModalVisible(false);
  };


  /**
   * openFollowingModal is a function that sets the visibility state
   * of the following modal to true, displaying the modal.
   */
  const openFollowingModal = () => {
    // Set the visibility state of the following modal to true
    setFollowingModalVisible(true);
  };


  /**
   * closeFollowingModal is a function that sets the visibility state
   * of the following modal to false, hiding the modal.
   */
  const closeFollowingModal = () => {
    // Set the visibility state of the following modal to false
    setFollowingModalVisible(false);
  };


  /**
   * handleRemoveFriend is an asynchronous function that sends a POST request
   * to unfollow a user specified by their ID. It then refreshes the list of
   * users that the current user is following.
   *
   * @param {string} id - The ID of the user to be unfollowed.
   */
  const handleRemoveFriend = async (id) => {
    try {
      // Send a POST request to unfollow the specified user
      await fetch("https://absolute-willing-salmon.ngrok-free.app/api/users/unfollow/", {
        method: "POST",
        body: JSON.stringify({
          follower_id: auth.currentUser.uid,
          followee_id: id,
        }),
      });

      // Refresh the list of users that the current user is following
      refreshFollowing();
    } catch (error) {
      // Handle and log errors, if any
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };


  if (!loading) { //checks to see if the information is being loaded in from the backend correctly
    return (
      <View>
        <Card
          containerStyle={{
            borderRadius: 10,
            height: "97%",
          }}
        >
          <View style={styles.topUserContainer}>
            <Card.Title style={styles.nameContainer}>
              {user.firstname + " " + user.lastname}
            </Card.Title>
            <View style={styles.followButtonsContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  EditOrDone();
                }}
              >
                <Text style={styles.editText}>
                  {edit == true ? "Done" : "Edit"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Settings");
                }}
              >
                <Icon
                  name="gear"
                  type="font-awesome"
                  size={30}
                  color="#FF392E"
                />
              </TouchableOpacity>
            </View>
          </View>

          <Card.Divider />
          <View style={{ justifyContent: "center", flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.followButtons}
              onPress={openFollowersModal}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {" "}
                Followers{" "}
              </Text>
            </TouchableOpacity>

            <Modal
              animationType="slide"
              transparent={true}
              visible={followersModalVisible}
              onRequestClose={closeFollowersModal}
              backdropOpacity={0.3}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.questionText}> Followers: </Text>

                  <View>
                    {followerList.map((item) => (
                      <ScrollView>
                        <TouchableOpacity
                          key={item.uid}
                          onPress={() => {
                            navigation.navigate("Friend Profile", {
                              user_uid: item.uid,
                            });
                            closeFollowersModal();
                          }}
                          style={styles.followersList}
                        >
                          <Text style={styles.friendText}>{item.name}</Text>
                        </TouchableOpacity>
                      </ScrollView>
                    ))}
                  </View>

                  <TouchableOpacity
                    style={styles.closeModalButton}
                    onPress={closeFollowersModal}
                  >
                    <Text style={styles.closeModalButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <TouchableOpacity
              style={styles.followButtons}
              onPress={openFollowingModal}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {" "}
                Following{" "}
              </Text>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={followingModalVisible}
              onRequestClose={closeFollowingModal}
              backdropOpacity={0.3}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.questionText}> Following: </Text>
                  <View>
                    <ScrollView>
                      {followingList.map((item) => (
                        <View>
                          <TouchableOpacity
                            key={item.uid}
                            onPress={() => {
                              navigation.navigate("Friend Profile", {
                                user_uid: item.uid,
                              });
                              closeFollowersModal();
                            }}
                            style={styles.followingList}
                          >
                            <Text style={styles.friendText}>{item.name}</Text>
                            <View
                              style={{
                                alignItems: "center",
                                flex: 1,
                                flexDirection: "row",
                                justifyContent: "flex-end",
                              }}
                            >
                              <TouchableOpacity
                                style={styles.removeFriendButton}
                                onPress={() => handleRemoveFriend(item.uid)}
                              >
                                <Text
                                  style={{ color: "white", fontWeight: "bold" }}
                                >
                                  Remove
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </TouchableOpacity>
                        </View>
                      ))}
                    </ScrollView>
                  </View>

                  <TouchableOpacity
                    style={styles.closeModalButton}
                    onPress={closeFollowingModal}
                  >
                    <Text style={styles.closeModalButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>

          <Card.Divider style={{ marginTop: "3%" }} />
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              height: 300,
            }}
          >
            {edit && (
              <View style={styles.userInputText}>
                <TextInput
                  multiline
                  style={styles.userInput}
                  editable={true}
                  autoFocus={true}
                  onChangeText={(text) => setNewUserBio(text)}
                  value={newUserBio == null ? user.bio_descrip : newUserBio}
                  placeholder={"Your Bio Here"}
                ></TextInput>
              </View>
            )}
            {!edit && (
              <View style={styles.displayUserInput}>
                <Text style={{color: "#FF392E"}}>{user.bio_descrip}</Text>
              </View>
            )}
          </View>
          <Card.Divider style={{ marginVertical: 50 }} />

          <View style={styles.eventsAndOrgsCards}>
            <Text style={styles.eventAndOrgHeader}> My Events </Text>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  alignItems: "center",
                }}
              >
                {events.map((eventDetail) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Event Profile", {
                        eventId: eventDetail.id,
                      });
                    }}
                  >
                    <View key={eventDetail.id} style={styles.eventsAndOrgsMiniCards}>
                      <Text
                        style={{
                          alignSelf: "center",
                          textAlignVertical: "center",
                          color: "#FF392E",
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                      >
                        {eventDetail.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={styles.eventsAndOrgsCards}>
            <Text style={styles.eventAndOrgHeader}> My Organizations </Text>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.eventsInfo}
            >
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  alignItems: "center",
                  marginTop: "-3%",
                }}
              >
                {organizations.map((organization) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Org Profile", {
                        organizationId: organization.org_id,
                      });
                    }}
                  >
                    <View key={organization.id} style={styles.eventsAndOrgsMiniCards}>
                      <Text
                        style={{
                          alignSelf: "center",
                          textAlignVertical: "center",
                          color: "#FF392E",
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                      >
                        {organization.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </Card>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  userInput: {
    color: "red",
    height: 60,
  },
  displayUserInput: {
    flex: 1,
    paddingHorizontal: 10,
    height: 60,
    color: "red",
  },
  userInputText: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  removeFriendButton: {
    backgroundColor: "#FF392E",
    marginTop: 0,
    borderRadius: 15,
    padding: 0,
    alignItems: "center",
    height: 30,
    width: 80,
    justifyContent: "center",
    marginRight: 10,
  },
  followButtons: {
    backgroundColor: "#FF392E",
    borderRadius: 15,
    marginHorizontal: "5%",
    padding: 8,
    flex: 1,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 16,
  },
  followersList: {
    borderRadius: 15,
    backgroundColor: "#E6E6E6",
    marginTop: "2%",
    padding: "4%",
    alignItems: "center",
    width: 310,
    height: 50,
    alignSelf: "center",
  },
  followingList: {
    borderRadius: 15,
    backgroundColor: "#E6E6E6",
    marginTop: "2%",
    padding: "4%",
    flexDirection: "row",
    alignItems: "center",
    width: 310,
    height: 50,
    alignSelf: "center",
  },
  friendText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF392E",
  },
  editButton: {
    backgroundColor: "#FF392E",
    borderRadius: 15,
    alignItems: "center",
    height: 20,
    justifyContent: "center",
    width: 60,
    marginRight: 8,
  },
  editText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    alignItems: "center",
  },
  eventsAndOrgsCards: {
    backgroundColor: "#FF392E",
    borderRadius: 15,
    alignSelf: "center",
    height: "33%",
    width: "95%",
    justifyContent: "center",
    marginTop: "2.5%",
  },
  eventAndOrgHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginTop: "3%",
  },
  eventsAndOrgsMiniCards: {
    width: 100,
    height: 100,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 15,
    justifyContent: "center",
  },
  topUserContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  followButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    justifyContent: "center",
    width: "95%",
  },
  closeModalButton: {
    backgroundColor: "#FF392E",
    borderRadius: 15,
    marginTop: "3%",
    padding: "3%",
    alignItems: "center",
  },
  closeModalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  questionText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProfileDetails;
