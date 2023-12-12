import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { auth } from "../firebase.config";
import { Card } from "@rneui/themed";
import { useRoute } from "@react-navigation/native";

//FriendProfileScreen component, takes in parameter navigation route
const FriendProfileScreen = ({ navigation }) => {
  //Retrieve parameters from the navigation route
  const route = useRoute();
  const [userData, setUserData] = useState({});
  const [following, setFollowing] = useState(false);
  const [events, setEvents] = useState([]);
  const [organizations, setOrganizations] = useState([]);

  //Fetch user data based on the provided user ID
  useEffect(() => {
    fetch(
      `https://absolute-willing-salmon.ngrok-free.app/api/users/${route.params.user_uid}`
    )
      .then((response) => response.json())
      .then((json) => setUserData(json.user))
      .catch((error) => console.log(error));
  }, {});

  //Check if the current user is following the displayed user
  useEffect(() => {
    fetch(
      "https://absolute-willing-salmon.ngrok-free.app/api/users/follows/" +
      auth.currentUser.uid
    )
      .then((response) => response.json())
      .then((json) => {
        if (json && json.follows) {
          follows = json.follows;

          const following = follows.some(
            (follow) => follow.uid === route.params.user_uid
          );

          if (following) setFollowing(true);
          else setFollowing(false);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  //Fetch events and organizations associated with the displayed user
  useLayoutEffect(() => {
    fetch(
      `https://absolute-willing-salmon.ngrok-free.app/api/event/attending/${route.params.user_uid}`
    )
      .then((response) => response.json())
      .then((json) => setEvents(json.events))
      .catch((error) => console.log(error))
      .then();

    fetch(
      `https://absolute-willing-salmon.ngrok-free.app/api/organization/joined/${route.params.user_uid}`
    )
      .then((response) => response.json())
      .then((json) => setOrganizations(json.orgs))
      .catch((error) => console.log(error));
  }, []);

  //Follow the displayed user
  const handleFollow = async () => {
    {
      try {
        const user = auth.currentUser;

        fetch(
          `https://absolute-willing-salmon.ngrok-free.app/api/users/follow/`,
          {
            method: "POST",
            body: JSON.stringify({
              follower_uid: user.uid,
              followee_uid: userData.user_id,
            }),
          }
        );

        setFollowing(true);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    }
  };

  //unfollow the displayed user
  const handleUnfollow = async () => {
    {
      try {
        const user = auth.currentUser;

        fetch(
          `https://absolute-willing-salmon.ngrok-free.app/api/users/unfollow/`,
          {
            method: "POST",
            body: JSON.stringify({
              follower_id: user.uid,
              followee_id: userData.user_id,
            }),
          }
        );

        setFollowing(false);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    }
  };

  //Render the component
  return (
    <ScrollView>
      <View>
        <Card
          containerStyle={{
            borderRadius: 8,
            height: 640,
          }}
        >
          <Card.Title>
            {userData.firstname + " " + userData.lastname}
          </Card.Title>
          <Card.Divider />
          <Text style={{ fontWeight: "bold", fontSize: 18, color: "#FF392E" }}>
            {" "}
            Bio:{" "}
          </Text>
          <Text style={styles.italic}> {userData.bio_descrip}</Text>

          <View>
            <Text style={styles.eventHeader}>
              {userData.firstname + " is attending..."}{" "}
            </Text>
            <View>
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
                        navigation.navigate("EventProfileScreen", {
                          eventId: eventDetail.id,
                        });
                      }}
                    >
                      <View key={eventDetail.id} style={styles.eventsMiniCards}>
                        <Text
                          style={{
                            alignSelf: "center",
                            textAlignVertical: "center",
                            color: "white",
                            fontSize: 14,
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

            <Text style={styles.eventHeader1}>
              {" "}
              {userData.firstname + " is apart of..."}{" "}
            </Text>
            <View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    alignItems: "center",
                    marginTop: 0,
                  }}
                >
                  {organizations.map((organization) => (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("OrganizationProfileScreen", {
                          organizationId: organization.id,
                        });
                      }}
                    >
                      <View
                        key={organization.id}
                        style={styles.eventsMiniCards}
                      >
                        <Text
                          style={{
                            alignSelf: "center",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlignVertical: "center",
                            color: "white",
                            fontSize: 14,
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

            {following ? (
              <View style={styles.followingContainer}>
                <TouchableOpacity
                  style={styles.followingButton}
                  onPress={handleUnfollow}
                >
                  <Text style={styles.followingButtonText}>Following</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.notFollowingContainer}>
                <TouchableOpacity
                  style={styles.notfollowingButton}
                  onPress={handleFollow}
                >
                  <Text style={styles.notfollowingButtonText}>Follow</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

//Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  followingButton: {
    backgroundColor: "#FF392E",
    padding: 15,
    marginTop: "20%",
    width: "93%",
    alignItems: "center",
    borderRadius: 15,
  },
  followingButtonText: {
    color: "white",
    fontSize: 16,
    alignItems: "center",
    fontWeight: "bold",
  },
  notfollowingButton: {
    backgroundColor: "#E6E6E6",
    padding: 15,
    marginTop: "20%",
    width: "93%",
    alignItems: "center",
    borderRadius: 15,
    borderColor: "#FF392E",
    borderWidth: 2,
  },
  notfollowingButtonText: {
    color: "#FF392E",
    fontSize: 16,
    alignItems: "center",
    fontWeight: "bold",
  },
  followingContainer: {
    alignItems: "center",
  },

  notFollowingContainer: {
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
  italic: {
    fontStyle: "italic",
  },
  eventsInfo: {
    marginTop: "0%",
    paddingTop: 10,
    height: "100%",
  },
  orgsCard: {
    backgroundColor: "white",
    borderRadius: 15,
    alignSelf: "center",
    height: "46%",
    width: "90%",
    justifyContent: "center",
    marginTop: "2.0%",
    marginBottom: "-15%",
  },
  eventHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF392E",
    marginTop: "5%",
    marginLeft: "1%",
  },
  eventHeader1: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF392E",
    marginTop: "5%",
    marginLeft: "0%",
  },
  orgHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF392E",
    textAlign: "center",
    marginTop: "3%",
  },
  eventsMiniCards: {
    width: 125,
    height: 125,
    backgroundColor: "#FF392E",
    margin: 10,
    borderRadius: 15,
    justifyContent: "center",
  },
  orgsMiniCards: {
    width: 150,
    height: 150,
    backgroundColor: "#FF392E",
    margin: 10,
    borderRadius: 15,
  },
});

export default FriendProfileScreen;
