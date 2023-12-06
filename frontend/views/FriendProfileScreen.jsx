import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
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
        height: 900,
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
            <View style={styles.attendingContainer}>
              <TouchableOpacity
                style={styles.attendingButton}
                onPress={handleFollow}
              >
                <Text style={styles.attendingButtonText}>Follow</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View>
      <View style={styles.eventsCard}>
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
            {/* Content inside the horizontal ScrollView */}
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
            {/* Add more items as needed */}
          </View>
        </ScrollView>
      </View>

      <View style={styles.orgsCard}>
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
            {/* Content inside the horizontal ScrollView */}
            <View style={styles.orgsMiniCards}>
              <Text
                style={{
                  alignSelf: "center",
                  textAlignVertical: "center",
                  color: "#FF392E",
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
                  color: "#FF392E",
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
                  color: "#FF392E",
                }}
              >
                Org 3
              </Text>
            </View>
            {/* Add more items as needed */}
          </View>
        </ScrollView>
      </View>
    </View>



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
  attendingButton: {

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
  host: {
    paddingTop: 10,
    fontStyle: "italic",
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
    backgroundColor: "#FF392E",
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
    marginTop: "3%",
  },
  orgHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
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
    backgroundColor: "white",
    margin: 10,
    borderRadius: 15,
  },
});

export default FriendProfileScreen;
