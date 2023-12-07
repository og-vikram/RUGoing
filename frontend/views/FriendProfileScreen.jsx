import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { auth } from "../firebase.config";
import { reloadAsync } from "expo-updates";
import { Button, Icon } from "react-native-elements";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Card } from "@rneui/themed";
import EventProfileScreen from "./EventProfileScreen";
import OrganizationProfileScreen from "./OrganizationProfileScreen";
import { useRoute } from "@react-navigation/native";

const FriendProfileScreen = ({ navigation }) => {
  const route = useRoute();
  const [userData, setUserData] = useState({});
  const [following, setFollowing] = useState(false);
  const [events, setEvents] = useState([]);
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    fetch(
      `https://absolute-willing-salmon.ngrok-free.app/api/users/${route.params.user_uid}`
    )
      .then((response) => response.json())
      .then((json) => setUserData(json.user))
      .catch((error) => console.log(error));
  }, {});

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

  useLayoutEffect(() => {

    fetch(
        `https://absolute-willing-salmon.ngrok-free.app/api/event/attending/${route.params.user_uid}`)
      .then((response) => response.json())
      .then((json) => setEvents(json.events))
      .catch((error) => console.log(error))
      .then(
    )

    fetch(
        `https://absolute-willing-salmon.ngrok-free.app/api/organization/joined/${route.params.user_uid}`)
      .then((response) => response.json())
      .then((json) => setOrganizations(json.orgs))
      .catch((error) => console.log(error))
  }, []);

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
        console.log(user.uid, userData.netid);
        setFollowing(true);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    }
  };

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
        console.log(user.uid, userData.user_id);
        setFollowing(false);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    }
  };
  

  return (
    <ScrollView>
    <View>
      <Card
      containerStyle={{
        borderRadius: 8,
        height: 1000,
      }}>
        <Card.Title>{userData.firstname + " " + userData.lastname}</Card.Title>
        <Card.Divider />
        <Text style = {styles.italic}>{userData.bio_descrip}</Text>
        <View>
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
                style={styles.notFollowingButton}
                onPress={handleFollow}
              >
                <Text style={styles.notFollowingButtonText}>Follow</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

      <View>
      
      {/* <View style={styles.eventsCard}>
        <Text style={styles.eventHeader}> {userData.firstname + " is attending..."}</Text>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              marginTop: "-20%",
            }}
          >
            
            <View style={styles.eventsMiniCards}>
              <Text
                style={{
                  alignSelf: "center",
                  textAlignVertical: "center",
                  color: "white",
                }}
              >
                Event #1
              </Text>
            </View>
            <View style={styles.eventsMiniCards}>
              <Text
                style={{
                  alignSelf: "center",
                  textAlignVertical: "center",
                  color: "white",
                }}
              >
                Event #2
              </Text>
            </View>
            <View style={styles.eventsMiniCards}>
              <Text
                style={{
                  alignSelf: "center",
                  textAlignVertical: "center",
                  color: "white",
                }}
              >
                Event #3
              </Text>
            </View>
            
          </View>
        </ScrollView>
      </View> */}

<View style={styles.eventsCard}>
          <Text style={styles.eventHeader}> {userData.firstname + " is attending..."} </Text>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
              }}
            >
              {/* Content inside the horizontal ScrollView */}  
                
              {events.map((eventDetail) => (
      <TouchableOpacity
            onPress={() => {
            navigation.navigate("Event Profile", {
            eventId: eventDetail.id,
        });
}}>
          <View key={eventDetail.id} style={styles.eventsMiniCards}>
                <Text
                  style={{
                    alignSelf: "center",
                    textAlignVertical: "center",
                    color: "white",
                    fontSize: 14,
                    fontWeight:"bold",
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



     {/* <View style={styles.orgsCard}>
        <Text style={styles.orgHeader}> {userData.firstname + " is apart of..."} </Text>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.orgsInfo}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              marginTop: "-20%",
            }}
          >
            
            <View style={styles.orgsMiniCards}>
              <Text
                style={{
                  alignSelf: "center",
                  textAlignVertical: "center",
                  color: "white",
                }}
              >
                Org 1
              </Text>
            </View>
            <View style={styles.orgsMiniCards}>
              <Text
                style={{
                  alignSelf: "center",
                  textAlignVertical: "center",
                  color: "white",
                }}
              >
                Org 2
              </Text>
            </View>
            <View style={styles.orgsMiniCards}>
              <Text
                style={{
                  alignSelf: "center",
                  textAlignVertical: "center",
                  color: "white",
                }}
              >
                Org 3
              </Text>
            </View>
            
          </View>
        </ScrollView>
      </View>
              */}
    <View style={styles.eventsCard}>
          <Text style={styles.eventHeader}> {userData.firstname + " is apart of..."} </Text>

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
              {/* Content inside the horizontal ScrollView */}

              {organizations.map((organization) => (
<TouchableOpacity
onPress={() => {
  navigation.navigate("Org Profile", {
    organizationId: organization.org_id,
  });
}}>
<View key={organization.id} style={styles.eventsMiniCards}>

                <Text
                  style={{
                    alignSelf: "center",
                    textAlignVertical: "center",
                    color: "white",
                    fontSize: 14,
                    fontWeight:"bold",
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
      </View>
      {/* <TouchableOpacity
        style={styles.customButtonContainer}
        onPress={handleLogout}
      >
        <Text style={styles.customButtonText}>Logout</Text>
      </TouchableOpacity> */}




      </Card>
    </View>
    </ScrollView>
  );
};

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
    marginTop: "1%",
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
  followingContainer: {
    alignItems: "center",
  },
  notFollowingButton: {
    backgroundColor: "#FF392E",
    padding: 15,
    marginTop: "1%",
    width: "93%",
    alignItems: "center",
    borderRadius: 15,
  },
  notFollowingButtonText: {
    color: "white",
    fontSize: 16,
    alignItems: "center",
    fontWeight: "bold",
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
  italic: { fontStyle: "italic" },
  unFollowButton: {
    backgroundColor: "grey",
    padding: 15,
    marginTop: "1%",
    width: "93%",
    alignItems: "center",
    borderRadius: 15,
  },
  unFollowButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  eventsCard: {
    backgroundColor: "white",
    borderRadius: 15,
    alignSelf: "center",
    height: "46%",
    width: "90%",
    justifyContent: "center",
    marginTop: "2.0%",
    marginBottom: "-15%",
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
    textAlign: "center",
    marginTop: "8%",
  },
  orgHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF392E",
    textAlign: "center",
    marginTop: "3%",
  },
  eventsMiniCards: {
    width: 150,
    height: 150,
    backgroundColor: "#FF392E",
    margin: 10,
    borderRadius: 15,
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
